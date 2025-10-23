// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { gsap } from 'gsap';
// import axios from 'axios';

// const Home = () => {
//   const heroRef = useRef(null);
//   const [featuredProjects, setFeaturedProjects] = useState([]);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [activeModel, setActiveModel] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   // 3D Models data
//   const models = [
//     {
//       id: 1,
//       name: "Architectural Tower",
//       type: "architecture",
//       icon: "🏛️",
//       color: "from-blue-500 to-cyan-500",
//       vertices: 12500,
//       textures: "4K PBR",
//       polygons: "250k"
//     },
//     {
//       id: 2,
//       name: "Product Design",
//       type: "product",
//       icon: "📱",
//       color: "from-purple-500 to-pink-500",
//       vertices: 8500,
//       textures: "2K PBR",
//       polygons: "150k"
//     },
//     {
//       id: 3,
//       name: "Character Model",
//       type: "character",
//       icon: "👤",
//       color: "from-green-500 to-emerald-500",
//       vertices: 20000,
//       textures: "4K PBR",
//       polygons: "400k"
//     },
//     {
//       id: 4,
//       name: "Vehicle Model",
//       type: "vehicle",
//       icon: "🚗",
//       color: "from-orange-500 to-red-500",
//       vertices: 15000,
//       textures: "4K PBR",
//       polygons: "300k"
//     }
//   ];

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => setIsLoading(false), 2000);

//     // Mouse move effect for 3D parallax
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 40,
//         y: (e.clientY / window.innerHeight - 0.5) * 40
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     // GSAP animations
//     const tl = gsap.timeline();
    
//     // Animate floating elements
//     tl.fromTo('.floating-element', 
//       { y: 100, opacity: 0, rotationY: 180 },
//       { 
//         y: 0, 
//         opacity: 1, 
//         rotationY: 0, 
//         duration: 1.5, 
//         stagger: 0.2, 
//         ease: 'back.out(1.7)' 
//       }
//     );

//     // Animate main content
//     tl.fromTo('.hero-content', 
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
//       '-=1'
//     );

//     // Continuous floating animation
//     gsap.to('.float-slow', {
//       y: 20,
//       duration: 3,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut'
//     });

//     gsap.to('.float-fast', {
//       y: 15,
//       duration: 2,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut'
//     });

