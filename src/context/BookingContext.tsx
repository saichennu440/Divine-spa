import React, { createContext, useContext, useState } from 'react';

type FormDataShape = {
  service?: string;
  date?: string;
  time?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  consent?: boolean;
};

type BookingContextType = {
  isBookingOpen: boolean;
  initialFormData: FormDataShape | null;
  openBooking: (initial?: FormDataShape) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<FormDataShape | null>(null);

  const openBooking = (initial?: FormDataShape) => {
    setInitialFormData(initial ?? null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    // keep initialFormData for a short while? we clear it immediately to avoid stale state
    setInitialFormData(null);
  };

  return (
    <BookingContext.Provider value={{ isBookingOpen, initialFormData, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
};
