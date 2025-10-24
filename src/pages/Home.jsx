
// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { gsap } from 'gsap';

// const Home = () => {
//   const heroRef = useRef(null);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [activeModel, setActiveModel] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState(null);

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
//       category: "Furniture",
//       price: "$1,299"
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
//       category: "Electronics",
//       price: "$399"
//     },
//     {
//       id: 3,
//       name: "Fitness Bike",
//       type: "sports",
//       icon: "🚴",
//       color: "from-green-500 to-emerald-500",
//       vertices: "20k",
//       textures: "4K PBR",
//       polygons: "40k",
//       category: "Sports/Fitness",
//       price: "$899"
//     },
//     {
//       id: 4,
//       name: "Coffee Maker",
//       type: "appliance",
//       icon: "☕",
//       color: "from-orange-500 to-red-500",
//       vertices: "15k",
//       textures: "4K PBR",
//       polygons: "30k",
//       category: "Home Appliances",
//       price: "$249"
//     }
//   ];

//   useEffect(() => {
//     setTimeout(() => setIsLoading(false), 2000);

//     const handleMouseMove = (e) => {
//       setMousePosition({
//         x: (e.clientX / window.innerWidth - 0.5) * 40,
//         y: (e.clientY / window.innerHeight - 0.5) * 40
//       });
//     };
//     window.addEventListener('mousemove', handleMouseMove);

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

//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveModel((prev) => (prev + 1) % models.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Scroll to 360 viewer when category is selected
//   useEffect(() => {
//     if (selectedCategory !== null) {
//       const viewerSection = document.getElementById('360-viewer-section');
//       if (viewerSection) {
//         viewerSection.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [selectedCategory]);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <div className="pt-16 overflow-hidden">
//       <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
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
//             }}
//           ></div>
//         </div>

//         <FloatingShapes mousePosition={mousePosition} />

//         <div className="container mx-auto relative z-20">
//           <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            
//             <div className="flex-1 hero-content text-center lg:text-left">
//               <div className="floating-element inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm mb-6 backdrop-blur-sm">
//                 <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
//                 Advanced 3D Product Visualization
//               </div>

//               <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
//                 Full 3D
//                 <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
//                   Product Experience
//                 </span>
//               </h1>

//               <p className="text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
//                 Experience products in complete 3D freedom. Rotate in any direction, 
//                 zoom into details, and explore every angle with our advanced 360° viewer.
//               </p>

//               <div className="floating-element mb-8 p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-gray-400">Featured Product:</span>
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
//                 <button 
//                   onClick={() => setSelectedCategory(0)}
//                   className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 inline-flex items-center justify-center"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     Try 360° Viewer
//                     <svg className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//                     </svg>
//                   </span>
//                 </button>
                
//                 <a 
//                   href="/resume.pdf" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 inline-flex items-center justify-center"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     Download Resume
//                     <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </span>
//                 </a>
//               </div>
//             </div>

//             <div className="flex-1 flex justify-center items-center">
//               <Advanced3DViewer 
//                 activeModel={activeModel} 
//                 models={models}
//                 mousePosition={mousePosition}
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       <ProductCategoriesSection onCategorySelect={setSelectedCategory} />
//       <Interactive360Viewer id="360-viewer-section" selectedCategory={selectedCategory} />
//       <EnhancedServicesSection />
//       <TechnologyStack3D />
//       <EnhancedCTASection3D />
//     </div>
//   );
// };

// // Advanced 3D Viewer with Full Rotation
// const Advanced3DViewer = ({ activeModel, models, mousePosition }) => {
//   const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
//   const [scale, setScale] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

//   const currentModel = models[activeModel];

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     const deltaX = e.clientX - lastMousePos.x;
//     const deltaY = e.clientY - lastMousePos.y;
    
//     setRotation(prev => ({
//       x: prev.x + deltaY * 0.5, // Rotate X axis with vertical drag
//       y: prev.y + deltaX * 0.5, // Rotate Y axis with horizontal drag
//       z: prev.z // Z axis can be controlled separately
//     }));
    
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
//     setScale(Math.max(0.5, Math.min(3, newScale)));
//   };

//   // Z-axis rotation with keyboard or buttons
//   const rotateZ = (direction) => {
//     setRotation(prev => ({
//       ...prev,
//       z: prev.z + direction * 10
//     }));
//   };

//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
//     const handleGlobalMouseMove = (e) => handleMouseMove(e);

//     if (isDragging) {
//       document.addEventListener('mousemove', handleGlobalMouseMove);
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleGlobalMouseMove);
//       document.removeEventListener('mouseup', handleGlobalMouseUp);
//     };
//   }, [isDragging, lastMousePos]);

