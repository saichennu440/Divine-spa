import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Membership from './pages/Membership';
// import Gallery from './pages/Gallery';
// import Blog from './pages/Blog';
// import Franchise from './pages/Franchise';
// import GiftCards from './pages/GiftCards';
import SignatureTreatments from './pages/SignatureTreatments';
import FootSpa from './pages/FootSpa';
import SkinTreatments from './pages/SkinTreatments';
import FacialTreatments from './pages/FacialTreatments';
import Contact from './pages/Contact';
import WhatsAppFloat from './components/WhatsAppFloat';
import ReviewButton from './components/ReviewButton';
//import AdminReviews from './components/AdminReviews';
import BookingModal from './components/BookingModal';
import { BookingProvider } from './context/BookingContext';
import { ReviewProvider } from './context/ReviewContext';
import useScrollToTop from './hooks/useScrollToTop';
import './App.css';

const ScrollToTop: React.FC = () => {
  useScrollToTop();
  return null;
};
function App() {
  return (
    <BookingProvider>
      <ReviewProvider>
      <Router>
          <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              {/* <Route path="/admin-reviews" element={<AdminReviews />} /> */}
              <Route path="/services/signature-massage-therapies" element={<SignatureTreatments />} />
              <Route path="/services/reflexology-foot-treatments" element={<FootSpa />} />
              <Route path="/services/therapeutic-body-treatments" element={<SkinTreatments />} />
              <Route path="/services/head-neck-shoulder-treatments" element={<FacialTreatments />} />
              <Route path="/membership" element={<Membership />} />
              {/* <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/giftcards" element={<GiftCards />} /> */}
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <BookingModal />
            <WhatsAppFloat />
              <ReviewButton />
        </div>
      </Router>
      </ReviewProvider>
    </BookingProvider>
  );
}

export default App;