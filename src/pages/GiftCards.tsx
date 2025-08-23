import React, { useState } from 'react';
import { Gift, Heart, Star, Calendar, Mail, Phone, CreditCard, Check, Download } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const GiftCards: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState('classic');
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [isPersonalizing, setIsPersonalizing] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const [giftCardData, setGiftCardData] = useState({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    senderEmail: '',
    message: '',
    deliveryDate: '',
    recipientPhone: ''
  });

  const predefinedAmounts = [
    { value: '50', label: '$50', popular: false },
    { value: '100', label: '$100', popular: true },
    { value: '150', label: '$150', popular: false },
    { value: '200', label: '$200', popular: false },
    { value: '300', label: '$300', popular: false },
    { value: '500', label: '$500', popular: false }
  ];

  const giftCardDesigns = [
    {
      id: 'classic',
      name: 'Classic Elegance',
      image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Timeless design with spa imagery'
    },
    {
      id: 'modern',
      name: 'Modern Zen',
      image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Clean, minimalist aesthetic'
    },
    {
      id: 'luxury',
      name: 'Luxury Gold',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Premium gold accents'
    },
    {
      id: 'nature',
      name: 'Natural Harmony',
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      description: 'Nature-inspired wellness theme'
    }
  ];

  const packageSuggestions = [
    {
      name: 'Relaxation Escape',
      value: '150',
      services: ['60-min Massage', 'Express Facial'],
      savings: 'Save $30'
    },
    {
      name: 'Wellness Journey',
      value: '280',
      services: ['90-min Signature Treatment', 'Body Polish', 'Foot Spa'],
      savings: 'Save $50'
    },
    {
      name: 'Ultimate Indulgence',
      value: '450',
      services: ['Full Day Spa Package', 'Lunch Included', 'Take-home Products'],
      savings: 'Save $100'
    }
  ];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle gift card purchase
    console.log('Gift card purchase:', {
      amount: selectedAmount || customAmount,
      design: selectedDesign,
      delivery: deliveryMethod,
      ...giftCardData
    });
    setIsPurchased(true);
  };

  const getSelectedAmount = () => {
    return selectedAmount || customAmount;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full mb-8">
              <Gift className="h-10 w-10 text-sage" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-8">
              aroma Gift Cards
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Share the gift of wellness and transformation. Our beautifully designed gift cards 
              offer the perfect way to treat someone special to a luxurious spa experience they'll never forget.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {!isPurchased ? (
        <>
          {/* Gift Card Builder */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Gift Card Preview */}
                <AnimatedSection animation="fade-in-left">
                  <div className="sticky top-32">
                    <h2 className="text-3xl font-serif font-light text-gray-900 mb-8">
                      Gift Card Preview
                    </h2>
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                      <div className="relative h-64">
                        <img
                          src={giftCardDesigns.find(d => d.id === selectedDesign)?.image}
                          alt="Gift card design"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <h3 className="text-2xl font-serif font-light mb-2">aroma spa</h3>
                          <p className="text-sm opacity-90">Gift Card</p>
                        </div>
                        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                          <span className="text-2xl font-serif font-semibold text-gray-900">
                            ${getSelectedAmount() || '100'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-center">
                          <p className="text-gray-600 mb-2">
                            {giftCardData.recipientName || 'Recipient Name'}
                          </p>
                          <p className="text-sm text-gray-500 italic">
                            "{giftCardData.message || 'Wishing you moments of peace and rejuvenation.'}"
                          </p>
                          <p className="text-xs text-gray-400 mt-4">
                            From: {giftCardData.senderName || 'Your Name'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                {/* Gift Card Form */}
                <AnimatedSection animation="fade-in-right">
                  <form onSubmit={handlePurchase} className="space-y-8">
                    {/* Amount Selection */}
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                        Choose Amount
                      </h3>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {predefinedAmounts.map((amount) => (
                          <button
                            key={amount.value}
                            type="button"
                            onClick={() => {
                              setSelectedAmount(amount.value);
                              setCustomAmount('');
                            }}
                            className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                              selectedAmount === amount.value
                                ? 'border-sage bg-sage/10'
                                : 'border-gray-200 hover:border-sage/50'
                            }`}
                          >
                            {amount.popular && (
                              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-sage text-white text-xs px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                            <span className="text-lg font-semibold">{amount.label}</span>
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600">Custom Amount:</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount('');
                            }}
                            placeholder="Enter amount"
                            min="25"
                            max="1000"
                            className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Package Suggestions */}
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                        Suggested Packages
                      </h3>
                      <div className="space-y-4">
                        {packageSuggestions.map((pkg, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4 hover:border-sage/50 transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedAmount(pkg.value);
                              setCustomAmount('');
                            }}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                              <div className="text-right">
                                <span className="text-lg font-semibold text-sage">${pkg.value}</span>
                                <span className="block text-xs text-green-600">{pkg.savings}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {pkg.services.map((service, serviceIndex) => (
                                <span
                                  key={serviceIndex}
                                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                >
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Design Selection */}
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                        Choose Design
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {giftCardDesigns.map((design) => (
                          <button
                            key={design.id}
                            type="button"
                            onClick={() => setSelectedDesign(design.id)}
                            className={`text-left rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              selectedDesign === design.id
                                ? 'border-sage'
                                : 'border-gray-200 hover:border-sage/50'
                            }`}
                          >
                            <img
                              src={design.image}
                              alt={design.name}
                              className="w-full h-24 object-cover"
                            />
                            <div className="p-3">
                              <h4 className="font-semibold text-sm">{design.name}</h4>
                              <p className="text-xs text-gray-500">{design.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Method */}
                    <div>
                      <h3 className="text-xl font-serif font-semibold text-gray-900 mb-6">
                        Delivery Method
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('email')}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                            deliveryMethod === 'email'
                              ? 'border-sage bg-sage/10'
                              : 'border-gray-200 hover:border-sage/50'
                          }`}
                        >
                          <Mail className="h-6 w-6 text-sage mb-2" />
                          <h4 className="font-semibold mb-1">Email Delivery</h4>
                          <p className="text-sm text-gray-600">Instant delivery • Free</p>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryMethod('physical')}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                            deliveryMethod === 'physical'
                              ? 'border-sage bg-sage/10'
                              : 'border-gray-200 hover:border-sage/50'
                          }`}
                        >
                          <Gift className="h-6 w-6 text-sage mb-2" />
                          <h4 className="font-semibold mb-1">Physical Card</h4>
                          <p className="text-sm text-gray-600">3-5 business days • $5</p>
                        </button>
                      </div>
                    </div>

                    {/* Personalization */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-serif font-semibold text-gray-900">
                          Personalize Your Gift
                        </h3>
                        <button
                          type="button"
                          onClick={() => setIsPersonalizing(!isPersonalizing)}
                          className="text-sage hover:text-sage-dark font-medium"
                        >
                          {isPersonalizing ? 'Hide' : 'Customize'}
                        </button>
                      </div>

                      {isPersonalizing && (
                        <div className="space-y-4 bg-gray-50 rounded-lg p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Recipient's Name"
                              value={giftCardData.recipientName}
                              onChange={(e) => setGiftCardData({...giftCardData, recipientName: e.target.value})}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                            />
                            <input
                              type="email"
                              placeholder="Recipient's Email"
                              value={giftCardData.recipientEmail}
                              onChange={(e) => setGiftCardData({...giftCardData, recipientEmail: e.target.value})}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Your Name"
                              value={giftCardData.senderName}
                              onChange={(e) => setGiftCardData({...giftCardData, senderName: e.target.value})}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                            />
                            <input
                              type="email"
                              placeholder="Your Email"
                              value={giftCardData.senderEmail}
                              onChange={(e) => setGiftCardData({...giftCardData, senderEmail: e.target.value})}
                              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                              required
                            />
                          </div>
                          <textarea
                            placeholder="Personal message (optional)"
                            value={giftCardData.message}
                            onChange={(e) => setGiftCardData({...giftCardData, message: e.target.value})}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                          />
                          {deliveryMethod === 'email' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Schedule Delivery (Optional)
                              </label>
                              <input
                                type="date"
                                value={giftCardData.deliveryDate}
                                onChange={(e) => setGiftCardData({...giftCardData, deliveryDate: e.target.value})}
                                min={new Date().toISOString().split('T')[0]}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Purchase Button */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={!getSelectedAmount()}
                        className="w-full bg-sage hover:bg-sage-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-8 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2"
                      >
                        <CreditCard className="h-5 w-5" />
                        <span>Purchase Gift Card - ${getSelectedAmount() || '0'}</span>
                      </button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Secure payment processing • No expiration date • Transferable
                      </p>
                    </div>
                  </form>
                </AnimatedSection>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Success State */
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <AnimatedSection>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-serif font-semibold text-gray-900 mb-4">
                  Gift Card Purchased Successfully!
                </h2>
                <p className="text-gray-600 mb-8">
                  {deliveryMethod === 'email' 
                    ? `Your gift card has been sent to ${giftCardData.recipientEmail || 'the recipient\'s email'}.`
                    : 'Your physical gift card will be shipped within 3-5 business days.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-sage hover:bg-sage-dark text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download Receipt</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsPurchased(false);
                      setSelectedAmount('');
                      setCustomAmount('');
                      setGiftCardData({
                        recipientName: '',
                        recipientEmail: '',
                        senderName: '',
                        senderEmail: '',
                        message: '',
                        deliveryDate: '',
                        recipientPhone: ''
                      });
                    }}
                    className="border border-sage text-sage hover:bg-sage hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    Purchase Another
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Gift Card Benefits */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
              Why Choose aroma spa Gift Cards?
            </h2>
            <p className="text-lg text-gray-600">
              The perfect gift for any occasion, offering flexibility and luxury.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Heart className="h-8 w-8" />,
                title: 'Never Expires',
                description: 'Our gift cards have no expiration date, giving recipients the freedom to use them whenever they choose.'
              },
              {
                icon: <Star className="h-8 w-8" />,
                title: 'All Services Included',
                description: 'Can be used for any of our spa services, treatments, products, or membership packages.'
              },
              {
                icon: <Calendar className="h-8 w-8" />,
                title: 'Easy Booking',
                description: 'Recipients can easily book appointments online or by phone using their gift card code.'
              },
              {
                icon: <Gift className="h-8 w-8" />,
                title: 'Beautiful Presentation',
                description: 'Elegantly designed cards that make a lasting impression, available in digital or physical formats.'
              }
            ].map((benefit, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="text-center bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-4">
                    <div className="text-sage">
                      {benefit.icon}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Gift Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sage rounded-2xl text-white overflow-hidden">
            <div className="px-8 py-12 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection animation="fade-in-left">
                  <div>
                    <h2 className="text-4xl font-serif font-light mb-6">
                      Corporate & Bulk Gift Cards
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                      Perfect for employee appreciation, client gifts, or special events. 
                      We offer special pricing and custom branding for bulk orders.
                    </p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Volume discounts available</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Custom branding options</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Dedicated account management</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Flexible delivery options</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                        Request Corporate Quote
                      </button>
                      <button className="border-2 border-white text-white hover:bg-white hover:text-sage px-8 py-4 rounded-full font-medium transition-all duration-300">
                        Learn More
                      </button>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-in-right">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                      alt="Corporate wellness"
                      className="rounded-xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
              Gift Card FAQ
            </h2>
            <p className="text-lg text-gray-600">
              Common questions about our gift cards.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {[
              {
                question: 'Do gift cards expire?',
                answer: 'No, our gift cards never expire. Recipients can use them at their convenience without any time pressure.'
              },
              {
                question: 'Can gift cards be used for any service?',
                answer: 'Yes, gift cards can be used for all spa services, treatments, products, and even membership packages.'
              },
              {
                question: 'What if the service costs more than the gift card value?',
                answer: 'Recipients can pay the difference using any payment method. If the service costs less, the remaining balance stays on the card.'
              },
              {
                question: 'Can I check the balance on a gift card?',
                answer: 'Yes, gift card balances can be checked online using the gift card code or by calling any of our locations.'
              },
              {
                question: 'Are gift cards refundable?',
                answer: 'Gift cards are non-refundable, but they can be transferred to another person if needed.'
              },
              {
                question: 'Can I use multiple gift cards for one appointment?',
                answer: 'Yes, multiple gift cards can be combined for a single purchase or appointment booking.'
              }
            ].map((faq, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 50}
                animation="fade-in-up"
              >
                <div className="bg-white rounded-xl p-6 shadow">
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GiftCards;