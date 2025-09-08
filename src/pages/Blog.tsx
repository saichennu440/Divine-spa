// import React from 'react';
// import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react';
// import AnimatedSection from '../components/AnimatedSection';

// const Blog: React.FC = () => {
//   const featuredPost = {
//     title: 'The Sacred Art of Self-Care: A Journey to Inner Wellness',
//     excerpt: 'Discover how ancient wellness practices can transform your modern life. Learn about the profound connection between mindful self-care and spiritual well-being in our comprehensive guide to holistic wellness.',
//     image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop',
//     author: 'Dr. Sarah Wellness',
//     date: '2024-01-20',
//     readTime: '12 min read',
//     category: 'Wellness'
//   };

//   const blogPosts = [
//     {
//       title: 'Benefits of Regular Massage Therapy for Mental Health',
//       excerpt: 'Explore the scientific evidence behind massage therapy\'s positive impact on stress, anxiety, and overall mental wellness.',
//       image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
//       author: 'Maria Rodriguez',
//       date: '2024-01-18',
//       readTime: '8 min read',
//       category: 'Mental Health'
//     },
//     {
//       title: 'Seasonal Skincare: Adapting Your Routine for Winter',
//       excerpt: 'Learn how to adjust your skincare regimen to combat winter dryness and maintain healthy, glowing skin.',
//       image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
//       author: 'Emily Chen',
//       date: '2024-01-15',
//       readTime: '6 min read',
//       category: 'Skincare'
//     },
//     {
//       title: 'The Power of Aromatherapy in Stress Relief',
//       excerpt: 'Discover how essential oils can naturally reduce stress and promote relaxation in your daily life.',
//       image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
//       author: 'James Thompson',
//       date: '2024-01-12',
//       readTime: '7 min read',
//       category: 'Aromatherapy'
//     },
//     {
//       title: 'Creating a Home Spa Experience',
//       excerpt: 'Transform your bathroom into a luxurious spa retreat with these simple tips and DIY treatments.',
//       image: 'https://images.pexels.com/photos/6663461/pexels-photo-6663461.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
//       author: 'Lisa Park',
//       date: '2024-01-10',
//       readTime: '9 min read',
//       category: 'DIY'
//     },
//     {
//       title: 'Understanding Different Types of Facial Treatments',
//       excerpt: 'A comprehensive guide to various facial treatments and how to choose the right one for your skin type.',
//       image: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
//       author: 'Dr. Michael Kim',
//       date: '2024-01-08',
//       readTime: '10 min read',
//       category: 'Treatments'
//     },
//     {
//       title: 'Meditation and Mindfulness in Wellness',
//       excerpt: 'Explore how incorporating meditation into your wellness routine can enhance your spa experiences.',
//       image: 'https://images.pexels.com/photos/3984824/pexels-photo-3984824.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
//       author: 'Anna Wellness',
//       date: '2024-01-05',
//       readTime: '11 min read',
//       category: 'Meditation'
//     }
//   ];

//   const categories = ['All', 'Wellness', 'Mental Health', 'Skincare', 'Aromatherapy', 'DIY', 'Treatments', 'Meditation'];
//   const [selectedCategory, setSelectedCategory] = React.useState('All');

//   const filteredPosts = selectedCategory === 'All' 
//     ? blogPosts 
//     : blogPosts.filter(post => post.category === selectedCategory);

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 bg-gradient-to-b from-cream to-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <AnimatedSection>
//             <h1 className="text-5xl md:text-6xl font-vonigue font-light text-gray-900 mb-8">
//               Wellness Wisdom
//             </h1>
//             <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
//               Discover insights, tips, and inspiration for your wellness journey. Our expert-written articles 
//               cover everything from self-care rituals to the latest in holistic health and beauty.
//             </p>
//           </AnimatedSection>
//         </div>
//       </section>

