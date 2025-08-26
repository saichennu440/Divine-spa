import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { openBooking } = useBooking();
  const location = useLocation();
 const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredTop, setHoveredTop] = useState<string | null>(null); // 'therapies' | 'facials' | 'polishing' | 'foot'
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
const [mobileExpanded, setMobileExpanded] = useState<string | null>(null); 

  const menu = [
    { id: 'therapies', label: 'Therapies', slug: '/services/therapies', hasPage: false },
    { id: 'facials', label: 'Facials', slug: '/services/facials', hasPage: false },
    { id: 'polishing', label: 'Fully Body Polishing', slug: '/services/full-body-polishing', hasPage: true },
    { id: 'foot', label: 'Foot Pedicure', slug: '/services/foot-pedicure', hasPage: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const serviceCategories = [
  //   'Signature Massage Therapies',
  //   'Reflexology & Foot Treatments', 
  //   'Therapeutic Body Treatments',
  //   'Head Neck & Shoulder Treatments'
  // ];

//let closeTimeout: ReturnType<typeof setTimeout>;
  const openMenu = () => {
    if (closeTimeout.current) { clearTimeout(closeTimeout.current); closeTimeout.current = null; }
    setIsServicesOpen(true);
  };
  const delayedClose = (delay = 150) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      setIsServicesOpen(false);
      setHoveredTop(null);
    }, delay);
  };

  const handleKeyOnTop = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setHoveredTop(id);
      setIsServicesOpen(true);
    }
  };
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
      {/* Services Dropdown desktop */}
