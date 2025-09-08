// import React from 'react';
// import { Clock, Star, ArrowRight } from 'lucide-react';
// import AnimatedSection from '../components/AnimatedSection';
// import { useBooking } from '../context/BookingContext';

// const Services: React.FC = () => {
//     const { openBooking } = useBooking();
//   const serviceCategories = [
//     {
//       category: 'full body therapy',
//       description: 'Relaxing full body therapy therapies — choose duration to suit your time and needs.',
//       services: [
//         { name: 'Swedish Therapy', duration: '90 mins', price: '₹3,800', description: 'Classic Art of Relaxation — long gliding strokes to melt tension and stimulate lymphatic flow.' , features: ['Long gliding strokes','Lymphatic stimulation','Relaxation']},
//         { name: 'Swedish Therapy', duration: '120 mins', price: '₹4,500', description: 'Classic Art of Relaxation — extended session for deeper relaxation.' , features: ['Extended relaxation','Improved circulation']},
//         { name: 'Swedish Therapy', duration: '60 mins', price: '₹2,800', description: 'Quick relaxation session — ideal for busy schedules.' , features: ['Quick unwind','Stress relief']},

//         { name: 'Deep Tissue Therapy', duration: '90 mins', price: '₹4,800', description: 'Intense Relief, Lasting Comfort — targets deep muscle and connective tissue.' , features: ['Deep pressure','Chronic pain relief']},
//         { name: 'Deep Tissue Therapy', duration: '120 mins', price: '₹5,800', description: 'Extended deep tissue session for intensive recovery.' , features: ['Extended therapy','Improved flexibility']},
//         { name: 'Deep Tissue Therapy', duration: '60 mins', price: '₹3,600', description: 'Focused deep work for specific problem areas.' , features: ['Targeted relief','Muscle release']},

//         { name: 'Aromatic Therapy', duration: '90 mins', price: '₹4,300', description: 'Pathway to Inner Bliss — therapy with pure essential oils to calm mind & body.' , features: ['Essential oil blends','Emotional balance']},
//         { name: 'Aromatic Therapy', duration: '120 mins', price: '₹5,300', description: 'Long aromatic journey for deep relaxation.' , features: ['Extended aromatic experience']},
//         { name: 'Aromatic Therapy', duration: '60 mins', price: '₹3,000', description: 'Short aromatic session to recharge and calm.' , features: ['Quick aroma boost']},

//         { name: 'Balinese Therapy', duration: '90 mins', price: '₹4,800', description: 'An Island Escape — acupressure, gentle stretches and rhythmic movements for balance.' , features: ['Acupressure','Rhythmic movements']},
//         { name: 'Balinese Therapy', duration: '120 mins', price: '₹5,800', description: 'Extended Balinese ritual for full body renewal.' , features: ['Extended ritual','Deep balance']},
//         { name: 'Balinese Therapy', duration: '60 mins', price: '₹3,600', description: 'Short Balinese treatment to release tension quickly.' , features: ['Quick stretch & release']}
//       ]
//     },
//     {
//       category: 'signature & tandem therapies',
//       description: 'Our curated signature rituals for an elevated spa experience.',
//       services: [
//         { name: 'Signature Therapy', duration: '90 mins', price: '₹5,300', description: 'A Journey Tailored to You — fusion of traditional and contemporary techniques.' , features: ['Personalized','Luxury oils']},
//         { name: 'Signature Therapy', duration: '120 mins', price: '₹6,000', description: 'Extended signature journey for deep renewal.' , features: ['Extended personalization']},
//         { name: 'Tandem (Four Hands) Therapy', duration: '90 mins', price: '₹6,000', description: 'Where rhythm meets serenity — two therapists working in synchrony.' , features: ['Dual therapists','Harmonized strokes']},
//         { name: 'Tandem (Four Hands) Therapy', duration: '60 mins', price: '₹5,300', description: 'Short tandem session for intense relaxation.' , features: ['Short synchrony experience']}
//       ]
//     },
//     {
//       category: 'herbal & hot stone therapies',
//       description: 'Herbal potli and hot stone rituals that use heat and herbs to heal and restore.',
//       services: [
//         { name: 'Herbal Potli Therapy', duration: '90 mins', price: '₹5,300', description: 'A soothing symphony of heated herbal poultices to melt tension.' , features: ['Herbal compress','Heat therapy']},
//         { name: 'Herbal Potli Therapy', duration: '60 mins', price: '₹4,100', description: 'Short herbal potli session to relax and refresh.' , features: ['Quick herbal relief']},

