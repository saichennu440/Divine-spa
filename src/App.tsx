import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import SplashScreen from './components/SplashScreen';
import PopupBanner from "./components/PopupBanner";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
//import Services from './pages/Services';
import Membership from './pages/Membership';
// import Gallery from './pages/Gallery';
// import Blog from './pages/Blog';
// import Franchise from './pages/Franchise';
// import GiftCards from './pages/GiftCards';
//import Therapies from './pages/Therapies';
//import Facials from './pages/Facials';
import FullBodyPolishing from './pages/FullBodyPolishing';
import FootPedicure from './pages/FootPedicure';
import CategoryPage from './pages/CategoryPage';
import AllServices from './pages/AllServices';
import Contact from './pages/Contact';
import WhatsAppFloat from './components/WhatsAppFloat';
import ReviewButton from './components/ReviewButton';
import AdminReviews from './pages/AdminReviews';
import BookingModal from './components/BookingModal';
import { BookingProvider } from './context/BookingContext';
//import { ReviewProvider } from './context/ReviewContext';
import useScrollToTop from './hooks/useScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import './App.css';

const ScrollToTop: React.FC = () => {
  useScrollToTop();
  return null;
};
function App() {
  //   const [showSplash, setShowSplash] = useState(true);
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   // Simulate app loading
  //   const timer = setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  // const handleSplashComplete = () => {
  //   setShowSplash(false);
  // };

  // if (showSplash || !isLoaded) {
  //   return <SplashScreen onComplete={handleSplashComplete} />;
  // }
  return (
    <BookingProvider>
      <Router>
          <PopupBanner />
          <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
             {/*  <Route path="/services" element={<Services />} /> */}
              <Route path="/admin/reviews" element={<AdminReviews />} />
                {/* <Route path="/services/therapies" element={<Therapies />} /> */}
        {/* <Route path="/services/therapies/signature-therapies" element={<Therapies />} />
        <Route path="/services/therapies/classic-therapies" element={<Therapies />} />
        <Route path="/services/therapies/targeted-therapies" element={<Therapies />} />

        <Route path="/services/facials" element={<Facials />} />
        <Route path="/services/facials/classic-facials" element={<Facials />} />
        <Route path="/services/facials/premium-facials" element={<Facials />} /> */}

         {/* <Route path="/services" element={<Services />} /> */}

      {/* category overview */}
      <Route path="/services/:category" element={<CategoryPage />} />

      {/* specific subcategory page, e.g. /services/therapies/signature-therapies */}
      <Route path="/services/:category/:sub" element={<CategoryPage />} />
      <Route path="/services/all" element={<AllServices />} />
        <Route path="/services/full-body-polishing" element={<FullBodyPolishing />} />
        <Route path="/services/foot-pedicure" element={<FootPedicure />} />
              <Route path="/membership" element={<Membership />} />
              {/* <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/giftcards" element={<GiftCards />} /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin/reviews" element={<AdminReviews />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              
            </Routes>
          </main>
          <Footer />
          <BookingModal />
            <WhatsAppFloat />
              <ReviewButton />
        </div>
      </Router>
     
    </BookingProvider>
  );
}

export default App;