//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Auto rotate models
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModel((prev) => (prev + 1) % models.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <div className="pt-16 overflow-hidden">
//       {/* Enhanced Hero Section with 3D Environment */}
//       <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
//         {/* 3D Grid Background */}
//         <div className="absolute inset-0 opacity-20">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(rgba(147, 51, 234, 0.05) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(147, 51, 234, 0.05) 1px, transparent 1px)
//               `,
//               backgroundSize: '100px 100px, 100px 100px, 20px 20px, 20px 20px',
//               transform: `perspective(1000px) rotateX(${5 + mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
//               transition: 'transform 0.1s ease-out'
//             }}
//           ></div>
//         </div>

//         {/* Floating 3D Shapes */}
//         <FloatingShapes mousePosition={mousePosition} />

//         <div className="container mx-auto relative z-20">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
//             {/* Left Content */}
//             <div className="flex-1 hero-content text-center lg:text-left">
//               <div className="floating-element inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6 backdrop-blur-sm">
//                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
//                 Professional 3D Modeling & Animation Studio
//               </div>

//               <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
//                 Crafting
//                 <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
//                   Digital Worlds
//                 </span>
//               </h1>

//               <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
//                 Transforming your vision into stunning 3D reality with cutting-edge 
//                 modeling, photorealistic rendering, and immersive animations.
//               </p>

//               {/* Interactive Model Stats */}
//               <div className="floating-element mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-gray-400">Active Model:</span>
//                   <span className="text-blue-400 font-semibold flex items-center">
//                     {models[activeModel].icon} {models[activeModel].name}
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <div className="text-2xl font-bold text-white">{models[activeModel].vertices.toLocaleString()}</div>
//                     <div className="text-gray-400 text-sm">Vertices</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">{models[activeModel].textures}</div>
//                     <div className="text-gray-400 text-sm">Textures</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">{models[activeModel].polygons}</div>
//                     <div className="text-gray-400 text-sm">Polygons</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link 
//                   to="/contact" 
//                   className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center justify-center relative overflow-hidden"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     Get in touch
//                     <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </Link>
                
//                 <Link 
//                   to="/" 
//                   className="group border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
//                 >
//                   <span className="relative z-10">Resume</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </Link>
//               </div>
//             </div>

//             {/* Right - Interactive 3D Model Viewer */}
//             <div className="flex-1 flex justify-center items-center">
//               <InteractiveModelViewer 
//                 activeModel={activeModel} 
//                 models={models}
//                 mousePosition={mousePosition}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Enhanced Services with 3D Icons */}
//       <EnhancedServicesSection />
      
//       {/* 3D Process Timeline */}
//       <Process3DTimeline />
      
//       {/* Interactive Project Showcase */}
//       <InteractiveProjectShowcase />
      
//       {/* Technology Stack with 3D Cards */}
//       <TechnologyStack3D />
      
//       {/* Enhanced CTA with 3D Elements */}
//       <EnhancedCTASection3D />
//     </div>
//   );
// };

// // Floating 3D Shapes Component
// const FloatingShapes = ({ mousePosition }) => {
//   return (
//     <>
//       {/* Large Floating Cube */}
//       <div 
//         className="floating-element absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-400/20 float-slow"
//         style={{
//           transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(50px)`
//         }}
//       >
//         <div className="absolute inset-2 bg-blue-500/20 rounded-lg border border-blue-400/30"></div>
//       </div>

//       {/* Floating Pyramid */}
//       <div 
//         className="floating-element absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 float-fast"
//         style={{
//           transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(30px)`,
//           clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
//         }}
//       ></div>

//       {/* Floating Sphere */}
//       <div 
//         className="floating-element absolute top-1/3 right-1/3 w-20 h-20 bg-green-500/10 rounded-full backdrop-blur-sm border border-green-400/20 float-slow"
//         style={{
//           transform: `perspective(1000px) rotateX(${mousePosition.y * 0.4}deg) rotateY(${mousePosition.x * 0.4}deg) translateZ(40px)`
//         }}
//       ></div>

//       {/* Floating Torus */}
//       <div 
//         className="floating-element absolute bottom-1/4 left-1/3 w-28 h-28 bg-orange-500/10 rounded-full backdrop-blur-sm border border-orange-400/20 float-fast"
//         style={{
//           transform: `perspective(1000px) rotateX(${mousePosition.y * 0.6}deg) rotateY(${mousePosition.x * 0.6}deg) translateZ(20px)`
//         }}
//       >
//         <div className="absolute inset-4 bg-orange-500/20 rounded-full border border-orange-400/30"></div>
//       </div>
//     </>
//   );
// };

// // Interactive 3D Model Viewer Component
// const InteractiveModelViewer = ({ activeModel, models, mousePosition }) => {
//   const currentModel = models[activeModel];

//   return (
//     <div className="relative w-96 h-96">
//       {/* Main 3D Model Container */}
//       <div 
//         className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 backdrop-blur-sm overflow-hidden"
//         style={{
//           transform: `perspective(1500px) rotateX(${5 + mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
//           transition: 'transform 0.1s ease-out',
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         {/* 3D Model Scene */}
//         <div className="absolute inset-0 flex items-center justify-center">
          
//           {/* Dynamic 3D Model based on type */}
//           <div className={`relative w-64 h-64 transition-all duration-1000 ${
//             currentModel.type === 'architecture' ? 'architecture-model' :
//             currentModel.type === 'product' ? 'product-model' :
//             currentModel.type === 'character' ? 'character-model' :
//             'vehicle-model'
//           }`}>
            
//             {/* Base Shape */}
//             <div className={`absolute inset-0 bg-gradient-to-br ${currentModel.color} rounded-2xl transform transition-all duration-1000 ${
//               currentModel.type === 'architecture' ? 'skew-x-2 skew-y-2 shadow-2xl' :
//               currentModel.type === 'product' ? 'rotate-12 scale-95 shadow-xl' :
//               currentModel.type === 'character' ? 'scale-105 shadow-2xl' :
//               'rotate-6 scale-100 shadow-xl'
//             }`}>
              
//               {/* Model Details */}
//               {currentModel.type === 'architecture' && (
//                 <>
//                   <div className="absolute top-4 left-4 right-4 h-8 bg-white/30 rounded-lg shadow-inner"></div>
//                   <div className="absolute top-14 left-6 right-6 h-4 bg-white/20 rounded"></div>
//                   <div className="absolute bottom-8 left-4 right-4 h-6 bg-white/20 rounded"></div>
//                   <div className="absolute left-6 top-1/2 w-12 h-24 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
//                   <div className="absolute right-6 top-1/2 w-8 h-20 bg-white/20 rounded -translate-y-1/2"></div>
//                 </>
//               )}
              
//               {currentModel.type === 'product' && (
//                 <>
//                   <div className="absolute top-8 left-8 right-8 h-24 bg-white/20 rounded-lg shadow-inner"></div>
//                   <div className="absolute bottom-12 left-12 right-12 h-2 bg-white/30 rounded"></div>
//                   <div className="absolute bottom-8 left-16 right-16 h-1 bg-white/40 rounded"></div>
//                   <div className="absolute top-4 left-1/2 w-1 h-4 bg-white/50 rounded -translate-x-1/2"></div>
//                 </>
//               )}
              
//               {currentModel.type === 'character' && (
//                 <>
//                   <div className="absolute top-8 left-1/2 w-16 h-16 bg-white/30 rounded-full -translate-x-1/2 shadow-inner"></div>
//                   <div className="absolute top-24 left-1/2 w-24 h-32 bg-white/25 rounded-lg -translate-x-1/2 shadow-lg"></div>
//                   <div className="absolute bottom-12 left-12 w-8 h-16 bg-white/20 rounded-lg"></div>
//                   <div className="absolute bottom-12 right-12 w-8 h-16 bg-white/20 rounded-lg"></div>
//                 </>
//               )}
              
//               {currentModel.type === 'vehicle' && (
//                 <>
//                   <div className="absolute top-12 left-6 right-6 h-8 bg-white/25 rounded-lg shadow-inner"></div>
//                   <div className="absolute bottom-16 left-4 right-4 h-12 bg-white/20 rounded-lg"></div>
//                   <div className="absolute bottom-8 left-8 w-12 h-8 bg-white/30 rounded-full"></div>
//                   <div className="absolute bottom-8 right-8 w-12 h-8 bg-white/30 rounded-full"></div>
//                 </>
//               )}
//             </div>

//             {/* Animated Elements */}
//             <div className="absolute top-4 right-4 w-6 h-6 bg-white/40 rounded-full animate-ping"></div>
//             <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
//             <div className="absolute top-1/2 left-4 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
//           </div>
//         </div>

//         {/* Grid Floor */}
//         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent">
//           <div 
//             className="absolute inset-0 opacity-30"
//             style={{
//               backgroundImage: `linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.3) 95%),
//                                linear-gradient(transparent 95%, rgba(255,255,255,0.3) 95%)`,
//               backgroundSize: '40px 40px'
//             }}
//           ></div>
//         </div>

//         {/* Model Info HUD */}
//         <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-white font-bold text-lg">{currentModel.name}</div>
//               <div className="text-gray-400 text-sm">3D Model Preview</div>
//             </div>
//             <div className="text-3xl">{currentModel.icon}</div>
//           </div>
//           <div className="flex justify-between mt-2 text-xs text-gray-400">
//             <span>Vertices: {currentModel.vertices.toLocaleString()}</span>
//             <span>Textures: {currentModel.textures}</span>
//             <span>Polygons: {currentModel.polygons}</span>
//           </div>
//         </div>

//         {/* View Controls */}
//         <div className="absolute top-6 right-6 flex gap-2">
//           <button className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm">
//             ↻
//           </button>
//           <button className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm">
//             ⊞
//           </button>
//         </div>
//       </div>

//       {/* Orbiting Elements */}
//       <div 
//         className="absolute -top-6 -right-6 w-20 h-20 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30 animate-spin-slow"
//         style={{ animationDuration: '15s' }}
//       ></div>
//       <div 
//         className="absolute -bottom-8 -left-8 w-24 h-24 bg-purple-500/20 rounded-full backdrop-blur-sm border border-purple-400/30 animate-spin-slow"
//         style={{ animationDuration: '20s', animationDirection: 'reverse' }}
//       ></div>
//     </div>
//   );
// };

// // Loading Screen Component
// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
//       <div className="text-center">
//         <div className="relative w-20 h-20 mx-auto mb-4">
//           <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
//           <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
//           <div className="absolute inset-2 border-4 border-purple-500/30 rounded-full"></div>
//           <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{animationDirection: 'reverse'}}></div>
//         </div>
//         <div className="text-white text-lg font-semibold">Loading 3D Environment</div>
//         <div className="text-gray-400 text-sm mt-2">Initializing models and textures...</div>
//       </div>
//     </div>
//   );
// };

// // Enhanced Services Section with 3D Cards
// const EnhancedServicesSection = () => {
//   const services = [
//     {
//       icon: '🏛️',
//       title: 'Architectural 3D',
//       description: 'Stunning architectural visualizations and walkthroughs',
//       features: ['Building Modeling', 'Interior Design', 'Landscape Integration'],
//       color: 'blue',
//       model: 'architecture'
//     },
//     {
//       icon: '📱',
//       title: 'Product Modeling',
//       description: 'High-quality product models for marketing and prototyping',
//       features: ['Industrial Design', '3D Printing', 'E-commerce'],
//       color: 'purple',
//       model: 'product'
//     },
//     {
//       icon: '👤',
//       title: 'Character Design',
//       description: 'Detailed character models for games and animations',
//       features: ['Character Sculpting', 'Rigging', 'Animation Ready'],
//       color: 'green',
//       model: 'character'
//     },
//     {
//       icon: '🎬',
//       title: '3D Animation',
//       description: 'Professional animation services for all media',
//       features: ['Motion Graphics', 'Character Animation', 'Visual Effects'],
//       color: 'orange',
//       model: 'animation'
//     }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-800/30 relative overflow-hidden">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our <span className="text-blue-400">3D Services</span>
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Comprehensive 3D solutions crafted with precision and artistic excellence
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {services.map((service, index) => (
//             <div 
//               key={index}
//               className="group relative bg-slate-800/50 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-blue-500/50 backdrop-blur-sm"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 perspective: '1000px'
//               }}
//             >
//               {/* 3D Card Effect */}
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
//               {/* Service Icon with 3D Effect */}
//               <div className="relative mb-6">
//                 <div className={`w-16 h-16 mx-auto bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg transform group-hover:rotate-y-180 transition-transform duration-700`}>
//                   {service.icon}
//                 </div>
//                 <div className={`absolute inset-0 bg-${service.color}-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
//               </div>

//               <h3 className="text-xl font-bold text-white text-center mb-4">{service.title}</h3>
//               <p className="text-gray-400 text-center mb-6 leading-relaxed">{service.description}</p>
              
//               <ul className="space-y-3">
//                 {service.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center text-sm text-gray-300">
//                     <div className={`w-2 h-2 bg-${service.color}-500 rounded-full mr-3`}></div>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>

//               {/* Hover Border Animation */}
//               <div className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Add this to your existing components...

// // Process 3D Timeline
// const Process3DTimeline = () => {
//   const steps = [
//     { number: '01', title: 'Concept', description: 'Idea & Planning', icon: '💡' },
//     { number: '02', title: 'Modeling', description: '3D Creation', icon: '🛠️' },
//     { number: '03', title: 'Texturing', description: 'Materials & UV', icon: '🎨' },
//     { number: '04', title: 'Lighting', description: 'Scene Setup', icon: '💡' },
//     { number: '05', title: 'Rendering', description: 'Final Output', icon: '🌟' },
//     { number: '06', title: 'Delivery', description: 'Project Complete', icon: '🚀' }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-900">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our <span className="text-purple-400">3D Process</span>
//           </h2>
//         </div>

//         <div className="relative">
//           {/* Timeline Line */}
//           <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-600 transform -translate-x-1/2 hidden lg:block"></div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {steps.map((step, index) => (
//               <div 
//                 key={index}
//                 className={`group relative ${
//                   index % 2 === 0 ? 'lg:text-right' : 'lg:text-left lg:col-start-2'
//                 }`}
//               >
//                 <div className={`bg-slate-800 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-purple-500/50 backdrop-blur-sm ${
//                   index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'
//                 }`}>
//                   <div className="flex items-center lg:inline-flex mb-6">
//                     <div className={`w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
//                       index % 2 === 0 ? 'lg:order-2 lg:ml-4' : 'lg:order-1 lg:mr-4'
//                     }`}>
//                       {step.number}
//                     </div>
//                     <div className="text-3xl mx-4">{step.icon}</div>
//                   </div>

//                   <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
//                   <p className="text-gray-400 leading-relaxed">{step.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Interactive Project Showcase
// const InteractiveProjectShowcase = () => {
//   const projects = [
//     {
//       title: "Modern Villa",
//       category: "Architecture",
//       description: "Luxury residential design with photorealistic rendering",
//       stats: { vertices: "125k", textures: "4K", polygons: "250k" }
//     },
//     {
//       title: "Smart Device",
//       category: "Product",
//       description: "Consumer electronics with detailed component modeling",
//       stats: { vertices: "85k", textures: "2K", polygons: "150k" }
//     },
//     {
//       title: "Game Character",
//       category: "Character",
//       description: "Fantasy character with advanced rigging system",
//       stats: { vertices: "200k", textures: "4K", polygons: "400k" }
//     }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-800/50">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Featured <span className="text-green-400">3D Projects</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <div key={index} className="group bg-slate-800/50 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-green-500/50 backdrop-blur-sm">
//               <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
//                 <div className="text-6xl opacity-50">{project.category === 'Architecture' ? '🏛️' : project.category === 'Product' ? '📱' : '👤'}</div>
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
//               </div>
              
//               <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
//               <p className="text-gray-400 mb-4">{project.description}</p>
              
//               <div className="grid grid-cols-3 gap-4 text-center text-sm">
//                 <div>
//                   <div className="text-green-400 font-bold">{project.stats.vertices}</div>
//                   <div className="text-gray-400">Vertices</div>
//                 </div>
//                 <div>
//                   <div className="text-green-400 font-bold">{project.stats.textures}</div>
//                   <div className="text-gray-400">Textures</div>
//                 </div>
//                 <div>
//                   <div className="text-green-400 font-bold">{project.stats.polygons}</div>
//                   <div className="text-gray-400">Polygons</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Technology Stack with 3D Cards
// const TechnologyStack3D = () => {
//   const technologies = [
//     { name: 'Blender', icon: '🔄', level: 'Expert' },
//     { name: '3DS Max', icon: '📐', level: 'Advanced' },
//     { name: 'Maya', icon: '🎭', level: 'Expert' },
//     { name: 'ZBrush', icon: '雕刻', level: 'Advanced' },
//     { name: 'Substance', icon: '🎨', level: 'Expert' },
//     { name: 'Unity', icon: '🕹️', level: 'Advanced' }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-900/80">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our <span className="text-orange-400">3D Technology</span> Stack
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {technologies.map((tech, index) => (
//             <div 
//               key={index}
//               className="group bg-slate-800/50 rounded-2xl p-6 text-center hover:transform hover:scale-110 transition-all duration-500 border border-slate-700 hover:border-orange-500/50 backdrop-blur-sm"
//               style={{
//                 transformStyle: 'preserve-3d',
//                 transform: 'rotateY(0deg)'
//               }}
//             >
//               <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
//                 {tech.icon}
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
//               <div className="text-orange-400 text-sm font-medium">{tech.level}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Enhanced CTA Section with 3D Elements
// const EnhancedCTASection3D = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
//       </div>

//       <div className="container mx-auto text-center relative z-10">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
//           Ready to Create in
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
//             3D?
//           </span>
//         </h2>
        
//         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           Let's bring your vision to life with stunning 3D models and animations
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <Link 
//             to="/contact" 
//             className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center"
//           >
//             Start Your Project
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//             </svg>
//           </Link>
          
//           <Link 
//             to="/projects" 
//             className="border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center backdrop-blur-sm"
//           >
//             View Portfolio
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Home;





// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { gsap } from 'gsap';
// import axios from 'axios';

// const Home = () => {
//   const heroRef = useRef(null);
//   const [featuredProjects, setFeaturedProjects] = useState([]);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [activeModel, setActiveModel] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   // 3D Models data
//   const models = [
//     {
//       id: 1,
//       name: "Modern Sofa",
//       type: "furniture",
//       icon: "🛋️",
//       color: "from-blue-500 to-cyan-500",
//       vertices: "12.5k",
//       textures: "4K PBR",
//       polygons: "25k",
//       category: "Furniture"
//     },
//     {
//       id: 2,
//       name: "Smart Watch",
//       type: "electronics",
//       icon: "⌚",
//       color: "from-purple-500 to-pink-500",
//       vertices: "8.5k",
//       textures: "2K PBR",
//       polygons: "15k",
//       category: "Electronics"
//     },
//     {
//       id: 3,
//       name: "Fitness Equipment",
//       type: "sports",
//       icon: "💪",
//       color: "from-green-500 to-emerald-500",
//       vertices: "20k",
//       textures: "4K PBR",
//       polygons: "40k",
//       category: "Sports/Fitness"
//     },
//     {
//       id: 4,
//       name: "Home Appliance",
//       type: "appliance",
//       icon: "🏠",
//       color: "from-orange-500 to-red-500",
//       vertices: "15k",
//       textures: "4K PBR",
//       polygons: "30k",
//       category: "Home Appliances"
//     }
//   ];

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => setIsLoading(false), 2000);

//     // Mouse move effect for 3D parallax
//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 40,
//         y: (e.clientY / window.innerHeight - 0.5) * 40
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     // GSAP animations
//     const tl = gsap.timeline();
    
//     tl.fromTo('.floating-element', 
//       { y: 100, opacity: 0, rotationY: 180 },
//       { 
//         y: 0, 
//         opacity: 1, 
//         rotationY: 0, 
//         duration: 1.5, 
//         stagger: 0.2, 
//         ease: 'back.out(1.7)' 
//       }
//     );

//     tl.fromTo('.hero-content', 
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
//       '-=1'
//     );

//     // Continuous floating animation
//     gsap.to('.float-slow', {
//       y: 20,
//       duration: 3,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut'
//     });

//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   // Auto rotate models
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModel((prev) => (prev + 1) % models.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <div className="pt-16 overflow-hidden">
//       {/* Enhanced Hero Section */}
//       <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
//         {/* 3D Grid Background */}
//         <div className="absolute inset-0 opacity-20">
//           <div 
//             className="absolute inset-0"
//             style={{
//               backgroundImage: `
//                 linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
//                 linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
//               `,
//               backgroundSize: '100px 100px',
//               transform: `perspective(1000px) rotateX(${5 + mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
//               transition: 'transform 0.1s ease-out'
//             }}
//           ></div>
//         </div>

//         {/* Floating 3D Shapes */}
//         <FloatingShapes mousePosition={mousePosition} />

//         <div className="container mx-auto relative z-20">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
//             {/* Left Content */}
//             <div className="flex-1 hero-content text-center lg:text-left">
//               <div className="floating-element inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6 backdrop-blur-sm">
//                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
//                 Professional 3D Product Modeling & AR Solutions
//               </div>

//               <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
//                 Experience
//                 <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
//                   Products in 3D
//                 </span>
//               </h1>

//               <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
//                 Transform your e-commerce with interactive 3D product models, 
//                 360° views, and Augmented Reality experiences that boost engagement and sales.
//               </p>

//               {/* Interactive Model Stats */}
//               <div className="floating-element mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-gray-400">Active Product:</span>
//                   <span className="text-blue-400 font-semibold flex items-center">
//                     {models[activeModel].icon} {models[activeModel].name}
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-3 gap-4 text-center">
//                   <div>
//                     <div className="text-2xl font-bold text-white">{models[activeModel].vertices}</div>
//                     <div className="text-gray-400 text-sm">Vertices</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">{models[activeModel].textures}</div>
//                     <div className="text-gray-400 text-sm">Textures</div>
//                   </div>
//                   <div>
//                     <div className="text-2xl font-bold text-white">{models[activeModel].polygons}</div>
//                     <div className="text-gray-400 text-sm">Polygons</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
//                 <Link 
//                   to="/products" 
//                   className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center justify-center relative overflow-hidden"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     Explore Products
//                     <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                     </svg>
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </Link>
                
//                 <Link 
//                   to="/contact" 
//                   className="group border-2 border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center justify-center relative overflow-hidden backdrop-blur-sm"
//                 >
//                   <span className="relative z-10">Start 3D Project</span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </Link>

//                 {/* Resume Button */}
//                 <a 
//                   href="/resume.pdf" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 inline-flex items-center justify-center relative overflow-hidden"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     View Resume
//                     <svg className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                 </a>
//               </div>
//             </div>

//             {/* Right - Interactive 3D Product Viewer */}
//             <div className="flex-1 flex justify-center items-center">
//               <InteractiveProductViewer 
//                 activeModel={activeModel} 
//                 models={models}
//                 mousePosition={mousePosition}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Product Categories Section */}
//       <ProductCategoriesSection />
      
//       {/* Enhanced Services with AR/VR Focus */}
//       <EnhancedServicesSection />
      
//       {/* 360 Degree Product Viewer Demo */}
//       <ProductViewer360 />
      
//       {/* AR Experience Section */}
//       <ARExperienceSection />
      
//       {/* Technology Stack */}
//       <TechnologyStack3D />
      
//       {/* Enhanced CTA */}
//       <EnhancedCTASection3D />
//     </div>
//   );
// };

// // Floating 3D Shapes Component
// const FloatingShapes = ({ mousePosition }) => {
//   return (
//     <>
//       <div 
//         className="floating-element absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-400/20 float-slow"
//         style={{
//           transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(50px)`
//         }}
//       >
//         <div className="absolute inset-2 bg-blue-500/20 rounded-lg border border-blue-400/30"></div>
//       </div>

//       <div 
//         className="floating-element absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 float-slow"
//         style={{
//           transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(30px)`,
//           clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
//         }}
//       ></div>
//     </>
//   );
// };

// // Interactive Product Viewer Component
// const InteractiveProductViewer = ({ activeModel, models, mousePosition }) => {
//   const currentModel = models[activeModel];
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     setRotation(prev => ({
//       x: prev.x + e.movementY * 0.5,
//       y: prev.y + e.movementX * 0.5
//     }));
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     document.addEventListener('mouseup', handleMouseUp);
//     document.addEventListener('mousemove', handleMouseMove);
    
//     return () => {
//       document.removeEventListener('mouseup', handleMouseUp);
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [isDragging]);

//   return (
//     <div className="relative w-96 h-96">
//       {/* Main 3D Product Container */}
//       <div 
//         className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 backdrop-blur-sm overflow-hidden"
//         style={{
//           transform: `perspective(1500px) rotateX(${5 + mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         {/* 3D Product Scene */}
//         <div 
//           className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
//           onMouseDown={handleMouseDown}
//           style={{
//             transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
//             transition: isDragging ? 'none' : 'transform 0.5s ease'
//           }}
//         >
          
//           {/* Dynamic Product Model */}
//           <div className={`relative w-64 h-64 transition-all duration-1000 ${
//             currentModel.type === 'furniture' ? 'furniture-model' :
//             currentModel.type === 'electronics' ? 'electronics-model' :
//             currentModel.type === 'sports' ? 'sports-model' :
//             'appliance-model'
//           }`}>
            
//             {/* Base Product Shape */}
//             <div className={`absolute inset-0 bg-gradient-to-br ${currentModel.color} rounded-2xl transform transition-all duration-1000 ${
//               currentModel.type === 'furniture' ? 'skew-x-1 shadow-2xl' :
//               currentModel.type === 'electronics' ? 'rotate-6 scale-95 shadow-xl' :
//               currentModel.type === 'sports' ? 'scale-105 shadow-2xl' :
//               'rotate-3 scale-100 shadow-xl'
//             }`}>
              
//               {/* Product-specific Details */}
//               {currentModel.type === 'furniture' && (
//                 <>
//                   <div className="absolute top-8 left-6 right-6 h-16 bg-white/20 rounded-lg shadow-inner"></div>
//                   <div className="absolute bottom-8 left-8 right-8 h-4 bg-white/15 rounded"></div>
//                   <div className="absolute left-10 top-1/2 w-8 h-20 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
//                   <div className="absolute right-10 top-1/2 w-8 h-20 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
//                 </>
//               )}
              
//               {currentModel.type === 'electronics' && (
//                 <>
//                   <div className="absolute top-12 left-8 right-8 h-20 bg-white/15 rounded-xl shadow-inner"></div>
//                   <div className="absolute bottom-12 left-12 right-12 h-3 bg-white/25 rounded"></div>
//                   <div className="absolute top-6 left-1/2 w-2 h-4 bg-white/40 rounded -translate-x-1/2"></div>
//                   <div className="absolute bottom-8 left-1/2 w-16 h-1 bg-white/30 rounded -translate-x-1/2"></div>
//                 </>
//               )}
              
//               {currentModel.type === 'sports' && (
//                 <>
//                   <div className="absolute top-10 left-10 right-10 h-12 bg-white/20 rounded-full shadow-inner"></div>
//                   <div className="absolute bottom-12 left-12 right-12 h-8 bg-white/15 rounded-lg"></div>
//                   <div className="absolute bottom-8 left-16 w-6 h-6 bg-white/25 rounded-full"></div>
//                   <div className="absolute bottom-8 right-16 w-6 h-6 bg-white/25 rounded-full"></div>
//                 </>
//               )}
              
//               {currentModel.type === 'appliance' && (
//                 <>
//                   <div className="absolute top-8 left-6 right-6 h-20 bg-white/20 rounded-lg shadow-inner"></div>
//                   <div className="absolute bottom-12 left-8 right-8 h-8 bg-white/15 rounded"></div>
//                   <div className="absolute bottom-8 left-12 w-8 h-2 bg-white/30 rounded"></div>
//                   <div className="absolute bottom-8 right-12 w-8 h-2 bg-white/30 rounded"></div>
//                 </>
//               )}
//             </div>

//             {/* Interactive Elements */}
//             <div className="absolute top-4 right-4 w-6 h-6 bg-white/40 rounded-full animate-ping"></div>
//             <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
//           </div>
//         </div>

//         {/* Product Info HUD */}
//         <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-white font-bold text-lg">{currentModel.name}</div>
//               <div className="text-gray-400 text-sm">{currentModel.category}</div>
//             </div>
//             <div className="text-3xl">{currentModel.icon}</div>
//           </div>
//           <div className="flex justify-between mt-2 text-xs text-gray-400">
//             <span>Drag to rotate • Scroll to zoom</span>
//             <span>360° View</span>
//           </div>
//         </div>

//         {/* AR Button */}
//         <button className="absolute top-6 right-6 w-12 h-12 bg-green-500/20 hover:bg-green-500/30 border border-green-400/30 rounded-xl flex items-center justify-center text-green-300 hover:text-green-200 transition-all duration-300 backdrop-blur-sm group">
//           <span className="text-lg group-hover:scale-110 transition-transform">👁️</span>
//           <div className="absolute inset-0 bg-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Product Categories Section
// const ProductCategoriesSection = () => {
//   const categories = [
//     {
//       name: "Furniture",
//       icon: "🛋️",
//       count: "24 Products",
//       color: "from-blue-500 to-cyan-500",
//       models: ["Sofas", "Chairs", "Tables", "Beds"]
//     },
//     {
//       name: "Sports/Fitness",
//       icon: "💪",
//       count: "18 Products",
//       color: "from-green-500 to-emerald-500",
//       models: ["Equipment", "Accessories", "Wearables"]
//     },
//     {
//       name: "Home Appliances",
//       icon: "🏠",
//       count: "32 Products",
//       color: "from-orange-500 to-red-500",
//       models: ["Kitchen", "Cleaning", "Climate"]
//     },
//     {
//       name: "Electronics",
//       icon: "📱",
//       count: "45 Products",
//       color: "from-purple-500 to-pink-500",
//       models: ["Mobile", "Audio", "Wearables"]
//     },
//     {
//       name: "Fashion",
//       icon: "👕",
//       count: "28 Products",
//       color: "from-pink-500 to-rose-500",
//       models: ["Clothing", "Footwear", "Accessories"]
//     },
//     {
//       name: "Kids",
//       icon: "🧸",
//       count: "15 Products",
//       color: "from-yellow-500 to-amber-500",
//       models: ["Toys", "Furniture", "Accessories"]
//     }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-800/30">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Product <span className="text-blue-400">Categories</span>
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Explore our wide range of 3D product models across various categories, 
//             all available in interactive 360° views and AR experiences.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories.map((category, index) => (
//             <div 
//               key={index}
//               className="group relative bg-slate-800/50 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-blue-500/50 backdrop-blur-sm"
//             >
//               {/* Category Icon */}
//               <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 transform group-hover:rotate-12 transition-transform duration-500`}>
//                 {category.icon}
//               </div>

//               <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
//               <div className="text-blue-400 text-sm font-medium mb-4">{category.count}</div>
              
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {category.models.map((model, idx) => (
//                   <span key={idx} className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300 border border-slate-600">
//                     {model}
//                   </span>
//                 ))}
//               </div>

//               <div className="flex gap-2">
//                 <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105">
//                   360° View
//                 </button>
//                 <button className="flex-1 border border-green-500/30 hover:border-green-500/50 text-green-400 hover:bg-green-500/10 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-1">
//                   <span>👁️</span>
//                   View in AR
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // 360 Degree Product Viewer Demo
// const ProductViewer360 = () => {
//   const [rotation, setRotation] = useState(0);
//   const [autoRotate, setAutoRotate] = useState(true);

//   useEffect(() => {
//     if (!autoRotate) return;

//     const interval = setInterval(() => {
//       setRotation(prev => (prev + 1) % 360);
//     }, 50);

//     return () => clearInterval(interval);
//   }, [autoRotate]);

//   return (
//     <section className="py-20 px-6 bg-slate-900">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Interactive <span className="text-purple-400">360° Product Viewer</span>
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Experience products from every angle with our smooth 360° rotation viewer
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row items-center gap-12">
//           {/* 360 Viewer */}
//           <div className="flex-1">
//             <div className="relative bg-slate-800 rounded-3xl p-8 border border-slate-700 backdrop-blur-sm">
//               <div className="relative h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl border border-slate-600 overflow-hidden">
//                 {/* Product in 360 */}
//                 <div 
//                   className="absolute inset-0 flex items-center justify-center"
//                   style={{
//                     transform: `rotateY(${rotation}deg)`,
//                     transition: 'transform 0.1s ease-out',
//                     transformStyle: 'preserve-3d'
//                   }}
//                 >
//                   <div className="relative w-48 h-48">
//                     {/* Product Base */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl shadow-2xl">
//                       {/* Product Details */}
//                       <div className="absolute top-6 left-6 right-6 h-12 bg-white/20 rounded-lg"></div>
//                       <div className="absolute bottom-8 left-8 right-8 h-4 bg-white/15 rounded"></div>
//                       <div className="absolute left-10 top-1/2 w-6 h-16 bg-white/25 rounded-lg -translate-y-1/2"></div>
//                       <div className="absolute right-10 top-1/2 w-6 h-16 bg-white/25 rounded-lg -translate-y-1/2"></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Controls */}
//                 <div className="absolute bottom-4 left-4 flex gap-2">
//                   <button 
//                     onClick={() => setAutoRotate(!autoRotate)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                       autoRotate 
//                         ? 'bg-purple-600 text-white' 
//                         : 'bg-slate-700 text-gray-300 hover:text-white'
//                     }`}
//                   >
//                     {autoRotate ? '⏸️ Pause' : '▶️ Auto Rotate'}
//                   </button>
//                   <button className="px-4 py-2 bg-slate-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300">
//                     🔄 Reset View
//                   </button>
//                 </div>

//                 {/* Degree Indicator */}
//                 <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
//                   <div className="text-white text-sm font-mono">{rotation}°</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Features List */}
//           <div className="flex-1">
//             <div className="space-y-6">
//               <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
//                 <h3 className="text-xl font-bold text-white mb-3">360° Product Rotation</h3>
//                 <p className="text-gray-400 mb-4">
//                   Smooth, interactive rotation that lets customers examine products from every angle
//                 </p>
//                 <div className="flex gap-2">
//                   <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Drag to Rotate</span>
//                   <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">Auto Rotate</span>
//                   <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Zoom In/Out</span>
//                 </div>
//               </div>

//               <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
//                 <h3 className="text-xl font-bold text-white mb-3">Augmented Reality</h3>
//                 <p className="text-gray-400 mb-4">
//                   View products in your actual space using AR technology on supported devices
//                 </p>
//                 <div className="flex items-center gap-2 text-sm text-green-400">
//                   <span>📱</span>
//                   <span>Mobile AR Support</span>
//                   <span>•</span>
//                   <span>👁️</span>
//                   <span>Real-time Placement</span>
//                 </div>
//               </div>

//               <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
//                 <h3 className="text-xl font-bold text-white mb-3">High-Quality Models</h3>
//                 <p className="text-gray-400">
//                   Photorealistic 3D models with 4K textures, optimized for web and mobile viewing
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // AR Experience Section
// const ARExperienceSection = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Augmented Reality <span className="text-green-400">Experience</span>
//           </h2>
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//             Bring products into your real world with our advanced AR technology
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* AR Demo */}
//           <div className="relative">
//             <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 backdrop-blur-sm">
//               <div className="relative h-96 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-400/20 flex items-center justify-center">
//                 {/* AR Scene */}
//                 <div className="text-center">
//                   <div className="text-6xl mb-4">📱</div>
//                   <div className="text-white font-bold text-lg mb-2">AR View Activated</div>
//                   <div className="text-green-400 text-sm">Point your camera at a flat surface</div>
                  
//                   {/* Product in AR */}
//                   <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//                     <div className="w-24 h-24 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-xl border border-green-400/30 shadow-2xl"></div>
//                   </div>
//                 </div>

//                 {/* AR Controls */}
//                 <div className="absolute bottom-4 left-4 right-4 flex justify-between">
//                   <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-all duration-300">
//                     Place Product
//                   </button>
//                   <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-300 hover:text-white text-sm font-medium transition-all duration-300">
//                     Take Photo
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* AR Features */}
//           <div className="space-y-6">
//             <h3 className="text-2xl font-bold text-white mb-6">AR Features</h3>
            
//             {[
//               { icon: "📐", title: "Real-scale Placement", desc: "Accurate size representation in real world" },
//               { icon: "🎨", title: "Material Accuracy", desc: "True-to-life materials and textures" },
//               { icon: "💡", title: "Lighting Adaptation", desc: "Automatic lighting matching to environment" },
//               { icon: "📱", title: "Mobile Optimized", desc: "Smooth AR experience on mobile devices" }
//             ].map((feature, index) => (
//               <div key={index} className="flex items-start gap-4">
//                 <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-xl">
//                   {feature.icon}
//                 </div>
//                 <div>
//                   <h4 className="text-white font-bold mb-1">{feature.title}</h4>
//                   <p className="text-gray-400">{feature.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Enhanced Services Section
// const EnhancedServicesSection = () => {
//   const services = [
//     {
//       icon: '🎯',
//       title: '3D Product Modeling',
//       description: 'High-quality 3D models optimized for e-commerce and marketing',
//       features: ['Photorealistic Textures', 'Optimized Geometry', 'Multiple LODs']
//     },
//     {
//       icon: '🔄',
//       title: '360° Product Views',
//       description: 'Interactive product rotation for complete customer engagement',
//       features: ['Smooth Rotation', 'Zoom Functionality', 'Auto-rotate Mode']
//     },
//     {
//       icon: '👁️',
//       title: 'AR Integration',
//       description: 'Augmented Reality experiences for mobile and web',
//       features: ['WebAR Support', 'Mobile AR', 'Real-time Placement']
//     },
//     {
//       icon: '🛒',
//       title: 'E-commerce Ready',
//       description: 'Seamless integration with popular e-commerce platforms',
//       features: ['Shopify', 'WooCommerce', 'Custom Solutions']
//     }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-800/50">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our <span className="text-blue-400">3D & AR Services</span>
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => (
//             <div 
//               key={index}
//               className="group bg-slate-800/50 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-blue-500/50 backdrop-blur-sm"
//             >
//               <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
//                 {service.icon}
//               </div>
//               <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
//               <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>
//               <ul className="space-y-2">
//                 {service.features.map((feature, idx) => (
//                   <li key={idx} className="flex items-center text-sm text-gray-300">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Technology Stack
// const TechnologyStack3D = () => {
//   const technologies = [
//     { name: 'Blender', icon: '🔄', purpose: '3D Modeling' },
//     { name: 'Three.js', icon: '⚡', purpose: 'Web 3D' },
//     { name: 'AR.js', icon: '👁️', purpose: 'Augmented Reality' },
//     { name: 'WebGL', icon: '🎮', purpose: '3D Graphics' },
//     { name: 'GLTF', icon: '📦', purpose: '3D Format' },
//     { name: 'Shopify', icon: '🛒', purpose: 'E-commerce' }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-900/80">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our <span className="text-orange-400">Technology</span> Stack
//           </h2>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {technologies.map((tech, index) => (
//             <div 
//               key={index}
//               className="group bg-slate-800/50 rounded-2xl p-6 text-center hover:transform hover:scale-110 transition-all duration-500 border border-slate-700 hover:border-orange-500/50 backdrop-blur-sm"
//             >
//               <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
//                 {tech.icon}
//               </div>
//               <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
//               <div className="text-orange-400 text-sm font-medium">{tech.purpose}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Enhanced CTA Section
// const EnhancedCTASection3D = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
//       <div className="container mx-auto text-center relative z-10">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
//           Ready to Transform Your
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
//             E-commerce?
//           </span>
//         </h2>
        
//         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           Boost engagement and conversions with interactive 3D models and AR experiences
//         </p>
        
//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           <Link 
//             to="/contact" 
//             className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center"
//           >
//             Start 3D Project
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//             </svg>
//           </Link>
          
//           <a 
//             href="/resume.pdf" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center backdrop-blur-sm"
//           >
//             Download Resume
//             <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Loading Screen Component
// const LoadingScreen = () => {
//   return (
//     <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
//       <div className="text-center">
//         <div className="relative w-20 h-20 mx-auto mb-4">
//           <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
//           <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
//         </div>
//         <div className="text-white text-lg font-semibold">Loading 3D Environment</div>
//         <div className="text-gray-400 text-sm mt-2">Initializing product models...</div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const Home = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeModel, setActiveModel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const models = [
    {
      id: 1,
      name: "Modern Sofa",
      type: "furniture",
      icon: "🛋️",
      color: "from-blue-500 to-cyan-500",
      vertices: "12.5k",
      textures: "4K PBR",
      polygons: "25k",
      category: "Furniture",
      price: "$1,299"
    },
    {
      id: 2,
      name: "Smart Watch",
      type: "electronics",
      icon: "⌚",
      color: "from-purple-500 to-pink-500",
      vertices: "8.5k",
      textures: "2K PBR",
      polygons: "15k",
      category: "Electronics",
      price: "$399"
    },
    {
      id: 3,
      name: "Fitness Bike",
      type: "sports",
      icon: "🚴",
      color: "from-green-500 to-emerald-500",
      vertices: "20k",
      textures: "4K PBR",
      polygons: "40k",
      category: "Sports/Fitness",
      price: "$899"
    },
    {
      id: 4,
      name: "Coffee Maker",
      type: "appliance",
      icon: "☕",
      color: "from-orange-500 to-red-500",
      vertices: "15k",
      textures: "4K PBR",
      polygons: "30k",
      category: "Home Appliances",
      price: "$249"
    }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    const tl = gsap.timeline();
    tl.fromTo('.floating-element', 
      { y: 100, opacity: 0, rotationY: 180 },
      { 
        y: 0, 
        opacity: 1, 
        rotationY: 0, 
        duration: 1.5, 
        stagger: 0.2, 
        ease: 'back.out(1.7)' 
      }
    );

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModel((prev) => (prev + 1) % models.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll to 360 viewer when category is selected
  useEffect(() => {
    if (selectedCategory !== null) {
      const viewerSection = document.getElementById('360-viewer-section');
      if (viewerSection) {
        viewerSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedCategory]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="pt-16 overflow-hidden">
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `perspective(1000px) rotateX(${5 + mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
            }}
          ></div>
        </div>

        <FloatingShapes mousePosition={mousePosition} />

        <div className="container mx-auto relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
            <div className="flex-1 hero-content text-center lg:text-left">
              <div className="floating-element inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                Advanced 3D Product Visualization
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Full 3D
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Product Experience
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Experience products in complete 3D freedom. Rotate in any direction, 
                zoom into details, and explore every angle with our advanced 360° viewer.
              </p>

              <div className="floating-element mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Featured Product:</span>
                  <span className="text-blue-400 font-semibold flex items-center">
                    {models[activeModel].icon} {models[activeModel].name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{models[activeModel].vertices}</div>
                    <div className="text-gray-400 text-sm">Vertices</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{models[activeModel].textures}</div>
                    <div className="text-gray-400 text-sm">Textures</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{models[activeModel].polygons}</div>
                    <div className="text-gray-400 text-sm">Polygons</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setSelectedCategory(0)}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Try 360° Viewer
                    <svg className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </button>
                
                <a 
                  href="/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Download Resume
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center">
              <Advanced3DViewer 
                activeModel={activeModel} 
                models={models}
                mousePosition={mousePosition}
              />
            </div>
          </div>
        </div>
      </section>

      <ProductCategoriesSection onCategorySelect={setSelectedCategory} />
      <Interactive360Viewer id="360-viewer-section" selectedCategory={selectedCategory} />
      <EnhancedServicesSection />
      <TechnologyStack3D />
      <EnhancedCTASection3D />
    </div>
  );
};

// Advanced 3D Viewer with Full Rotation
const Advanced3DViewer = ({ activeModel, models, mousePosition }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const currentModel = models[activeModel];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5, // Rotate X axis with vertical drag
      y: prev.y + deltaX * 0.5, // Rotate Y axis with horizontal drag
      z: prev.z // Z axis can be controlled separately
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  // Z-axis rotation with keyboard or buttons
  const rotateZ = (direction) => {
    setRotation(prev => ({
      ...prev,
      z: prev.z + direction * 10
    }));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => handleMouseMove(e);

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, lastMousePos]);

  return (
    <div className="relative w-96 h-96">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 backdrop-blur-sm overflow-hidden"
        style={{
          transform: `perspective(1500px) rotateX(${5 + mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.3s ease'
          }}
        >
          <div className="relative w-64 h-64 transition-all duration-1000">
            <div className={`absolute inset-0 bg-gradient-to-br ${currentModel.color} rounded-2xl shadow-2xl`}>
              {currentModel.type === 'furniture' && <FurnitureModel />}
              {currentModel.type === 'electronics' && <ElectronicsModel />}
              {currentModel.type === 'sports' && <SportsModel />}
              {currentModel.type === 'appliance' && <ApplianceModel />}
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-white font-bold text-lg">{currentModel.name}</div>
              <div className="text-gray-400 text-sm">{currentModel.category} • {currentModel.price}</div>
            </div>
            <div className="text-3xl">{currentModel.icon}</div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-400">
              <div>Drag: Rotate X/Y • Scroll: Zoom</div>
              <div>X: {Math.round(rotation.x)}° Y: {Math.round(rotation.y)}° Z: {Math.round(rotation.z)}°</div>
            </div>
            
            <div className="flex gap-1">
              <button 
                onClick={() => rotateZ(-1)}
                className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
              >
                ↶
              </button>
              <button 
                onClick={() => rotateZ(1)}
                className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
              >
                ↷
              </button>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <button 
            onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
            className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm hover:bg-slate-600/50"
            title="Reset Rotation"
          >
            ⟳
          </button>
          <button 
            onClick={() => setScale(1)}
            className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm hover:bg-slate-600/50"
            title="Reset Zoom"
          >
            ⊞
          </button>
        </div>

        {/* Rotation Guide */}
        <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
          <div className="text-green-400 text-sm font-medium">3D Active</div>
          <div className="text-gray-400 text-xs">Full Rotation</div>
        </div>
      </div>
    </div>
  );
};

// Enhanced 360° Interactive Viewer with Category Integration
const Interactive360Viewer = ({ id, selectedCategory }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  const products = [
    {
      id: 1,
      name: "Modern Sofa",
      category: "Furniture",
      icon: "🛋️",
      color: "from-blue-500 to-cyan-500",
      description: "Luxury modern sofa with premium fabric and ergonomic design",
      price: "$1,299",
      features: ["Premium Fabric", "Ergonomic Design", "Easy Assembly"],
      categoryId: 0
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      icon: "⌚",
      color: "from-purple-500 to-pink-500",
      description: "Advanced smartwatch with health monitoring and premium finish",
      price: "$399",
      features: ["Health Monitoring", "Water Resistant", "Long Battery"],
      categoryId: 3
    },
    {
      id: 3,
      name: "Fitness Bike",
      category: "Sports/Fitness",
      icon: "🚴",
      color: "from-green-500 to-emerald-500",
      description: "Professional fitness bike with adjustable resistance levels",
      price: "$899",
      features: ["Adjustable Resistance", "Digital Display", "Foldable"],
      categoryId: 1
    },
    {
      id: 4,
      name: "Coffee Maker",
      category: "Home Appliances",
      icon: "☕",
      color: "from-orange-500 to-red-500",
      description: "Smart coffee maker with programmable settings and thermal carafe",
      price: "$249",
      features: ["Programmable", "Thermal Carafe", "Fast Brewing"],
      categoryId: 2
    },
    {
      id: 5,
      name: "Designer Jacket",
      category: "Fashion",
      icon: "🧥",
      color: "from-pink-500 to-rose-500",
      description: "Premium designer jacket with weather-resistant fabric",
      price: "$189",
      features: ["Weather Resistant", "Premium Fabric", "Designer Fit"],
      categoryId: 4
    },
    {
      id: 6,
      name: "Educational Toy",
      category: "Kids",
      icon: "🧩",
      color: "from-yellow-500 to-amber-500",
      description: "Interactive educational toy for child development",
      price: "$49",
      features: ["Educational", "Safe Materials", "Interactive"],
      categoryId: 5
    }
  ];

  // Filter products based on selected category
  const filteredProducts = selectedCategory !== null 
    ? products.filter(product => product.categoryId === selectedCategory)
    : products;

  const currentProduct = filteredProducts[selectedProduct] || products[0];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
      z: prev.z
    }));
    
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Z-axis rotation
  const rotateZ = (direction) => {
    setRotation(prev => ({
      ...prev,
      z: prev.z + direction * 10
    }));
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => handleMouseMove(e);

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startPos]);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: (prev.y + 1) % 360
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Reset selection when category changes
  useEffect(() => {
    setSelectedProduct(0);
    setRotation({ x: 0, y: 0, z: 0 });
  }, [selectedCategory]);

  return (
    <section id={id} className="py-20 px-6 bg-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive <span className="text-purple-400">360° Product Viewer</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {selectedCategory !== null 
              ? `Exploring ${filteredProducts.length} products in this category. Drag to rotate in any direction!`
              : "Select a product and drag to rotate it in full 3D. Experience every angle!"
            }
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Product Selection */}
          <div className="lg:w-1/3">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>📦</span>
                Select Product
                {selectedCategory !== null && (
                  <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
                    Filtered
                  </span>
                )}
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredProducts.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(index);
                      setRotation({ x: 0, y: 0, z: 0 });
                    }}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 group ${
                      selectedProduct === index
                        ? 'bg-blue-600/20 border border-blue-500/50 transform scale-105'
                        : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500 hover:transform hover:scale-102'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                        {product.icon}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{product.name}</div>
                        <div className="text-gray-400 text-sm">{product.category}</div>
                      </div>
                      {selectedProduct === index && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Product Details */}
              <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
                <h4 className="text-white font-bold mb-2">{currentProduct.name}</h4>
                <p className="text-gray-400 text-sm mb-3">{currentProduct.description}</p>
                <div className="text-green-400 font-bold text-lg mb-3">{currentProduct.price}</div>
                <div className="flex flex-wrap gap-2">
                  {currentProduct.features.map((feature, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Clear Filter Button */}
              {selectedCategory !== null && (
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedProduct(0);
                  }}
                  className="w-full mt-4 py-2 bg-slate-700/50 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-600/50 hover:text-white transition-all duration-300"
                >
                  Clear Filter • Show All Products
                </button>
              )}
            </div>
          </div>

          {/* 360 Viewer */}
          <div className="lg:w-2/3">
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
              <div 
                className="relative h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl border border-slate-600 overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
              >
                {/* Product in 360 */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="relative w-64 h-64">
                    <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct.color} rounded-2xl shadow-2xl`}>
                      {currentProduct.category === "Furniture" && <FurnitureModel />}
                      {currentProduct.category === "Electronics" && <ElectronicsModel />}
                      {currentProduct.category === "Sports/Fitness" && <SportsModel />}
                      {currentProduct.category === "Home Appliances" && <ApplianceModel />}
                      {currentProduct.category === "Fashion" && <FashionModel />}
                      {currentProduct.category === "Kids" && <KidsModel />}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <button 
                    onClick={() => setAutoRotate(!autoRotate)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      autoRotate 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                        : 'bg-slate-700 text-gray-300 hover:text-white'
                    }`}
                  >
                    {autoRotate ? '⏸️ Pause' : '▶️ Auto Rotate'}
                  </button>
                  <button 
                    onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
                    className="px-4 py-2 bg-slate-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-slate-600"
                  >
                    🔄 Reset View
                  </button>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => rotateZ(-1)}
                      className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
                    >
                      ↶
                    </button>
                    <button 
                      onClick={() => rotateZ(1)}
                      className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
                    >
                      ↷
                    </button>
                  </div>
                </div>

                {/* Rotation Indicators */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
                  <div className="text-white text-lg font-mono font-bold">
                    X:{Math.round(rotation.x)}° Y:{Math.round(rotation.y)}° Z:{Math.round(rotation.z)}°
                  </div>
                  <div className="text-gray-400 text-xs">3D Rotation</div>
                </div>

                {/* Product Info */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
                  <div className="text-white font-medium">{currentProduct.name}</div>
                  <div className="text-gray-400 text-xs">{currentProduct.category}</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  <span className="text-blue-400 font-medium">← Drag to rotate in 3D →</span> • 
                  <span className="text-green-400 font-medium"> Z-buttons for tilt</span> • 
                  <span className="text-purple-400 font-medium"> Auto-rotate available</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Categories Section with Functional Buttons
const ProductCategoriesSection = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 0,
      name: "Furniture",
      icon: "🛋️",
      count: "24 Products",
      color: "from-blue-500 to-cyan-500",
      models: ["Sofas", "Chairs", "Tables", "Beds", "Wardrobes"]
    },
    {
      id: 1,
      name: "Sports/Fitness",
      icon: "💪",
      count: "18 Products",
      color: "from-green-500 to-emerald-500",
      models: ["Equipment", "Accessories", "Wearables", "Machines"]
    },
    {
      id: 2,
      name: "Home Appliances",
      icon: "🏠",
      count: "32 Products",
      color: "from-orange-500 to-red-500",
      models: ["Kitchen", "Cleaning", "Climate", "Laundry"]
    },
    {
      id: 3,
      name: "Electronics",
      icon: "📱",
      count: "45 Products",
      color: "from-purple-500 to-pink-500",
      models: ["Mobile", "Audio", "Wearables", "Computers"]
    },
    {
      id: 4,
      name: "Fashion",
      icon: "👕",
      count: "28 Products",
      color: "from-pink-500 to-rose-500",
      models: ["Clothing", "Footwear", "Accessories", "Bags"]
    },
    {
      id: 5,
      name: "Kids",
      icon: "🧸",
      count: "15 Products",
      color: "from-yellow-500 to-amber-500",
      models: ["Toys", "Furniture", "Accessories", "Learning"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Product <span className="text-blue-400">Categories</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our wide range of 3D product models across various categories, 
            all available in interactive 360° views.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="group relative bg-slate-800/50 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-blue-500/50 backdrop-blur-sm"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 transform group-hover:rotate-12 transition-transform duration-500`}>
                {category.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <div className="text-blue-400 text-sm font-medium mb-4">{category.count}</div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {category.models.map((model, idx) => (
                  <span key={idx} className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300 border border-slate-600">
                    {model}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => onCategorySelect(category.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
              >
                <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span>
                View in 360°
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Additional Model Components
const FashionModel = () => (
  <>
    <div className="absolute top-8 left-8 right-8 h-24 bg-white/15 rounded-lg shadow-inner"></div>
    <div className="absolute bottom-12 left-10 right-10 h-6 bg-white/20 rounded"></div>
    <div className="absolute top-4 left-4 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
  </>
);

const KidsModel = () => (
  <>
    <div className="absolute top-10 left-10 right-10 h-16 bg-white/20 rounded-full shadow-inner"></div>
    <div className="absolute bottom-10 left-12 right-12 h-8 bg-white/15 rounded-lg"></div>
    <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/50 rounded-full animate-bounce"></div>
  </>
);

// Keep other components (FurnitureModel, ElectronicsModel, SportsModel, ApplianceModel, 
// EnhancedServicesSection, TechnologyStack3D, EnhancedCTASection3D, LoadingScreen, FloatingShapes) 
// the same as in previous code

const FurnitureModel = () => (
  <>
    <div className="absolute top-8 left-6 right-6 h-16 bg-white/20 rounded-lg shadow-inner"></div>
    <div className="absolute bottom-8 left-8 right-8 h-4 bg-white/15 rounded"></div>
    <div className="absolute left-10 top-1/2 w-8 h-20 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
    <div className="absolute right-10 top-1/2 w-8 h-20 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
    <div className="absolute top-4 right-4 w-6 h-6 bg-white/40 rounded-full animate-ping"></div>
  </>
);

const ElectronicsModel = () => (
  <>
    <div className="absolute top-12 left-8 right-8 h-20 bg-white/15 rounded-xl shadow-inner"></div>
    <div className="absolute bottom-12 left-12 right-12 h-3 bg-white/25 rounded"></div>
    <div className="absolute top-6 left-1/2 w-2 h-4 bg-white/40 rounded -translate-x-1/2"></div>
    <div className="absolute bottom-8 left-1/2 w-16 h-1 bg-white/30 rounded -translate-x-1/2"></div>
    <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
  </>
);

const SportsModel = () => (
  <>
    <div className="absolute top-10 left-10 right-10 h-12 bg-white/20 rounded-full shadow-inner"></div>
    <div className="absolute bottom-12 left-12 right-12 h-8 bg-white/15 rounded-lg"></div>
    <div className="absolute bottom-8 left-16 w-6 h-6 bg-white/25 rounded-full"></div>
    <div className="absolute bottom-8 right-16 w-6 h-6 bg-white/25 rounded-full"></div>
    <div className="absolute top-1/2 left-4 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
  </>
);

const ApplianceModel = () => (
  <>
    <div className="absolute top-8 left-6 right-6 h-20 bg-white/20 rounded-lg shadow-inner"></div>
    <div className="absolute bottom-12 left-8 right-8 h-8 bg-white/15 rounded"></div>
    <div className="absolute bottom-8 left-12 w-8 h-2 bg-white/30 rounded"></div>
    <div className="absolute bottom-8 right-12 w-8 h-2 bg-white/30 rounded"></div>
    <div className="absolute top-4 left-4 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
  </>
);

// Keep EnhancedServicesSection, TechnologyStack3D, EnhancedCTASection3D, LoadingScreen, FloatingShapes
// (They remain the same as in previous code, just ensure they're included)

const EnhancedServicesSection = () => {
  const services = [
    {
      icon: '🎯',
      title: '3D Product Modeling',
      description: 'High-quality 3D models optimized for e-commerce and marketing',
      features: ['Photorealistic Textures', 'Optimized Geometry', 'Multiple LODs']
    },
    {
      icon: '🔄',
      title: '360° Product Views',
      description: 'Interactive product rotation for complete customer engagement',
      features: ['Smooth Rotation', 'Zoom Functionality', 'Auto-rotate Mode']
    },
    {
      icon: '📱',
      title: 'E-commerce Ready',
      description: 'Seamless integration with popular e-commerce platforms',
      features: ['Shopify', 'WooCommerce', 'Custom Solutions']
    },
    {
      icon: '⚡',
      title: 'Web Optimization',
      description: 'Lightweight models optimized for fast web loading',
      features: ['Fast Loading', 'Mobile Friendly', 'SEO Optimized']
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-blue-400">3D Services</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-slate-800/50 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-blue-500/50 backdrop-blur-sm"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechnologyStack3D = () => {
  const technologies = [
    { name: 'Blender', icon: '🔄', purpose: '3D Modeling' },
    { name: 'Three.js', icon: '⚡', purpose: 'Web 3D' },
    { name: 'WebGL', icon: '🎮', purpose: '3D Graphics' },
    { name: 'GLTF', icon: '📦', purpose: '3D Format' },
    { name: 'Shopify', icon: '🛒', purpose: 'E-commerce' },
    { name: 'React', icon: '⚛️', purpose: 'Frontend' }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900/80">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-orange-400">Technology</span> Stack
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group bg-slate-800/50 rounded-2xl p-6 text-center hover:transform hover:scale-110 transition-all duration-500 border border-slate-700 hover:border-orange-500/50 backdrop-blur-sm"
            >
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-500">
                {tech.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
              <div className="text-orange-400 text-sm font-medium">{tech.purpose}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const EnhancedCTASection3D = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready for Full
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
            3D Experience?
          </span>
        </h2>
        
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Transform your product showcase with advanced 360° 3D viewers and boost customer engagement
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/contact" 
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center"
          >
            Start 3D Project
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </Link>
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center backdrop-blur-sm"
          >
            Download Resume
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

const FloatingShapes = ({ mousePosition }) => {
  return (
    <>
      <div 
        className="floating-element absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-400/20 float-slow"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(50px)`
        }}
      >
        <div className="absolute inset-2 bg-blue-500/20 rounded-lg border border-blue-400/30"></div>
      </div>

      <div 
        className="floating-element absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 backdrop-blur-sm border border-purple-400/20 float-slow"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.3}deg) rotateY(${mousePosition.x * 0.3}deg) translateZ(30px)`,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
      ></div>
    </>
  );
};

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-white text-lg font-semibold">Loading 3D Environment</div>
        <div className="text-gray-400 text-sm mt-2">Initializing product models...</div>
      </div>
    </div>
  );
};

export default Home;