//         { name: 'Hot Stone Therapy', duration: '90 mins', price: '₹5,300', description: 'Heat, Harmony & Healing — heated stones to penetrate deep into muscles.' , features: ['Heated stones','Deep muscle relaxation']},
//         { name: 'Hot Stone Therapy', duration: '60 mins', price: '₹4,100', description: 'Short hot-stone ritual for targeted warmth & release.' , features: ['Targeted heat therapy']}
//       ]
//     },
//     {
//       category: 'thai therapy',
//       description: 'Assisted-stretch therapies that restore mobility and energy flow.',
//       services: [
//         { name: 'Dry Thai Therapy', duration: '60 mins', price: '₹3,000', description: 'Ancient dance of healing — deep pressure points and assisted stretches (no oils).' , features: ['Assisted stretches','Energy flow']},
//         { name: 'Dry Thai Therapy', duration: '90 mins', price: '₹3,900', description: 'Deeper Thai sequence for improved mobility.' , features: ['Longer sequence']},
//         { name: 'Dry Thai Therapy', duration: '120 mins', price: '₹4,800', description: 'Full Thai session for thorough restoration.' , features: ['Full restoration']}
//       ]
//     },
//     {
//       category: 'full body polishing & scrubs',
//       description: 'Exfoliation rituals to reveal soft, radiant skin.',
//       services: [
//         { name: 'Black Currant Polish (Dry Skin)', duration: '60 mins', price: '₹4,500', description: 'Hydration meets antioxidant indulgence.' , features: ['Hydration','Antioxidants']},
//         { name: 'Chocolate Polish (Brightening)', duration: '60 mins', price: '₹4,500', description: 'Decadent glow and deep nourishment.' , features: ['Brightening','Nourishing']},
//         { name: 'Orange Polish (De-tan)', duration: '60 mins', price: '₹4,500', description: 'Vitamin C radiance to revive dull skin.' , features: ['Vitamin C','De-tan']},
//         { name: 'Body Scrub (with shower)', duration: '60 mins', price: '₹2,800', description: 'Invigorating exfoliation to buff away dullness.' , features: ['Exfoliation','Shower included']}
//       ]
//     },
//     {
//       category: 'clean-ups & facial essentials',
//       description: 'Gentle clean-ups and essential facials for glowing skin.',
//       services: [
//         { name: 'Clean-up (Watermelon / Strawberry)', duration: '30 mins', price: '₹1,200', description: 'Hydration / antioxidant-rich cleanse for tired skin.' , features: ['Antioxidant cleanse']},
//         { name: 'Hydra Dew (Dry & Dehydrated)', duration: '60 mins', price: '₹1,500', description: 'Exquisite moisture therapy to calm and protect.' , features: ['Deep hydration']},
//         { name: 'Rejuvenating (All skin types)', duration: '60 mins', price: '₹1,700', description: 'Revive radiance and improve texture & tone.' , features: ['Texture improvement']},
//         { name: 'Herbal Pearl', duration: '60 mins', price: '₹2,700', description: 'Healing herbal facial for luminous skin.' , features: ['Herbal nourishment']}
//       ]
//     },
//     {
//       category: 'facial — premium & signature',
//       description: 'Curated premium facials for targeted results.',
//       services: [
//         { name: 'Deep Pore Cleansing (Oily Skin)', duration: '60 mins', price: '₹3,300', description: 'Refresh oily skin, smooth and nourish.' , features: ['Pore cleansing']},
//         { name: 'Whitening Facial (Dull & Uneven)', duration: '60 mins', price: '₹3,100', description: 'Sun filter-based brightening to even skin tone.' , features: ['Tone correction']},
//         { name: 'Herbal Gold (Signature)', duration: '60 mins', price: '₹4,500', description: 'Herbal essences delivering visible transformation.' , features: ['Herbal gold']},
//       ]
//     },
//     {
//       category: 'quick therapy & target areas',
//       description: 'Short, focused therapies for instant relief.',
//       services: [
//         { name: 'Foot Reflexology', duration: '30 mins', price: '₹1,000', description: 'Calming leg & foot therapy targeting reflex points.' , features: ['Reflex points']},
//         { name: 'Back Revival Therapy (without shower)', duration: '30 mins', price: '₹1,700', description: 'Targeted back work to release knots and stiffness.' , features: ['Back release']},
//         { name: 'Head, Neck & Shoulder', duration: '30 mins', price: '₹1,200', description: 'Rejuvenating head, neck and shoulder sequence to ease tension.' , features: ['Tension relief']}
//       ]
//     },
//     {
//       category: 'foot pedicure',
//       description: 'Pampering pedicures to nourish, smooth and refresh feet.',
//       services: [
//         { name: 'Moisturising Exotic Pedicure (Kiwi & Strawberry)', duration: '60 mins', price: '₹1,200', description: 'Hydrating exotic pedicure for velvet-smooth feet.' , features: ['Hydration','Exotic fruit extracts']},
//         { name: 'Classic Pedicure (Watermelon & Litchi)', duration: '60 mins', price: '₹1,400', description: 'Classic fruit-based pedicure to restore suppleness.' , features: ['Classic care']},
//         { name: 'Anti-Oxidant Pedicure (Orange & Chocolate)', duration: '60 mins', price: '₹1,700', description: 'Detoxifying and invigorating pedicure.' , features: ['Detox','Invigoration']},
//         { name: 'Brightening & De-Tan Pedicure', duration: '60 mins', price: '₹1,500', description: 'Exfoliating brightening pedicure to reduce tan.' , features: ['Brightening','De-tan']},
//         { name: 'De-Stress Refreshment Pedicure (Cucumber & Peppermint)', duration: '60 mins', price: '₹1,500', description: 'Cooling, soothing pedicure to release stress.' , features: ['Cooling','Soothing']},
//       ]
//     }
//   ];

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-b from-cream to-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <AnimatedSection>
//             <h1 className="text-5xl md:text-6xl font-montserrat font-light text-gray-900 mb-8">
//               our Sacred Services
//             </h1>
//             <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
//               All treatments, durations and prices are updated from the Aroma Spa menu.
//             </p>
//           </AnimatedSection>
//         </div>
//       </section>

