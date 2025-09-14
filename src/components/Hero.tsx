import React, { useEffect, useState } from 'react';
import { Calendar, Eye, Gift } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { openBooking } = useBooking();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Background with Parallax */}
      <div className="absolute inset-0">
        <div 
          className="parallax-zoom w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-montserrat font-light text-white mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Inspired by the Aroma.
            <br />
            <span className="text-cream">created for you.</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Experience transformative wellness through mindful therapies and luxurious self-care in our serene sanctuary.
          </p>

          <button
            onClick = {() => openBooking()}
            className={`inline-flex items-center space-x-3 bg-sage hover:bg-sage-dark text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-2xl hover:scale-105 mb-12 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <Calendar className="h-5 w-5" />
            <span>Book an Appointment</span>
          </button>

          {/* Secondary CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Link
              to="/services/therapies"
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              <Eye className="h-4 w-4" />
              <span>View Services</span>
            </Link>
            
            <Link
          
              to="/membership"
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              <Gift className="h-4 w-4" />
              <span>Membership</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;