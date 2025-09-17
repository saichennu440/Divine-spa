// import React, { useState, useEffect } from "react";

// const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
//   const [isAnimating, setIsAnimating] = useState(true);
//   const [showText, setShowText] = useState(false);

//   useEffect(() => {
//     const textTimer = setTimeout(() => setShowText(true), 800);
//     const completeTimer = setTimeout(() => {
//       setIsAnimating(false);
//       setTimeout(onComplete, 500);
//     }, 3500);
//     return () => {
//       clearTimeout(textTimer);
//       clearTimeout(completeTimer);
//     };
//   }, [onComplete]);

//   // Angles for 6 petals (left here intentionally — not used after replacing SVG)
//   const angles = [0, 60, 120, 180, 240, 300];

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
//         isAnimating ? "opacity-100" : "opacity-0"
//       }`}
//       style={{
//         background: "linear-gradient(135deg, #d0461f 0%, #d24325 50%, #b8391a 100%)",
//       }}
//     >
//       {/* Background Particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 2}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Center Content */}
//       <div className="relative flex flex-col items-center">
//         {/* Replaced SVG with lotus image */}
//         {/* Replace '/assets/lotus.png' with your actual path or import */}
//         <img
//           src="/home/lotus.png"
//           alt="Lotus"
//           className="lotus-img mb-8"
//           style={{ ["--img-delay" as any]: "0.18s" } as React.CSSProperties}
//         />

//         {/* Handwritten Cursive Text with Typing */}
//         <div
//           className={`w-full max-w-md text-center transition-all duration-700 transform ${
//             showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//           }`}
//         >
//           <h1
//             className="text-4xl md:text-5xl text-white font-allura typing"
//             style={{ animationDelay: "1.0s" }}
//           >
//             Feel The Heaven
//           </h1>

//           <div
//             className="w-24 h-0.5 bg-white/60 mx-auto my-4 transform scale-x-0 animate-scaleX"
//             style={{ animationDelay: "2.5s" }}
//           />

//           <p
//             className="text-white/90 text-lg font-light tracking-wider animate-fadeInUp"
//             style={{ animationDelay: "2.7s" }}
//           >
//             Aroma Spa
//           </p>
//         </div>

//         {/* Loading Dots */}
//         <div
//           className={`absolute bottom-14 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
//             showText ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <div className="flex space-x-2">
//             {[0, 1, 2].map((i) => (
//               <div
//                 key={i}
//                 className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
//                 style={{ animationDelay: `${i * 0.2}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Custom Styles */}
//       <style>{`
//         /* Cursive Font Import */
//         @import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');
//         .font-allura { font-family: 'Allura', cursive; }

//         /* lotus image appear animation (from down -> up with small overshoot) and gentle float */
//         .lotus-img {
//           width: 120px; /* default width, change as needed or make responsive with CSS */
//           height: auto;
//           display: block;
//           transform-origin: center;
//           opacity: 0;
//           transform: translateY(36px) scale(0.94);
//           will-change: transform, opacity;
//           animation:
//             lotusAppear 780ms cubic-bezier(.2,.9,.3,1) forwards var(--img-delay),
//             lotusFloat 6s ease-in-out infinite 1.3s;
//           filter: drop-shadow(0 6px 14px rgba(0,0,0,0.14));
//         }

//         @keyframes lotusAppear {
//           0% {
//             opacity: 0;
//             transform: translateY(36px) scale(0.94);
//           }
//           65% {
//             opacity: 1;
//             transform: translateY(-8px) scale(1.02);
//           }
//           100% {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @keyframes lotusFloat {
//           0% { transform: translateY(0) scale(1); }
//           50% { transform: translateY(-6px) scale(1.01); }
//           100% { transform: translateY(0) scale(1); }
//         }

//         /* Typing Effect (kept as in original) */
//         .typing {
//           overflow: hidden;
//           white-space: nowrap;
//           border-right: 2px solid rgba(255,255,255,0.8);
//           width: 0;
//           animation:
//             typing 2.5s steps(30,end) forwards,
//             blinkCaret 0.75s step-end infinite 3.5s;
//         }
//         @keyframes typing {
//           from { width: 0; }
//           to { width: 100%; }
//         }
//         @keyframes blinkCaret {
//           50% { border-color: transparent; }
//         }

//         /* Fade & Underline */
//         @keyframes fadeInUp {
//           0% { opacity: 0; transform: translateY(20px); }
//           100% { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeInUp {
//           opacity: 0;
//           animation: fadeInUp 0.8s ease-out forwards;
//         }
//         @keyframes scaleX {
//           0% { transform: scaleX(0); }
//           100% { transform: scaleX(1); }
//         }
//         .animate-scaleX { animation: scaleX 1s ease-out forwards; }

//         /* Accessibility: respect reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           .lotus-img { animation: none !important; opacity: 1 !important; transform: none !important; }
//         }

//         /* small screens: slightly smaller lotus */
//         @media (max-width: 640px) {
//           .lotus-img { width: 92px; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SplashScreen;
