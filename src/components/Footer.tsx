import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, SquareParking  , Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
    
            <h3 className="text-2xl font-vonique font-semibold mb-6">
                      {/* <img
    src="/Aroma_Spa_Footer.jpg"            // <-- put the file name you used in /public here
    alt="Aroma Spa"
    className="h-10 md:h-16 w-auto object-contain"
  /> */}
              aroma spa</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Inspired by the aroma. Created for You. Experience transformative wellness through 
              mindful therapies and luxurious self-care.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-sage" />
                <span className="text-gray-300" >5th Floor, Above Fabindia <br></br>Nallagandla Rd, Opp.Aparna sarovar<br></br>Hyderabad, Telangana, 500046</span>
                

              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-sage" />
                <span className="text-gray-300">9318629318</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 mt-1 text-sage flex-shrink-0" />
                <span className="text-gray-300">
                  Multiple locations across<br />
                  Hyderabad, Telanaga & Ap
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-vonique text-2xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-sage transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="/#about" className="text-gray-300 hover:text-sage transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sage transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-gray-300 hover:text-sage transition-colors">
                  Membership
                </Link>
              </li>
             
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sage transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-vonique text-2xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sage transition-colors">
                  Signature Treatments
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sage transition-colors">
                  Massage Therapy
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sage transition-colors">
                  Facial Treatments
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sage transition-colors">
                  Body Treatments
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-sage transition-colors">
                  Foot Spa & Pedicure
                </Link>
              </li>
             
            </ul>
          </div>

          {/* Business */}
          {/* <div>
            <h4 className="font-vonique text-2xl font-semibold mb-6">Business</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/franchise" className="text-gray-300 hover:text-sage transition-colors">
                  Franchise Opportunities
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-sage transition-colors">
                  Wellness Blog
                </Link>
              </li>
              <li>
                <a href="/#spa-locator" className="text-gray-300 hover:text-sage transition-colors">
                  Find a Location
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sage transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sage transition-colors">
                  Press & Media
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sage transition-colors">
                  Corporate Wellness
                </Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Social & Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-6 lg:mb-0">
              <span className="text-gray-300">Follow Us:</span>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61579315186801" className="text-gray-400 hover:text-sage transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/aromaspaofficial?igsh=c3RnbGhxdnVmMjBq" className="text-gray-400 hover:text-sage transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-sage transition-colors">
                  <SquareParking  className="h-5 w-5" />
                </a>
                
              </div>
            </div>

            {/* <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <span className="text-gray-300 text-sm">Subscribe to our newsletter:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-full focus:outline-none focus:ring-2 focus:ring-sage"
                />
                <button className="bg-sage hover:bg-sage-dark px-6 py-2 rounded-r-full transition-colors">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex flex-wrap justify-center lg:justify-start space-x-6 mb-4 lg:mb-0">
              <Link to="/contact" className="hover:text-sage transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-sage transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/contact" className="hover:text-sage transition-colors">
                Cookie Policy
              </Link>
              <Link to="/contact" className="hover:text-sage transition-colors">
                Accessibility
              </Link>
            </div>
            <div className="text-center lg:text-right">
              <p className="flex items-center justify-center lg:justify-end text-sm text-gray-400">
                © 2025 aroma spa. All rights reserved. Made with 
                <Heart className="h-4 w-4 mx-1 text-red-500" />
                by Scalers
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;