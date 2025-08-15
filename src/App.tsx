import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Membership from './pages/Membership';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Franchise from './pages/Franchise';
import Contact from './pages/Contact';
import BookingModal from './components/BookingModal';
import { BookingProvider } from './context/BookingContext';
import useScrollToTop from './hooks/useScrollToTop';
import './App.css';

const ScrollToTop: React.FC = () => {
  useScrollToTop();
  return null;
};
function App() {
  return (
    <BookingProvider>
      <Router>
          <ScrollToTop />
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/franchise" element={<Franchise />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <BookingModal />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;