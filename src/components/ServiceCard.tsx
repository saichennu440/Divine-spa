import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  path: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, image, path }) => {
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden scale-on-hover">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          {icon}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        <button 
        onClick={() => navigate(path)}
        className="group/btn inline-flex items-center space-x-2 text-sage hover:text-sage-dark font-medium transition-colors">
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;