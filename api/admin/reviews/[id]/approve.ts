import { createAdminClient } from '../../../../src/lib/SupabaseClient';

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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  if (!verifyAdminAuth(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;
  const { moderatedBy = 'admin' } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Review ID is required' });
  }

  try {
    let supabase;
try {
  supabase = createAdminClient();
} catch (err) {
  console.error('Admin client initialization failed:', err);
  return res.status(500).json({ error: 'Server configuration error: missing service key' });
}

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
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to approve review' });
    }

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Send webhook notification (optional)
    if (process.env.WEBHOOK_URL) {
      try {
        await fetch(process.env.WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'review_approved',
            review,
            moderatedBy,
            timestamp: new Date().toISOString()
          })
        });
      } catch (webhookError) {
        console.error('Webhook notification failed:', webhookError);
      }
    }

    return res.status(200).json({
      message: 'Review approved successfully',
      review
    });

  } catch (error) {
    console.error('Error approving review:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}