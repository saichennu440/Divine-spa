import React from 'react';
import { Clock, Star, ArrowRight, Flower2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const FacialTreatments: React.FC = () => {
  const treatments = [
    { name: 'Therapeutic Head Massage', duration: '60 mins', price: '₹1,200', description: 'Focused massage targeting scalp and facial muscles to relieve tension and headaches.' , features: ['Scalp massage','Tension relief']},
    { name: 'Neck & Shoulder Therapy', duration: '75 mins', price: '₹1,600', description: 'Intensive treatment for neck and shoulder tension from daily stress and desk work.' , features: ['Posture improvement','Pain reduction']},
    { name: 'TMJ & Jaw Therapy', duration: '90 mins', price: '₹1,800', description: 'Specialized treatment for jaw tension and TMJ issues.' , features: ['Jaw mobility','Headache relief']},
    { name: 'Craniosacral Therapy', duration: '90 mins', price: '₹2,000', description: 'Gentle hands-on technique to support nervous system function and relaxation.' , features: ['Nervous system support','Gentle approach']}
  ];

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full mb-8">
              <Flower2 className="h-10 w-10 text-sage" />
            </div>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-8">
              head, Neck & Shoulder Treatments
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Specialized treatments for areas where tension commonly accumulates.
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
                      src="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
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

                    <button className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2">
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

      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-vonique font-light text-gray-900 mb-6">facial Benefits for Every Skin Type</h2>
            <p className="text-lg text-gray-600">Our customized facials address specific skin concerns and types.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-vonique font-light mb-6">reveal Your Natural Radiance</h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">Book your customized facial treatment and discover glowing, healthy skin.</p>
            <button className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl">Book An Appointment</button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default FacialTreatments;
