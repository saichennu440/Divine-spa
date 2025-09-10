// pages/api/admin/reviews/[id]/index.ts
import { createClient } from '@supabase/supabase-js';

function verifyAdminAuth(req: any): boolean {
  const authHeader = req.headers?.authorization;
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
  console.log('[delete] method=', req.method, 'url=', req.url);

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS, GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST' && req.method !== 'GET' && req.method !== 'DELETE') { // Allow GET for debugging
    res.setHeader('Allow', 'POST, OPTIONS, GET, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!verifyAdminAuth(req)) {
      console.warn('delete: unauthorized. Authorization header:', req.headers.authorization);
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase env missing');
      return res.status(500).json({ error: 'Server misconfiguration' });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { id } = req.query;
    const { hard_delete = 'false' } = req.body || {};

    if (!id) return res.status(400).json({ error: 'Review ID is required' });

    if ((hard_delete === 'true' || hard_delete === true) && process.env.ALLOW_HARD_DELETE === 'true') {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('delete (hard) DB error:', error);
        return res.status(500).json({ error: error.message || 'Failed to delete review' });
      }

      return res.status(200).json({ message: 'Review hard deleted successfully' });
    } else {
      const { data: review, error } = await supabase
        .from('reviews')
        .update({
          deleted: true,
          published: false
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('delete (soft) DB error:', error);
        return res.status(500).json({ error: error.message || 'Failed to delete review' });
      }

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }

      return res.status(200).json({ message: 'Review deleted successfully', review });
    }
  } catch (err: any) {
    console.error('Unhandled error in delete handler:', err);
    return res.status(500).json({ error: String(err.message || err) });
  }
}
