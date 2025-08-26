import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  review: string;
  service: string;
  submittedAt: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'submittedAt'>) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      city: 'New York',
      rating: 5,
      review: 'The most relaxing and rejuvenating experience I\'ve ever had. The therapists are incredibly skilled and the ambiance is perfect.',
      service: 'Swedish therapy',
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Michael Chen',
      city: 'Los Angeles',
      rating: 5,
      review: 'aroma Spa truly lives up to its name. Every visit feels like a journey to inner peace and wellness.',
      service: 'Hot Stone therapy',
      submittedAt: '2024-01-12T14:20:00Z'
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      city: 'Miami',
      rating: 5,
      review: 'The signature treatments are exceptional. I always leave feeling completely refreshed and renewed.',
      service: 'Aromatherapy therapy',
      submittedAt: '2024-01-10T16:45:00Z'
    },
    {
      id: '4',
      name: 'David Thompson',
      city: 'Chicago',
      rating: 5,
      review: 'Outstanding service and attention to detail. This spa has become my sanctuary for stress relief.',
      service: 'Deep Tissue therapy',
      submittedAt: '2024-01-08T11:15:00Z'
    }
  ]);

  const addReview = (newReview: Omit<Review, 'id' | 'submittedAt'>) => {
    const review: Review = {
      ...newReview,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    
    setReviews(prevReviews => [review, ...prevReviews]);
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
};