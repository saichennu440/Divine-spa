// src/hooks/useReviews.ts
import { useState, useEffect } from 'react';
import type { PublicReview } from '../types/review';
import { supabase } from '../lib/SupabaseClient';

export function useReviews(limit = 12) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error: sbError } = await supabase
        .from('reviews')
        .select('id, name, city, service, review, rating, published_at')
        .eq('published', true)
        .eq('deleted', false)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (sbError) throw sbError;
      setReviews((data || []) as PublicReview[]);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      // fallback
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [limit]);

  return { reviews, loading, error, refetch: fetchReviews };
}
