import { createAdminClient } from '../../src/lib/supabaseAdmin.server';

function verifyAdminAuth(req: any): boolean {
  const authHeader = req.headers.authorization;
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    console.error('ADMIN_API_KEY not configured');
    return false;
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }

  const token = authHeader.substring(7);
  return token === adminKey;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Verify admin authentication
  if (!verifyAdminAuth(req)) {
      console.warn('Admin auth failed. Authorization header:', req.headers.authorization);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabase = createAdminClient();

  if (req.method === 'GET') {
    try {
      const { published = 'false', limit = '50', page = '1' } = req.query;
      const limitNum = Math.min(parseInt(limit) || 50, 100);
      const pageNum = Math.max(parseInt(page) || 1, 1);
      const offset = (pageNum - 1) * limitNum;

      const { data: reviews, error, count } = await supabase
        .from('reviews')
        .select('*', { count: 'exact' })
        .eq('published', published === 'true')
        .eq('deleted', false)
        .order('created_at', { ascending: false })
        .range(offset, offset + limitNum - 1);

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
      }

      return res.status(200).json({
        reviews: reviews || [],
        total: count || 0,
        page: pageNum,
        limit: limitNum,
        hasMore: (count || 0) > offset + limitNum
      });

    } catch (error) {
      console.error('Error fetching admin reviews:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}