//   return (
//     <div className="relative w-96 h-96">
//       <div 
//         className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 backdrop-blur-sm overflow-hidden"
//         style={{
//           transform: `perspective(1500px) rotateX(${5 + mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
//           boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <div 
//           className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
//           onMouseDown={handleMouseDown}
//           onWheel={handleWheel}
//           style={{
//             transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) scale(${scale})`,
//             transition: isDragging ? 'none' : 'transform 0.3s ease'
//           }}
//         >
//           <div className="relative w-64 h-64 transition-all duration-1000">
//             <div className={`absolute inset-0 bg-gradient-to-br ${currentModel.color} rounded-2xl shadow-2xl`}>
//               {currentModel.type === 'furniture' && <FurnitureModel />}
//               {currentModel.type === 'electronics' && <ElectronicsModel />}
//               {currentModel.type === 'sports' && <SportsModel />}
//               {currentModel.type === 'appliance' && <ApplianceModel />}
//             </div>
//           </div>
//         </div>

//         {/* Controls Panel */}
//         <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
//           <div className="flex items-center justify-between mb-3">
//             <div>
//               <div className="text-white font-bold text-lg">{currentModel.name}</div>
//               <div className="text-gray-400 text-sm">{currentModel.category} • {currentModel.price}</div>
//             </div>
//             <div className="text-3xl">{currentModel.icon}</div>
//           </div>
          
//           <div className="flex justify-between items-center">
//             <div className="text-xs text-gray-400">
//               <div>Drag: Rotate X/Y • Scroll: Zoom</div>
//               <div>X: {Math.round(rotation.x)}° Y: {Math.round(rotation.y)}° Z: {Math.round(rotation.z)}°</div>
//             </div>
            
//             <div className="flex gap-1">
//               <button 
//                 onClick={() => rotateZ(-1)}
//                 className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
//               >
//                 ↶
//               </button>
//               <button 
//                 onClick={() => rotateZ(1)}
//                 className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
//               >
//                 ↷
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Control Buttons */}
//         <div className="absolute top-6 right-6 flex flex-col gap-2">
//           <button 
//             onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
//             className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm hover:bg-slate-600/50"
//             title="Reset Rotation"
//           >
//             ⟳
//           </button>
//           <button 
//             onClick={() => setScale(1)}
//             className="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors backdrop-blur-sm hover:bg-slate-600/50"
//             title="Reset Zoom"
//           >
//             ⊞
//           </button>
//         </div>

//         {/* Rotation Guide */}
//         <div className="absolute top-6 left-6 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
//           <div className="text-green-400 text-sm font-medium">3D Active</div>
//           <div className="text-gray-400 text-xs">Full Rotation</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Enhanced 360° Interactive Viewer with Category Integration
// const Interactive360Viewer = ({ id, selectedCategory }) => {
//   const [selectedProduct, setSelectedProduct] = useState(0);
//   const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [startPos, setStartPos] = useState({ x: 0, y: 0 });
//   const [autoRotate, setAutoRotate] = useState(true);

//   const products = [
//     {
//       id: 1,
//       name: "Modern Sofa",
//       category: "Furniture",
//       icon: "🛋️",
//       color: "from-blue-500 to-cyan-500",
//       description: "Luxury modern sofa with premium fabric and ergonomic design",
//       price: "$1,299",
//       features: ["Premium Fabric", "Ergonomic Design", "Easy Assembly"],
//       categoryId: 0
//     },
//     {
//       id: 2,
//       name: "Smart Watch",
//       category: "Electronics",
//       icon: "⌚",
//       color: "from-purple-500 to-pink-500",
//       description: "Advanced smartwatch with health monitoring and premium finish",
//       price: "$399",
//       features: ["Health Monitoring", "Water Resistant", "Long Battery"],
//       categoryId: 3
//     },
//     {
//       id: 3,
//       name: "Fitness Bike",
//       category: "Sports/Fitness",
//       icon: "🚴",
//       color: "from-green-500 to-emerald-500",
//       description: "Professional fitness bike with adjustable resistance levels",
//       price: "$899",
//       features: ["Adjustable Resistance", "Digital Display", "Foldable"],
//       categoryId: 1
//     },
//     {
//       id: 4,
//       name: "Coffee Maker",
//       category: "Home Appliances",
//       icon: "☕",
//       color: "from-orange-500 to-red-500",
//       description: "Smart coffee maker with programmable settings and thermal carafe",
//       price: "$249",
//       features: ["Programmable", "Thermal Carafe", "Fast Brewing"],
//       categoryId: 2
//     },
//     {
//       id: 5,
//       name: "Designer Jacket",
//       category: "Fashion",
//       icon: "🧥",
//       color: "from-pink-500 to-rose-500",
//       description: "Premium designer jacket with weather-resistant fabric",
//       price: "$189",
//       features: ["Weather Resistant", "Premium Fabric", "Designer Fit"],
//       categoryId: 4
//     },
//     {
//       id: 6,
//       name: "Educational Toy",
//       category: "Kids",
//       icon: "🧩",
//       color: "from-yellow-500 to-amber-500",
//       description: "Interactive educational toy for child development",
//       price: "$49",
//       features: ["Educational", "Safe Materials", "Interactive"],
//       categoryId: 5
//     }
//   ];

