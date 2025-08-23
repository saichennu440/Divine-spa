import React, { createContext, useContext, useState, ReactNode } from 'react';

export type FormDataShape = {
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
  /**
   * Open booking modal. Pass an optional partial FormDataShape to prefill the form.
   * Example: openBooking({ service: "Swedish Therapy — 90 mins" })
   */
  openBooking: (initial?: FormDataShape | null) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [initialFormData, setInitialFormData] = useState<FormDataShape | null>(null);

  const openBooking = (initial?: FormDataShape | null) => {
    // keep backwards compatibility: openBooking() still works
    if (initial) setInitialFormData(initial);
    else setInitialFormData(null);
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    // clear initial data so next open isn't stale
    setInitialFormData(null);
  };

  return (
    <BookingContext.Provider value={{ isBookingOpen, initialFormData, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

