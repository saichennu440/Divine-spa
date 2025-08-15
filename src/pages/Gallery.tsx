import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Serene spa treatment room',
      category: 'Treatment Rooms'
    },
    {
      src: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Peaceful spa environment',
      category: 'Ambiance'
    },
    {
      src: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Luxury spa products',
      category: 'Products'
    },
    {
      src: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Relaxation area',
      category: 'Facilities'
    },
    {
      src: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Foot spa treatment',
      category: 'Treatments'
    },
    {
      src: 'https://images.pexels.com/photos/6663461/pexels-photo-6663461.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Spa wellness area',
      category: 'Facilities'
    },
    {
      src: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Massage therapy session',
      category: 'Treatments'
    },
    {
      src: 'https://images.pexels.com/photos/3985357/pexels-photo-3985357.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Spa reception area',
      category: 'Facilities'
    },
    {
      src: 'https://images.pexels.com/photos/6663449/pexels-photo-6663449.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Meditation space',
      category: 'Ambiance'
    },
    {
      src: 'https://images.pexels.com/photos/3985356/pexels-photo-3985356.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Luxury spa amenities',
      category: 'Amenities'
    },
    {
      src: 'https://images.pexels.com/photos/3997345/pexels-photo-3997345.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Skincare treatment',
      category: 'Treatments'
    },
    {
      src: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      alt: 'Relaxation lounge',
      category: 'Facilities'
    }
  ];

  const categories = ['All', 'Treatment Rooms', 'Facilities', 'Treatments', 'Ambiance', 'Products', 'Amenities'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-cream to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-vonique font-light text-gray-900 mb-8">
              Our Sanctuary Gallery
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Step into our world of tranquility and elegance. Explore the serene spaces, luxurious 
              amenities, and peaceful environments that make aroma spa your ultimate wellness destination.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-sage text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-sage/10 hover:text-sage'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <AnimatedSection 
                key={index}
                delay={index * 50}
                animation="fade-in"
                className={`relative overflow-hidden rounded-lg cursor-pointer group ${
                  index % 7 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onClick={() => openLightbox(index)}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="font-serif font-semibold text-gray-900 text-sm mb-1">
                        {image.alt}
                      </h3>
                      <span className="inline-block bg-sage/20 text-sage text-xs px-2 py-1 rounded-full">
                        {image.category}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour CTA */}
      <section className="py-20 bg-sage text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-vonique font-light mb-6">
              Experience Our Space in Person
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Schedule a personal tour of our facilities and discover why aroma spa is the perfect 
              sanctuary for your wellness journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl">
                Schedule a Tour
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-sage px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
                Book Your Visit
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative max-w-7xl max-h-screen mx-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            <img
              src={filteredImages[selectedImage].src}
              alt={filteredImages[selectedImage].alt}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="font-serif text-lg mb-2">
                  {filteredImages[selectedImage].alt}
                </h3>
                <span className="inline-block bg-sage/80 text-white text-sm px-3 py-1 rounded-full">
                  {filteredImages[selectedImage].category}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;