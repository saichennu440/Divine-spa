// src/pages/Membership.tsx  (or src/components/Membership.tsx depending on your structure)
// Replace your previous file with this content (adjust path for PlanModal import if needed)
import React, { useState } from 'react';
import { Check, Crown, Heart, Sparkles, Gift, Calendar, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import PlanModal, { PlanInfo } from '../components/PlanModal';

const rupee = (n?: number | null) =>
  typeof n === 'number' ? `₹${n.toLocaleString('en-IN')}` : '-';

const Membership: React.FC = () => {
  // same plans data imported earlier from franchise.xlsx (kept identical)
  const rawPlans = [
    { name: 'Standard', hours: 7, price: 12000, validityMonths: 4, serviceValue: 20000, perHour: 1715 },
    { name: 'Bronze', hours: 11, price: 18000, validityMonths: 6, serviceValue: 32000, perHour: 1637 },
   // { name: 'Silver', hours: 15, price: 24000, validityMonths: 8, serviceValue: 40000, perHour: 1600 },
    { name: 'Gold', hours: 20, price: 30000, validityMonths: 10, serviceValue: 55000, perHour: 1500 },
    { name: 'Treat', hours: 7, price: 17000, validityMonths: 4, serviceValue: 25000, perHour: 2429 },
    { name: 'Relax', hours: 11, price: 25000, validityMonths: 6, serviceValue: 38500, perHour: 2273 },
    //{ name: 'Discover', hours: 15, price: 32000, validityMonths: 8, serviceValue: 50000, perHour: 2133 },
    { name: 'Serenity', hours: 20, price: 38000, validityMonths: 10, serviceValue: 70000, perHour: 1900 }
  ];

  const maxPrice = Math.max(...rawPlans.map(p => p.price || 0));
  const plans = rawPlans.map((p, i) => ({
    ...p,
    icon:
      i === 0 ? <Heart className="h-8 w-8" /> :
      i === 1 ? <Crown className="h-8 w-8" /> :
      i === 2 ? <Sparkles className="h-8 w-8" /> :
      <Star className="h-8 w-8" />,
    description: `${p.hours} hours of treatment • Valid for ${p.validityMonths} months`,
    features: [
      `${p.hours} hours of treatment`,
      `Validity: ${p.validityMonths} months`,
      `Service value: ${rupee(p.serviceValue)}`,
      `Effective per-hour: ${rupee(p.perHour)}`,
      `Savings vs retail: ${rupee((p.serviceValue || 0) - (p.price || 0))}`
    ],
    popular: p.price === maxPrice
  }));

  const memberPerks = [
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Priority Booking',
      description: 'Book your preferred time slots up to 30 days in advance'
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: 'Exclusive Discounts',
      description: 'Special pricing on services, products, and retail items'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Member Events',
      description: 'Access to exclusive wellness workshops and retreats'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Personalized Care',
      description: 'Dedicated wellness advisors and customized treatment plans'
    }
  ];

  // modal state
  const [selectedPlan, setSelectedPlan] = useState<PlanInfo | null>(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const openPlanModal = (plan?: PlanInfo | null) => {
    setSelectedPlan(plan ?? null);
    setIsPlanModalOpen(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-8">
              wellness memberships
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Join our membership plans — carefully priced packages that bundle treatments,
              deliver savings, and include member-only privileges. Choose the package that
              best fits your lifestyle and wellness goals.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
              choose your wellness family package
            </h2>
            <p className="text-lg text-gray-600">
These packages are exclusively for Classic Swedish, Aromatic, Deep Tissue, Balinese And Traditional thai therapies only            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  {plans.map((plan, index) => (
    <React.Fragment key={plan.name}>
      {/* Insert heading & text before the 4th card */}
      {index === 3 && (
        <div className="lg:col-span-3 text-center mt-12 mb-6">
          <h2 className="text-3xl font-montserrat font-light text-gray-900 mb-4">
            enhanced packages for you
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These packages are exclusively for Classic Swedish, Aroma, Deep Tissue, Balinese, 
Traditional Thai, AROMA Signature, Tandem (Fours Hands), Herbal Potli, Hot 
Stone And Body polishing therapies ONLY
          </p>
        </div>
      )}

      {/* Existing card */}
      <AnimatedSection delay={index * 100} animation="fade-in-up">
        <div
          className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
            plan.popular ? 'ring-2 ring-sage scale-105' : ''
          }`}
        >
          {plan.popular && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-sage text-white px-6 py-2 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}

          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-4">
                <div className="text-sage">{plan.icon}</div>
              </div>
              <h3 className="text-2xl font-montserrat font-semibold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-montserrat font-light text-sage">
                  {rupee(plan.price)}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start">
                  <Check className="h-5 w-5 text-sage flex-shrink-0 mt-0.5 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                openPlanModal({
                  name: plan.name,
                  price: plan.price,
                  validityMonths: plan.validityMonths,
                  hours: plan.hours
                })
              }
              className={`w-full py-4 px-6 rounded-full font-medium transition-all duration-300 ${
                plan.popular
                  ? 'bg-sage hover:bg-sage-dark text-white hover:shadow-lg'
                  : 'border-2 border-sage text-sage hover:bg-sage hover:text-white'
              }`}
            >
              {plan.popular ? 'Start Membership' : 'Choose Plan'}
            </button>
          </div>
        </div>
      </AnimatedSection>
    </React.Fragment>
  ))}
</div>

        </div>
      </section>

      {/* Member Perks */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">member exclusive benefits</h2>
            <p className="text-lg text-gray-600">Enjoy these special perks as a valued member of our wellness community.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {memberPerks.map((perk, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="fade-in-up">
                <div className="text-center bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sage/10 rounded-full mb-4">
                    <div className="text-sage">{perk.icon}</div>
                  </div>
                  <h3 className="font-montserrat text-lg font-semibold text-gray-900 mb-2">{perk.title}</h3>
                  <p className="text-gray-600 text-sm">{perk.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Memberships */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sage rounded-2xl text-white overflow-hidden">
            <div className="px-8 py-12 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection animation="fade-in-left">
                  <div>
                    <h2 className="text-4xl font-voniaue font-light mb-6">gift a wellness membership</h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">Share the gift of wellness with someone special. Our gift memberships include beautiful presentation packaging and personalized welcome experiences.</p>
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Beautiful gift presentation</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Personalized welcome experience</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Flexible start date</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="h-5 w-5 text-white mr-3" />
                        <span>Digital or physical delivery</span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-in-right">
                  <div className="relative">
                    <img src="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop" alt="Gift membership" className="rounded-xl shadow-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">frequently asked questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about our membership program.</p>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              { question: 'Can I change my membership plan?', answer: 'Yes, you can upgrade or downgrade your membership at any time. Changes will take effect at your next billing cycle.' },
              { question: 'What happens to unused services?', answer: 'Unused services roll over for up to 3 months, giving you flexibility to use your benefits when convenient.' },
              { question: 'Can I pause my membership?', answer: 'Members can pause their membership for up to 3 months per year for medical reasons or extended travel.' },
              { question: 'Are there any additional fees?', answer: 'No hidden fees. Your membership covers all listed services and benefits. Additional services are discounted.' }
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100} animation="fade-in-up">
                <div className="bg-white rounded-xl p-6 shadow">
                  <h3 className="font-montserrat text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">ready to join our wellness community?</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">Start your transformative wellness journey today with a membership plan designed for your lifestyle.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openPlanModal(null)} className="bg-sage hover:bg-sage-dark text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg">Start Membership</button>
              {/* <button onClick={() => openPlanModal(null)} className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">Schedule Consultation</button> */}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <PlanModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} plan={selectedPlan} />
    </div>
  );
};

export default Membership;
