import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (include country code without + or spaces)
    const phoneNumber = '918249470948'; // Example: US number
    const message = encodeURIComponent('Hello! I would like to book an appointment at Divine Spa.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
     <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
    </button>
  );
};

export default WhatsAppFloat;