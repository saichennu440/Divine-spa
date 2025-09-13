import React, { useRef, useState, useEffect, useCallback } from "react";
import Slider, { Settings } from "react-slick";
import TestimonialCard from "./TestimonialCard";
import AnimatedSection from "./AnimatedSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./testimonial-dots.css";

interface Review {
  name: string;
  city?: string;
  rating: number;
  review: string;
  avatar_url?: string | null;
}

interface TestimonialsCarouselProps {
  reviews: Review[];
  loading: boolean;
}

const getSlidesToShow = (width: number) => {
  if (width < 768) return 1;
  if (width < 1024) return 2;
  return 3;
};

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ reviews, loading }) => {
  const sliderRef = useRef<Slider | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [slidesToShow, setSlidesToShow] = useState<number>(() =>
    typeof window !== "undefined" ? getSlidesToShow(window.innerWidth) : 3
  );

  // Restore previous dots logic state
  const [dotOffset, setDotOffset] = useState<number>(0);

  // Update slidesToShow on resize (debounced via RAF)
  useEffect(() => {
    let rafId: number | null = null;
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const newVal = getSlidesToShow(window.innerWidth);
        setSlidesToShow((prev) => (prev !== newVal ? newVal : prev));
      });
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Reset activeIndex & dotOffset when reviews length or slidesToShow change
  useEffect(() => {
    if (activeIndex > Math.max(0, reviews.length - 1)) setActiveIndex(0);
    setDotOffset(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews.length, slidesToShow]);

  // Slider settings driven by slidesToShow
  const settings: Settings = {
    infinite: reviews.length > slidesToShow,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    autoplay: reviews.length > slidesToShow,
    autoplaySpeed: 4000,
    beforeChange: (_: number, next: number) => setActiveIndex(next),
    arrows: false,
    dots: false,
    adaptiveHeight: true,
    swipeToSlide: true,
    touchThreshold: 5,
    draggable: true,
    responsive: [], // handled by JS-driven slidesToShow
  };

const renderDots = useCallback(() => {
  const totalSlides = reviews.length;
  if (!totalSlides || totalSlides === 1) return null;

  const visibleCount = Math.min(3, totalSlides);
  const previewCount = Math.min(2, totalSlides - visibleCount); // show 2 small dots after main ones

  const visibleDots = Array.from({ length: visibleCount }, (_, i) => (dotOffset + i) % totalSlides);
  const previewDots = Array.from({ length: previewCount }, (_, i) => (dotOffset + visibleCount + i) % totalSlides);

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {/* Main visible dots */}
      {visibleDots.map((slideIndex, i) => {
        const isActive = activeIndex === slideIndex;
        return (
          <button
            key={`main-${slideIndex}`}
            onClick={() => {
              if (sliderRef.current) {
                sliderRef.current.slickGoTo(slideIndex);
                if (i === visibleCount - 1) {
                  setDotOffset((prev) => (prev + 1) % totalSlides);
                }
              }
            }}
            aria-label={`Go to slide ${slideIndex + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              isActive ? "bg-sage scale-125" : "bg-gray-300 scale-100"
            }`}
          />
        );
      })}

      {/* Preview dots (smaller, lighter) */}
      {previewDots.map((slideIndex) => (
        <div
          key={`preview-${slideIndex}`}
          className="w-2 h-2 rounded-full bg-gray-300 opacity-50"
        />
      ))}
    </div>
  );
}, [reviews.length, dotOffset, activeIndex]);


  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-6">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from those who have experienced the aroma Spa difference.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse h-full"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Force Slider re-init when slidesToShow changes */}
            <Slider key={slidesToShow} ref={sliderRef} {...settings}>
              {reviews.map((review: Review, index: number) => (
                <div key={index} className="px-4 testimonial-slide">
                  <div className="w-full h-full">
                    <TestimonialCard
                      name={review.name}
                      city={review.city || "Guest"}
                      rating={review.rating}
                      text={review.review}
                      avatar={review.avatar_url}
                    />
                  </div>
                </div>
              ))}
            </Slider>

            {renderDots()}
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
