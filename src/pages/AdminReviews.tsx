import React, { useState, useEffect } from 'react';
import { Star, Check, Trash2, Eye, EyeOff, Calendar, Mail, User, MessageSquare } from 'lucide-react';
import type { Review } from '../types/review';
import AnimatedSection from '../components/AnimatedSection';

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'published'>('pending');
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [authError, setAuthError] = useState('');

  const authenticate = () => {
    if (!adminKey.trim()) {
      setAuthError('Please enter admin key');
      return;
    }
    
    // Store admin key for API calls
    localStorage.setItem('admin_key', adminKey);
    setIsAuthenticated(true);
    setAuthError('');
    fetchReviews();
  };

  const logout = () => {
    localStorage.removeItem('admin_key');
    setIsAuthenticated(false);
    setAdminKey('');
    setReviews([]);
  };

  const getAuthHeaders = () => {
    const key = localStorage.getItem('admin_key');
    return {
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/reviews?published=${activeTab === 'published'}`, {
        headers: getAuthHeaders()
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('admin_key');
        setAuthError('Invalid admin key');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }

      const data = await response.json();
      setReviews(data.reviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (reviewId: string) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/approve`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ moderatedBy: 'admin' })
      });

      if (!response.ok) {
        throw new Error('Failed to approve review');
      }

      // Refresh reviews
      fetchReviews();
      setSelectedReview(null);
      
      // Show success message
      alert('Review approved successfully!');
    } catch (err) {
      console.error('Error approving review:', err);
      alert('Failed to approve review');
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
        body: JSON.stringify({ hard_delete: false })
      });

      if (!response.ok) {
        throw new Error('Failed to delete review');
      }

      // Refresh reviews
      fetchReviews();
      setSelectedReview(null);
      
      // Show success message
      alert('Review deleted successfully!');
    } catch (err) {
      console.error('Error deleting review:', err);
      alert('Failed to delete review');
    }
  };

  useEffect(() => {
    const storedKey = localStorage.getItem('admin_key');
    if (storedKey) {
      setAdminKey(storedKey);
      setIsAuthenticated(true);
      fetchReviews();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchReviews();
    }
  }, [activeTab, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-serif font-semibold text-gray-900">
              Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your admin key to manage reviews
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && authenticate()}
                placeholder="Admin Key"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-sage focus:border-sage focus:z-10 sm:text-sm"
              />
            </div>
            {authError && (
              <div className="text-red-600 text-sm text-center">{authError}</div>
            )}
            <button
              onClick={authenticate}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-sage hover:bg-sage-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-semibold text-gray-900">
              Review Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage customer reviews and testimonials
            </p>
          </div>
          <button
            onClick={logout}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'pending'
                  ? 'border-sage text-sage'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Reviews
            </button>
            <button
              onClick={() => setActiveTab('published')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'published'
                  ? 'border-sage text-sage'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Published Reviews
            </button>
          </nav>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading reviews...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchReviews}
              className="mt-4 bg-sage hover:bg-sage-dark text-white px-4 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              No {activeTab} reviews found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <AnimatedSection key={review.id} delay={index * 50}>
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{review.name}</span>
                      {review.city && (
                        <span className="text-gray-500 text-sm">• {review.city}</span>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {review.review}
                  </p>

                  {/* Metadata */}
                  <div className="space-y-2 mb-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1" />
                      {review.email}
                    </div>
                    {review.service && (
                      <div className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {review.service}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(review.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedReview(review)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                    
                    {activeTab === 'pending' && (
                      <button
                        onClick={() => approveReview(review.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}

        {/* Review Detail Modal */}
        {selectedReview && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedReview(null)} />
              
              <div className="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                <div className="bg-white px-6 py-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-serif font-semibold text-gray-900">
                      Review Details
                    </h3>
                    <button
                      onClick={() => setSelectedReview(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <EyeOff className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedReview.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedReview.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedReview.city || 'Not provided'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Service</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedReview.service || 'Not specified'}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Rating</label>
                      <div className="mt-1 flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < selectedReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Review</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedReview.review}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                      <div>
                        <label className="block font-medium">Submitted</label>
                        <p>{new Date(selectedReview.created_at).toLocaleString()}</p>
                      </div>
                      {selectedReview.published_at && (
                        <div>
                          <label className="block font-medium">Published</label>
                          <p>{new Date(selectedReview.published_at).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    {activeTab === 'pending' && (
                      <button
                        onClick={() => approveReview(selectedReview.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                      >
                        <Check className="h-4 w-4" />
                        <span>Approve Review</span>
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(selectedReview.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;