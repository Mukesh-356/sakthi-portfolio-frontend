
// // import React, { useEffect, useRef, useState } from 'react';

// // const Refrigerator3DViewer = () => {
// //   const containerRef = useRef(null);
// //   const [rotation, setRotation] = useState({ x: 0, y: 0 });
// //   const [scale, setScale] = useState(1);
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
// //   const [autoRotate, setAutoRotate] = useState(false);

// //   const refrigerator = {
// //     name: "Smart French Door Refrigerator",
// //     brand: "CoolMaster Pro",
// //     model: "CM-789X",
// //     capacity: "28.5 cu.ft",
// //     price: "$2,499",
// //     features: [
// //       "Smart Cooling System",
// //       "Energy Star Rated",
// //       "Ice & Water Dispenser",
// //       "Convertible Drawer",
// //       "Door Alarm",
// //       "WiFi Connected"
// //     ],
// //     specs: {
// //       height: "70 inches",
// //       width: "36 inches",
// //       depth: "34 inches",
// //       capacity: "28.5 cubic feet",
// //       energy: "Energy Star Certified",
// //       warranty: "10 years compressor"
// //     }
// //   };

// //   // Mouse event handlers
// //   const handleMouseDown = (e) => {
// //     setIsDragging(true);
// //     setLastMousePos({ x: e.clientX, y: e.clientY });
// //     setAutoRotate(false);
// //   };

// //   const handleMouseMove = (e) => {
// //     if (!isDragging) return;
    
// //     const deltaX = e.clientX - lastMousePos.x;
// //     const deltaY = e.clientY - lastMousePos.y;
    
// //     setRotation(prev => ({
// //       x: prev.x - deltaY * 0.5,
// //       y: prev.y + deltaX * 0.5
// //     }));
    
// //     setLastMousePos({ x: e.clientX, y: e.clientY });
// //   };

// //   const handleMouseUp = () => {
// //     setIsDragging(false);
// //   };

// //   const handleWheel = (e) => {
// //     e.preventDefault();
// //     const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
// //     setScale(Math.max(0.5, Math.min(2, newScale)));
// //   };

// //   // Global event listeners
// //   useEffect(() => {
// //     const handleGlobalMouseMove = (e) => {
// //       if (isDragging) {
// //         handleMouseMove(e);
// //       }
// //     };

// //     const handleGlobalMouseUp = () => {
// //       setIsDragging(false);
// //     };

// //     document.addEventListener('mousemove', handleGlobalMouseMove);
// //     document.addEventListener('mouseup', handleGlobalMouseUp);

// //     return () => {
// //       document.removeEventListener('mousemove', handleGlobalMouseMove);
// //       document.removeEventListener('mouseup', handleGlobalMouseUp);
// //     };
// //   }, [isDragging, lastMousePos]);

// //   // Auto-rotation effect
// //   useEffect(() => {
// //     if (!autoRotate) return;

// //     const interval = setInterval(() => {
// //       setRotation(prev => ({
// //         ...prev,
// //         y: prev.y + 1
// //       }));
// //     }, 50);

// //     return () => clearInterval(interval);
// //   }, [autoRotate]);

// //   const resetView = () => {
// //     setRotation({ x: 0, y: 0 });
// //     setScale(1);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
// //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
// //               Refrigerator
// //             </span>{' '}
// //             3D Explorer
// //           </h1>
// //           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
// //             Drag to rotate • Scroll to zoom • Explore every angle
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Product Information */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-full">
// //               {/* Product Header */}
// //               <div className="mb-6">
// //                 <h2 className="text-2xl font-bold text-white mb-2">{refrigerator.name}</h2>
// //                 <div className="text-cyan-400 text-lg mb-1">{refrigerator.brand} • {refrigerator.model}</div>
// //                 <div className="text-green-400 text-2xl font-bold">{refrigerator.price}</div>
// //               </div>

// //               {/* Capacity */}
// //               <div className="mb-6 p-4 bg-slate-700/30 rounded-xl">
// //                 <div className="text-white font-bold text-lg mb-2">Capacity</div>
// //                 <div className="text-3xl font-bold text-blue-400">{refrigerator.capacity}</div>
// //                 <div className="text-gray-400 text-sm">Total Storage Space</div>
// //               </div>

