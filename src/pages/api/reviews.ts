import { createAdminClient } from '../lib/supabaseAdmin.server';
import type { CreateReviewRequest, ReviewsResponse } from '../types/review';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // 5 reviews per hour per IP

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`;
}

function isRateLimited(ip: string): boolean {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count++;
  return false;
}


function sanitizeText(text: string): string {
  return text
    .replace(/[<>]/g, '') // Basic XSS prevention
    .trim();
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const supabase = createAdminClient();

  if (req.method === 'POST') {
    try {
      // Rate limiting
      const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
      if (isRateLimited(clientIP)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }

      const body: CreateReviewRequest = req.body;
      const { name, email, city, service, review, rating, avatar_url } = body;

      // Validation
      if (!name || !email || !review || !rating) {
        return res.status(400).json({ error: 'Missing required fields: name, email, review, rating' });
      }

      // if (!validateEmail(email)) {
      //   return res.status(400).json({ error: 'Invalid email format' });
      // }

      if (review.length < 10 || review.length > 2000) {
        return res.status(400).json({ error: 'Review must be between 20 and 2000 characters' });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
      }


      // Check for spam (same email submitting multiple reviews recently)
      const { data: recentReviews } = await supabase
        .from('reviews')
        .select('id')
        .eq('email', email)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .limit(3);

      if (recentReviews && recentReviews.length >= 3) {
        return res.status(429).json({ error: 'Too many reviews from this email. Please try again later.' });
      }

      // Insert review
      const { data: newReview, error } = await supabase
        .from('reviews')
        .insert({
          name: sanitizeText(name),
          email: email.toLowerCase().trim(),
          city: city ? sanitizeText(city) : null,
          service: service ? sanitizeText(service) : null,
          review: sanitizeText(review),
          rating,
          avatar_url: avatar_url || null,
          published: false
        })
        .select('id, name, city, service, review, rating, created_at')
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to save review' });
      }

      // Send webhook notification (optional)
      if (process.env.WEBHOOK_URL) {
        try {
          await fetch(process.env.WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              type: 'new_review',
              review: newReview,
              timestamp: new Date().toISOString()
            })
          });
        } catch (webhookError) {
          console.error('Webhook notification failed:', webhookError);
        }
      }

      return res.status(201).json({
        message: 'Review submitted successfully',
        review: newReview
      });

    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { published = 'true', limit = '12', page = '1' } = req.query;
      const limitNum = Math.min(parseInt(limit) || 12, 50); // Max 50 per request
      const pageNum = Math.max(parseInt(page) || 1, 1);
      const offset = (pageNum - 1) * limitNum;

      const query = supabase
        .from('reviews')
        .select('id, name, city, service, review, rating, avatar_url, published_at', { count: 'exact' })
        .eq('published', published === 'true')
        .eq('deleted', false)
        .order('published_at', { ascending: false })
        .range(offset, offset + limitNum - 1);

      const { data: reviews, error, count } = await query;

      if (error) {
        console.error('Database error:', error);
        console.log("error is this")
        return res.status(500).json({ error: 'Failed to fetch reviews' });
      }

      const response: ReviewsResponse = {
        reviews: reviews || [],
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        hasMore: (count || 0) > offset + limitNum
      };

      return res.status(200).json(response);

    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}