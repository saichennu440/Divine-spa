import React, { useState } from 'react';
import { X, Star, Send, Check } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    city: '',
    service: '',
    review: ''
  });

  const services = [
    'Signature Therapy Treatment',
    'Foot Spa & Pedicure',
    'Skin Treatment & Body Polish',
    'Facial & Clean-Up',
    'Massage Therapy',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log('Review submitted:', {
      ...reviewData,
      rating,
      submittedAt: new Date().toISOString()
    });
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setRating(0);
    setHoveredRating(0);
    setReviewData({
      name: '',
      email: '',
      city: '',
      service: '',
      review: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />
        
        <div className="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-semibold text-gray-900">
                Share Your Experience
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-colors"
                      >
                        <Star 
                          className={`h-8 w-8 ${
                            star <= (hoveredRating || rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={reviewData.name}
                      onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={reviewData.email}
                      onChange={(e) => setReviewData({...reviewData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={reviewData.city}
                      onChange={(e) => setReviewData({...reviewData, city: e.target.value})}
                      placeholder="e.g., New York"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Experienced
                    </label>
                    <select
                      value={reviewData.service}
                      onChange={(e) => setReviewData({...reviewData, service: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewData.review}
                    onChange={(e) => setReviewData({...reviewData, review: e.target.value})}
                    rows={4}
                    placeholder="Tell us about your experience at aroma spa..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">
                    By submitting this review, you agree that your feedback may be displayed on our website 
                    and marketing materials. Your email will not be published. We reserve the right to 
                    moderate reviews before publication.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!rating || !reviewData.name || !reviewData.email || !reviewData.review}
                  className="w-full bg-sage hover:bg-sage-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Review</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600 mb-6">
                  Your review has been submitted successfully. We appreciate your feedback and will 
                  review it before publishing.
                </p>
                <button
                  onClick={handleClose}
                  className="bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;