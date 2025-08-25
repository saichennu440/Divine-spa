import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  city: string;
  rating: number;
  text: string;
  avatar?: string | null;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ name, city, rating, text, avatar }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md mx-auto scale-on-hover">
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
      
      <blockquote className="text-gray-700 mb-4 italic">
        "{text}"
      </blockquote>
      
      <div className="flex items-center">
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