// //               {/* Specifications */}
// //               <div className="mb-6">
// //                 <h3 className="text-white font-bold text-lg mb-3">Specifications</h3>
// //                 <div className="space-y-2">
// //                   {Object.entries(refrigerator.specs).map(([key, value]) => (
// //                     <div key={key} className="flex justify-between items-center py-2 border-b border-slate-600">
// //                       <span className="text-gray-400 capitalize">{key}:</span>
// //                       <span className="text-white font-medium">{value}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Features */}
// //               <div className="mb-6">
// //                 <h3 className="text-white font-bold text-lg mb-3">Smart Features</h3>
// //                 <div className="space-y-2">
// //                   {refrigerator.features.map((feature, index) => (
// //                     <div key={index} className="flex items-center space-x-3 text-gray-300">
// //                       <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
// //                       <span>{feature}</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Controls */}
// //               <div className="space-y-3">
// //                 <button 
// //                   onClick={() => setAutoRotate(!autoRotate)}
// //                   className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
// //                     autoRotate 
// //                       ? 'bg-green-600 hover:bg-green-700' 
// //                       : 'bg-blue-600 hover:bg-blue-700'
// //                   }`}
// //                 >
// //                   <span>{autoRotate ? '⏸️' : '▶️'}</span>
// //                   {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
// //                 </button>
// //                 <button 
// //                   onClick={resetView}
// //                   className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
// //                 >
// //                   <span>🔄</span>
// //                   Reset View
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* 3D Viewer */}
// //           <div className="lg:col-span-2">
// //             <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
// //               {/* Viewer Container */}
// //               <div 
// //                 ref={containerRef}
// //                 className="relative h-96 md:h-[500px] bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-2 border-slate-600 overflow-hidden cursor-grab active:cursor-grabbing"
// //                 onMouseDown={handleMouseDown}
// //                 onWheel={handleWheel}
// //               >
// //                 {/* 3D Scene */}
// //                 <div className="absolute inset-0 flex items-center justify-center">
// //                   {/* Refrigerator Model */}
// //                   <div 
// //                     className="relative w-64 h-80"
// //                     style={{
// //                       transform: `
// //                         rotateX(${rotation.x}deg) 
// //                         rotateY(${rotation.y}deg) 
// //                         scale(${scale})
// //                       `,
// //                       transformStyle: 'preserve-3d',
// //                       transition: isDragging ? 'none' : 'transform 0.1s ease-out'
// //                     }}
// //                   >
// //                     {/* Main Refrigerator Body */}
// //                     <div className="absolute inset-0">
// //                       {/* Cabinet Structure */}
// //                       <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl border-4 border-gray-500">
                        
// //                         {/* Freezer Section - Top */}
// //                         <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg border-b-2 border-gray-400">
// //                           {/* Freezer Door */}
// //                           <div className="absolute inset-0 bg-gradient-to-br from-gray-250 to-gray-350 rounded-t-lg border-2 border-gray-500">
// //                             {/* Freezer Handle */}
// //                             <div className="absolute right-3 top-1/2 w-4 h-12 bg-gray-600 rounded-lg transform -translate-y-1/2 shadow-lg"></div>
// //                             {/* Freezer Control Panel */}
// //                             <div className="absolute left-3 top-3 w-6 h-6 bg-gray-700 rounded-full"></div>
// //                             <div className="absolute left-3 top-10 w-10 h-2 bg-gray-600 rounded"></div>
// //                           </div>
// //                         </div>

// //                         {/* Fresh Food Section - Middle */}
// //                         <div className="absolute top-24 left-0 right-0 h-40 bg-gradient-to-br from-gray-200 to-gray-300 border-b-2 border-gray-400">
// //                           {/* Main Doors */}
// //                           <div className="absolute inset-0 bg-gradient-to-br from-gray-250 to-gray-350 border-2 border-gray-500">
// //                             {/* Door Handles */}
// //                             <div className="absolute left-3 top-1/2 w-4 h-16 bg-gray-600 rounded-lg transform -translate-y-1/2 shadow-lg"></div>
// //                             <div className="absolute left-3 top-1/3 w-4 h-10 bg-gray-600 rounded-lg transform -translate-y-1/2 shadow-lg"></div>
                            
// //                             {/* Door Shelves Preview */}
// //                             <div className="absolute right-6 top-6 w-12 h-2 bg-gray-400/50 rounded"></div>
// //                             <div className="absolute right-6 top-12 w-12 h-2 bg-gray-400/50 rounded"></div>
// //                             <div className="absolute right-6 top-18 w-12 h-2 bg-gray-400/50 rounded"></div>
// //                             <div className="absolute right-6 top-24 w-12 h-2 bg-gray-400/50 rounded"></div>
// //                           </div>
// //                         </div>