<nav className="hidden lg:block">
  <div
    className="relative inline-block"
    onMouseEnter={() => openMenu()}
    onMouseLeave={() => delayedClose(180)}
  >
    <button
      className={`flex items-center text-md font-montserrat font-semibold hover:text-sage transition-colors ${location.pathname.startsWith('/services') ? 'text-sage' : 'text-gray-700'}`}
      aria-expanded={isServicesOpen}
      aria-controls="services-menu"
      onClick={(e) => { e.preventDefault(); /* top-level label not navigable */ }}
    >
      Services
      <ChevronDown className="ml-1 h-4 w-4" />
    </button>

    {isServicesOpen && (
      <div
        id="services-menu"
        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50"
      >
        <div className="px-1 py-1">
          {menu.map((m) => (
            <div
              key={m.id}
              onMouseEnter={() => { openMenu(); setHoveredTop(m.id); }}
              onMouseLeave={() => { /* keep open while moving inside menu */ }}
              className="group"
            >
              {/* Top-level (linkable or non-link) */}
              {m.hasPage ? (
                <Link
                  to={m.slug}
                  className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === m.slug ? 'text-sage bg-cream' : 'text-gray-700 hover:bg-cream hover:text-sage'
                  }`}
                >
                  {m.label}
                </Link>
              ) : (
                <div
                  role="button"
                  tabIndex={0}
                  onFocus={() => { openMenu(); setHoveredTop(m.id); }}
                  onKeyDown={(e) => handleKeyOnTop(e, m.id)}
                  className={`block px-4 py-3 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    hoveredTop === m.id ? 'text-sage bg-cream' : 'text-gray-700 hover:bg-cream hover:text-sage'
                  }`}
                  aria-pressed={hoveredTop === m.id}
                >
                  {m.label}
                </div>
              )}

              {/* Inline subitems: shown in-place under the hovered category */}
              {hoveredTop === m.id && (
                <div className="pl-6 pr-3 pb-2 pt-1 space-y-1">
                  {m.id === 'therapies' && (
                    <>
                      <Link
                        to="/services/therapies/signature-therapies"
                        onClick={() => { /* keep menu close handled by mouseleave */ }}
                        className="block text-sm px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-sage"
                      >
                        signature therapies
                      </Link>
                      <Link
                        to="/services/therapies/classic-therapies"
                        className="block text-sm px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-sage"
                      >
                        classic therapies
                      </Link>
                      <Link
                        to="/services/therapies/targeted-therapies"
                        className="block text-sm px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-sage"
                      >
                        targeted therapies
                      </Link>
                    </>
                  )}

                  {m.id === 'facials' && (
                    <>
                      <Link
                        to="/services/facials/classic-facials"
                        className="block text-sm px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-sage"
                      >
                        classic facials
                      </Link>
                      <Link
                        to="/services/facials/premium-facials"
                        className="block text-sm px-2 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-sage"
                      >
                        premium facials
                      </Link>
                    </>
                  )}

                  {/* If the category has no subitems (polishing, foot), nothing extra will render here */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</nav>


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
              {/* Services Dropdown */}

              {/* Services Dropdown  mobile menu */}
<div className="relative lg:hidden"> {/* visible on mobile only (hidden on lg and up) */}
  <button
    onClick={() => {
      setIsServicesDropdownOpen((v) => !v);
      // reset mobileExpanded when closing
      if (isServicesDropdownOpen) setMobileExpanded(null);
    }}
    className="w-full text-left block px-3 py-2 text-base font-montserrat font-semibold text-gray-700 hover:text-sage hover:bg-cream rounded-md flex items-center justify-between"
    aria-expanded={isServicesDropdownOpen}
    aria-controls="mobile-services-panel"
  >
    <span>Services</span>
    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
  </button>

  {isServicesDropdownOpen && (
    <div id="mobile-services-panel" className="mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
      {/* Top-level items (accordion-like) */}
      <div className="divide-y divide-gray-100">
        {/* Therapies (non-navigating, expandable) */}
        <div>
          <button
            type="button"
            onClick={() => setMobileExpanded(mobileExpanded === 'therapies' ? null : 'therapies')}
            className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-cream hover:text-sage transition-colors"
            aria-expanded={mobileExpanded === 'therapies'}
            aria-controls="mobile-therapies-list"
          >
            <span className="font-medium text-gray-700">Therapies</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'therapies' ? 'rotate-180 text-sage' : ''}`} />
          </button>

          {mobileExpanded === 'therapies' && (
            <div id="mobile-therapies-list" className="pl-6 pr-4 pb-3 pt-1 text-sm">
              <Link
                to="/services/therapies/signature-therapies"
                onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                className="block py-2 text-gray-700 hover:text-sage hover:bg-gray-50 rounded"
              >
                signature therapies
              </Link>
              <Link
                to="/services/therapies/classic-therapies"
                onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                className="block py-2 text-gray-700 hover:text-sage hover:bg-gray-50 rounded"
              >
                classic therapies
              </Link>
              <Link
                to="/services/therapies/targeted-therapies"
                onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                className="block py-2 text-gray-700 hover:text-sage hover:bg-gray-50 rounded"
              >
                targeted therapies
              </Link>
            </div>
          )}
        </div>

        {/* Facials (non-navigating, expandable) */}
        <div>
          <button
            type="button"
            onClick={() => setMobileExpanded(mobileExpanded === 'facials' ? null : 'facials')}
            className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-cream hover:text-sage transition-colors"
            aria-expanded={mobileExpanded === 'facials'}
            aria-controls="mobile-facials-list"
          >
            <span className="font-medium text-gray-700">Facials</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === 'facials' ? 'rotate-180 text-sage' : ''}`} />
          </button>

          {mobileExpanded === 'facials' && (
            <div id="mobile-facials-list" className="pl-6 pr-4 pb-3 pt-1 text-sm">
              <Link
                to="/services/facials/classic-facials"
                onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                className="block py-2 text-gray-700 hover:text-sage hover:bg-gray-50 rounded"
              >
                classic facials
              </Link>
              <Link
                to="/services/facials/premium-facials"
                onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
                className="block py-2 text-gray-700 hover:text-sage hover:bg-gray-50 rounded"
              >
                premium facials
              </Link>
            </div>
          )}
        </div>

        {/* Fully Body Polishing (navigates directly) */}
        <div>
          <Link
            to="/services/full-body-polishing"
            onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
            className="block px-4 py-3 text-gray-700 hover:text-sage hover:bg-cream transition-colors"
          >
            Fully Body Polishing
          </Link>
        </div>

        {/* Foot Pedicure (navigates directly) */}
        <div>
          <Link
            to="/services/foot-pedicure"
            onClick={() => { setIsServicesDropdownOpen(false); setIsMobileMenuOpen(false); setMobileExpanded(null); }}
            className="block px-4 py-3 text-gray-700 hover:text-sage hover:bg-cream transition-colors"
          >
            Foot Pedicure
          </Link>
        </div>
      </div>
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