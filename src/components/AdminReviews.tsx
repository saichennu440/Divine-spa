// src/components/AdminReviews.tsx
import React from 'react';
import { useReviews } from '../context/ReviewsContext';

const AdminReviews: React.FC = () => {
  const { pendingReviews, publishedReviews, approveReview, removeReview, clearReviews } = useReviews();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Reviews Admin</h2>
        <button
          onClick={() => {
            if (confirm('Clear ALL reviews from localStorage? This is irreversible.')) clearReviews();
          }}
          className="px-3 py-2 bg-red-500 text-white rounded"
        >
          Clear All
        </button>
      </div>

      <section>
        <h3 className="text-xl font-semibold mb-3">Pending Reviews ({pendingReviews.length})</h3>
        {pendingReviews.length === 0 ? (
          <p className="text-sm text-gray-600">No pending reviews.</p>
        ) : (
          <div className="grid gap-4">
            {pendingReviews.map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-lg shadow flex justify-between">
                <div>
                  <div className="text-sm text-gray-500">{new Date(r.submittedAt).toLocaleString()}</div>
                  <div className="font-semibold">{r.name} — {r.rating}/5</div>
                  <div className="text-sm text-gray-700 mt-2">{r.review}</div>
                  <div className="text-xs text-gray-500 mt-2">{r.city} • {r.service}</div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button onClick={() => approveReview(r.id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                  <button onClick={() => removeReview(r.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-3">Published Reviews ({publishedReviews.length})</h3>
        {publishedReviews.length === 0 ? (
          <p className="text-sm text-gray-600">No published reviews.</p>
        ) : (
          <div className="grid gap-4">
            {publishedReviews.map((r) => (
              <div key={r.id} className="bg-white p-4 rounded-lg shadow flex justify-between">
                <div>
                  <div className="font-semibold">{r.name} — {r.rating}/5</div>
                  <div className="text-sm text-gray-700 mt-2">{r.review}</div>
                  <div className="text-xs text-gray-500 mt-2">{r.city} • {r.service}</div>
                </div>
                <div>
                  <button onClick={() => removeReview(r.id)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminReviews;
