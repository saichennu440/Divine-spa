import React, { useEffect, useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BUSINESS_PHONE = '919318629318'; // unchanged

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, initialFormData } = useBooking();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
  });

  const services = [
    'Signature Therapy Treatment',
    'Deep Tissue Massage',
    'Swedish Massage',
    'Hot Stone Massage',
    'Aromatherapy Massage',
    'Facial Treatment',
    'Body Scrub & Polish',
    'Foot Spa & Pedicure'
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  useEffect(() => {
    // When modal is opened, prefill with any initialFormData passed from openBooking()
    if (isBookingOpen && initialFormData) {
      setFormData(prev => ({ ...prev, ...initialFormData }));
      // if you want the user to start from step 1 always:
      setStep(1);
    }
    // If modal opened without initial data, ensure step and form are reset (optional)
    if (isBookingOpen && !initialFormData) {
      setStep(1);
      // keep previous data cleared
    }
  }, [isBookingOpen, initialFormData]);

  const buildWhatsAppMessage = (data: typeof formData) => {
    const readableDate = data.date ? new Date(data.date).toLocaleDateString() : data.date;
    const lines = [
      `New booking request from website`,
      `-------------------------------`,
      `Service: ${data.service || '-'}`,
      `Date: ${readableDate || '-'}`,
      `Time: ${data.time || '-'}`,
      `Name: ${data.firstName || '-'} ${data.lastName || '-'}`,
      `Phone: ${data.phone || '-'}`,
      `Email: ${data.email || '-'}`,
      `Notes: ${data.notes || '-'}`,
      `Consent to contact: ${data.consent ? 'Yes' : 'No'}`,
      `-------------------------------`,
      `Please confirm availability.`
    ];
    return lines.join('\n');
  };

  const sendWhatsApp = async (data: typeof formData) => {
    const message = buildWhatsAppMessage(data);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
        console.log('Booking message copied to clipboard.');
      }
    } catch (err) {
      console.warn('Clipboard copy failed:', err);
    }
    const waUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    if (!formData.consent) {
      alert('Please consent to be contacted via WhatsApp/email about this booking.');
      return;
    }

    console.log('Booking submitted (opening WhatsApp):', formData);
    sendWhatsApp(formData);
    setStep(4);
  };

  const handleClose = () => {
    closeBooking();
    setStep(1);
    setFormData({
      service: '',
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      consent: false
    });
  };

  if (!isBookingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />

        <div className="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif font-semibold text-gray-900">Book Your Appointment</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((stepNumber) => (
                <React.Fragment key={stepNumber}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber ? 'bg-sage text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-0.5 ${step > stepNumber ? 'bg-sage' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-montserrat font-semibold text-gray-900 mb-4">Select Service & Date</h4>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-2" /> Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    >
                      <option value="">Choose a service...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="h-4 w-4 inline mr-2" /> Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="h-4 w-4 inline mr-2" /> Preferred Time
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                      required
                    >
                      <option value="">Choose a time...</option>
                      {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="h-4 w-4 inline mr-2" /> First Name
                      </label>
                      <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Mail className="h-4 w-4 inline mr-2" /> Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Phone className="h-4 w-4 inline mr-2" /> Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent" required />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input id="consent" type="checkbox" checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})} className="mt-1" />
                    <label htmlFor="consent" className="text-sm text-gray-600">I consent to be contacted via WhatsApp and email regarding this booking.</label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h4>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests or Health Considerations</label>
                    <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent" placeholder="Please let us know about any allergies, medical conditions, or special preferences..." />
                  </div>

                  <div className="bg-cream rounded-lg p-4">
                    <h5 className="font-semibold text-gray-900 mb-2">Booking Summary</h5>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><span className="font-medium">Service:</span> {formData.service}</p>
                      <p><span className="font-medium">Date:</span> {formData.date ? new Date(formData.date).toLocaleDateString() : '-'}</p>
                      <p><span className="font-medium">Time:</span> {formData.time}</p>
                      <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                      <p><span className="font-medium">Contact:</span> {formData.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Booking Initiated!</h4>
                  <p className="text-gray-600 mb-6">A WhatsApp message with the booking details has been prepared and opened on your device. Please press <strong>Send</strong> in WhatsApp to notify us. We've also copied the message to the clipboard as a backup.</p>
                  <button onClick={handleClose} className="bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">Close</button>
                </div>
              )}

              {step < 4 && (
                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors">Back</button>
                  )}
                  <button type="submit" className={`bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium transition-colors ${step === 1 ? 'ml-auto' : ''}`}>
                    {step === 3 ? 'Confirm Booking' : 'Next'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
