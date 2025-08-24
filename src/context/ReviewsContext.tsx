// src/context/ReviewsContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type Review = {
  id: string;
  name: string;
  email?: string;
  city?: string;
  service?: string;
  review: string;
  rating: number;
  avatar?: string | null;
  submittedAt: string; // ISO
  published: boolean; // whether it's approved/published for public UI
};

type ReviewsContextType = {
  reviews: Review[]; // all reviews (published and pending)
  publishedReviews: Review[]; // shortcut: published only
  pendingReviews: Review[]; // shortcut: pending only
  addReview: (r: Omit<Review, 'id' | 'submittedAt' | 'published'>) => void;
  approveReview: (id: string) => void;
  removeReview: (id: string) => void;
  clearReviews: () => void;
};

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const useReviews = () => {
  const ctx = useContext(ReviewsContext);
  if (!ctx) throw new Error('useReviews must be used within ReviewsProvider');
  return ctx;
};

const STORAGE_KEY = 'divine_spa_reviews_v1';

export const ReviewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Review[];
    } catch (e) {
      console.warn('Failed to parse reviews from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.warn('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  const addReview = (r: Omit<Review, 'id' | 'submittedAt' | 'published'>) => {
    const newReview: Review = {
      ...r,
      id: uuidv4(),
      submittedAt: new Date().toISOString(),
      published: false // NEW submissions are pending by default
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const approveReview = (id: string) => {
    setReviews(prev => prev.map(rv => (rv.id === id ? { ...rv, published: true } : rv)));
  };

  const removeReview = (id: string) => {
    setReviews(prev => prev.filter(rv => rv.id !== id));
  };

  const clearReviews = () => {
    setReviews([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const publishedReviews = reviews.filter(r => r.published);
  const pendingReviews = reviews.filter(r => !r.published);

  return (
    <ReviewsContext.Provider value={{ reviews, publishedReviews, pendingReviews, addReview, approveReview, removeReview, clearReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};
