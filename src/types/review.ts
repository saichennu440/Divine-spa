export interface Review {
  id: string;
  name: string;
  email: string;
  city?: string;
  service?: string;
  review: string;
  rating: number;
  avatar_url?: string;
  published: boolean;
  deleted: boolean;
  created_at: string;
  published_at?: string;
  moderated_by?: string;
}

export interface PublicReview {
  id: string;
  name: string;
  city?: string;
  service?: string;
  review: string;
  rating: number;
  avatar_url?: string;
  published_at: string;
}

export interface CreateReviewRequest {
  name: string;
  email: string;
  city?: string;
  service?: string;
  review: string;
  rating: number;
  avatar_url?: string;

}

export interface ReviewsResponse {
  reviews: PublicReview[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}