// //                         {/* Crisper Drawers - Bottom */}
// //                         <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-b-lg">
// //                           {/* Drawer 1 */}
// //                           <div className="absolute bottom-10 left-3 right-3 h-5 bg-gray-400 rounded-t-lg border-t-2 border-gray-500">
// //                             <div className="absolute left-3 top-1/2 w-6 h-1 bg-gray-600 transform -translate-y-1/2"></div>
// //                           </div>
// //                           {/* Drawer 2 */}
// //                           <div className="absolute bottom-3 left-3 right-3 h-5 bg-gray-400 rounded-t-lg border-t-2 border-gray-500">
// //                             <div className="absolute left-3 top-1/2 w-6 h-1 bg-gray-600 transform -translate-y-1/2"></div>
// //                           </div>
// //                         </div>

// //                         {/* Water & Ice Dispenser */}
// //                         <div className="absolute top-6 right-0 w-12 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-l-lg border-2 border-gray-600">
// //                           <div className="absolute top-3 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
// //                           <div className="absolute top-8 left-2 w-6 h-1 bg-gray-600 rounded"></div>
// //                           <div className="absolute bottom-3 left-2 w-8 h-1 bg-gray-700 rounded"></div>
// //                         </div>

// //                         {/* Brand Logo */}
// //                         <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
// //                           <div className="text-gray-700 font-bold text-xs bg-white/80 px-2 py-1 rounded shadow-lg">
// //                             {refrigerator.brand}
// //                           </div>
// //                         </div>

// //                         {/* Model Info */}
// //                         <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
// //                           <div className="text-gray-600 text-xs bg-white/60 px-2 py-1 rounded">
// //                             {refrigerator.model}
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* 3D Depth Elements */}
// //                       <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg transform translateZ(-10px)"></div>
// //                       <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg transform translateZ(-20px)"></div>
// //                     </div>

// //                     {/* Floating Animation Elements */}
// //                     <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
// //                     <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
// //                   </div>
// //                 </div>

// //                 {/* Controls Overlay */}
// //                 <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700">
// //                   <div className="text-white font-mono text-sm space-y-1">
// //                     <div>X: {Math.round(rotation.x)}°</div>
// //                     <div>Y: {Math.round(rotation.y)}°</div>
// //                     <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
// //                   </div>
// //                 </div>

// //                 {/* Auto Rotate Indicator */}
// //                 {autoRotate && (
// //                   <div className="absolute top-4 right-4 bg-green-600/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500">
// //                     <div className="text-white text-sm font-medium flex items-center gap-2">
// //                       <span className="animate-spin">🌀</span>
// //                       Auto Rotating
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Initial Instruction */}
// //                 {!isDragging && rotation.y === 0 && (
// //                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                     <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600 text-center max-w-xs">
// //                       <div className="text-4xl mb-3">👆</div>
// //                       <div className="text-white font-bold text-lg mb-2">Drag to Rotate</div>
// //                       <div className="text-gray-300 text-sm">Click and drag anywhere to rotate the refrigerator</div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Live Stats */}
// //               <div className="mt-4">
// //                 <div className="grid grid-cols-3 gap-4 text-center">
// //                   <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
// //                     <div className="text-blue-400 text-lg font-bold">{Math.round(rotation.y)}°</div>
// //                     <div className="text-gray-400 text-xs">Rotation</div>
// //                   </div>
// //                   <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
// //                     <div className="text-green-400 text-lg font-bold">{scale.toFixed(1)}x</div>
// //                     <div className="text-gray-400 text-xs">Zoom Level</div>
// //                   </div>
// //                   <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
// //                     <div className={`text-lg font-bold ${autoRotate ? 'text-green-400' : 'text-yellow-400'}`}>
// //                       {autoRotate ? 'ON' : 'OFF'}
// //                     </div>
// //                     <div className="text-gray-400 text-xs">Auto Rotate</div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Instructions */}
// //               <div className="mt-4 text-center">
// //                 <div className="inline-flex flex-wrap gap-4 text-sm text-gray-400">
// //                   <span className="flex items-center gap-1">
// //                     <span className="text-blue-400">← Drag →</span>
// //                     <span>Rotate 360°</span>
// //                   </span>
// //                   <span className="flex items-center gap-1">
// //                     <span className="text-green-400">Scroll</span>
// //                     <span>Zoom In/Out</span>
// //                   </span>
// //                   <span className="flex items-center gap-1">
// //                     <span className="text-yellow-400">Auto</span>
// //                     <span>Continuous Spin</span>
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Features Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
// //           {[
// //             {
// //               icon: '🎮',
// //               title: 'Interactive 3D',
// //               description: 'Full 360° rotation with smooth dragging'
// //             },
// //             {
// //               icon: '📐',
// //               title: 'Real Scale',
// //               description: 'Accurate 70" height and 36" width'
// //             },
// //             {
// //               icon: '⚡',
// //               title: 'Smart Features',
// //               description: 'Ice maker, digital controls, WiFi'
// //             },
// //             {
// //               icon: '💎',
// //               title: 'Premium Design',
// //               description: 'French doors with stainless steel'
// //             }
// //           ].map((feature, index) => (
// //             <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center hover:transform hover:scale-105 transition-all duration-300">
// //               <div className="text-3xl mb-3">{feature.icon}</div>
// //               <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
// //               <p className="text-gray-400 text-sm">{feature.description}</p>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Status Indicator */}
// //         <div className="mt-8 text-center">
// //           <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 inline-block">
// //             <div className="text-green-400 font-bold text-lg flex items-center gap-2">
// //               <span>✅</span>
// //               <span>3D Rotation is Working Perfectly!</span>
// //             </div>
// //             <div className="text-green-300 text-sm mt-1">
// //               Drag the refrigerator to see it from all angles
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Refrigerator3DViewer;




