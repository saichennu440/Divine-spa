// src/pages/Facials.tsx
import React from 'react';
import { Clock, Star, ArrowRight, Flower2 } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import servicesData, { ServiceItem, Variant } from '../data/servicesData';

const Facials: React.FC = () => {
  const { openBooking } = useBooking();
  const classic = servicesData.facials['classic-facials'] || [];
  const premium = servicesData.facials['premium-facials'] || [];

  const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
    const variants: Variant[] = item.variants ?? [];
    const [activeIdx, setActiveIdx] = React.useState<number>(variants.length > 0 ? 0 : -1);
    React.useEffect(() => {
      if (variants.length > 0 && (activeIdx < 0 || activeIdx >= variants.length)) setActiveIdx(0);
      if (variants.length === 0 && activeIdx !== -1) setActiveIdx(-1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variants.length]);

    const active = activeIdx >= 0 ? variants[activeIdx] : variants[0];

    const handleBook = () => {
      openBooking?.({
        service: item.name,
        serviceDuration: active?.duration ?? '',
        servicePrice: active?.price ?? '',
      } as any);
    };

    const displayPrice = active?.price ?? '—';
    const displayDuration = active?.duration ? `${active.duration} mins` : '—';

    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
        <div className="relative h-64">
          <img src={item.image ?? '/images/default-spa.jpg'} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
            <span className="text-2xl font-montserrat font-semibold text-sage">{displayPrice}</span>
          </div>
        </div>

        <div className="p-8 flex flex-col flex-grow">
          <div className="flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-montserrat font-semibold text-gray-900">{item.name}</h3>
            {/* <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              {displayDuration}
            </div> */}
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p>

          {/* features */}
          {item.features && item.features.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2">
                {item.features.map((f, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
     {/* Bottom fixed section */}
         <div className="mt-auto pt-4 border-t border-gray-100">
           <div className="flex items-center justify-between mb-4">
            {variants.length > 0 && (
                 <div className="flex flex-wrap gap-2 mb-4">
                   {variants.map((v, idx) => (
                     <button
                       key={`${item.name}-var-${v.duration}-${idx}`}
                       type="button"
                       onClick={() => setActiveIdx(idx)}
                       className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${idx === activeIdx ? 'bg-sage text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                     >
                       {v.duration} mins — {v.price}
                     </button>
                   ))}
                 </div>
               )}
            
           </div>
           <button
             onClick={handleBook}
             className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium"
           >
             Book This Treatment <ArrowRight className="inline ml-2 h-4 w-4" />
           </button>
         </div>
       </div>
     </div>
    );
  };

  const renderList = (list: ServiceItem[]) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {list.map((t, i) => (
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
              <Flower2 className="h-10 w-10 text-sage" />
            </div>
            <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-4">Facials</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">Customized facials for every skin type.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">classic facials</h2>
            <p className="text-gray-600 mb-6">Gentle clean-ups and essentials.</p>
            {renderList(classic)}
          </AnimatedSection>

          <AnimatedSection className="mb-8">
            <h2 className="text-3xl font-semibold mb-4">premium facials</h2>
            <p className="text-gray-600 mb-6">Premium and signature facials for visible results.</p>
            {renderList(premium)}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Facials;