//   // Filter products based on selected category
//   const filteredProducts = selectedCategory !== null 
//     ? products.filter(product => product.categoryId === selectedCategory)
//     : products;

//   const currentProduct = filteredProducts[selectedProduct] || products[0];

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartPos({ x: e.clientX, y: e.clientY });
//     setAutoRotate(false);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
//     const deltaX = e.clientX - startPos.x;
//     const deltaY = e.clientY - startPos.y;
    
//     setRotation(prev => ({
//       x: prev.x + deltaY * 0.5,
//       y: prev.y + deltaX * 0.5,
//       z: prev.z
//     }));
    
//     setStartPos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Z-axis rotation
//   const rotateZ = (direction) => {
//     setRotation(prev => ({
//       ...prev,
//       z: prev.z + direction * 10
//     }));
//   };

//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
//     const handleGlobalMouseMove = (e) => handleMouseMove(e);

//     if (isDragging) {
//       document.addEventListener('mousemove', handleGlobalMouseMove);
//       document.addEventListener('mouseup', handleGlobalMouseUp);
//     }

//     return () => {
//       document.removeEventListener('mousemove', handleGlobalMouseMove);
//       document.removeEventListener('mouseup', handleGlobalMouseUp);
//     };
//   }, [isDragging, startPos]);

//   useEffect(() => {
//     if (!autoRotate) return;

//     const interval = setInterval(() => {
//       setRotation(prev => ({
//         ...prev,
//         y: (prev.y + 1) % 360
//       }));
//     }, 50);

//     return () => clearInterval(interval);
//   }, [autoRotate]);

//   // Reset selection when category changes
//   useEffect(() => {
//     setSelectedProduct(0);
//     setRotation({ x: 0, y: 0, z: 0 });
//   }, [selectedCategory]);

//   return (
//     <section id={id} className="py-20 px-6 bg-slate-800/50">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Interactive <span className="text-purple-400">360° Product Viewer</span>
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             {selectedCategory !== null 
//               ? `Exploring ${filteredProducts.length} products in this category. Drag to rotate in any direction!`
//               : "Select a product and drag to rotate it in full 3D. Experience every angle!"
//             }
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8 items-stretch">
//           {/* Product Selection */}
//           <div className="lg:w-1/3">
//             <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
//               <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
//                 <span>📦</span>
//                 Select Product
//                 {selectedCategory !== null && (
//                   <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">
//                     Filtered
//                   </span>
//                 )}
//               </h3>
              
//               <div className="space-y-3 max-h-96 overflow-y-auto">
//                 {filteredProducts.map((product, index) => (
//                   <button
//                     key={product.id}
//                     onClick={() => {
//                       setSelectedProduct(index);
//                       setRotation({ x: 0, y: 0, z: 0 });
//                     }}
//                     className={`w-full p-4 rounded-xl text-left transition-all duration-300 group ${
//                       selectedProduct === index
//                         ? 'bg-blue-600/20 border border-blue-500/50 transform scale-105'
//                         : 'bg-slate-700/50 border border-slate-600 hover:border-slate-500 hover:transform hover:scale-102'
//                     }`}
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
//                         {product.icon}
//                       </div>
//                       <div className="flex-1">
//                         <div className="text-white font-semibold">{product.name}</div>
//                         <div className="text-gray-400 text-sm">{product.category}</div>
//                       </div>
//                       {selectedProduct === index && (
//                         <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {/* Product Details */}
//               <div className="mt-6 p-4 bg-slate-700/30 rounded-xl border border-slate-600">
//                 <h4 className="text-white font-bold mb-2">{currentProduct.name}</h4>
//                 <p className="text-gray-400 text-sm mb-3">{currentProduct.description}</p>
//                 <div className="text-green-400 font-bold text-lg mb-3">{currentProduct.price}</div>
//                 <div className="flex flex-wrap gap-2">
//                   {currentProduct.features.map((feature, idx) => (
//                     <span key={idx} className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-xs">
//                       {feature}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Clear Filter Button */}
//               {selectedCategory !== null && (
//                 <button
//                   onClick={() => {
//                     setSelectedCategory(null);
//                     setSelectedProduct(0);
//                   }}
//                   className="w-full mt-4 py-2 bg-slate-700/50 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-600/50 hover:text-white transition-all duration-300"
//                 >
//                   Clear Filter • Show All Products
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* 360 Viewer */}
//           <div className="lg:w-2/3">
//             <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
//               <div 
//                 className="relative h-96 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl border border-slate-600 overflow-hidden cursor-grab active:cursor-grabbing"
//                 onMouseDown={handleMouseDown}
//               >
//                 {/* Product in 360 */}
//                 <div 
//                   className="absolute inset-0 flex items-center justify-center"
//                   style={{
//                     transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
//                     transition: isDragging ? 'none' : 'transform 0.1s ease-out',
//                     transformStyle: 'preserve-3d'
//                   }}
//                 >
//                   <div className="relative w-64 h-64">
//                     <div className={`absolute inset-0 bg-gradient-to-br ${currentProduct.color} rounded-2xl shadow-2xl`}>
//                       {currentProduct.category === "Furniture" && <FurnitureModel />}
//                       {currentProduct.category === "Electronics" && <ElectronicsModel />}
//                       {currentProduct.category === "Sports/Fitness" && <SportsModel />}
//                       {currentProduct.category === "Home Appliances" && <ApplianceModel />}
//                       {currentProduct.category === "Fashion" && <FashionModel />}
//                       {currentProduct.category === "Kids" && <KidsModel />}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Controls */}
//                 <div className="absolute bottom-4 left-4 flex gap-2">
//                   <button 
//                     onClick={() => setAutoRotate(!autoRotate)}
//                     className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                       autoRotate 
//                         ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
//                         : 'bg-slate-700 text-gray-300 hover:text-white'
//                     }`}
//                   >
//                     {autoRotate ? '⏸️ Pause' : '▶️ Auto Rotate'}
//                   </button>
//                   <button 
//                     onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
//                     className="px-4 py-2 bg-slate-700 text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-slate-600"
//                   >
//                     🔄 Reset View
//                   </button>
//                   <div className="flex gap-1">
//                     <button 
//                       onClick={() => rotateZ(-1)}
//                       className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
//                     >
//                       ↶
//                     </button>
//                     <button 
//                       onClick={() => rotateZ(1)}
//                       className="w-8 h-8 bg-slate-700/50 border border-slate-600 rounded flex items-center justify-center text-white/60 hover:text-white transition-colors text-sm"
//                     >
//                       ↷
//                     </button>
//                   </div>
//                 </div>

