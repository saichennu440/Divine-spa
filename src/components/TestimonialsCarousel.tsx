import { useRef, useState, useEffect } from "react";
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

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ reviews, loading }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dotOffset, setDotOffset] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);
  const sliderRef = useRef<Slider | null>(null);

 const settings: Settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 3, // desktop stays the same
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  beforeChange: (_: number, next: number) => setActiveIndex(next),
  arrows: false,
  dots: false,
  responsive: [
    {
      breakpoint: 640, // below 640px (mobile)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


  // Measure tallest card after render
useEffect(() => {
  if (!reviews.length) return;

  const updateHeights = () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    let maxHeight = 0;
    slides.forEach((slide) => {
      (slide as HTMLElement).style.height = "auto"; // reset first
      const h = (slide as HTMLElement).offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    slides.forEach((slide) => {
      (slide as HTMLElement).style.height = `${maxHeight}px`;
    });
  };

  // Run once after mount
  updateHeights();

  // Run again on window resize
  window.addEventListener("resize", updateHeights);
  return () => window.removeEventListener("resize", updateHeights);
}, [reviews]);


  const renderDots = () => {
    const totalSlides = reviews.length;
    const visibleDots = [0, 1, 2].map(i => (dotOffset + i) % totalSlides);

    return (
      <div className="flex justify-center space-x-2 mt-6">
        {visibleDots.map((slideIndex, i) => {
          const isActive = activeIndex === slideIndex;
          return (
            <button
              key={slideIndex}
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.slickGoTo(slideIndex);
                  if (i === 2) {
                    setDotOffset((dotOffset + 1) % totalSlides);
                  }
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isActive ? "bg-sage scale-125" : "bg-gray-300"
              }`}
            ></button>
          );
        })}
      </div>
    );
  };

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
            <Slider ref={sliderRef} {...settings}>
              {reviews.map((review: Review, index: number) => (
               <div key={index} className="px-4 testimonial-slide">
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
            {renderDots()}
          </>
        )}
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
