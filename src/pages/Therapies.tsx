// src/pages/Therapies.tsx
import React from 'react';
import { Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import servicesData from '../data/servicesData';

const Therapies: React.FC = () => {
  const { openBooking } = useBooking();
  const signature = servicesData.therapies['signature-therapies'] || [];
  const classic = servicesData.therapies['classic-therapies'] || [];
  const targeted = servicesData.therapies['targeted-therapies'] || [];

  const renderList = (list: any[]) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {list.map((t, i) => (
        <AnimatedSection key={i} delay={i * 80} animation="fade-in-up">
          {/* Card wrapper */}
<div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
  {/* IMAGE area */}
  <div className="relative h-64">
    <img
      src={t.image ?? '/images/default-spa.jpg'}
      alt={t.name}
      className="w-full h-full object-cover"
    />
    {/* price badge */}
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
      <span className="text-2xl font-montserrat font-semibold text-sage">
        {t.price}
      </span>
    </div>
  </div>

  {/* Card content */}
  <div className="p-8">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-2xl font-montserrat font-semibold text-gray-900">{t.name}</h3>
      <div className="flex items-center text-sm text-gray-500">
        <Clock className="h-4 w-4 mr-1" />
        {t.duration} mins
      </div>
    </div>

    <p className="text-gray-600 mb-6 leading-relaxed">{t.description}</p>

    {/* features */}
    <div className="mb-6">
      {/* <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4> */}
      <div className="grid grid-cols-2 gap-2">
        {(t.features || []).map((f: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, idx: React.Key | null | undefined) => (
          <div key={idx} className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
            {f}
          </div>
        ))}
      </div>
    </div>

    <button onClick={() => openBooking()} className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium">
      Book This Treatment <ArrowRight className="inline ml-2 h-4 w-4" />
    </button>
  </div>
</div>

        </AnimatedSection>
      ))}
    </div>
  );

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full mb-8">
              <Sparkles className="h-10 w-10 text-sage" />
            </div>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-4">Therapies</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Signature, classic and targeted therapies curated to your needs.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Signature Therapies</h2>
            <p className="text-gray-600 mb-6">Our signature rituals for deep renewal.</p>
            {renderList(signature)}
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Classic Therapies</h2>
            <p className="text-gray-600 mb-6">Trusted classics for full-body relaxation.</p>
            {renderList(classic)}
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">Targeted Therapies</h2>
            <p className="text-gray-600 mb-6">Short focused sessions for target relief.</p>
            {renderList(targeted)}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Therapies;