//                 {/* Rotation Indicators */}
//                 <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
//                   <div className="text-white text-lg font-mono font-bold">
//                     X:{Math.round(rotation.x)}° Y:{Math.round(rotation.y)}° Z:{Math.round(rotation.z)}°
//                   </div>
//                   <div className="text-gray-400 text-xs">3D Rotation</div>
//                 </div>

//                 {/* Product Info */}
//                 <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
//                   <div className="text-white font-medium">{currentProduct.name}</div>
//                   <div className="text-gray-400 text-xs">{currentProduct.category}</div>
//                 </div>
//               </div>

//               {/* Instructions */}
//               <div className="mt-4 text-center">
//                 <p className="text-gray-400 text-sm">
//                   <span className="text-blue-400 font-medium">← Drag to rotate in 3D →</span> • 
//                   <span className="text-green-400 font-medium"> Z-buttons for tilt</span> • 
//                   <span className="text-purple-400 font-medium"> Auto-rotate available</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // Product Categories Section with Functional Buttons
// const ProductCategoriesSection = ({ onCategorySelect }) => {
//   const categories = [
//     {
//       id: 0,
//       name: "Furniture",
//       icon: "🛋️",
//       count: "24 Products",
//       color: "from-blue-500 to-cyan-500",
//       models: ["Sofas", "Chairs", "Tables", "Beds", "Wardrobes"]
//     },
//     {
//       id: 1,
//       name: "Sports/Fitness",
//       icon: "💪",
//       count: "18 Products",
//       color: "from-green-500 to-emerald-500",
//       models: ["Equipment", "Accessories", "Wearables", "Machines"]
//     },
//     {
//       id: 2,
//       name: "Home Appliances",
//       icon: "🏠",
//       count: "32 Products",
//       color: "from-orange-500 to-red-500",
//       models: ["Kitchen", "Cleaning", "Climate", "Laundry"]
//     },
//     {
//       id: 3,
//       name: "Electronics",
//       icon: "📱",
//       count: "45 Products",
//       color: "from-purple-500 to-pink-500",
//       models: ["Mobile", "Audio", "Wearables", "Computers"]
//     },
//     {
//       id: 4,
//       name: "Fashion",
//       icon: "👕",
//       count: "28 Products",
//       color: "from-pink-500 to-rose-500",
//       models: ["Clothing", "Footwear", "Accessories", "Bags"]
//     },
//     {
//       id: 5,
//       name: "Kids",
//       icon: "🧸",
//       count: "15 Products",
//       color: "from-yellow-500 to-amber-500",
//       models: ["Toys", "Furniture", "Accessories", "Learning"]
//     }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-900">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Product <span className="text-blue-400">Categories</span>
//           </h2>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Explore our wide range of 3D product models across various categories, 
//             all available in interactive 360° views.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {categories.map((category) => (
//             <div 
//               key={category.id}
//               className="group relative bg-slate-800/50 rounded-2xl p-6 hover:transform hover:scale-105 transition-all duration-500 border border-slate-700 hover:border-blue-500/50 backdrop-blur-sm"
//             >
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

