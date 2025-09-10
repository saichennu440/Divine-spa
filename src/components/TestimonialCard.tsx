import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  city: string;
  rating: number;
  text: string;
  avatar?: string | null;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, city, rating, text, avatar }) => {
  const [expanded, setExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const textRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 3; // height for 3 lines
      if (textRef.current.scrollHeight > maxHeight) {
        setShowReadMore(true);
      }
    }
  }, [text]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto h-full flex flex-col justify-between max-h-[360px] ">
      {/* Top: Rating + Review */}
      <div>
        <div className="flex items-center mb-4">
          <div className="flex space-x-1 mr-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{rating}/5</span>
        </div>

        {/* Review text */}
        
      <blockquote
  ref={textRef}
  className={`text-gray-700 mb-2 italic transition-all duration-300 ${
    expanded ? 'overflow-y-auto pr-2' : 'line-clamp-3'
  }`}
  style={{
    maxHeight: expanded ? '150px' : undefined // adjust so it fits inside 270px card
  }}
>
  "{text}"
</blockquote>


        {/* Read more / Show less */}
        {showReadMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-green-600 text-sm font-semibold hover:underline focus:outline-none"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Bottom: Avatar + Name */}
      <div className="flex items-center mt-4">
        {avatar ? (
          <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center mr-3 text-sm font-semibold">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{city}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
