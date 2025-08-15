import React from 'react';
import { Clock, Star, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Services: React.FC = () => {
  const serviceCategories = [
    {
      category: 'Signature Therapy Treatments',
      description: 'Our exclusive signature treatments crafted to provide the ultimate wellness experience.',
      services: [
        {
          name: 'Divine Harmony Massage',
          duration: '90 minutes',
          price: '$280',
          description: 'A transformative full-body experience combining Swedish, deep tissue, and energy healing techniques.',
          features: ['Hot stone integration', 'Aromatherapy oils', 'Chakra balancing']
        },
        {
          name: 'Sacred Stone Ritual',
          duration: '120 minutes',
          price: '$350',
          description: 'Ancient hot stone therapy enhanced with meditation and sound healing.',
          features: ['Himalayan salt stones', 'Crystal therapy', 'Sound bowl meditation']
        },
        {
          name: 'Blissful Renewal Package',
          duration: '180 minutes',
          price: '$450',
          description: 'Complete wellness journey including massage, facial, and body treatment.',
          features: ['Full body massage', 'Custom facial', 'Body wrap', 'Meditation session']
        }
      ]
    },
    {
      category: 'Foot Spa & Pedicure Treatments',
      description: 'Luxurious foot care treatments in our serene pedicure sanctuary.',
      services: [
        {
          name: 'Divine Pedicure',
          duration: '60 minutes',
          price: '$95',
          description: 'Complete foot care with exfoliation, massage, and premium polish.',
          features: ['Sugar scrub', 'Callus treatment', 'Moisturizing mask']
        },
        {
          name: 'Reflexology Foot Massage',
          duration: '45 minutes',
          price: '$120',
          description: 'Therapeutic foot massage focusing on pressure points for full-body wellness.',
          features: ['Pressure point therapy', 'Essential oils', 'Stress relief']
        },
        {
          name: 'Luxury Spa Pedicure',
          duration: '90 minutes',
          price: '$150',
          description: 'Ultimate pedicure experience with paraffin treatment and extended massage.',
          features: ['Paraffin wax treatment', 'Extended massage', 'Premium polish']
        }
      ]
    },
    {
      category: 'Skin Treatments & Body Polishing',
      description: 'Advanced skincare and body treatments for radiant, healthy skin.',
      services: [
        {
          name: 'Radiance Body Polish',
          duration: '60 minutes',
          price: '$180',
          description: 'Full-body exfoliation and moisturizing treatment for silky smooth skin.',
          features: ['Dead sea salt scrub', 'Hydrating body mask', 'Moisturizing massage']
        },
        {
          name: 'Detox Body Wrap',
          duration: '75 minutes',
          price: '$220',
          description: 'Purifying treatment to eliminate toxins and improve skin texture.',
          features: ['Clay body wrap', 'Lymphatic massage', 'Hydration therapy']
        },
        {
          name: 'Anti-Aging Body Treatment',
          duration: '90 minutes',
          price: '$280',
          description: 'Advanced body treatment targeting signs of aging and skin firmness.',
          features: ['Collagen boost treatment', 'Firming massage', 'Vitamin infusion']
        }
      ]
    },
    {
      category: 'Facial & Clean-Up Treatments',
      description: 'Customized facial treatments for every skin type and concern.',
      services: [
        {
          name: 'Divine Glow Facial',
          duration: '60 minutes',
          price: '$150',
          description: 'Customized facial treatment tailored to your unique skin needs.',
          features: ['Skin analysis', 'Deep cleansing', 'Custom mask', 'LED therapy']
        },
        {
          name: 'HydraFacial MD',
          duration: '45 minutes',
          price: '$200',
          description: 'Medical-grade facial with instant results and zero downtime.',
          features: ['Deep pore extraction', 'Hydration infusion', 'Antioxidant protection']
        },
        {
          name: 'Anti-Aging Facial',
          duration: '90 minutes',
          price: '$250',
          description: 'Advanced anti-aging treatment with professional-grade products.',
          features: ['Microcurrent therapy', 'Collagen mask', 'Eye treatment', 'Neck massage']
        }
      ]
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-8">
              Our Sacred Services
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Discover our comprehensive collection of wellness treatments, each designed to nurture your body, 
              calm your mind, and restore your natural radiance. Every service is performed by our skilled 
              therapists in an atmosphere of pure tranquility.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {serviceCategories.map((category, categoryIndex) => (
            <AnimatedSection key={categoryIndex} className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-vonique font-light text-gray-900 mb-4">
                  {category.category}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {category.services.map((service, serviceIndex) => (
                  <AnimatedSection 
                    key={serviceIndex}
                    delay={serviceIndex * 100}
                    animation="fade-in-up"
                  >
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden scale-on-hover">
                      <div className="p-8">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-montserrat font-semibold text-gray-900">
                            {service.name}
                          </h3>
                          <div className="text-right">
                            <div className="text-2xl font-montserrat font-light text-sage mb-1">
                              {service.price}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {service.duration}
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
                          <ul className="space-y-2">
                            {service.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                                <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2">
                          <span>Book This Service</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Add-On Services */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-vonique font-light text-gray-900 mb-6">
              Enhance Your Experience
            </h2>
            <p className="text-lg text-gray-600">
              Complement any service with our luxurious add-ons.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Aromatherapy Upgrade', price: '+$25', description: 'Premium essential oil blend' },
              { name: 'Hot Stone Addition', price: '+$35', description: 'Heated basalt stones' },
              { name: 'CBD Infusion', price: '+$45', description: 'Therapeutic CBD products' },
              { name: 'Extended Session', price: '+$60', description: 'Additional 30 minutes' }
            ].map((addon, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-lg p-6 text-center shadow hover:shadow-lg transition-shadow">
                  <h3 className="font-montserrat text-lg font-semibold mb-2">{addon.name}</h3>
                  <p className="text-2xl font-light text-sage mb-2">{addon.price}</p>
                  <p className="text-sm text-gray-600">{addon.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-vonique font-light mb-6">
              Ready to Begin Your Wellness Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Book your appointment today and discover why aroma spa is the ultimate destination for wellness and relaxation.
            </p>
            <button className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl">
              Book An Appointment
            </button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Services;