//               <button 
//                 onClick={() => onCategorySelect(category.id)}
//                 className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
//               >
//                 <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span>
//                 View in 360°
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // Additional Model Components
// const FashionModel = () => (
//   <>
//     <div className="absolute top-8 left-8 right-8 h-24 bg-white/15 rounded-lg shadow-inner"></div>
//     <div className="absolute bottom-12 left-10 right-10 h-6 bg-white/20 rounded"></div>
//     <div className="absolute top-4 left-4 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
//   </>
// );

// const KidsModel = () => (
//   <>
//     <div className="absolute top-10 left-10 right-10 h-16 bg-white/20 rounded-full shadow-inner"></div>
//     <div className="absolute bottom-10 left-12 right-12 h-8 bg-white/15 rounded-lg"></div>
//     <div className="absolute bottom-4 left-4 w-3 h-3 bg-white/50 rounded-full animate-bounce"></div>
//   </>
// );

// // Keep other components (FurnitureModel, ElectronicsModel, SportsModel, ApplianceModel, 
// // EnhancedServicesSection, TechnologyStack3D, EnhancedCTASection3D, LoadingScreen, FloatingShapes) 
// // the same as in previous code

// const FurnitureModel = () => (
//   <>
//     <div className="absolute top-8 left-6 right-6 h-16 bg-white/20 rounded-lg shadow-inner"></div>
//     <div className="absolute bottom-8 left-8 right-8 h-4 bg-white/15 rounded"></div>
//     <div className="absolute left-10 top-1/2 w-8 h-20 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
//     <div className="absolute right-10 top-1/2 w-8 h-20 bg-white/25 rounded-lg -translate-y-1/2 shadow-lg"></div>
//     <div className="absolute top-4 right-4 w-6 h-6 bg-white/40 rounded-full animate-ping"></div>
//   </>
// );

// const ElectronicsModel = () => (
//   <>
//     <div className="absolute top-12 left-8 right-8 h-20 bg-white/15 rounded-xl shadow-inner"></div>
//     <div className="absolute bottom-12 left-12 right-12 h-3 bg-white/25 rounded"></div>
//     <div className="absolute top-6 left-1/2 w-2 h-4 bg-white/40 rounded -translate-x-1/2"></div>
//     <div className="absolute bottom-8 left-1/2 w-16 h-1 bg-white/30 rounded -translate-x-1/2"></div>
//     <div className="absolute bottom-4 left-4 w-4 h-4 bg-white/30 rounded-full animate-bounce"></div>
//   </>
// );

// const SportsModel = () => (
//   <>
//     <div className="absolute top-10 left-10 right-10 h-12 bg-white/20 rounded-full shadow-inner"></div>
//     <div className="absolute bottom-12 left-12 right-12 h-8 bg-white/15 rounded-lg"></div>
//     <div className="absolute bottom-8 left-16 w-6 h-6 bg-white/25 rounded-full"></div>
//     <div className="absolute bottom-8 right-16 w-6 h-6 bg-white/25 rounded-full"></div>
//     <div className="absolute top-1/2 left-4 w-3 h-3 bg-white/50 rounded-full animate-pulse"></div>
//   </>
// );

// const ApplianceModel = () => (
//   <>
//     <div className="absolute top-8 left-6 right-6 h-20 bg-white/20 rounded-lg shadow-inner"></div>
//     <div className="absolute bottom-12 left-8 right-8 h-8 bg-white/15 rounded"></div>
//     <div className="absolute bottom-8 left-12 w-8 h-2 bg-white/30 rounded"></div>
//     <div className="absolute bottom-8 right-12 w-8 h-2 bg-white/30 rounded"></div>
//     <div className="absolute top-4 left-4 w-4 h-4 bg-white/40 rounded-full animate-ping"></div>
//   </>
// );

// // Keep EnhancedServicesSection, TechnologyStack3D, EnhancedCTASection3D, LoadingScreen, FloatingShapes
// // (They remain the same as in previous code, just ensure they're included)

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
//       icon: '📱',
//       title: 'E-commerce Ready',
//       description: 'Seamless integration with popular e-commerce platforms',
//       features: ['Shopify', 'WooCommerce', 'Custom Solutions']
//     },
//     {
//       icon: '⚡',
//       title: 'Web Optimization',
//       description: 'Lightweight models optimized for fast web loading',
//       features: ['Fast Loading', 'Mobile Friendly', 'SEO Optimized']
//     }
//   ];

//   return (
//     <section className="py-20 px-6 bg-slate-800/50">
//       <div className="container mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Our <span className="text-blue-400">3D Services</span>
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

