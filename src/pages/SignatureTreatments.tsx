import React from 'react';
import { Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';

const SignatureTreatments: React.FC = () => {
    const { openBooking } = useBooking();
  const treatments = [
    { name: 'Signature Therapy', duration: '90 mins', price: '₹5,300', description: 'A harmonious fusion of traditional and contemporary techniques designed for complete relaxation and renewal.' , features: ['Personalized oils','Deep relaxation']},
    { name: 'Signature Therapy', duration: '120 mins', price: '₹6,000', description: 'Extended signature ritual for deep renewal.' , features: ['Extended journey']},
    { name: 'Tandem (Four Hands) Therapy', duration: '90 mins', price: '₹6,000', description: 'Two therapists moving in perfect synchrony for unparalleled serenity.' , features: ['Dual therapists','Harmonized strokes']},
    { name: 'Tandem (Four Hands) Therapy', duration: '60 mins', price: '₹5,300', description: 'Short tandem session for intense relaxation.' , features: ['Quick dual therapy']}
  ];

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full mb-8">
              <Sparkles className="h-10 w-10 text-sage" />
            </div>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-8">
              signature massage therapies
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Indulge in our signature rituals curated for deep relaxation and renewal.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {treatments.map((treatment, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="fade-in-up">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={`https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop`}
                      alt={treatment.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-2xl font-montserrat font-semibold text-sage">
                        {treatment.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-montserrat font-semibold text-gray-900">
                        {treatment.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {treatment.duration}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {treatment.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Treatment Includes:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {treatment.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button 
                    onClick= {() => openBooking()}
                    className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2">
                      <span>Book This Treatment</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-vonique font-light mb-6">
              ready for your therapeutic massage?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Book your signature or tandem session today.
            </p>
            <button 
            onClick= {() => openBooking()}
            className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl">
              Book An Appointment
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default SignatureTreatments;
