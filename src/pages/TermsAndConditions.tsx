import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-6">Terms & Conditions</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold">1. Booking & Cancellation</h2>
            <p className="text-gray-600 mt-2">
              Appointments may be booked online or by phone. Cancellation policies are shown during booking — please cancel within
              the stated window to avoid fees. We reserve the right to refuse or reschedule appointments when necessary.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">2. Health & Consent</h2>
            <p className="text-gray-600 mt-2">
              Please inform us of any medical conditions, allergies, or injuries prior to treatment. Some treatments may be
              unsuitable during pregnancy or for certain medical conditions.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">3. Pricing & Payments</h2>
            <p className="text-gray-600 mt-2">
              Prices listed on the site are inclusive of taxes where indicated. We accept payment methods displayed at the
              centre. In case of pricing errors, we will contact the customer to confirm before proceeding.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">4. Liability</h2>
            <p className="text-gray-600 mt-2">
              Our liability for any claim arising from the services is limited to the value of the treatment. We are not liable for
              indirect or consequential losses. Treatments are performed by trained therapists; results may vary.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">5. Code of Conduct</h2>
            <p className="text-gray-600 mt-2">
              Guests are expected to behave respectfully towards staff and other guests. Aggressive or abusive behaviour may
              result in refusal of service.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
            <p className="text-gray-600 mt-2">
              All content on the website is owned or licensed by us. Unauthorized use of our trademarks, images or text is
              prohibited.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">7. Governing Law</h2>
            <p className="text-gray-600 mt-2">
              These terms are governed by the laws of the jurisdiction where the business operates. Any dispute will be subject
              to the courts of that jurisdiction.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-gray-600 mt-2">
              For questions about these terms contact us at <a href="mailto:connect@aromaspa.in" className="text-sage underline">connect@aromaspa.in</a>.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
