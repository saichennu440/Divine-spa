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

  // const locations = [
  //   {
  //     name: 'Manhattan Flagship',
  //     address: '123 Fifth Avenue, New York, NY 10010',
  //     phone: '(212) 555-0123',
  //     email: 'manhattan@aromaspa.com',
  //     hours: 'Mon-Sun: 9:00 AM - 9:00 PM'
  //   },
   
  // ];

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
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-8">
              get in touch
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
                    <h2 className="text-3xl font-montserrat font-semibold text-gray-900 mb-8">
                      send us a message
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
                          <option value="manhattan">Hyderabad</option>
                          
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
                      Thank you for contacting aroma spa. We'll get back to you within 24 hours.
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
                  <h3 className="text-2xl font-montserrat font-semibold mb-6">
                    Let's Connect
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-white/80" />
                      <div>
                        <p className="font-bold text-white">Call Us</p>
                        <p className="text-white/90">9318629318</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-white/80" />
                      <div>
                        <p className="font-bold text-white">Email Us</p>
                        <p className="text-white/90">hello@aromaspa.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-white/80" />
                      <div>
                        <p className="font-bold text-white">Customer Service</p>
                        <p className="text-white/90">Mon-Fri: 8:00 AM - 8:00 PM IST</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-montserrat font-semibold text-gray-900 mb-6">
                    Quick Answers
                  </h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-montserrat font-medium text-gray-900 mb-2">How far in advance should I book?</h4>
                      <p className="text-sm text-gray-600">We recommend booking 1-2 weeks in advance for the best availability.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-montserrat font-medium text-gray-900 mb-2">What's your cancellation policy?</h4>
                      <p className="text-sm text-gray-600">Cancellations must be made 24 hours in advance to avoid charges.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-montserrat font-medium text-gray-900 mb-2">Do you offer gift certificates?</h4>
                      <p className="text-sm text-gray-600">Yes! Gift cards are available in any amount and never expire.</p>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-medium text-gray-900 mb-2">Are gratuities included?</h4>
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
  <section id="spa-locator" className="py-20 bg-cream" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-vonique font-light text-gray-900 mb-6">
              find our sanctuary
            </h2>
            <p className="text-lg text-gray-600">
              Discover aroma spa location.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection className="lg:col-span-2">
  <div className="bg-gray-200 rounded-2xl h-96 overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3805.9206589911087!2d78.30539617097662!3d17.463511180268647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s5th%20Floor%2C%20Above%20Fabindia%20Nallagandla%20Rd%2C%20Opp.Aparna%20sarovar%20Hyderabad%2C%20Telangana%2C%20500046!5e0!3m2!1sen!2sin!4v1755949936772!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</AnimatedSection>


            <AnimatedSection>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-3">5th Floor, Above Fabindia</h3>
                  <p className="text-gray-600 mb-3">Nallagandla Rd, Opp.Aparna sarovar<br />Hyderabad, Telangana, 500046</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Sun: 9:00 AM - 9:00 PM
                  </div>
                  <p className="text-sage font-medium">9318629318</p>
                </div>

                {/* <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-vonique text-xl font-semibold mb-3">Beverly Hills</h3>
                  <p className="text-gray-600 mb-3">456 Rodeo Drive<br />Beverly Hills, CA 90210</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Sun: 8:00 AM - 10:00 PM
                  </div>
                  <p className="text-sage font-medium">(310) 555-0123</p>
                </div> */}

                {/* <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-vonique text-xl font-semibold mb-3">South Beach</h3>
                  <p className="text-gray-600 mb-3">789 Ocean Drive<br />Miami Beach, FL 33139</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Sun: 9:00 AM - 9:00 PM
                  </div>
                  <p className="text-sage font-medium">(305) 555-0123</p>
                </div> */}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

   

      {/* Emergency Contact */}
      <section className="py-12 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h3 className="text-2xl font-montserrat font-semibold mb-4">
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
              <span>9318629318</span>
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Contact;