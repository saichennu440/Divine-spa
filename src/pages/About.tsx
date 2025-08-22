import React, { useEffect, useState ,} from 'react';
import { Heart, Users, Award, Sparkles, Clock, MapPin } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
      const { openBooking } = useBooking();
      const [isVisible, setIsVisible] = useState(false);
    
      useEffect(() => {
        setIsVisible(true);
      }, []);
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Mindful Wellness',
      description: 'We believe in the transformative power of mindful therapies that nurture your body, mind, and spirit.'
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: 'Divine Excellence',
      description: 'Every treatment is crafted with divine attention to detail, ensuring an exceptional experience.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Personal Care',
      description: 'Our skilled therapists provide personalized treatments tailored to your unique wellness needs.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Premium Quality',
      description: 'We use only the finest products and techniques to deliver results that exceed expectations.'
    }
  ];

  const team = [
    {
      name: 'Sarah Williams',
      role: 'Spa Director & Master Therapist',
      experience: '15+ years',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['Signature Treatments', 'Aromatherapy', 'Wellness Coaching']
    },
    {
      name: 'Maria Rodriguez',
      role: 'Senior Massage Therapist',
      experience: '12+ years',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['Deep Tissue', 'Hot Stone', 'Prenatal Massage']
    },
    {
      name: 'Emily Chen',
      role: 'Lead Esthetician',
      experience: '10+ years',
      image: 'https://images.pexels.com/photos/3785081/pexels-photo-3785081.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['Anti-Aging Facials', 'HydraFacial', 'Skin Analysis']
    },
    {
      name: 'James Thompson',
      role: 'Wellness Consultant',
      experience: '8+ years',
      image: 'https://images.pexels.com/photos/3785083/pexels-photo-3785083.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      specialties: ['Reflexology', 'Meditation', 'Holistic Wellness']
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-8">
              About Divine Spa
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Inspired by the Divine. Created for You. We are more than just a spa – we are a sanctuary 
              where ancient wisdom meets modern wellness, creating transformative experiences that nurture 
              your complete well-being.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2 className="text-4xl md:text-5xl font-vonique font-light text-gray-900 mb-8">
              Divine means <em>God</em> — and that essence flows through everything we do.
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              At Divine Spa, we believe in the transformative power of mindful therapies and conscious self-care. 
              Our sanctuary provides a space where you can disconnect from the world's chaos and reconnect with 
              your inner peace. Every treatment is designed to restore your natural balance, awaken your inner 
              radiance, and nurture your body, mind, and spirit.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded with the vision of creating a holistic wellness destination, we combine time-honored 
              healing traditions with innovative spa technologies to offer you an unparalleled experience 
              in relaxation and rejuvenation.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do at Divine Spa.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scale-on-hover">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-6">
                    <div className="text-sage">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fade-in-left">
              <div>
                <h2 className="text-4xl font-vonique font-light text-gray-900 mb-6">
                  Our Journey
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Divine Spa was born from a simple yet profound belief: that everyone deserves 
                    access to transformative wellness experiences that honor both body and spirit. 
                    Our founder, inspired by travels through ancient healing traditions across the 
                    world, envisioned a space where these timeless practices could flourish in a 
                    modern setting.
                  </p>
                  <p>
                    Since opening our first location in 2018, we have grown into a trusted wellness 
                    destination, serving thousands of guests who seek more than just relaxation – 
                    they seek transformation. Our commitment to excellence has earned us recognition 
                    as one of the premier spa destinations in the region.
                  </p>
                  <p>
                    Today, with multiple locations and a team of skilled wellness professionals, 
                    we continue to evolve while staying true to our core mission: providing sacred 
                    space for healing, renewal, and spiritual connection.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-in-right">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                  alt="Divine Spa interior"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-vonique font-light text-gray-900 mb-6">
              Meet Our Wellness Experts
            </h2>
            <p className="text-lg text-gray-600">
              Our skilled team of therapists and wellness professionals are dedicated to your transformation.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden scale-on-hover">
                  <div className="relative h-64">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                        <div className="flex items-center text-xs text-sage">
                          <Clock className="h-3 w-3 mr-1" />
                          {member.experience}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-montserrat text-lg font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sage font-medium mb-3">
                      {member.role}
                    </p>
                    <div className="space-y-1">
                      {member.specialties.map((specialty, specialtyIndex) => (
                        <span
                          key={specialtyIndex}
                          className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-vonique font-light text-gray-900 mb-6">
              Awards & Recognition
            </h2>
            <p className="text-lg text-gray-600">
              We're honored to be recognized for our commitment to wellness excellence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                year: '2024',
                award: 'Best Luxury Spa Experience',
                organization: 'Wellness Industry Awards'
              },
              {
                year: '2023',
                award: 'Excellence in Customer Service',
                organization: 'Regional Business Awards'
              },
              {
                year: '2022',
                award: 'Top Wellness Destination',
                organization: 'Travel & Leisure Magazine'
              }
            ].map((award, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="text-center bg-white rounded-xl p-8 shadow-lg">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-4">
                    <Award className="h-8 w-8 text-sage" />
                  </div>
                  <div className="text-3xl font-serif font-light text-sage mb-2">
                    {award.year}
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-gray-900 mb-2">
                    {award.award}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {award.organization}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-sage text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-vonique font-light mb-6">
              Our Locations
            </h2>
            <p className="text-xl text-white/90">
              Visit us at any of our luxurious spa locations across the country.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Manhattan Flagship',
                address: '123 Fifth Avenue, New York, NY 10010',
                phone: '(212) 555-0123'
              },
              {
                name: 'Beverly Hills',
                address: '456 Rodeo Drive, Beverly Hills, CA 90210',
                phone: '(310) 555-0123'
              },
              {
                name: 'South Beach',
                address: '789 Ocean Drive, Miami Beach, FL 33139',
                phone: '(305) 555-0123'
              }
            ].map((location, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="h-5 w-5 text-white mr-2" />
                    <h3 className="font-montserrat text-lg font-semibold">
                      {location.name}
                    </h3>
                  </div>
                  <p className="text-white/90 mb-2">
                    {location.address}
                  </p>
                  <p className="text-white/80">
                    {location.phone}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-vonique font-light text-gray-900 mb-6">
              Begin Your Wellness Journey
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the Divine Spa difference and discover what it means to be truly cared for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                       <button 
                       onClick= {() => openBooking()}
                       className="bg-sage hover:bg-sage-dark text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg">
                Book An Appointment
              </button>
              <Link to="/Contact">
              <button 
              className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
                Contact Us
              </button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;