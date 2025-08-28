// api/admin/reviews/[id]/approve.ts
import { createClient } from '@supabase/supabase-js';

function verifyAdminAuth(req: any): boolean {
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
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!verifyAdminAuth(req)) {
      console.warn('approve: unauthorized. Authorization header:', req.headers.authorization);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL) throw new Error('Missing SUPABASE_URL in process.env');
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in process.env');

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { id } = req.query;
    const { moderatedBy = 'admin' } = req.body || {};

    if (!id) return res.status(400).json({ error: 'Review ID is required' });

    const { data: review, error } = await supabase
      .from('reviews')
      .update({
        published: true,
        published_at: new Date().toISOString(),
        moderated_by: moderatedBy
      })
      .eq('id', id)
      .eq('deleted', false)
      .select()
      .single();

    if (error) {
      console.error('approve: DB error:', error);
      return res.status(500).json({ error: error.message || 'Failed to approve review', details: error });
    }

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // optional webhook
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'review_approved', review, moderatedBy, timestamp: new Date().toISOString() })
        });
      } catch (webhookError) {
        console.error('approve: webhook failed:', webhookError);
      }
    }

    return res.status(200).json({ message: 'Review approved successfully', review });
  } catch (err: any) {
    console.error('Unhandled error in approve handler:', err);
    return res.status(500).json({
      error: String(err.message || err),
      stack: err?.stack ? String(err.stack).split('\n').slice(0,10).join('\n') : null
    });
  }
}
