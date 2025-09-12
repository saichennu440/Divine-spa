import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Users, Droplets, Flower2, Leaf, MapPin, Clock } from 'lucide-react';
import Hero from '../components/Hero';
import AnimatedSection from '../components/AnimatedSection';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import { useReviews } from '../hooks/useReviews';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TestimonialsCarousel from '../components/TestimonialsCarousel';

const Home: React.FC = () => {
  const { reviews, loading: reviewsLoading } = useReviews();
  const services = [
    {
      title: 'Therapies',
      description: 'Professional therapeutic treatments including Swedish, Deep Tissue, Hot Stone, and Aromatherapy therapy for ultimate relaxation.',
      icon: <Sparkles className="h-8 w-8" />,
      path: '/services/therapies',
      image: '/services/Aromatic Therapy.jpg'
    },
    {
      title: 'Facials',
      description: 'Rejuvenating skin treatments designed to cleanse, hydrate, and restore your natural glow.',
      icon: <Heart className="h-8 w-8" />,
       path: '/services/facials',
      image: '/services/Facials – Rejuvenating.jpg'
    },
    {
      title: 'Full body Polishing',
      description: 'Luxurious exfoliation therapy that smooths, brightens, and revitalizes your entire body.',
          path: '/services/full-body-polishing',
      icon: <Droplets className="h-8 w-8" />,
      image: '/services/Polishing – Scrub.jpg'
    },
    {
      title: 'Foot pedicure',
      description: 'Pampering foot care to refresh, soften, and beautify for perfectly polished toes.',
      icon: <Flower2 className="h-8 w-8" />,
          path: '/services/foot-pedicure',
      image: '/services/Pedicure – Brightening De-Tan.jpg'
    }
  ];


  // Get the latest 4 reviews for testimonials
  // const testimonials = reviews.slice(0, 4).map(review => ({
  //   name: review.name,
  //   city: review.city,
  //   rating: review.rating,
  //   text: review.review
  // }));

  // const galleryImages = [
  //   'https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
  //   'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop',
  //   'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&fit=crop',
  //   'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
  //   'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop',
  //   'https://images.pexels.com/photos/6663461/pexels-photo-6663461.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&fit=crop'
  // ];

  // const blogPosts = [
  //   {
  //     title: 'The Art of Mindful Self-Care',
  //     excerpt: 'Discover how mindfulness can transform your wellness routine and enhance your spa experience.',
  //     image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  //     date: '2024-01-15',
  //     readTime: '5 min read'
  //   },
  //   {
  //     title: 'Benefits of Regular Spa Treatments',
  //     excerpt: 'Learn about the physical and mental health benefits of incorporating spa treatments into your lifestyle.',
  //     image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  //     date: '2024-01-10',
  //     readTime: '7 min read'
  //   },
  //   {
  //     title: 'Seasonal Wellness Rituals',
  //     excerpt: 'Adapt your wellness routine to the changing seasons for optimal health and vitality will change your life.',
  //     image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
  //     date: '2024-01-05',
  //     readTime: '6 min read'
  //   }
  // ];

  return (
    <div className="pt-20">
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-8">
             Aroma, the spirit in everything we do.            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              At aroma spa, we believe in the transformative power of mindful therapies and conscious self-care. 
              Our sanctuary provides a space where ancient wisdom meets modern wellness, creating an experience 
              that nurtures your body, calms your mind, and enriches your spirit. Every treatment is designed 
              to restore your natural balance and awaken your inner radiance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-6">
              Our Sacred Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of treatments, each designed to nurture your wellbeing 
              and restore your natural vitality.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 100}
                animation="fade-in-up"
              >
                <ServiceCard {...service} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
     {/* Testimonials Carousel */}
     <TestimonialsCarousel reviews={reviews} loading={reviewsLoading} /> 
      {/* Testimonials Section */}
{/* <section className="py-20 bg-beige">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-6">
        what our guests say
      </h2>
      <p className="text-lg text-gray-600">
        Hear from those who have experienced the aroma Spa difference.
      </p>
    </AnimatedSection>

    {reviewsLoading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <Slider
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        responsive={[
          { breakpoint: 1024, settings: { slidesToShow: 2 } },
          { breakpoint: 640, settings: { slidesToShow: 1 } }
        ]}
      >
        {reviews.map((review, index) => (
          <div key={index} className="px-4 h-full flex">
            <TestimonialCard
              name={review.name}
              city={review.city || "Guest"}
              rating={review.rating}
              text={review.review}
              avatar={review.avatar_url}
            />
          </div>
        ))}
      </Slider>
    )}
  </div>
</section> */}


      {/* Gallery Section */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-6">
              our sanctuary
            </h2>
            <p className="text-lg text-gray-600">
              Step into a world of tranquility and elegance.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 50}
                animation="fade-in"
                className={`overflow-hidden rounded-lg ${
                  index % 3 === 0 ? 'md:row-span-2' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section> */}

      {/* Membership & Gift Cards Section */}
      <section id="membership" className="py-20 bg-sage text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light mb-6">
              Exclusive  Memberships 
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join our wellness community or share the gift of relaxation with someone special.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-1 ">
            <AnimatedSection animation="fade-in-left">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <Users className="h-12 w-12 mb-6 text-white" />
                <h3 className="text-2xl font-montserrat font-semibold mb-4">Wellness Membership</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Enjoy unlimited access to our facilities, priority booking, exclusive member rates, 
                  and personalized wellness consultations.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-montserrat font-light">Starting at ₹12,000</span>
                  <Link to="/membership">
                  <button className="bg-white text-sage px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                    Learn More
                  </button>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
{/* 
            <AnimatedSection animation="fade-in-right">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                <Leaf className="h-12 w-12 mb-6 text-white" />
                <h3 className="text-2xl font-montserrat font-semibold mb-4">Gift Cards</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Share the gift of wellness with beautifully designed gift cards available in any amount. 
                  Perfect for birthdays, anniversaries, or any special occasion.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-montserrat font-light">$50 - $500</span>
                  <Link to="/membership">
                  <button className="bg-white text-sage px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors">
                    Purchase
                  </button>
                  </Link>
                </div>
              </div>
            </AnimatedSection> */}
          </div>
        </div>
      </section>

      {/* Spa Locator Section */}
      <section id="spa-locator" className="py-20" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-6">
              Find Our Sanctuary
            </h2>
            <p className="text-lg text-gray-600">
              Discover Aroma Spa Location.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AnimatedSection className="lg:col-span-2">
  <div className="bg-gray-200 rounded-2xl h-96 overflow-hidden">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7611.850252871066!2d78.2990486935791!3d17.46329740000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93fde0615921%3A0x298fbac9ad2c578b!2sAroma%20Spa!5e0!3m2!1sen!2sin!4v1757660121852!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</AnimatedSection>


            <AnimatedSection>
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-3">Aroma spa</h3>
                  <p className="text-gray-600 mb-3">5th Floor,Above Fabindia Store,Opp.Aparna Sarovar Apartments,Nallagandla Main Road<br />Hyderabad, Telangana, 500046</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Sun: 10:00 AM - 9:00 PM
                  </div>
                  <p className="text-sage font-medium">9318629318</p>
                </div>

                {/* <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-3">Beverly Hills</h3>
                  <p className="text-gray-600 mb-3">456 Rodeo Drive<br />Beverly Hills, CA 90210</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Sun: 8:00 AM - 10:00 PM
                  </div>
                  <p className="text-sage font-medium">(310) 555-0123</p>
                </div> */}

                {/* <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-3">South Beach</h3>
                  <p className="text-gray-600 mb-3">789 Ocean Drive<br />Miami Beach, FL 33139</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    Mon-Sun: 9:00 AM - 9:00 PM
                  </div>
                  <p className="text-sage font-medium">(305) 555-0123</p>
                </div> */}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      {/* <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-6">
              wellness wisdom
            </h2>
            <p className="text-lg text-gray-600">
              Insights, tips, and inspiration for your wellness journey.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 100}
                animation="fade-in-up"
              >
                <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 scale-on-hover">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-montserrat text-xl font-semibold mb-3 text-gray-900">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <button className="text-sage hover:text-sage-dark font-medium transition-colors">
                      Read More →
                    </button>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <button className="bg-sage hover:bg-sage-dark text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
              View All Posts
            </button>
          </AnimatedSection>
        </div>
      </section> */}
    </div>
  );
};

export default Home;