// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, Star, ArrowRight, Heart } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import servicesData, { ServiceItem, Variant } from '../data/servicesData';

type CategoryKey = 'therapies' | 'facials' | 'full-body-polishing' | 'foot-pedicure';

const prettyTitleFromSlug = (slug: string) =>
  slug
    .split('-')
   // .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

// ServiceCard component: reads variants and displays dynamic price/duration
const ServiceCard: React.FC<{ item: ServiceItem; onBook: (payload: any) => void }> = ({ item, onBook }) => {
  const variants: Variant[] = item.variants ?? [];

  // active variant index (default to 0 if variants exist, otherwise -1)
  const [activeIdx, setActiveIdx] = React.useState<number>(() => (variants.length > 0 ? 0 : -1));

  React.useEffect(() => {
    // keep activeIdx valid if variants change
    if (variants.length > 0 && (activeIdx < 0 || activeIdx >= variants.length)) {
      setActiveIdx(0);
    }
    if (variants.length === 0 && activeIdx !== -1) {
      setActiveIdx(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants.length]);

  const active = activeIdx >= 0 ? variants[activeIdx] : variants[0];

  const displayPrice = active?.price ?? '—';
  const displayDuration = active?.duration ? `${active.duration} mins` : '—';

  const handleBook = () => {
    // pass chosen variant to booking modal so it can prefill
    onBook({
      service: item.name,
      serviceDuration: active?.duration ?? '',
      servicePrice: active?.price ?? '',
    });
  };

  return (
    <AnimatedSection delay={0} animation="fade-in-up">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
        <div className="relative h-64">
          <img src={item.image ?? '/images/default-spa.jpg'} alt={item.name} className="w-full h-full object-cover" />

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
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                    idx === activeIdx ? 'bg-sage text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {v.duration} mins — {v.price}
                </button>
              ))}
            </div>
          )}

          {item.features && item.features.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-2">
                {item.features.map((f, i) => (
                  <div key={i} className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={handleBook} className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium transition-all duration-300">
            Book This Treatment <ArrowRight className="inline ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
};

const CategoryPage: React.FC = () => {
  const { openBooking } = useBooking();
  const { category, sub } = useParams<{ category?: string; sub?: string }>();

  // Validate category param
  if (!category) return <Navigate to="/services" replace />;

  const allowed: CategoryKey[] = ['therapies', 'facials', 'full-body-polishing', 'foot-pedicure'];
  if (!allowed.includes(category as CategoryKey)) {
    return <Navigate to="/services" replace />;
  }

  // get data object for this category
  // @ts-ignore - guarded by allowed check
  const categoryData = servicesData[category as CategoryKey] as Record<string, ServiceItem[]>;

  if (!categoryData) return <div className="pt-20">No data for this category.</div>;

  // helper to open booking and pass initialFormData (openBooking may accept payload; cast to any if needed)
  const handleOpenBookingWith = (payload: any) => {
    // if openBooking accepts an argument, pass it. Otherwise adapt this call to your context API.
    try {
      openBooking(payload as any);
    } catch (err) {
      // fallback: call without payload if openBooking signature doesn't accept it
      // eslint-disable-next-line no-console
      console.warn('openBooking(payload) failed — calling openBooking() without payload. Update BookingContext.openBooking to accept initialFormData.', err);
      try { openBooking(); } catch { /* ignore */ }
    }
  };

  // If specific subcategory requested, render only that subgroup
  if (sub) {
    const list = categoryData[sub];
    if (!list) {
      return (
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl font-semibold">Nothing found</h1>
            <p className="text-gray-600 mt-4">We couldn't find the requested section.</p>
          </div>
        </div>
      );
    }

    const headerTitle = prettyTitleFromSlug(sub);

    return (
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-cream to-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <AnimatedSection>
              <div className="inline-flex items-center justify-center w-20 h-20 bg-sage/10 rounded-full mb-8">
                            <Heart className="h-10 w-10 text-sage" />
                          </div>
              <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-4">
                {headerTitle}
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Select a service below.</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {list.map((t, i) => (
                <div key={`${t.name}-${i}`}>
                  <ServiceCard item={t} onBook={handleOpenBookingWith} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // No sub slug: render all subgroups for this category
  const subKeys = Object.keys(categoryData);

  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-4">
              {prettyTitleFromSlug(category)}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">All services in this category.</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-20">
          {subKeys.map((k) => (
            <div key={k}>
              <AnimatedSection className="mb-6">
                <h2 className="text-3xl font-semibold mb-4">{prettyTitleFromSlug(k)}</h2>
                <p className="text-gray-600 mb-6">{/* optional description if available in data */}</p>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {(categoryData[k] || []).map((t, i) => (
                  <div key={`${t.name}-${i}`}>
                    <ServiceCard item={t} onBook={handleOpenBookingWith} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
