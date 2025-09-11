// src/pages/Therapies.tsx
import React from 'react';
import { Clock, Star, ArrowRight, Sparkles } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import servicesData, { ServiceItem, Variant } from '../data/servicesData';

const Therapies: React.FC = () => {
  const { openBooking } = useBooking();
  const signature = servicesData.therapies['Signature-therapies'] || [];
  const classic = servicesData.therapies['Classic-therapies'] || [];
  const targeted = servicesData.therapies['Targeted-therapies'] || [];

  // Card component: reads variants and shows dynamic price/duration
 // inside Therapies.tsx — replace the old ServiceCard with this

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const variants: Variant[] = item.variants ?? [];

  // Debug: log item so we can see what was actually imported at runtime
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('ServiceCard mount:', item.name, { variants, item });
  }, [item, variants]);

  // keep track of selected index, default to 0 if variants exist
  const [activeIdx, setActiveIdx] = React.useState<number>(() => (variants.length > 0 ? 0 : -1));

  // ensure activeIdx valid if variants change
  React.useEffect(() => {
    if (variants.length > 0 && (activeIdx < 0 || activeIdx >= variants.length)) {
      setActiveIdx(0);
    }
    if (variants.length === 0 && activeIdx !== -1) {
      setActiveIdx(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants.length]);

  // fallback: prefer chosen variant, otherwise first variant if present
  const active: Variant | undefined = (activeIdx >= 0 && variants[activeIdx]) ? variants[activeIdx] : variants[0];

  // Friendly fallback values
  const displayPrice = active?.price ?? '—';
  const displayDuration = active?.duration ? `${active.duration} mins` : '—';

  const handleBook = () => {
    openBooking({
      service: item.name,
      serviceDuration: active?.duration ?? '',
      servicePrice: active?.price ?? '',
    } as any);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className="relative h-64">
        <img
          src={item.image ?? '/images/default-spa.jpg'}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* price badge (always render but show fallback) */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-2xl font-montserrat font-semibold text-sage">
            {displayPrice}
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-montserrat font-semibold text-gray-900">{item.name}</h3>
          {/* <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {displayDuration}
          </div> */}
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

        {variants.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {variants.map((v, idx) => (
              <button
                key={`${item.name}-v-${v.duration}-${idx}`}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${idx === activeIdx ? 'bg-sage text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {v.duration} mins — {v.price}
              </button>
            ))}
          </div>
        )}

        <button onClick={handleBook} className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium">
          Book This Treatment <ArrowRight className="inline ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};


  const renderList = (list: ServiceItem[]) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {list.map((t, i) => (
        // use a stable key: name + index (if services might repeat use unique id later)
        <AnimatedSection key={`${t.name}-${i}`} delay={i * 80} animation="fade-in-up">
          <ServiceCard item={t} />
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
            <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-4">Therapies</h1>
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
            <p className="text-gray-600 mb-6">trusted classics for full-body relaxation.</p>
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
