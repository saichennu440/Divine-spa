import React, { useState } from 'react';
import { Star } from 'lucide-react';
import ReviewModal from './ReviewModal';

const ReviewButton: React.FC = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsReviewModalOpen(true)}
        className="fixed bottom-6 left-6 z-50 bg-sage hover:bg-sage-dark text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center space-x-2"
        aria-label="Leave a review"
      >
        <Star className="h-5 w-5" />
        <span className="text-sm font-medium">Review Us</span>
      </button>

      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
      />
    </>
  );
};

export default ReviewButton;