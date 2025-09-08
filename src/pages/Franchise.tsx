// import React from 'react';
// import { TrendingUp, Users, Heart, Award, DollarSign, MapPin, Phone, Mail } from 'lucide-react';
// import AnimatedSection from '../components/AnimatedSection';

// const Franchise: React.FC = () => {
//   const benefits = [
//     {
//       icon: <TrendingUp className="h-8 w-8" />,
//       title: 'Growing Market',
//       description: 'Join the $18B+ wellness industry with proven demand and strong growth projections.'
//     },
//     {
//       icon: <Award className="h-8 w-8" />,
//       title: 'Proven Brand',
//       description: 'Leverage our established reputation and award-winning spa services.'
//     },
//     {
//       icon: <Users className="h-8 w-8" />,
//       title: 'Ongoing Support',
//       description: 'Comprehensive training, marketing support, and operational guidance.'
//     },
//     {
//       icon: <Heart className="h-8 w-8" />,
//       title: 'Meaningful Impact',
//       description: 'Build a business that transforms lives and promotes wellness in your community.'
//     }
//   ];

//   const investmentBreakdown = [
//     { item: 'Initial Franchise Fee', amount: '$45,000' },
//     { item: 'Equipment & Build-out', amount: '$150,000 - $250,000' },
//     { item: 'Initial Inventory', amount: '$15,000 - $25,000' },
//     { item: 'Marketing Launch', amount: '$10,000 - $20,000' },
//     { item: 'Working Capital', amount: '$25,000 - $50,000' }
//   ];

//   const requirements = [
//     'Liquid capital of $150,000+',
//     'Net worth of $350,000+',
//     'Passion for wellness and customer service',
//     'Business or management experience preferred',
//     'Commitment to brand standards and values'
//   ];

//   const process = [
//     {
//       step: '1',
//       title: 'Initial Inquiry',
//       description: 'Submit your franchise application and schedule an initial consultation.'
//     },
//     {
//       step: '2',
//       title: 'Discovery Process',
//       description: 'Attend our Discovery Day and review the Franchise Disclosure Document.'
//     },
//     {
//       step: '3',
//       title: 'Territory Selection',
//       description: 'Choose your location with our site selection and approval assistance.'
//     },
//     {
//       step: '4',
//       title: 'Training & Launch',
//       description: 'Complete comprehensive training and launch your aroma spa location.'
//     }
//   ];

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-b from-cream to-white ">
//         <div className="" />
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <AnimatedSection>
//             <h1 className="text-5xl md:text-6xl font-montserrat font-light mb-8">
//               Own a aroma spa Franchise
//             </h1>
//             <p className="text-xl leading-relaxed max-w-3xl mx-auto mb-8">
//               Join our mission to bring wellness and transformation to communities worldwide. 
//               Build a profitable business while making a meaningful impact on people's lives.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-sage text-white hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl">
//                 Request Information
//               </button>
//               <button className="border-2 border-sage  hover:bg-white hover:text-sage px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
//                 Download Brochure
//               </button>
//             </div>
//           </AnimatedSection>
//         </div>
//       </section>

//       {/* Why aroma spa */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection className="text-center mb-16">
//             <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
//               Why Choose aroma spa Franchise?
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               Partner with a proven wellness brand that combines spiritual wellness with business success.
//             </p>
//           </AnimatedSection>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {benefits.map((benefit, index) => (
//               <AnimatedSection 
//                 key={index}
//                 delay={index * 100}
//                 animation="fade-in-up"
//               >
//                 <div className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scale-on-hover">
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-sage/10 rounded-full mb-6">
//                     <div className="text-sage">
//                       {benefit.icon}
//                     </div>
//                   </div>
//                   <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">
//                     {benefit.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {benefit.description}
//                   </p>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Investment Information */}
//       <section className="py-20 bg-cream">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             <AnimatedSection animation="fade-in-left">
//               <div>
//                 <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
//                   Investment Overview
//                 </h2>
//                 <p className="text-lg text-gray-600 mb-8 leading-relaxed">
//                   Start your aroma spa franchise with a comprehensive investment package 
//                   designed to set you up for success from day one.
//                 </p>

