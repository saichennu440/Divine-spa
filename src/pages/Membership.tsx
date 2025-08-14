import React from 'react';
import { Check, Crown, Heart, Sparkles, Gift, Calendar, Star } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Membership: React.FC = () => {
  const plans = [
    {
      name: 'Essential Wellness',
      price: 199,
      period: 'month',
      icon: <Heart className="h-8 w-8" />,
      description: 'Perfect for those beginning their wellness journey',
      features: [
        '2 services per month',
        '10% discount on additional services',
        'Priority booking',
        'Access to relaxation areas',
        'Complimentary wellness consultation',
        'Member-only events',
      ],
      popular: false
    },
    {
      name: 'Luxury Experience',
      price: 349,
      period: 'month',
      icon: <Crown className="h-8 w-8" />,
      description: 'The ultimate in wellness luxury and convenience',
      features: [
        '4 services per month',
        '15% discount on additional services',
        'Priority booking & concierge service',
        'Access to VIP lounges',
        'Complimentary add-ons worth $50',
        'Personal wellness advisor',
        'Exclusive member workshops',
        'Guest privileges (2 per month)',
      ],
      popular: true
    },
    {
      name: 'Divine Unlimited',
      price: 599,
      period: 'month',
      icon: <Sparkles className="h-8 w-8" />,
      description: 'Unlimited access to wellness and luxury',
      features: [
        'Unlimited services',
        '20% discount on products',
        '24/7 concierge booking',
        'Private treatment rooms',
        'Complimentary all add-ons',
        'Dedicated wellness coach',
        'Exclusive retreat access',
        'Family member discounts',
        'Annual wellness assessment',
      ],
      popular: false
    }
  ];

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

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-8">
              Wellness Memberships
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Join our exclusive wellness community and enjoy unlimited access to transformative treatments, 
              priority booking, and personalized care. Invest in your wellbeing with membership plans 
              designed to fit your lifestyle.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
              Choose Your Wellness Journey
            </h2>
            <p className="text-lg text-gray-600">
              Select the membership plan that best fits your wellness goals and lifestyle.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  plan.popular ? 'ring-2 ring-sage scale-105' : ''
                }`}>
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
                        <div className="text-sage">
                          {plan.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {plan.description}
                      </p>
                      <div className="text-center">
                        <span className="text-5xl font-serif font-light text-sage">
                          ${plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">/{plan.period}</span>
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

                    <button className={`w-full py-4 px-6 rounded-full font-medium transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-sage hover:bg-sage-dark text-white hover:shadow-lg' 
                        : 'border-2 border-sage text-sage hover:bg-sage hover:text-white'
                    }`}>
                      {plan.popular ? 'Start Your Journey' : 'Choose Plan'}
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Member Perks */}
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
              Member Exclusive Benefits
            </h2>
            <p className="text-lg text-gray-600">
              Enjoy these special perks as a valued member of our wellness community.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {memberPerks.map((perk, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
                animation="fade-in-up"
              >
                <div className="text-center bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sage/10 rounded-full mb-4">
                    <div className="text-sage">
                      {perk.icon}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {perk.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Memberships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sage rounded-2xl text-white overflow-hidden">
            <div className="px-8 py-12 lg:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <AnimatedSection animation="fade-in-left">
                  <div>
                    <h2 className="text-4xl font-serif font-light mb-6">
                      Gift a Wellness Membership
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                      Share the gift of wellness with someone special. Our gift memberships 
                      include beautiful presentation packaging and personalized welcome experiences.
                    </p>
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
                    <button className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
                      Purchase Gift Membership
                    </button>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fade-in-right">
                  <div className="relative">
                    <img
                      src="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop"
                      alt="Gift membership"
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
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our membership program.
            </p>
          </AnimatedSection>

          <div className="space-y-8">
            {[
              {
                question: 'Can I change my membership plan?',
                answer: 'Yes, you can upgrade or downgrade your membership at any time. Changes will take effect at your next billing cycle.'
              },
              {
                question: 'What happens to unused services?',
                answer: 'Unused services roll over for up to 3 months, giving you flexibility to use your benefits when convenient.'
              },
              {
                question: 'Can I pause my membership?',
                answer: 'Members can pause their membership for up to 3 months per year for medical reasons or extended travel.'
              },
              {
                question: 'Are there any additional fees?',
                answer: 'No hidden fees. Your membership covers all listed services and benefits. Additional services are discounted.'
              }
            ].map((faq, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 100}
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-serif font-light text-gray-900 mb-6">
              Ready to Join Our Wellness Community?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Start your transformative wellness journey today with a membership plan designed for your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-sage hover:bg-sage-dark text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg">
                Start Membership
              </button>
              <button className="border-2 border-sage text-sage hover:bg-sage hover:text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Membership;