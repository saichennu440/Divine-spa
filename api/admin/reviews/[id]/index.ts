import { createAdminClient } from '../../../../src/lib/supabaseAdmin.server';

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
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { hard_delete = 'false' } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  try {
    const supabase = createAdminClient();

    if (hard_delete === 'true' && process.env.ALLOW_HARD_DELETE === 'true') {
      // Hard delete - completely remove from database
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to delete review' });
      }
    } else {
      // Soft delete - mark as deleted
      const { data: review, error } = await supabase
        .from('reviews')
        .update({ 
          deleted: true,
          published: false // Also unpublish if it was published
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ error: 'Failed to delete review' });
      }

      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
    }

    return res.status(200).json({
      message: 'Review deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}