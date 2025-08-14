import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const locations = [
    {
      name: 'Manhattan Flagship',
      address: '123 Fifth Avenue, New York, NY 10010',
      phone: '(212) 555-0123',
      email: 'manhattan@divinespa.com',
      hours: 'Mon-Sun: 9:00 AM - 9:00 PM'
    },
    {
      name: 'Beverly Hills',
      address: '456 Rodeo Drive, Beverly Hills, CA 90210',
      phone: '(310) 555-0123',
      email: 'beverlyhills@divinespa.com',
      hours: 'Mon-Sun: 8:00 AM - 10:00 PM'
    },
    {
      name: 'South Beach',
      address: '789 Ocean Drive, Miami Beach, FL 33139',
      phone: '(305) 555-0123',
      email: 'southbeach@divinespa.com',
      hours: 'Mon-Sun: 9:00 AM - 9:00 PM'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-8">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              We're here to help you begin your wellness journey. Reach out to us for appointments, 
              questions about our services, or to learn more about joining our wellness community.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <AnimatedSection animation="fade-in-left">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {!isSubmitted ? (
                  <>
                    <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-8">
                      Send us a Message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="First Name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                          required
                        />
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Last Name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Email Address"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                          required
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Phone Number"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <select
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Preferred Location</option>
                          <option value="manhattan">Manhattan Flagship</option>
                          <option value="beverly-hills">Beverly Hills</option>
                          <option value="south-beach">South Beach</option>
                          <option value="other">Other/General Inquiry</option>
                        </select>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                          required
                        >
                          <option value="">Subject</option>
                          <option value="appointment">Book an Appointment</option>
                          <option value="services">Services Information</option>
                          <option value="membership">Membership Inquiry</option>
                          <option value="gift-card">Gift Cards</option>
                          <option value="franchise">Franchise Opportunity</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent transition-colors"
                        required
                      ></textarea>

                      <button
                        type="submit"
                        className="w-full bg-sage hover:bg-sage-dark text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for contacting Divine Spa. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          location: '',
                          subject: '',
                          message: ''
                        });
                      }}
                      className="bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Information */}
            <AnimatedSection animation="fade-in-right">
              <div className="space-y-8">
                <div className="bg-sage text-white rounded-2xl p-8">
                  <h3 className="text-2xl font-serif font-semibold mb-6">
                    Let's Connect
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-white/80" />
                      <div>
                        <p className="font-medium">Call Us</p>
                        <p className="text-white/90">1-800-DIVINE-SPA</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-white/80" />
                      <div>
                        <p className="font-medium">Email Us</p>
                        <p className="text-white/90">hello@divinespa.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-white/80" />
                      <div>
                        <p className="font-medium">Customer Service</p>
                        <p className="text-white/90">Mon-Fri: 8:00 AM - 8:00 PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                    Quick Answers
                  </h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">How far in advance should I book?</h4>
                      <p className="text-sm text-gray-600">We recommend booking 1-2 weeks in advance for the best availability.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">What's your cancellation policy?</h4>
                      <p className="text-sm text-gray-600">Cancellations must be made 24 hours in advance to avoid charges.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Do you offer gift certificates?</h4>
                      <p className="text-sm text-gray-600">Yes! Gift cards are available in any amount and never expire.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Are gratuities included?</h4>
                      <p className="text-sm text-gray-600">Gratuities are not included but are always appreciated.</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
              Our Locations
            </h2>
            <p className="text-lg text-gray-600">
              Visit us at any of our luxurious spa locations.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 scale-on-hover">
                  <h3 className="font-serif text-xl font-semibold text-gray-900 mb-4">
                    {location.name}
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 mt-0.5 text-sage flex-shrink-0" />
                      <span>{location.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-sage" />
                      <span>{location.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-sage" />
                      <span>{location.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-sage" />
                      <span>{location.hours}</span>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    <button className="flex-1 bg-sage hover:bg-sage-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Book Now
                    </button>
                    <button className="border border-sage text-sage hover:bg-sage hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-300">
                      Directions
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Interactive Map Integration</p>
                <p className="text-gray-400 text-sm">Google Maps will be embedded here</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h3 className="text-2xl font-serif font-semibold mb-4">
              Need Immediate Assistance?
            </h3>
            <p className="text-white/90 mb-6">
              For urgent appointments or same-day booking requests, call our priority line.
            </p>
            <a 
              href="tel:1-800-URGENT-SPA"
              className="inline-flex items-center space-x-2 bg-white text-sage hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg"
            >
              <Phone className="h-5 w-5" />
              <span>1-800-URGENT-SPA</span>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;