// src/components/PlanModal.tsx
import React, { useEffect, useState } from 'react';
import { X, Calendar, Phone, User, Check } from 'lucide-react';

export type PlanInfo = {
  name: string;
  price?: number | string;
  validityMonths?: number;
  hours?: number;
};

const BUSINESS_PHONE = '919318629318'; // <-- REPLACE with your business number (country code+number, no + or spaces)

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan?: PlanInfo | null;
}

const PlanModal: React.FC<PlanModalProps> = ({ isOpen, onClose, plan = null }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    preferredDate: '',
    notes: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setForm({ name: '', phone: '', preferredDate: '', notes: '' });
      setSending(false);
      setSent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buildMessage = () => {
    const lines = [
      `New membership enquiry from website`,
      `-----------------------------`,
      `Plan: ${plan?.name ?? 'Membership Enquiry'}`,
      plan?.price ? `Price: ${typeof plan.price === 'number' ? `₹${plan.price}` : plan.price}` : '',
      plan?.hours ? `Hours: ${plan.hours}` : '',
      plan?.validityMonths ? `Validity (months): ${plan.validityMonths}` : '',
      `-----------------------------`,
      `Preferred Start Date: ${form.preferredDate || '-'}`,
      `Name: ${form.name || '-'}`,
      `Phone: ${form.phone || '-'}`,
      `Notes: ${form.notes || '-'}`,
      `-----------------------------`,
      `Please confirm next steps and availability.`
    ];
    return lines.filter(Boolean).join('\n');
  };

  const sendWhatsApp = async () => {
    // simple validation
    if (!form.name.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!form.phone.trim()) {
      alert('Please enter a phone number.');
      return;
    }

    setSending(true);

    const message = buildMessage();

    // copy to clipboard for backup (best-effort)
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(message);
      }
    } catch (err) {
      // ignore clipboard errors
      console.warn('Clipboard write failed', err);
    }

    // open WhatsApp click-to-chat
    const waUrl = `https://wa.me/${BUSINESS_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSent(true);
    setSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-montserrat font-semibold text-gray-900">
                {plan ? `Start: ${plan.name}` : 'Membership Inquiry'}
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            {!sent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendWhatsApp();
                }}
                className="space-y-4"
              >
                {/* Plan summary */}
                {plan && (
                  <div className="bg-cream rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{plan.name}</div>
                        <div className="text-sm text-gray-600">
                          {plan.hours ? `${plan.hours} hours • ` : ''}
                          {plan.validityMonths ? `Valid for ${plan.validityMonths} months` : ''}
                        </div>
                      </div>
                      <div className="text-sage font-montserrat text-lg">
                        {plan.price ? (typeof plan.price === 'number' ? `₹${plan.price}` : plan.price) : '-'}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <User className="h-4 w-4 inline mr-2" /> Full name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="h-4 w-4 inline mr-2" /> Mobile (with country code)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g., 919999999999"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Calendar className="h-4 w-4 inline mr-2" /> Preferred Start Date
                  </label>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    placeholder="Any special requests or preferences..."
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                    disabled={sending}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
                    disabled={sending}
                  >
                    {sending ? 'Opening WhatsApp…' : 'Confirm & Open WhatsApp'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Prepared</h4>
                <p className="text-gray-600 mb-4">WhatsApp was opened with your membership request. Please press <strong>Send</strong> in WhatsApp to notify us.</p>
                <div className="flex justify-center gap-4">
                  <button onClick={onClose} className="bg-sage hover:bg-sage-dark text-white px-6 py-2 rounded-lg">Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;
