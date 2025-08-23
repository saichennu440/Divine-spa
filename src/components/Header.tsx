import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { openBooking } = useBooking();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceCategories = [
    'Signature Massage Therapies',
    'Reflexology & Foot Treatments', 
    'Therapeutic Body Treatments',
    'Head Neck & Shoulder Treatments'
  ];

 let closeTimeout: ReturnType<typeof setTimeout>;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
         
<Link to="/" className="flex-shrink-0 inline-flex items-center">
  <img
    src="/Aroma_Spa_Logo_Web.png"            // <-- put the file name you used in /public here
    alt="Aroma Spa"
    className="h-10 md:h-16 w-auto object-contain"
  />
  <span className="sr-only">Aroma Spa</span>
</Link>


          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-md font-montserrat font-semibold hover:text-sage transition-colors ${
                location.pathname === '/' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className={`text-md font-montserrat font-semibold hover:text-sage transition-colors ${
                location.pathname === '/about' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              About
            </Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {clearTimeout(closeTimeout); setIsServicesDropdownOpen(true);}}
              onMouseLeave={() =>{ closeTimeout = setTimeout(() => setIsServicesDropdownOpen(false), 150); }}
            >
              <Link 
                to="/services"
                className={`flex items-center text-md font-montserrat font-semibold hover:text-sage transition-colors ${
                  location.pathname === '/services' ? 'text-sage' : 'text-gray-700'
                }`}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                  {serviceCategories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/services/${category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/--/g, '-')}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-sage transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/membership" 
              className={`text-md font-montserrat font-semibold hover:text-sage transition-colors ${
                location.pathname === '/membership' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Membership
            </Link>
 {/* <Link 
              to="/giftcards" 
              className={`text-sm font-medium hover:text-sage transition-colors ${
                location.pathname === '/blog' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Gift Cards
            </Link>
              <Link 
              to="/franchise" 
              className={`text-sm font-medium hover:text-sage transition-colors ${
                location.pathname === '/franchise' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Franchise
            </Link>
           <Link 
              to="/gallery" 
              className={`text-sm font-medium hover:text-sage transition-colors ${
                location.pathname === '/blog' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Gallery
            </Link>
            <Link 
              to="/blog" 
              className={`text-sm font-medium hover:text-sage transition-colors ${
                location.pathname === '/blog' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Blog
            </Link> */}
            <Link 
              to="/contact" 
              className={`text-md font-montserrat font-semibold hover:text-sage transition-colors ${
                location.pathname === '/contact' ? 'text-sage' : 'text-gray-700'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Book Appointment CTA */}
          <button
            onClick = {() => openBooking()}
            className="hidden lg:flex items-center space-x-2 bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-full font-montserrat transition-all duration-300 hover:shadow-lg"
          >
            <Calendar className="h-4 w-4" />
            <span>Book An Appointment</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-sage focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-montserrat font-semibold text-gray-700 hover:text-sage hover:bg-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 text-base font-montserrat font-semibold text-gray-700 hover:text-sage hover:bg-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
            <div className="relative">
  <button
    onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
    className="w-full text-left block px-3 py-2 text-base font-montserrat font-semibold text-gray-700 hover:text-sage hover:bg-cream rounded-md"
  >
    Services
    <ChevronDown className="ml-2 inline-block h-4 w-4" />
  </button>

  {isServicesDropdownOpen && (
    <div className="mt-2 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
      {serviceCategories.map((category, index) => (
        <Link
          key={index}
          to="/services"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-cream hover:text-sage transition-colors"
          onClick={() => {
            setIsServicesDropdownOpen(false);
            setIsMobileMenuOpen(false);
          }}
        >
          {category}
        </Link>
      ))}
    </div>
  )}
</div>

              <Link 
                to="/membership" 
                className="block px-3 py-2 text-base font-montserrat font-semibold text-gray-700 hover:text-sage hover:bg-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Membership
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 text-base font-montserrat font-semibold text-gray-700 hover:text-sage hover:bg-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
                {/* <Link 
                to="/gallery" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sage hover:bg-cream rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Gallery
              </Link> */}
              <button
                onClick={() => {
                  openBooking();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 flex items-center justify-center space-x-2 bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-full font-montserrat transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Book An Appointment</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;