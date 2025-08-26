import { useState, useEffect } from 'react';
import type { PublicReview, ReviewsResponse } from '../types/review';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export function useReviews(limit = 12) {
  const [reviews, setReviews] = useState<PublicReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/reviews?published=true&limit=${limit}&page=1`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data: ReviewsResponse = await response.json();
      setReviews(data.reviews);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      // Fallback to default reviews if API fails
      setReviews([
        {
          id: '1',
          name: 'Sheela',
          city: 'New York',
          rating: 5,
          review: 'The most relaxing and rejuvenating experience I\'ve ever had. The therapists are incredibly skilled and the ambiance is perfect.',
          published_at: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          name: 'Smitha ',
          city: 'Los Angeles',
          rating: 5,
          review: 'Divine Spa truly lives up to its name. Every visit feels like a journey to inner peace and wellness.',
          published_at: '2024-01-12T14:20:00Z'
        },
        {
          id: '3',
          name: 'Venkatesh',
          city: 'Miami',
          rating: 5,
          review: 'The signature treatments are exceptional. I always leave feeling completely refreshed and renewed.',
          published_at: '2024-01-10T16:45:00Z'
        },
        {
          id: '4',
          name: 'Meera',
          city: 'Chicago',
          rating: 5,
          review: 'Outstanding service and attention to detail. This spa has become my sanctuary for stress relief.',
          published_at: '2024-01-08T11:15:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [limit]);

  return { reviews, loading, error, refetch: fetchReviews };
}