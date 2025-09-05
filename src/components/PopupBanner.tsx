// src/components/PopupBanner.tsx
import React, { useState } from "react";
import { X } from "lucide-react";

const PopupBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // always open on refresh

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden">
        {/* Close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Banner image */}
        <img
          src="/banner.jpg" // replace with your path
          alt="Promotional Banner"
          className="w-full h-auto object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default PopupBanner;
