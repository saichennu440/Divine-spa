// // src/components/TestimonialsCarousel.tsx
// import React, { useState } from 'react';
// import { useReviews } from '../context/ReviewContext';
// import TestimonialCard from './TestimonialCard';
// import AnimatedSection from '../components/AnimatedSection'; // keep if you have it

// const PAGE_SIZE = 4;

// const TestimonialsCarousel: React.FC = () => {
//   const { publishedReviews } = useReviews();
//   const [page, setPage] = useState(0);

//   const pages = [];
//   for (let i = 0; i < publishedReviews.length; i += PAGE_SIZE) {
//     pages.push(publishedReviews.slice(i, i + PAGE_SIZE));
//   }

//   // no pages -> show nothing (or some seed content)
//   if (pages.length === 0) return null;

//   const canPrev = page > 0;
//   const canNext = page < pages.length - 1;

//   return (
//     <section className="py-20 bg-beige">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <AnimatedSection className="text-center mb-8">
//           <h2 className="text-4xl md:text-5xl font-montserrat font-light text-gray-900 mb-3">what our guests say</h2>
//           <p className="text-lg text-gray-600">hear from those who have experienced the aroma spa difference.</p>
//         </AnimatedSection>

//         <div className="relative">
//           {/* Grid of up to 4 cards */}
        
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
//   {pages[page].map((t, idx) => (
//     <AnimatedSection key={t.id} delay={idx * 80} animation="fade-in-up">
//       {/* wrapper ensures AnimatedSection doesn't collapse the child's height */}
//       <div className="h-full">
//         <TestimonialCard
//           name={t.name}
//           city={t.city || ''}
//           rating={t.rating}
//           text={t.review}
//           avatar={t.avatar ?? undefined}
//         />
//       </div>
//     </AnimatedSection>
//   ))}
//         </div>
//           {/* Controls */}
//           <div className="flex items-center justify-center space-x-4 mt-8">
//             <button
//               onClick={() => setPage(p => Math.max(0, p - 1))}
//               disabled={!canPrev}
//               aria-label="Previous testimonials"
//               className={`px-4 py-2 rounded-full border ${canPrev ? 'bg-white hover:shadow' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
//             >
//               Prev
//             </button>

//             <div className="text-sm text-gray-600">
//               Page {page + 1} of {pages.length}
//             </div>

//             <button
//               onClick={() => setPage(p => Math.min(pages.length - 1, p + 1))}
//               disabled={!canNext}
//               aria-label="Next testimonials"
//               className={`px-4 py-2 rounded-full border ${canNext ? 'bg-white hover:shadow' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialsCarousel;
