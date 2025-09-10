// hooks/useReviews.ts
import { useState, useEffect } from 'react';
import type { PublicReview } from '../types/review';
import { supabase } from '../lib/supabaseClient';

export function useReviews(limit = 12) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error, count } = await supabase
        .from('reviews')
        .select('id, name, city, service, review, rating, avatar_url, published_at', { count: 'exact' })
        .eq('published', true)
        .eq('deleted', false)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      setReviews((data || []) as PublicReview[]);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews via Supabase:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      // fallback defaults (your existing default reviews)
      setReviews([
        { id: '1', name: 'Anusha', city: 'Hyderabad', rating: 5, review: "The most relaxing...", published_at: '2024-01-15T10:30:00Z' },
        { id: '2', name: 'Naveen', city: 'Hyderabad', rating: 5, review: "aroma Spa truly...", published_at: '2024-01-12T14:20:00Z' },
        { id: '3', name: 'Venkatesh', city: 'Hyderabad', rating: 5, review: "The signature treatments...", published_at: '2024-01-10T16:45:00Z' },
        { id: '4', name: 'Meera', city: 'Hyderabad', rating: 5, review: "Outstanding service...", published_at: '2024-01-08T11:15:00Z' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, [limit]);

  return { reviews, loading, error, refetch: fetchReviews };
}
