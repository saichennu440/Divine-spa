// src/components/BookingModal.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import servicesData, { ServiceItem, Variant } from '../data/servicesData';

const BUSINESS_PHONE = '919318629318';

type FormState = {
  service: string;
  serviceDuration?: string;
  servicePrice?: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  consent: boolean;
};

const timeSlots = [
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
];

const CATEGORY_LABELS: Record<string, string> = {
  therapies: 'Therapies',
  facials: 'Facials',
  'full-body-polishing': 'Full Body Polishing',
  'foot-pedicure': 'Foot Pedicure'
};

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking, initialFormData } = useBooking();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>({
    service: '',
    serviceDuration: undefined,
    servicePrice: undefined,
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    consent: false,
  });

  // UI selection state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);

  // categories lookup
  const categories = useMemo(() => servicesData, []);

  // find service item and (optionally) variant index by service name and optional duration
  const findServiceLocation = (serviceName: string, duration?: string) => {
    for (const catKey of Object.keys(categories)) {
      // @ts-ignore
      const subs = categories[catKey] as Record<string, ServiceItem[]>;
      for (const subKey of Object.keys(subs)) {
        const items = subs[subKey] || [];
        for (const item of items) {
          if (item.name === serviceName) {
            // find variant index if duration present
            const variantIndex = duration && item.variants ? item.variants.findIndex(v => v.duration === duration) : -1;
            return { category: catKey, sub: subKey, item, variantIndex };
          }
        }
      }
    }
    return null;
  };

  // Prefill form when modal opens or when initialFormData changes
  useEffect(() => {
    if (isBookingOpen && initialFormData) {
      // merge in any fields passed by openBooking
      setFormData((p) => ({ ...p, ...initialFormData }));

      // Reset step to 1
      setStep(1);

      // preselect service/sub/category if service name provided
      if (initialFormData.service) {
        const loc = findServiceLocation(initialFormData.service as string, (initialFormData as any).serviceDuration);
        if (loc) {
          setSelectedCategory(loc.category);
          setSelectedSub(loc.sub);
          setSelectedServiceName(loc.item.name);

          // if duration provided and variant found, set the price/duration in formData
          if ((initialFormData as any).serviceDuration && loc.variantIndex >= 0) {
            const v = loc.item.variants?.[loc.variantIndex];
            setFormData((p) => ({
              ...p,
              service: loc.item.name,
              serviceDuration: v?.duration ?? (initialFormData as any).serviceDuration,
              servicePrice: v?.price ?? (initialFormData as any).servicePrice,
            }));
          } else {
            // no explicit duration provided — default to first variant if available (and if formData doesn't already have a duration)
            const firstVariant = loc.item.variants?.[0];
            setFormData((p) => ({
              ...p,
              service: loc.item.name,
              serviceDuration: p.serviceDuration ?? firstVariant?.duration,
              servicePrice: p.servicePrice ?? firstVariant?.price,
            }));
          }
        } else {
          // service name didn't match data: still set service name in formData so user sees it
          setFormData((p) => ({ ...p, service: initialFormData.service as string }));
        }
      }
    }

    if (isBookingOpen && !initialFormData) {
      setStep(1);
      // don't auto-select anything
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBookingOpen, initialFormData]);

  // When user chooses a service (and optionally a variant)
  const handleSelectService = (service: ServiceItem, subKey: string, catKey: string, variant?: Variant) => {
    setSelectedCategory(catKey);
    setSelectedSub(subKey);
    setSelectedServiceName(service.name);

    setFormData((p) => ({
      ...p,
      service: service.name,
      serviceDuration: variant?.duration ?? service.variants?.[0]?.duration,
      servicePrice: variant?.price ?? service.variants?.[0]?.price,
    }));
  };

  // Build WhatsApp message including duration & price (prefers explicit fields in formData)
  const buildWhatsAppMessage = (data: typeof formData) => {
    const readableDate = data.date ? new Date(data.date).toLocaleDateString() : data.date;

    // prefer explicit fields (passed via initialFormData or set by user)
    const duration = data.serviceDuration ?? (() => {
      const svcLoc = data.service ? findServiceLocation(data.service) : null;
      return svcLoc?.item?.variants?.[0]?.duration ? `${svcLoc.item.variants![0].duration} mins` : '-';
    })();

    const price = data.servicePrice ?? (() => {
      const svcLoc = data.service ? findServiceLocation(data.service) : null;
      return svcLoc?.item?.variants?.[0]?.price ?? '-';
    })();

    const durationText = typeof duration === 'string' && duration.match(/^\d+$/) ? `${duration} mins` : duration;

    const lines = [
      `New booking request from website`,
      `-------------------------------`,
      `Service: ${data.service || '-'}`,
      `Duration: ${durationText || '-'}`,
      `Price: ${price || '-'}`,
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
    sendWhatsApp(formData);
    setStep(4);
  };

  const handleClose = () => {
    closeBooking();
    setStep(1);
    setFormData({
      service: '',
      serviceDuration: undefined,
      servicePrice: undefined,
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      consent: false,
    });
    setSelectedCategory(null);
    setSelectedSub(null);
    setSelectedServiceName(null);
  };

  if (!isBookingOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={handleClose} />

        <div className="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-montserrat font-semibold text-gray-900">book your appointment</h3>
              <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((n) => (
                <React.Fragment key={n}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= n ? 'bg-sage text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {step > n ? <Check className="h-4 w-4" /> : n}
                  </div>
                  {n < 3 && <div className={`w-12 h-0.5 ${step > n ? 'bg-sage' : 'bg-gray-200'}`} />}
                </React.Fragment>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-montserrat font-semibold text-gray-900 mb-2">Choose Service</h4>
                  <p className="text-sm text-gray-600 mb-4">Start by selecting a category, then pick a subcategory or choose a service card.</p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column: categories */}
                    <div className="col-span-1">
                      <div className="space-y-2 sticky top-6">
                        {Object.keys(categories).map((catKey) => (
                          <button
                            key={catKey}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(catKey);
                              setSelectedSub(null);
                              setSelectedServiceName(null);
                              setFormData(prev => ({ ...prev, service: '', serviceDuration: undefined, servicePrice: undefined }));
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${selectedCategory === catKey ? 'bg-sage text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                          >
                            {CATEGORY_LABELS[catKey] ?? catKey}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Middle column: subcategories (if any) */}
                    <div className="col-span-1 lg:col-span-1">
                      <div className="mb-3">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Subcategories</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedCategory ? (
                            // @ts-ignore
                            Object.keys(categories[selectedCategory]).map((subKey: string) => (
                              <button
                                key={subKey}
                                type="button"
                                onClick={() => {
                                  setSelectedSub(subKey);
                                  // reset selection within sub
                                  setSelectedServiceName(null);
                                  setFormData(prev => ({ ...prev, service: '', serviceDuration: undefined, servicePrice: undefined }));
                                }}
                                className={`px-3 py-2 rounded-full text-sm border ${selectedSub === subKey ? 'bg-sage text-white border-sage' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                              >
                                {subKey.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join(' ')}
                              </button>
                            ))
                          ) : (
                            <div className="text-sm text-gray-500">Choose a category to view subcategories.</div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Quick select</h5>
                        <div className="text-sm text-gray-600">
                          {selectedServiceName ? (
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden">
                                {/* show image of currently selected service */}
                                <img src={(() => {
                                  if (!selectedCategory || !selectedSub || !selectedServiceName) return '/images/default-spa.jpg';
                                  // @ts-ignore
                                  const found = categories[selectedCategory]?.[selectedSub]?.find((s: ServiceItem) => s.name === selectedServiceName);
                                  return found?.image ?? '/images/default-spa.jpg';
                                })()} alt={selectedServiceName} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{selectedServiceName}</div>
                                <div className="text-xs text-gray-500">{formData.date ? new Date(formData.date).toLocaleDateString() : 'No date'}</div>
                                <div className="text-xs text-gray-500">{formData.serviceDuration ? `${formData.serviceDuration} mins • ${formData.servicePrice ?? ''}` : ''}</div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">No service selected yet. Tap a card to choose.</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right column: service cards */}
                    <div className="col-span-1 lg:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCategory && selectedSub ? (
                          // @ts-ignore
                          (categories[selectedCategory][selectedSub] || []).map((svc: ServiceItem, idx: number) => {
                            const variants = svc.variants ?? [];
                            // Determine which variant to show on the badge:
                            // - if this service is currently selected in the formData, show the selected duration/price
                            // - otherwise show the first variant
                            const isThisServiceSelected = selectedServiceName === svc.name;
                            const badgePrice = isThisServiceSelected ? (formData.servicePrice ?? variants[0]?.price ?? '—') : (variants[0]?.price ?? '—');
                            const badgeDuration = isThisServiceSelected ? (formData.serviceDuration ?? variants[0]?.duration ?? '') : (variants[0]?.duration ?? '');

                            const isSelected = selectedServiceName === svc.name;

                            return (
                              <div key={svc.name + idx} className={`rounded-2xl overflow-hidden shadow-sm transform transition ${isSelected ? 'ring-2 ring-sage bg-sage/10' : 'bg-white'}`}>
                                <div className="relative h-40 w-full">
                                  <img src={svc.image ?? '/images/default-spa.jpg'} alt={svc.name} className="w-full h-full object-cover" />
                                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                                    <span className="text-sm font-semibold text-sage">{badgePrice}</span>
                                  </div>
                                </div>

                                <div className="p-4">
                                  <div className="flex justify-between items-start">
                                    <h4 className="text-md font-semibold text-gray-900">{svc.name}</h4>
                                    <div className="text-xs text-gray-500 flex items-center">
                                      <Clock className="h-4 w-4 mr-1" /> {badgeDuration ? `${badgeDuration} mins` : '—'}
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">{svc.description}</p>

                                  {/* Variant pills */}
                                  {variants.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                      {variants.map((v, vidx) => {
                                        const pillSelected = isSelected && formData.serviceDuration === v.duration;
                                        return (
                                          <button
                                            key={`${svc.name}-var-${v.duration}-${vidx}`}
                                            type="button"
                                            onClick={() => handleSelectService(svc, selectedSub!, selectedCategory!, v)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${pillSelected ? 'bg-sage text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                          >
                                            {v.duration} mins — {v.price}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Select card as whole (selects default variant if user clicks the card body) */}
                                  <div className="mt-4">
                                    <button
                                      type="button"
                                      onClick={() => handleSelectService(svc, selectedSub!, selectedCategory!)}
                                      className="w-full bg-sage hover:bg-sage-dark text-white py-2 px-4 rounded-full font-medium transition-colors"
                                    >
                                      {isSelected ? 'Selected' : 'Select Service'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          // placeholder when no sub selected
                          <div className="col-span-1 lg:col-span-2 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-white/30 p-8">
                            <div className="text-center">
                              <div className="mb-2 text-sm font-medium text-gray-700">No services displayed yet</div>
                              <div className="text-sm text-gray-500">Please select a category on the left and then choose a subcategory to view services.</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date & Time selectors below the service picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <p><span className="font-medium">Duration:</span> {formData.serviceDuration ? `${formData.serviceDuration} mins` : '-'}</p>
                      <p><span className="font-medium">Price:</span> {formData.servicePrice ?? '-'}</p>
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