// import React, { useState, useEffect } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios';

// const API_BASE_URL = 'https://sakthi-portfolio-backend-production.up.railway.app';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showDemo, setShowDemo] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(`${API_BASE_URL}/api/projects`);
//       setProjects(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//       setLoading(false);
//     }
//   };

//   const categories = ['all', ...new Set(projects.map(p => p.category))];

//   const filteredProjects = filter === 'all' 
//     ? projects 
//     : projects.filter(project => project.category === filter);

//   const openDemo = (project) => {
//     setSelectedProject(project);
//     setShowDemo(true);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
//         <div className="container mx-auto text-center">
//           <div className="animate-pulse text-white text-xl">Loading projects...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
//       <div className="container mx-auto">
//         <h1 className="text-5xl font-bold text-center mb-4 text-white">3D Projects</h1>
//         <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
//           Explore my collection of 3D models, animations, and visualizations
//         </p>

//         {/* Filter Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-12">
//           {categories.map(category => (
//             <button
//               key={category}
//               onClick={() => setFilter(category)}
//               className={`px-6 py-3 rounded-full transition-all ${
//                 filter === category 
//                   ? 'bg-blue-600 text-white' 
//                   : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
//               }`}
//             >
//               {category.charAt(0).toUpperCase() + category.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Projects Grid */}
//         {projects.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="text-6xl mb-4">📁</div>
//             <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
//             <p className="text-gray-400 mb-6">Add your first project in the admin panel to see it here!</p>
//             <a 
//               href="/admin"
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors inline-flex items-center"
//             >
//               Go to Admin Panel
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//               </svg>
//             </a>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredProjects.map((project) => (
//               <ProjectCard 
//                 key={project._id} 
//                 project={project} 
//                 onViewDemo={() => openDemo(project)}
//               />
//             ))}
//           </div>
//         )}

//         {/* Project Demo Modal */}
//         {showDemo && selectedProject && (
//           <ProjectDemo 
//             project={selectedProject}
//             onClose={() => setShowDemo(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// // Project Card Component
// const ProjectCard = ({ project, onViewDemo }) => {
//   const getCategoryIcon = (category) => {
//     const icons = {
//       '3D Modeling': '🎨',
//       '3D Animation': '🎬',
//       'Architectural Visualization': '🏛️',
//       'Product Design': '📱',
//       'Character Modeling': '👤',
//       'Motion Graphics': '✨',
//       'VFX': '💥',
//       'Game Assets': '🎮'
//     };
//     return icons[category] || '🎯';
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       '3D Modeling': 'from-blue-500 to-cyan-500',
//       '3D Animation': 'from-purple-500 to-pink-500',
//       'Architectural Visualization': 'from-green-500 to-emerald-500',
//       'Product Design': 'from-orange-500 to-red-500',
//       'Character Modeling': 'from-yellow-500 to-amber-500',
//       'Motion Graphics': 'from-indigo-500 to-purple-500',
//       'VFX': 'from-red-500 to-pink-500',
//       'Game Assets': 'from-teal-500 to-blue-500'
//     };
//     return colors[category] || 'from-gray-500 to-slate-500';
//   };

//   return (
//     <div className="bg-slate-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group border border-slate-700">
//       <div className={`h-48 bg-gradient-to-br ${getCategoryColor(project.category)} relative overflow-hidden`}>
//         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//           <div className="text-center text-white">
//             <div className="text-4xl mb-2">{getCategoryIcon(project.category)}</div>
//             <div className="text-sm">3D Model Preview</div>
//           </div>
//         </div>
        