//       {/* Services Categories */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {serviceCategories.map((category, categoryIndex) => (
//             <AnimatedSection key={categoryIndex} className="mb-20">
//               <div className="text-center mb-12">
//                 <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-4">
//                   {category.category}
//                 </h2>
//                 <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                   {category.description}
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {category.services.map((service, serviceIndex) => (
//                   <AnimatedSection
//                     key={serviceIndex}
//                     delay={serviceIndex * 80}
//                     animation="fade-in-up"
//                   >
//                     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden scale-on-hover">
//                       <div className="p-8">
//                         <div className="flex justify-between items-start mb-4">
//                           <h3 className="text-xl font-montserrat font-semibold text-gray-900">
//                             {service.name}
//                           </h3>
//                           <div className="text-right">
//                             <div className="text-2xl font-montserrat font-light text-sage mb-1">
//                               {service.price}
//                             </div>
//                             <div className="flex items-center text-sm text-gray-500">
//                               <Clock className="h-4 w-4 mr-1" />
//                               {service.duration}
//                             </div>
//                           </div>
//                         </div>

//                         <p className="text-gray-600 mb-6 leading-relaxed">
//                           {service.description}
//                         </p>

//                         <div className="mb-6">
//                           <h4 className="font-semibold text-gray-900 mb-3">Includes:</h4>
//                           <ul className="space-y-2">
//                             {service.features?.map((feature, featureIndex) => (
//                               <li key={featureIndex} className="flex items-center text-sm text-gray-600">
//                                 <Star className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
//                                 {feature}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>

//                         <button
//                         onClick={() => openBooking({ service: `${service.name} — ${service.duration}` })}
//                          className="w-full bg-sage hover:bg-sage-dark text-white py-3 px-6 rounded-full font-medium transition-all duration-300 hover:shadow-lg flex items-center justify-center space-x-2">
//                           <span>Book This Service</span>
//                           <ArrowRight className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   </AnimatedSection>
//                 ))}
//               </div>
//             </AnimatedSection>
//           ))}
//         </div>
//       </section>

//       {/* Add-On Services */}
//       <section className="py-20 bg-beige">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection className="text-center mb-16">
//             <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
//               enhance Your Experience
//             </h2>
//             <p className="text-lg text-gray-600">
//               Complement any service with our luxurious add-ons.
//             </p>
//           </AnimatedSection>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {[
//               { name: 'Aromatherapy Upgrade', price: '+₹2,000', description: 'Premium essential oil blend' },
//               { name: 'Hot Stone Addition', price: '+₹2,800', description: 'Heated basalt stones' },
//               { name: 'CBD Infusion', price: '+₹3,600', description: 'Therapeutic CBD products' },
//               { name: 'Extended Session (30 mins)', price: '+₹4,800', description: 'Additional 30 minutes' }
//             ].map((addon, index) => (
//               <AnimatedSection key={index} delay={index * 100}>
//                 <div className="bg-white rounded-lg p-6 text-center shadow hover:shadow-lg transition-shadow">
//                   <h3 className="font-montserrat text-lg font-semibold mb-2">{addon.name}</h3>
//                   <p className="text-2xl font-light text-sage mb-2">{addon.price}</p>
//                   <p className="text-sm text-gray-600">{addon.description}</p>
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-sage text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <AnimatedSection>
//             <h2 className="text-4xl font-montserrat font-light mb-6">
//               ready to Begin Your Wellness Journey?
//             </h2>
//             <p className="text-xl text-white/90 mb-8 leading-relaxed">
//               Book your appointment today and discover why Aroma Spa is the ultimate destination for relaxation.
//             </p>
//             <button 
//             onClick={() => openBooking({ service: 'Book An Appointment' })} className="bg-white text-sage hover:bg-white/90 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-xl">
//               Book An Appointment
//             </button>
//           </AnimatedSection>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Services;