//                 <div className="bg-white rounded-xl p-6 shadow-lg">
//                   <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-6 flex items-center">
//                     <DollarSign className="h-5 w-5 text-sage mr-2" />
//                     Investment Breakdown
//                   </h3>
//                   <div className="space-y-4">
//                     {investmentBreakdown.map((item, index) => (
//                       <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
//                         <span className="text-gray-700">{item.item}</span>
//                         <span className="font-semibold text-sage">{item.amount}</span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-6 pt-4 border-t border-gray-200">
//                     <div className="flex justify-between items-center">
//                       <span className="text-lg font-semibold text-gray-900">Total Investment</span>
//                       <span className="text-xl font-bold text-sage">$245,000 - $390,000</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection animation="fade-in-right">
//               <div className="bg-white rounded-xl p-8 shadow-lg">
//                 <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-6">
//                   Franchise Requirements
//                 </h3>
//                 <div className="space-y-4">
//                   {requirements.map((requirement, index) => (
//                     <div key={index} className="flex items-start">
//                       <div className="w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
//                         <div className="w-2 h-2 bg-sage rounded-full" />
//                       </div>
//                       <span className="text-gray-700">{requirement}</span>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-8 p-4 bg-sage/10 rounded-lg">
//                   <h4 className="font-montserrat text-lg font-semibold text-gray-900 mb-2">Financing Available</h4>
//                   <p className="text-sm text-gray-600">
//                     We work with approved lenders to help qualified candidates secure 
//                     financing for up to 70% of the total investment.
//                   </p>
//                 </div>
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* Franchise Process */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection className="text-center mb-16">
//             <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
//               Your Journey to Ownership
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               We've streamlined the franchise process to make your path to ownership clear and straightforward.
//             </p>
//           </AnimatedSection>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {process.map((step, index) => (
//               <AnimatedSection 
//                 key={index}
//                 delay={index * 100}
//                 animation="fade-in-up"
//               >
//                 <div className="text-center">
//                   <div className="relative mb-6">
//                     <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center text-white text-xl font-bold font-serif mx-auto">
//                       {step.step}
//                     </div>
//                     {index < process.length - 1 && (
//                       <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-sage/30 transform -translate-y-1/2" />
//                     )}
//                   </div>
//                   <h3 className="font-montserrat text-xl font-semibold text-gray-900 mb-4">
//                     {step.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {step.description}
//                   </p>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Success Stories */}
//       <section className="py-20 bg-beige">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection className="text-center mb-16">
//             <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
//               Franchise Success Stories
//             </h2>
//             <p className="text-lg text-gray-600">
//               Hear from successful aroma spa franchise owners about their journey.
//             </p>
//           </AnimatedSection>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <AnimatedSection animation="fade-in-left">
//               <div className="bg-white rounded-2xl p-8 shadow-lg">
//                 <div className="flex items-center mb-6">
//                   <img
//                     src="https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
//                     alt="Sarah Martinez"
//                     className="w-16 h-16 rounded-full mr-4"
//                   />
//                   <div>
//                     <h3 className="font-serif text-lg font-semibold">Sarah Martinez</h3>
//                     <p className="text-gray-600">Austin, Texas • 3 years</p>
//                   </div>
//                 </div>
//                 <blockquote className="text-gray-700 italic mb-4">
//                   "Opening my aroma spa has been the most rewarding business decision I've ever made. 
//                   The support from corporate is exceptional, and seeing the positive impact on my 
//                   community's wellness makes every day meaningful."
//                 </blockquote>
//                 <div className="text-sage font-semibold">
//                   Revenue increased 40% in Year 2
//                 </div>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection animation="fade-in-right">
//               <div className="bg-white rounded-2xl p-8 shadow-lg">
//                 <div className="flex items-center mb-6">
//                   <img
//                     src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
//                     alt="David Chen"
//                     className="w-16 h-16 rounded-full mr-4"
//                   />
//                   <div>
//                     <h3 className="font-serif text-lg font-semibold">David Chen</h3>
//                     <p className="text-gray-600">Denver, Colorado • 2 years</p>
//                   </div>
//                 </div>
//                 <blockquote className="text-gray-700 italic mb-4">
//                   "The aroma spa franchise model is incredibly well-structured. From the initial 
//                   training to ongoing marketing support, they've provided everything needed to build 
//                   a thriving wellness business."
//                 </blockquote>
//                 <div className="text-sage font-semibold">
//                   Broke even in 8 months
//                 </div>
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* Contact Information */}
//       <section className="py-20 bg-sage text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//             <AnimatedSection animation="fade-in-left">
//               <div>
//                 <h2 className="text-4xl font-montserrat font-light mb-6">
//                   Ready to Start Your Journey?
//                 </h2>
//                 <p className="text-xl text-white/90 mb-8 leading-relaxed">
//                   Take the first step towards owning a aroma spa franchise. Our franchise 
//                   development team is ready to guide you through the process.
//                 </p>
//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <Phone className="h-5 w-5 mr-3 text-white/80" />
//                     <span>1-800-aroma-SPA</span>
//                   </div>
//                   <div className="flex items-center">
//                     <Mail className="h-5 w-5 mr-3 text-white/80" />
//                     <span>franchise@aromaspa.in</span>
//                   </div>
//                   <div className="flex items-center">
//                     <MapPin className="h-5 w-5 mr-3 text-white/80" />
//                     <span>Franchise Development Office<br />New York, NY</span>
//                   </div>
//                 </div>
//               </div>
//             </AnimatedSection>

//             <AnimatedSection animation="fade-in-right">
//               <form className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
//                 <h3 className="text-2xl font-montserrat font-semibold mb-6">Request Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="text"
//                     placeholder="First Name"
//                     className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:bg-white/30 transition-colors"
//                   />
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:bg-white/30 transition-colors"
//                   />
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:bg-white/30 transition-colors"
//                   />
//                   <input
//                     type="tel"
//                     placeholder="Phone"
//                     className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:bg-white/30 transition-colors"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Preferred Location"
//                   className="w-full px-4 py-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:bg-white/30 transition-colors mb-4"
//                 />
//                 <select className="w-full px-4 py-3 rounded-lg bg-white/20 text-white focus:outline-none focus:bg-sage/90 transition-colors mb-6">
//                   <option value="">Available Capital</option>
//                   <option value="250k">$250K - $350K</option>
//                   <option value="350k">$350K - $500K</option>
//                   <option value="500k">$500K+</option>
//                 </select>
//                 <button className="w-full bg-white text-sage hover:bg-white/90 py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
//                   Send Information
//                 </button>
//               </form>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Franchise;