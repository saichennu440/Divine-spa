// src/components/ReviewModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, Send, Check } from 'lucide-react';
import type { CreateReviewRequest } from '../types/review';
import { supabase } from '../lib/supabaseClient';
import servicesData from '../data/servicesData'; // adjust path if needed

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Build grouped list for optgroups (same as earlier) */
function buildGroupedServiceList(data: unknown): { label: string; names: string[] }[] {
  const groups: { label: string; names: string[] }[] = [];

  if (!data || typeof data !== 'object') return groups;

  const topLevel = data as Record<string, unknown>;
  for (const [topKey, topValue] of Object.entries(topLevel)) {
    if (!topValue || typeof topValue !== 'object') continue;

    const subCats = topValue as Record<string, unknown>;
    for (const [subKey, subValue] of Object.entries(subCats)) {
      const names: string[] = [];

      if (Array.isArray(subValue)) {
        for (const item of subValue) {
          if (item && typeof item === 'object' && 'name' in (item as any)) {
            const n = (item as any).name;
            if (typeof n === 'string' && n.trim()) names.push(n.trim());
          }
        }
      }
      if (names.length > 0) {
        const unique = Array.from(new Set(names)).sort((a, b) => a.localeCompare(b));
        const label = `${capitalizeLabel(topKey)} — ${formatSubKey(subKey)}`;
        groups.push({ label, names: unique });
      }
    }
  }
  return groups;
}
function capitalizeLabel(key: string) {
  return key
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
function formatSubKey(sub: string) {
  return sub.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * PortalSelect
 * - Renders the dropdown panel into document.body with createPortal to avoid clipping by modal.
 * - Positions panel below the trigger using viewport coordinates from getBoundingClientRect.
 * - Recalculates on resize and scroll.
 */
function PortalSelect({
  groupedServices,
  value,
  onChange,
  placeholder = 'Select a service...'
}: {
  groupedServices: { label: string; names: string[] }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  // compute & set style for panel (fixed, viewport coords)
  const computePanelStyle = () => {
    const trigger = triggerRef.current;
    if (!trigger || typeof window === 'undefined') return;

    const rect = trigger.getBoundingClientRect();
    const isMobile = window.innerWidth <= 640;
    const gap = 8; // gap between trigger bottom and panel top

    if (isMobile) {
      // full-width-ish mobile panel with margins
      const left = 12;
      const right = 12;
      const top = rect.bottom + gap;
      setPanelStyle({
        position: 'fixed',
        left: `${left}px`,
        right: `${right}px`,
        top: `${top}px`,
        zIndex: 2147483647,
        maxHeight: '60vh',
        overflowY: 'auto',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
      });
    } else {
      // desktop: compute width equal to trigger width but keep within viewport
      const viewportWidth = window.innerWidth;
      const desiredWidth = rect.width;
      const maxAvailableWidth = viewportWidth - 32; // margin
      const width = Math.min(desiredWidth, maxAvailableWidth);
      let left = rect.left;

      if (left + width + 16 > viewportWidth) {
        left = Math.max(8, viewportWidth - width - 16);
      }
      left = Math.max(8, left);

      const top = rect.bottom + gap; // viewport-relative
      setPanelStyle({
        position: 'fixed',
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        zIndex: 2147483647,
        maxHeight: '320px',
        overflowY: 'auto',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
      });
    }
  };

  const openPanel = () => {
    computePanelStyle();
    setOpen(true);
  };
  const closePanel = () => setOpen(false);

  // outside click & keyboard
  useEffect(() => {
    function handleDocClick(e: MouseEvent) {
      if (!panelRef.current || !triggerRef.current) return;
      if (
        panelRef.current.contains(e.target as Node) ||
        triggerRef.current.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowDown' && !open) {
        e.preventDefault();
        openPanel();
      }
    }
    document.addEventListener('mousedown', handleDocClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleDocClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  // reposition on resize/scroll while open
  useEffect(() => {
    if (!open) return;
    const onChange = () => computePanelStyle();
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, true); // capture scrolls in ancestors
    // small timeout to let layout settle
    setTimeout(computePanelStyle, 10);
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange, true);
    };
  }, [open]);

  const handleSelect = (s: string) => {
    onChange(s);
    setOpen(false);
  };

  // If document not available (SSR), render fallback trigger only
  const panelNode = typeof document !== 'undefined' && open ? (
    createPortal(
      <div
        ref={panelRef}
        style={panelStyle}
        className="bg-white border border-gray-200 rounded-md mt-1"
        role="listbox"
      >
        <div className="py-1">
          {groupedServices.map((g) => (
            <div key={g.label} className="px-2 py-2 border-b last:border-b-0">
              <div className="text-xs font-semibold text-gray-500 px-2 pb-2">{g.label}</div>
              <div className="flex flex-col gap-1">
                {g.names.map((n) => {
                  const selected = n === value;
                  return (
                    <button
                      key={`${g.label}__${n}`}
                      type="button"
                      onClick={() => handleSelect(n)}
                      className={`text-left px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none ${
                        selected ? 'bg-sage/20 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => (open ? closePanel() : openPanel())}
          className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent flex items-center justify-between"
        >
          <span className={`${value ? 'text-gray-900' : 'text-gray-400'}`}>{value || placeholder}</span>
          <svg className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.061a.75.75 0 111.13.986l-4.25 4.655a.75.75 0 01-1.09 0l-4.25-4.655a.75.75 0 01.02-1.06z" />
          </svg>
        </button>
      </div>

      {panelNode}
    </>
  );
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    city: '',
    service: '',
    review: ''
  });

  // grouped services memoized
  const groupedServices = useMemo(() => buildGroupedServiceList(servicesData), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview();
  };

  const submitReview = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const reviewRequest: CreateReviewRequest = {
        name: reviewData.name.trim(),
        email: reviewData.email.trim(),
        city: reviewData.city?.trim() || undefined,
        service: reviewData.service || undefined,
        review: reviewData.review.trim(),
        rating
      };

      if (!reviewRequest.name) throw new Error('Please enter your name.');
      if (!reviewRequest.email) throw new Error('Please enter your email.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewRequest.email)) {
        throw new Error('Please enter a valid email address.');
      }
      if (!reviewRequest.review || reviewRequest.review.length < 20) {
        throw new Error('Review must be at least 20 characters.');
      }
      if (!reviewRequest.rating || reviewRequest.rating < 1 || reviewRequest.rating > 5) {
        throw new Error('Please provide a rating between 1 and 5.');
      }

      const { data: newReview, error } = await supabase
        .from('reviews')
        .insert([
          {
            name: reviewRequest.name,
            email: reviewRequest.email.toLowerCase(),
            city: reviewRequest.city ?? null,
            service: reviewRequest.service ?? null,
            review: reviewRequest.review,
            rating: reviewRequest.rating,
            published: false,
            avatar_url: null
          }
        ])
        .select('id, name, city, service, review, rating, created_at')
        .single();

      if (error) {
        console.error('Supabase insert error full:', error);
        throw new Error(error.message || 'Failed to submit review');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting review:', err);
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setIsSubmitted(false);
    setRating(0);
    setHoveredRating(0);
    setIsSubmitting(false);
    setSubmitError(null);
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
              <h3 className="text-2xl font-serif font-semibold text-gray-900">Share Your Experience</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">How would you rate your experience?</label>
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
                        <Star className={`h-8 w-8 ${star <= (hoveredRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={reviewData.name}
                      onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={reviewData.email}
                      onChange={(e) => setReviewData({ ...reviewData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={reviewData.city}
                      onChange={(e) => setReviewData({ ...reviewData, city: e.target.value })}
                      placeholder="e.g., New York"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Experienced</label>

                    <PortalSelect
                      groupedServices={groupedServices}
                      value={reviewData.service}
                      onChange={(v) => setReviewData({ ...reviewData, service: v })}
                      placeholder="Select a service..."
                    />
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review *</label>
                  <textarea
                    value={reviewData.review}
                    onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your experience at aroma Spa..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">{submitError}</p>
                  </div>
                )}

                {/* Privacy Notice */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600">
                    By submitting this review, you agree that your feedback may be displayed on our website and marketing materials.
                    Your email will not be published. We reserve the right to moderate reviews before publication.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!rating || !reviewData.name || !reviewData.email || !reviewData.review || isSubmitting}
                  className="w-full bg-sage hover:bg-sage-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">Your review will be published after admin approval.</p>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h4>
                <p className="text-gray-600 mb-6">
                  Your review has been submitted successfully and is pending approval. It will appear publicly once approved by our team. Thank you for choosing aroma Spa!
                </p>
                <button onClick={handleClose} className="bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
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
