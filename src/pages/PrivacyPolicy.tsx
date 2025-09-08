// src/pages/PrivacyPolicy.tsx
import React from 'react';
import AnimatedSection from '../components/AnimatedSection';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-6">Privacy Policy</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We value your privacy. This policy explains what information we collect, why we collect it, and how
              we use and protect it.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <AnimatedSection>
            <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
            <p className="text-gray-600 mt-2">
              We collect information you provide directly when you make a booking, sign up for our newsletter, or contact us.
              This may include name, email address, phone number, booking details, and any notes or health information you share
              to help us deliver a safe treatment.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
            <p className="text-gray-600 mt-2">
              Your information is used to process bookings, communicate with you about appointments, send updates or offers
              (only if you opt in), and to improve our services. We do not sell your personal data to third parties.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">3. Sharing & Third Parties</h2>
            <p className="text-gray-600 mt-2">
              We may share necessary booking details with our staff and third-party service providers who help us operate the
              business (for example, payment processors or messaging services). We require partners to protect personal information.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">4. Security</h2>
            <p className="text-gray-600 mt-2">
              We take reasonable administrative and technical steps to protect the information in our possession. No system can be
              100% secure; if we become aware of a data breach we will notify affected users in accordance with applicable laws.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">5. Your Rights</h2>
            <p className="text-gray-600 mt-2">
              Depending on your jurisdiction, you may have rights to access, correct, or request deletion of your personal data.
              To exercise these rights or ask questions about this policy, contact us at the email address provided on our site.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">6. Cookies & Analytics</h2>
            <p className="text-gray-600 mt-2">
              We and our analytics providers may use cookies and similar technologies to collect usage information in order to
              improve the website and personalise your experience. You can control cookie settings in your browser.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">7. Changes to this Policy</h2>
            <p className="text-gray-600 mt-2">
              We may update this policy from time to time. When we make changes we will update the effective date and, where
              appropriate, notify users.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="text-gray-600 mt-2">
              For privacy requests or questions please contact us at <a href="mailto:connect@aromaspa.in" className="text-sage underline">connect@aromaspa.in</a>.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