//         {/* Featured Badge */}
//         {project.featured && (
//           <div className="absolute top-4 left-4 bg-yellow-600 text-yellow-100 px-3 py-1 rounded-full text-sm font-semibold">
//             ⭐ Featured
//           </div>
//         )}
//       </div>
      
//       <div className="p-6">
//         <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
//         <p className="text-gray-400 mb-4 text-sm line-clamp-2">{project.description}</p>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.technologies?.slice(0, 3).map((tech, index) => (
//             <span key={index} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
//               {tech}
//             </span>
//           ))}
//           {project.technologies?.length > 3 && (
//             <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
//               +{project.technologies.length - 3} more
//             </span>
//           )}
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <span className="text-blue-400 font-semibold">{project.category}</span>
//           {project.price && (
//             <span className="text-green-400 font-bold">{project.price}</span>
//           )}
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={onViewDemo}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
//           >
//             <span>🔄</span>
//             View in 360°
//           </button>
//           {project.projectUrl && (
//             <a 
//               href={project.projectUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white py-3 rounded-lg text-sm font-semibold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
//             >
//               <span>🔗</span>
//               Live View
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Project Demo Component
// const ProjectDemo = ({ project, onClose }) => {
//   const [activeTab, setActiveTab] = useState('demo');
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [scale, setScale] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

//   const getCategoryColor = (category) => {
//     const colors = {
//       '3D Modeling': 'from-blue-500 to-cyan-500',
//       '3D Animation': 'from-purple-500 to-pink-500',
//       'Architectural Visualization': 'from-green-500 to-emerald-500',
//       'Product Design': 'from-orange-500 to-red-500',
//       'Character Modeling': 'from-yellow-500 to-amber-500',
//       'Motion Graphics': 'from-indigo-500 to-purple-500',
//       'VFX': 'from-red-500 to-pink-500',
//       'Game Assets': 'from-teal-500 to-blue-500'
//     };
//     return colors[category] || 'from-gray-500 to-slate-500';
//   };

//   // 3D Controls
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     const deltaX = e.clientX - lastMousePos.x;
//     const deltaY = e.clientY - lastMousePos.y;
    
//     setRotation(prev => ({
//       x: prev.x - deltaY * 0.5,
//       y: prev.y + deltaX * 0.5
//     }));
    
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
//     setScale(Math.max(0.5, Math.min(3, newScale)));
//   };

//   useEffect(() => {
//     const handleGlobalMouseUp = () => setIsDragging(false);
//     const handleGlobalMouseMove = (e) => {
//       if (isDragging) handleMouseMove(e);
//     };

//     document.addEventListener('mouseup', handleGlobalMouseUp);
//     document.addEventListener('mousemove', handleGlobalMouseMove);

//     return () => {
//       document.removeEventListener('mouseup', handleGlobalMouseUp);
//       document.removeEventListener('mousemove', handleGlobalMouseMove);
//     };
//   }, [isDragging, lastMousePos]);

//   return (
//     <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
//       <div className="bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-slate-700">
//           <div>
//             <h2 className="text-2xl font-bold text-white">{project.title}</h2>
//             <p className="text-gray-400">{project.category}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-2xl bg-slate-700 hover:bg-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
//           >
//             ×
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-slate-700">
//           <button
//             onClick={() => setActiveTab('demo')}
//             className={`px-6 py-3 font-semibold transition-colors ${
//               activeTab === 'demo' 
//                 ? 'text-blue-400 border-b-2 border-blue-400' 
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             🎮 3D Demo
//           </button>
//           <button
//             onClick={() => setActiveTab('details')}
//             className={`px-6 py-3 font-semibold transition-colors ${
//               activeTab === 'details' 
//                 ? 'text-blue-400 border-b-2 border-blue-400' 
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             📋 Project Details
//           </button>
//           <button
//             onClick={() => setActiveTab('gallery')}
//             className={`px-6 py-3 font-semibold transition-colors ${
//               activeTab === 'gallery' 
//                 ? 'text-blue-400 border-b-2 border-blue-400' 
//                 : 'text-gray-400 hover:text-white'
//             }`}
//           >
//             🖼️ Gallery
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 max-h-[60vh] overflow-y-auto">
//           {activeTab === 'demo' && (
//             <div className="space-y-6">
//               <div className="text-center mb-6">
//                 <h3 className="text-xl font-bold text-white mb-2">Interactive 360° Viewer</h3>
//                 <p className="text-gray-400">Drag to rotate • Scroll to zoom</p>
//               </div>
              
