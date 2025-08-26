// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Clock, Star, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useBooking } from '../context/BookingContext';
import servicesData, { ServiceItem } from '../data/servicesData';

type CategoryKey = 'therapies' | 'facials' | 'full-body-polishing' | 'foot-pedicure';

const prettyTitleFromSlug = (slug: string) =>
  slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

const renderCard = (t: ServiceItem, index: number, openBooking: () => void) => (
  <AnimatedSection key={index} delay={index * 80} animation="fade-in-up">
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className="relative h-64">
        <img
          src={t.image ?? '/images/default-spa.jpg'}
          alt={t.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
          <span className="text-2xl font-montserrat font-semibold text-sage">
            {t.price}
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-montserrat font-semibold text-gray-900">{t.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {t.duration} mins
          </div>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{t.description}</p>

        <div className="mb-6">
          {/* <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4> */}
          <div className="grid grid-cols-2 gap-2">
            {(t.features || []).map((f, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => openBooking()}
          className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium transition-all duration-300"
        >
          Book This Treatment <ArrowRight className="inline ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  </AnimatedSection>
);

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
  // @ts-ignore - index guarantee by allowed check
  const categoryData = servicesData[category as CategoryKey] as Record<string, ServiceItem[]>;

  if (!categoryData) return <div className="pt-20">No data for this category.</div>;

  // If a specific subcategory slug is provided, render only that list
  if (sub) {
    // sub is already the slug matching keys in servicesData (e.g. 'signature-therapies')
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
              <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-4">
                {headerTitle}
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">Select a service below.</p>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {list.map((t, i) => renderCard(t, i, openBooking))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // No sub slug: render all subgroups for this category (existing behavior)
  const subKeys = Object.keys(categoryData);
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-cream to-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-4">
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
                <p className="text-gray-600 mb-6">{/* optional description if you keep it in data */}</p>
              </AnimatedSection>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {(categoryData[k] || []).map((t, i) => renderCard(t, i, openBooking))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