//       {/* Featured Article */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection>
//             <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//               <div className="grid grid-cols-1 lg:grid-cols-2">
//                 <div className="relative h-64 lg:h-full">
//                   <img
//                     src={featuredPost.image}
//                     alt={featuredPost.title}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-sage text-white px-3 py-1 rounded-full text-sm font-medium">
//                       Featured
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-8 lg:p-12 flex flex-col justify-center">
//                   <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
//                     <div className="flex items-center">
//                       <User className="h-4 w-4 mr-1" />
//                       {featuredPost.author}
//                     </div>
//                     <div className="flex items-center">
//                       <Calendar className="h-4 w-4 mr-1" />
//                       {new Date(featuredPost.date).toLocaleDateString()}
//                     </div>
//                     <div className="flex items-center">
//                       <Clock className="h-4 w-4 mr-1" />
//                       {featuredPost.readTime}
//                     </div>
//                   </div>
//                   <h2 className="text-3xl font-montserrat font-semibold text-gray-900 mb-4">
//                     {featuredPost.title}
//                   </h2>
//                   <p className="text-gray-600 mb-6 leading-relaxed">
//                     {featuredPost.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="inline-flex items-center bg-sage/10 text-sage px-3 py-1 rounded-full text-sm font-medium">
//                       <Tag className="h-3 w-3 mr-1" />
//                       {featuredPost.category}
//                     </span>
//                     <button className="group inline-flex items-center space-x-2 text-sage hover:text-sage-dark font-medium transition-colors">
//                       <span>Read Article</span>
//                       <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </AnimatedSection>
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="py-8 bg-beige">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-wrap justify-center gap-4">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
//                   selectedCategory === category
//                     ? 'bg-sage text-white shadow-md'
//                     : 'bg-white text-gray-700 hover:bg-sage/10 hover:text-sage'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Blog Grid */}
//       <section className="py-16 bg-beige">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredPosts.map((post, index) => (
//               <AnimatedSection 
//                 key={index}
//                 delay={index * 100}
//                 animation="fade-in-up"
//               >
//                 <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 scale-on-hover">
//                   <div className="relative">
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="w-full h-48 object-cover"
//                     />
//                     <div className="absolute top-4 right-4">
//                       <span className="bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
//                         {post.category}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center space-x-3 mb-3 text-xs text-gray-500">
//                       <div className="flex items-center">
//                         <User className="h-3 w-3 mr-1" />
//                         {post.author}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="h-3 w-3 mr-1" />
//                         {new Date(post.date).toLocaleDateString()}
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="h-3 w-3 mr-1" />
//                         {post.readTime}
//                       </div>
//                     </div>
//                     <h3 className="font-serif text-xl font-montserrat mb-3 text-gray-900 line-clamp-2">
//                       {post.title}
//                     </h3>
//                     <p className="text-gray-600 mb-4 line-clamp-3">
//                       {post.excerpt}
//                     </p>
//                     <button className="group inline-flex items-center space-x-2 text-sage hover:text-sage-dark font-medium transition-colors">
//                       <span>Read More</span>
//                       <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </article>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Newsletter Signup */}
//       <section className="py-20 bg-sage text-white">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <AnimatedSection>
//             <h2 className="text-4xl font-montserrat font-light mb-6">
//               Stay Updated with Wellness Insights
//             </h2>
//             <p className="text-xl text-white/90 mb-8 leading-relaxed">
//               Subscribe to our newsletter and receive weekly wellness tips, exclusive spa offers, 
//               and the latest articles delivered to your inbox.
//             </p>
//             <div className="max-w-md mx-auto">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
//                 />
//                 <button className="bg-white text-sage hover:bg-white/90 px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </AnimatedSection>
//         </div>
//       </section>

//       {/* Popular Topics */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <AnimatedSection className="text-center mb-16">
//             <h2 className="text-4xl font-montserrat font-light text-gray-900 mb-6">
//               Popular Wellness Topics
//             </h2>
//             <p className="text-lg text-gray-600">
//               Explore our most popular wellness categories and discover what interests you most.
//             </p>
//           </AnimatedSection>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { name: 'Stress Relief', count: 24, color: 'bg-sage/10 text-sage' },
//               { name: 'Skincare Tips', count: 18, color: 'bg-blue-100 text-blue-700' },
//               { name: 'Massage Benefits', count: 16, color: 'bg-purple-100 text-purple-700' },
//               { name: 'Self-Care', count: 21, color: 'bg-pink-100 text-pink-700' },
//               { name: 'Aromatherapy', count: 12, color: 'bg-green-100 text-green-700' },
//               { name: 'Meditation', count: 15, color: 'bg-indigo-100 text-indigo-700' },
//               { name: 'Wellness Trends', count: 9, color: 'bg-yellow-100 text-yellow-700' },
//               { name: 'Holistic Health', count: 13, color: 'bg-red-100 text-red-700' }
//             ].map((topic, index) => (
//               <AnimatedSection 
//                 key={index}
//                 delay={index * 50}
//                 animation="fade-in"
//               >
//                 <button className={`w-full p-4 rounded-xl ${topic.color} hover:shadow-md transition-all duration-300 hover:scale-105`}>
//                   <div className="font-semibold mb-1">{topic.name}</div>
//                   <div className="text-sm opacity-75">{topic.count} articles</div>
//                 </button>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Blog;