//               {/* 3D Viewer */}
//               <div 
//                 className="relative h-80 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-2 border-slate-600 overflow-hidden cursor-grab active:cursor-grabbing"
//                 onMouseDown={handleMouseDown}
//                 onWheel={handleWheel}
//               >
//                 <div className="absolute inset-0 flex items-center justify-center">
//                   <div 
//                     className={`w-48 h-48 bg-gradient-to-br ${getCategoryColor(project.category)} rounded-2xl shadow-2xl flex items-center justify-center`}
//                     style={{
//                       transform: `
//                         rotateX(${rotation.x}deg) 
//                         rotateY(${rotation.y}deg) 
//                         scale(${scale})
//                       `,
//                       transition: isDragging ? 'none' : 'transform 0.1s ease-out'
//                     }}
//                   >
//                     <div className="text-white text-center">
//                       <div className="text-4xl mb-2">
//                         {project.category === '3D Modeling' && '🎨'}
//                         {project.category === '3D Animation' && '🎬'}
//                         {project.category === 'Architectural Visualization' && '🏛️'}
//                         {project.category === 'Product Design' && '📱'}
//                         {project.category === 'Character Modeling' && '👤'}
//                         {project.category === 'Motion Graphics' && '✨'}
//                         {project.category === 'VFX' && '💥'}
//                         {project.category === 'Game Assets' && '🎮'}
//                       </div>
//                       <div className="text-sm font-semibold">3D Model</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Controls Overlay */}
//                 <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
//                   <div className="text-white text-sm space-y-1">
//                     <div>X: {Math.round(rotation.x)}°</div>
//                     <div>Y: {Math.round(rotation.y)}°</div>
//                     <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
//                   </div>
//                 </div>

//                 {/* Demo Embed */}
//                 {project.demoEmbed && (
//                   <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: project.demoEmbed }} />
//                 )}
//               </div>

//               <div className="text-center text-gray-400 text-sm">
//                 <p>This is an interactive 3D viewer. Projects added in admin panel will appear here.</p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'details' && <ProjectDetails project={project} />}
//           {activeTab === 'gallery' && <ProjectGallery project={project} />}
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-slate-700 flex justify-between items-center">
//           <div className="text-gray-400">
//             <span className="text-blue-400 font-semibold">{project.category}</span>
//             {project.featured && (
//               <span className="ml-4 px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
//                 ⭐ Featured Project
//               </span>
//             )}
//             {project.price && (
//               <span className="ml-4 text-green-400 font-bold">{project.price}</span>
//             )}
//           </div>
//           <div className="flex gap-3">
//             {project.projectUrl && (
//               <a 
//                 href={project.projectUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
//               >
//                 <span>🔗</span>
//                 View Live
//               </a>
//             )}
//             {project.githubUrl && (
//               <a 
//                 href={project.githubUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
//               >
//                 <span>💻</span>
//                 GitHub
//               </a>
//             )}
//             <button
//               onClick={onClose}
//               className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Project Details Component
// const ProjectDetails = ({ project }) => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-bold text-white mb-2">Project Description</h3>
//         <p className="text-gray-300 leading-relaxed">{project.description}</p>
//       </div>

//       <div>
//         <h3 className="text-lg font-bold text-white mb-2">Technologies Used</h3>
//         <div className="flex flex-wrap gap-2">
//           {project.technologies?.map((tech, index) => (
//             <span key={index} className="px-3 py-1 bg-blue-600 rounded-full text-sm text-white">
//               {tech}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="font-semibold mb-2 text-white">Category</h4>
//           <p className="text-blue-400">{project.category}</p>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2 text-white">Status</h4>
//           <p className="text-green-400">Completed</p>
//         </div>
//       </div>

//       {(project.projectUrl || project.githubUrl) && (
//         <div>
//           <h3 className="text-lg font-bold text-white mb-2">Links</h3>
//           <div className="flex gap-3">
//             {project.projectUrl && (
//               <a 
//                 href={project.projectUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
//               >
//                 <span>🔗</span>
//                 Live Demo
//               </a>
//             )}
//             {project.githubUrl && (
//               <a 
//                 href={project.githubUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-gray-400 hover:text-gray-300 flex items-center gap-1"
//               >
//                 <span>💻</span>
//                 Source Code
//               </a>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Project Gallery Component
// const ProjectGallery = ({ project }) => {
//   const images = project.images && project.images.length > 0 
//     ? project.images 
//     : ['https://via.placeholder.com/400x300/1e293b/64748b?text=3D+Render'];

