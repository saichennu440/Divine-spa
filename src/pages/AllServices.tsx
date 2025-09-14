
import React from 'react';
import { ArrowRight, Star, Droplets } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import servicesData, { ServiceItem, Variant } from '../data/servicesData';

const AllServices: React.FC = () => {
  const { openBooking } = useBooking();

  // Flatten servicesData into an array of entries with category/subcategory for grouping if needed
  const allItems: { category: string; sub: string; item: ServiceItem }[] = React.useMemo(() => {
    const out: { category: string; sub: string; item: ServiceItem }[] = [];
    Object.entries(servicesData).forEach(([category, subGroups]) => {
      if (!subGroups || typeof subGroups !== 'object') return;
      Object.entries(subGroups as Record<string, ServiceItem[]>).forEach(([sub, items]) => {
        (items || []).forEach((it) => out.push({ category, sub, item: it }));
      });
    });
    return out;
  }, []);

  const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
    const variants: Variant[] = item.variants ?? [];
    const [activeIdx, setActiveIdx] = React.useState<number>(() => (variants.length > 0 ? 0 : -1));
    React.useEffect(() => {
      if (variants.length > 0 && (activeIdx < 0 || activeIdx >= variants.length)) setActiveIdx(0);
      if (variants.length === 0 && activeIdx !== -1) setActiveIdx(-1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variants.length]);

    const active = activeIdx >= 0 ? variants[activeIdx] : variants[0];
    const nameMatch = item.name.match(/^(.*?)\s*\((.+)\)\s*$/);
    const mainTitle = nameMatch ? nameMatch[1] : item.name;
    const parenthesis = nameMatch ? nameMatch[2] : null;

    const handleBook = () => {
      openBooking?.({
        service: item.name,
        serviceDuration: active?.duration ?? '',
        servicePrice: active?.price ?? '',
      } as any);
    };

    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
        <div className="relative h-56">
          <img src={item.image ?? '/images/default-spa.jpg'} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <h3 className="text-lg font-montserrat font-semibold text-gray-900">
              {mainTitle}
              {parenthesis && <span className="block text-sm text-gray-600 mt-1">({parenthesis})</span>}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            {/* <p className="text-gray-600 mb-6 leading-relaxed">{item.description}</p> */}

          </div>

          {item.features && item.features.length > 0 && (
            <div className="mb-4">
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

          <div className="mt-auto pt-4 border-t border-gray-100">
            {variants.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {variants.map((v, idx) => (
                  <button
                    key={`${item.name}-var-${idx}`}
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
      </div>
    );
  };

  return (
    <div className="pt-20">
      <section className="py-10 bg-gradient-to-b from-cream to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full mb-8">
              <Droplets className="h-10 w-10 text-sage" />
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-4">All Services</h1>
            {/* <p className="text-gray-700 max-w-2xl mx-auto">Browse every treatment available across categories.</p> */}
          </AnimatedSection>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {allItems.map(({ item }, i) => (
              <AnimatedSection key={`${item.name}-${i}`} delay={i * 30} animation="fade-in-up">
                <ServiceCard item={item} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllServices;