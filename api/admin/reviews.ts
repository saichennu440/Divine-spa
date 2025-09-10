// api/admin/reviews.ts
import { createClient } from '@supabase/supabase-js';

function verifyAdminAuth(req: any): boolean {
  // ... (existing verifyAdminAuth function) ...
  const authHeader = req.headers.authorization;
  const adminKey = process.env.ADMIN_API_KEY;
  if (!adminKey) {
    console.error('ADMIN_API_KEY not configured in process.env');
    return false;
  }
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.substring(7);
  return token === adminKey;
}

export default async function handler(req: any, res: any) {
  // Basic CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Added PUT and DELETE
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // Auth check early
    if (!verifyAdminAuth(req)) {
      console.warn('Admin auth failed. Authorization header:', req.headers.authorization);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Build admin Supabase client inside function to avoid import-time failures
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL) {
      throw new Error('Missing SUPABASE_URL in process.env');
    }
    if (!SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in process.env');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    if (req.method === 'GET') {
      const { published = 'false', limit = '50', page = '1' } = req.query || {};
      const limitNum = Math.min(parseInt(limit as string) || 50, 100);
      const pageNum = Math.max(parseInt(page as string) || 1, 1);
      const offset = (pageNum - 1) * limitNum;

      const { data: reviews, error, count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('published', published === 'true')
        .eq('deleted', false)
        .order('created_at', { ascending: false })
        .range(offset, offset + limitNum - 1);

      if (error) {
        console.error('Supabase DB error:', error);
        return res.status(500).json({ error: error.message || 'DB error', details: error });
      }

      return res.status(200).json({
        reviews: reviews || [],
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        hasMore: (count || 0) > offset + limitNum
      });
    } else if (req.method === 'DELETE') { // Added DELETE handler
      // Extract the review ID from the URL path
      const reviewId = req.url.split('/').pop();

      if (!reviewId) {
        return res.status(400).json({ error: 'Review ID missing from URL' });
      }

      const { error } = await supabase
        .from('reviews')
        .update({ deleted: true }) // Or use .delete() if you want to permanently remove
        .eq('id', reviewId);

      if (error) {
        console.error('Supabase DB error deleting review:', error);
        return res.status(500).json({ error: error.message || 'DB error', details: error });
      }

      if (error && error === 'PGRST116') { // Example error code for no rows found
           return res.status(404).json({ error: 'Review not found' });
      }


      return res.status(200).json({ message: 'Review marked as deleted successfully' }); // Or status 204 No Content

    } else { // Fallback for other methods
       return res.status(405).json({ error: 'Method not allowed' });
    }


  } catch (err: any) {
    console.error('Unhandled error in /api/admin/reviews:', err);
    // Return debug info (safe to return for troubleshooting). Remove stack in production.
    return res.status(500).json({
      error: String(err.message || err),
      stack: err?.stack ? String(err.stack).split('\n').slice(0,10).join('\n') : null
    });
  }
}