//   return (
//     <div>
//       <h3 className="text-lg font-bold text-white mb-4">Project Gallery</h3>
//       <div className="grid grid-cols-2 gap-4">
//         {images.map((image, index) => (
//           <div key={index} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
//             <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//               <span className="text-white text-sm">3D Render {index + 1}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       {project.demoEmbed && (
//         <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
//           <h4 className="text-white font-semibold mb-2">3D Demo Available</h4>
//           <p className="text-gray-400 text-sm">This project includes an interactive 3D demo. Switch to the Demo tab to view it.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://sakthi-portfolio-backend-production.up.railway.app';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const openDemo = (project) => {
    setSelectedProject(project);
    setShowDemo(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto text-center">
          <div className="animate-pulse text-white text-xl">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 text-white">3D Projects</h1>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Explore my collection of 3D models, animations, and visualizations
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full transition-all ${
                filter === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
            <p className="text-gray-400 mb-6">Add your first project in the admin panel to see it here!</p>
            <a 
              href="/admin"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors inline-flex items-center"
            >
              Go to Admin Panel
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project._id} 
                project={project} 
                onViewDemo={() => openDemo(project)}
              />
            ))}
          </div>
        )}

        {/* Project Demo Modal */}
        {showDemo && selectedProject && (
          <ProjectDemo 
            project={selectedProject}
            onClose={() => setShowDemo(false)}
          />
        )}
      </div>
    </div>
  );
};