// const TechnologyStack3D = () => {
//   const technologies = [
//     { name: 'Blender', icon: '🔄', purpose: '3D Modeling' },
//     { name: 'Three.js', icon: '⚡', purpose: 'Web 3D' },
//     { name: 'WebGL', icon: '🎮', purpose: '3D Graphics' },
//     { name: 'GLTF', icon: '📦', purpose: '3D Format' },
//     { name: 'Shopify', icon: '🛒', purpose: 'E-commerce' },
//     { name: 'React', icon: '⚛️', purpose: 'Frontend' }
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

// const EnhancedCTASection3D = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
//       <div className="container mx-auto text-center relative z-10">
//         <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
//           Ready for Full
//           <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
//             3D Experience?
//           </span>
//         </h2>
        
//         <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
//           Transform your product showcase with advanced 360° 3D viewers and boost customer engagement
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
import axios from 'axios';

const API_BASE_URL = 'https://sakthi-portfolio-backend-production.up.railway.app';

const Home = () => {
  const heroRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeModel, setActiveModel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(res.data);
      setLoadingProjects(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoadingProjects(false);
    }
  };

  // Convert backend projects to 360 viewer format
  const get360ViewerProducts = () => {
    if (!projects || projects.length === 0) {
      return [
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
        }
      ];
    }

    return projects.map((project, index) => ({
      id: project._id || index,
      name: project.title,
      category: project.category || "3D Model",
      icon: getCategoryIcon(project.category),
      color: getCategoryColor(project.category),
      description: project.description,
      price: project.price || "Contact for Price",
      features: project.technologies || ["3D Model", "High Quality"],
      categoryId: getCategoryId(project.category),
      projectData: project // Include full project data
    }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      '3D Modeling': '🎨',
      '3D Animation': '🎬',
      'Architectural Visualization': '🏛️',
      'Product Design': '📱',
      'Character Modeling': '👤',
      'Motion Graphics': '✨',
      'VFX': '💥',
      'Game Assets': '🎮'
    };
    return icons[category] || '🎯';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '3D Modeling': 'from-blue-500 to-cyan-500',
      '3D Animation': 'from-purple-500 to-pink-500',
      'Architectural Visualization': 'from-green-500 to-emerald-500',
      'Product Design': 'from-orange-500 to-red-500',
      'Character Modeling': 'from-yellow-500 to-amber-500',
      'Motion Graphics': 'from-indigo-500 to-purple-500',
      'VFX': 'from-red-500 to-pink-500',
      'Game Assets': 'from-teal-500 to-blue-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  const getCategoryId = (category) => {
    const categories = {
      '3D Modeling': 0,
      '3D Animation': 1,
      'Architectural Visualization': 2,
      'Product Design': 3,
      'Character Modeling': 4,
      'Motion Graphics': 5,
      'VFX': 6,
      'Game Assets': 7
    };
    return categories[category] || 0;
  };

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
      setActiveModel((prev) => (prev + 1) % get360ViewerProducts().length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

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

  const currentProducts = get360ViewerProducts();

  return (
    <div className="pt-16 overflow-hidden">
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        
        {/* Background Grid */}
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
                  <span className="text-gray-400">Featured Project:</span>
                  <span className="text-blue-400 font-semibold flex items-center">
                    {currentProducts[activeModel]?.icon} {currentProducts[activeModel]?.name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">High</div>
                    <div className="text-gray-400 text-sm">Quality</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">3D</div>
                    <div className="text-gray-400 text-sm">Ready</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">360°</div>
                    <div className="text-gray-400 text-sm">View</div>
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
                products={currentProducts}
                mousePosition={mousePosition}
              />
            </div>
          </div>
        </div>
      </section>

      <ProductCategoriesSection onCategorySelect={setSelectedCategory} />
      <Interactive360Viewer 
        id="360-viewer-section" 
        selectedCategory={selectedCategory}
        projects={projects}
        loading={loadingProjects}
      />
      <EnhancedServicesSection />
      <TechnologyStack3D />
      <EnhancedCTASection3D />
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-slate-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-lg">Loading 3D Experience...</div>
      </div>
    </div>
  );
};

// Floating Shapes Component
const FloatingShapes = ({ mousePosition }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        style={{
          top: '20%',
          left: '10%',
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
        }}
      ></div>
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
        style={{
          top: '60%',
          right: '10%',
          transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`
        }}
      ></div>
    </div>
  );
};

// Advanced 3D Viewer Component
const Advanced3DViewer = ({ activeModel, products, mousePosition }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const currentProduct = products[activeModel];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
      z: prev.z
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(0.5, scale + e.deltaY * -0.01), 2);
    setScale(newScale);
  };

  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.5
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  return (
    <div className="relative w-96 h-96">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 backdrop-blur-sm overflow-hidden"
        style={{
          transform: `perspective(1500px) rotateX(${5 + mousePosition.y * 0.2}deg) rotateY(${mousePosition.x * 0.2}deg)`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* 3D Model Container */}
        <div 
          className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <div 
            className="relative"
            style={{
              transform: `scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease'
            }}
          >
            {/* 3D Model Placeholder */}
            <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border-2 border-blue-400/30 backdrop-blur-sm flex items-center justify-center">
              <div className="text-6xl">{currentProduct?.icon}</div>
            </div>
            
            {/* 3D Axis Indicators */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-red-500/50 rounded-full"></div>
            <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-green-500/50 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 border-2 border-blue-500/50 rounded-full"></div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="absolute bottom-6 left-6 right-6 bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-white font-bold text-lg">{currentProduct?.name}</div>
              <div className="text-gray-400 text-sm">{currentProduct?.category} • {currentProduct?.price}</div>
            </div>
            <div className="text-3xl">{currentProduct?.icon}</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button 
                onClick={() => setScale(1)}
                className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-600 transition-colors"
              >
                ⟳
              </button>
              <button 
                onClick={() => setScale(Math.min(scale + 0.1, 2))}
                className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-600 transition-colors"
              >
                +
              </button>
              <button 
                onClick={() => setScale(Math.max(scale - 0.1, 0.5))}
                className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-600 transition-colors"
              >
                -
              </button>
            </div>
            
            <div className="text-xs text-gray-400">
              Drag to rotate • Scroll to zoom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Product Categories Section Component
const ProductCategoriesSection = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 0,
      name: "3D Modeling",
      icon: "🎨",
      description: "High-quality 3D models and assets",
      count: "12 Projects",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 1,
      name: "3D Animation",
      icon: "🎬",
      description: "Dynamic animations and motion graphics",
      count: "8 Projects",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Architectural Visualization",
      icon: "🏛️",
      description: "Realistic architectural renders",
      count: "15 Projects",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Product Design",
      icon: "📱",
      description: "Innovative product designs",
      count: "10 Projects",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore by <span className="text-cyan-400">Category</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our diverse range of 3D projects across different categories. 
            Each category showcases unique expertise and creative solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="group p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm text-left transition-all duration-300 hover:border-cyan-500/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-cyan-400 text-sm font-semibold">{category.count}</span>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-cyan-500 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// Interactive 360 Viewer Component
const Interactive360Viewer = ({ id, selectedCategory, projects, loading }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);

  // Convert projects to viewer format
  const getViewerProducts = () => {
    if (!projects || projects.length === 0) {
      return [
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
        }
      ];
    }

    return projects.map((project, index) => ({
      id: project._id || index,
      name: project.title,
      category: project.category || "3D Model",
      icon: getCategoryIcon(project.category),
      color: getCategoryColor(project.category),
      description: project.description,
      price: project.price || "Contact for Price",
      features: project.technologies || ["3D Model", "High Quality"],
      categoryId: getCategoryId(project.category),
      projectData: project
    }));
  };

  const getCategoryIcon = (category) => {
    const icons = {
      '3D Modeling': '🎨',
      '3D Animation': '🎬',
      'Architectural Visualization': '🏛️',
      'Product Design': '📱',
      'Character Modeling': '👤',
      'Motion Graphics': '✨',
      'VFX': '💥',
      'Game Assets': '🎮'
    };
    return icons[category] || '🎯';
  };

  const getCategoryColor = (category) => {
    const colors = {
      '3D Modeling': 'from-blue-500 to-cyan-500',
      '3D Animation': 'from-purple-500 to-pink-500',
      'Architectural Visualization': 'from-green-500 to-emerald-500',
      'Product Design': 'from-orange-500 to-red-500',
      'Character Modeling': 'from-yellow-500 to-amber-500',
      'Motion Graphics': 'from-indigo-500 to-purple-500',
      'VFX': 'from-red-500 to-pink-500',
      'Game Assets': 'from-teal-500 to-blue-500'
    };
    return colors[category] || 'from-gray-500 to-slate-500';
  };

  const getCategoryId = (category) => {
    const categories = {
      '3D Modeling': 0,
      '3D Animation': 1,
      'Architectural Visualization': 2,
      'Product Design': 3,
      'Character Modeling': 4,
      'Motion Graphics': 5,
      'VFX': 6,
      'Game Assets': 7
    };
    return categories[category] || 0;
  };

  const viewerProducts = getViewerProducts();
  
  // Filter products based on selected category
  const filteredProducts = selectedCategory !== null 
    ? viewerProducts.filter(product => product.categoryId === selectedCategory)
    : viewerProducts;

  const currentProduct = filteredProducts[selectedProduct] || viewerProducts[0];

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
    setTimeout(() => setAutoRotate(true), 3000);
  };

  useEffect(() => {
    if (autoRotate && !isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => ({
          ...prev,
          y: prev.y + 0.5
        }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isDragging]);

  if (loading) {
    return (
      <section id={id} className="py-20 px-6 bg-slate-800/50">
        <div className="container mx-auto text-center">
          <div className="animate-pulse text-white">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 px-6 bg-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive <span className="text-purple-400">360° Project Viewer</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {projects.length === 0 
              ? "No projects yet. Add projects in the admin panel to see them here!"
              : selectedCategory !== null 
                ? `Exploring ${filteredProducts.length} projects in this category. Drag to rotate in any direction!`
                : `Viewing all ${filteredProducts.length} projects. Drag to rotate in 3D!`
            }
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
            <p className="text-gray-400 mb-6">Add your first project in the admin panel to see it here!</p>
            <Link 
              to="/admin" 
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors inline-flex items-center"
            >
              Go to Admin Panel
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Product Selection */}
            <div className="lg:w-1/3">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <span>📦</span>
                  Select Project
                  <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded">
                    {filteredProducts.length} Projects
                  </span>
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

                {/* Project Details */}
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
                    Clear Filter • Show All Projects
                  </button>
                )}
              </div>
            </div>

            {/* 360 Viewer */}
            <div className="lg:w-2/3">
              <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 backdrop-blur-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className={`w-12 h-12 bg-gradient-to-br ${currentProduct.color} rounded-xl flex items-center justify-center text-xl`}>
                      {currentProduct.icon}
                    </span>
                    {currentProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        autoRotate
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-slate-700 text-gray-400 border border-slate-600'
                      }`}
                    >
                      {autoRotate ? 'Auto: ON' : 'Auto: OFF'}
                    </button>
                  </div>
                </div>

                {/* 3D Viewer Container */}
                <div 
                  className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="relative"
                      style={{
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease'
                      }}
                    >
                      {/* 3D Model Placeholder */}
                      <div className={`w-64 h-64 bg-gradient-to-br ${currentProduct.color} rounded-3xl border-2 border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl`}>
                        <div className="text-8xl">{currentProduct.icon}</div>
                      </div>
                      
                      {/* 3D Environment */}
                      <div className="absolute -inset-4 border-2 border-blue-500/20 rounded-3xl"></div>
                      <div className="absolute -inset-8 border-2 border-purple-500/10 rounded-3xl"></div>
                    </div>
                  </div>

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="text-white text-sm">
                          Drag to rotate • {isDragging ? 'Rotating...' : autoRotate ? 'Auto-rotating' : 'Paused'}
                        </div>
                        <div className="flex gap-2">
                          <div className="text-xs text-gray-400">
                            X: {Math.round(rotation.x)}° Y: {Math.round(rotation.y)}° Z: {Math.round(rotation.z)}°
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Enhanced Services Section Component
const EnhancedServicesSection = () => {
  const services = [
    {
      icon: "🎨",
      title: "3D Modeling",
      description: "High-quality 3D models with attention to detail and realism",
      features: ["Character Modeling", "Product Design", "Architectural Models"]
    },
    {
      icon: "🎬",
      title: "3D Animation",
      description: "Bringing models to life with smooth and dynamic animations",
      features: ["Character Animation", "Product Demos", "Motion Graphics"]
    },
    {
      icon: "🏛️",
      title: "Architectural Visualization",
      description: "Photorealistic architectural renders and walkthroughs",
      features: ["Interior Design", "Exterior Renders", "Virtual Tours"]
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-green-400">Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive 3D solutions tailored to bring your creative visions to life with cutting-edge technology and artistic expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group p-8 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300">
                    <svg className="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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

// Technology Stack 3D Component
const TechnologyStack3D = () => {
  const technologies = [
    { name: "Blender", icon: "💎", color: "from-orange-500 to-red-500" },
    { name: "Maya", icon: "🎭", color: "from-cyan-500 to-blue-500" },
    { name: "3DS Max", icon: "🔷", color: "from-blue-500 to-purple-500" },
    { name: "ZBrush", icon: "✏️", color: "from-gray-500 to-slate-500" },
    { name: "Substance", icon: "🎨", color: "from-amber-500 to-orange-500" },
    { name: "Unity", icon: "🎮", color: "from-gray-600 to-gray-800" },
    { name: "Unreal", icon: "🌌", color: "from-purple-500 to-pink-500" },
    { name: "After Effects", icon: "✨", color: "from-purple-600 to-indigo-600" }
  ];

  return (
    <section className="py-20 px-6 bg-slate-800/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technology <span className="text-orange-400">Stack</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powered by industry-leading software and tools to deliver exceptional 3D experiences and visualizations.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm text-center transition-all duration-300 hover:border-orange-500/50 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-125 transition-transform duration-300`}>
                {tech.icon}
              </div>
              <div className="text-white font-semibold">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced CTA Section 3D Component
const EnhancedCTASection3D = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Bring Your
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            3D Vision to Life?
          </span>
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's collaborate to create stunning 3D experiences that captivate your audience and elevate your brand.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/contact"
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center justify-center"
          >
            <span className="relative z-10 flex items-center">
              Start Your Project
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          
          <a 
            href="/portfolio"
            className="group bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 inline-flex items-center justify-center"
          >
            View Full Portfolio
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;