// Project Card Component - EMBED CODE SHOWS IN PREVIEW
const ProjectCard = ({ project, onViewDemo }) => {
  // Get actual project image or fallback
  const getProjectImage = () => {
    if (project.images && project.images.length > 0) {
      if (project.images[0].startsWith('http')) {
        return project.images[0];
      } else {
        return `${API_BASE_URL}${project.images[0]}`;
      }
    }
    return null;
  };

  const projectImage = getProjectImage();

  // Check if project has embed code for 3D preview
  const hasEmbedPreview = project.demoEmbed && project.demoEmbed.includes('iframe');

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group border border-slate-700">
      {/* PROJECT PREVIEW SECTION - EMBED CODE OR IMAGE */}
      <div 
        className="h-48 relative overflow-hidden bg-slate-700 cursor-pointer"
        onClick={onViewDemo}
      >
        {hasEmbedPreview ? (
          // EMBED CODE PREVIEW - Show actual 3D model
          <div className="w-full h-full">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: project.demoEmbed
                  .replace('width="100%"', 'width="100%"')
                  .replace('height="100%"', 'height="100%"')
                  .replace('width="640"', 'width="100%"')
                  .replace('height="480"', 'height="100%"')
              }} 
              className="w-full h-full"
            />
          </div>
        ) : projectImage ? (
          // ACTUAL PROJECT IMAGE
          <img 
            src={projectImage}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          // FALLBACK - Simple gray background
          <div className="h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center group-hover:brightness-110 transition-all duration-300">
            <div className="text-center text-white">
              <div className="text-4xl mb-2">🎨</div>
              <div className="text-sm">3D Preview</div>
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-yellow-600 text-yellow-100 px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ Featured
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
              {hasEmbedPreview ? 'Interactive 3D Model' : 'View Details'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.slice(0, 3).map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
              {tech}
            </span>
          ))}
          {project.technologies?.length > 3 && (
            <span className="px-3 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-400 font-semibold">{project.category}</span>
          {project.price && (
            <span className="text-green-400 font-bold">{project.price}</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onViewDemo}
            className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <span>🔄</span>
            {hasEmbedPreview ? 'View in 360°' : 'View Details'}
          </button>
          {project.projectUrl && (
            <a 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white py-3 rounded-lg text-sm font-semibold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>🔗</span>
              Live View
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Project Demo Component - SQUARE SHAPE 360° VIEWER
const ProjectDemo = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('demo');
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Get actual project images
  const getProjectImages = () => {
    if (project.images && project.images.length > 0) {
      return project.images.map(img => 
        img.startsWith('http') ? img : `${API_BASE_URL}${img}`
      );
    }
    return [];
  };

  const projectImages = getProjectImages();

  // Check if project has embed code
  const hasEmbed = project.demoEmbed && project.demoEmbed.includes('iframe');

  // 3D Controls (for non-embed projects)
  const handleMouseDown = (e) => {
    if (hasEmbed) return; // Don't interfere with embed
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || hasEmbed) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    if (hasEmbed) return;
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    if (hasEmbed) return;
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  useEffect(() => {
    if (hasEmbed) return;

    const handleGlobalMouseUp = () => setIsDragging(false);
    const handleGlobalMouseMove = (e) => {
      if (isDragging) handleMouseMove(e);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, lastMousePos, hasEmbed]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <p className="text-gray-400">{project.category}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl bg-slate-700 hover:bg-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-700">
          <button
            onClick={() => setActiveTab('demo')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'demo' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🎮 {hasEmbed ? '3D Model' : '3D Demo'}
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'details' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            📋 Project Details
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'gallery' 
                ? 'text-blue-400 border-b-2 border-blue-400' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            🖼️ Gallery
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'demo' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {hasEmbed ? 'Interactive 3D Model' : 'Interactive 360° Viewer'}
                </h3>
                <p className="text-gray-400">
                  {hasEmbed ? 'Embedded 3D model from Sketchfab' : 'Drag to rotate • Scroll to zoom'}
                </p>
              </div>
              
              {/* SQUARE SHAPE 360° VIEWER */}
              <div className="flex justify-center">
                <div 
                  className={`relative w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden ${
                    hasEmbed ? '' : 'cursor-grab active:cursor-grabbing'
                  }`}
                  onMouseDown={handleMouseDown}
                  onWheel={handleWheel}
                >
                  {hasEmbed ? (
                    // EMBED CODE - Full 3D Model in Square Container
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: project.demoEmbed
                          .replace('width="100%"', 'width="100%"')
                          .replace('height="100%"', 'height="100%"')
                          .replace('width="640"', 'width="100%"')
                          .replace('height="480"', 'height="100%"')
                      }} 
                      className="w-full h-full"
                    />
                  ) : projectImages.length > 0 ? (
                    // IMAGE BASED 3D VIEWER - CENTERED IN SQUARE
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-64 h-64 rounded-xl shadow-2xl overflow-hidden"
                        style={{
                          transform: `
                            rotateX(${rotation.x}deg) 
                            rotateY(${rotation.y}deg) 
                            scale(${scale})
                          `,
                          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                        }}
                      >
                        <img 
                          src={projectImages[0]} 
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    // FALLBACK 3D VIEWER - CENTERED IN SQUARE
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div 
                        className="w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-2xl flex items-center justify-center"
                        style={{
                          transform: `
                            rotateX(${rotation.x}deg) 
                            rotateY(${rotation.y}deg) 
                            scale(${scale})
                          `,
                          transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                        }}
                      >
                        <div className="text-white text-center">
                          <div className="text-4xl mb-2">🎨</div>
                          <div className="text-sm font-semibold">3D Model</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Controls Overlay - Only for non-embed */}
                  {!hasEmbed && (
                    <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
                      <div className="text-white text-sm space-y-1">
                        <div>X: {Math.round(rotation.x)}°</div>
                        <div>Y: {Math.round(rotation.y)}°</div>
                        <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center text-gray-400 text-sm">
                <p>
                  {hasEmbed 
                    ? 'This 3D model is embedded from Sketchfab and fully interactive'
                    : 'Interactive 3D viewer with your project content'
                  }
                </p>
              </div>
            </div>
          )}

          {activeTab === 'details' && <ProjectDetails project={project} />}
          {activeTab === 'gallery' && <ProjectGallery project={project} images={projectImages} />}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-700 flex justify-between items-center">
          <div className="text-gray-400">
            <span className="text-blue-400 font-semibold">{project.category}</span>
            {project.featured && (
              <span className="ml-4 px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
                ⭐ Featured Project
              </span>
            )}
            {hasEmbed && (
              <span className="ml-4 px-2 py-1 bg-green-600 text-green-100 rounded text-xs">
                🎮 3D Embedded
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {project.projectUrl && (
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
              >
                <span>🔗</span>
                Live View
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white font-semibold transition-colors flex items-center gap-2"
              >
                <span>💻</span>
                GitHub
              </a>
            )}
            <button
              onClick={onClose}
              className="border border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Project Details Component
const ProjectDetails = ({ project }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Project Description</h3>
        <p className="text-gray-300 leading-relaxed">{project.description}</p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-white mb-2">Technologies Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies?.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-blue-600 rounded-full text-sm text-white">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2 text-white">Category</h4>
          <p className="text-blue-400">{project.category}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Status</h4>
          <p className="text-green-400">Completed</p>
        </div>
      </div>

      {(project.projectUrl || project.githubUrl) && (
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Links</h3>
          <div className="flex gap-3">
            {project.projectUrl && (
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <span>🔗</span>
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-300 flex items-center gap-1"
              >
                <span>💻</span>
                Source Code
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Project Gallery Component
const ProjectGallery = ({ project, images }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Project Gallery</h3>
      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
              <img 
                src={image} 
                alt={`${project.title} ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-gray-400">No images available for this project</p>
        </div>
      )}
    </div>
  );
};

export default Projects;