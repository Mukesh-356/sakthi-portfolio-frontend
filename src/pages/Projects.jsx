// import React, { useState, useEffect } from 'react';
// import { gsap } from 'gsap';
// import axios from 'axios';

// const Projects = () => {
//   const [projects, setProjects] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [showDemo, setShowDemo] = useState(false);

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/projects');
//       setProjects(res.data);
//     } catch (error) {
//       console.error('Error fetching projects:', error);
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

//   return (
//     <div className="min-h-screen pt-20 px-6 py-8">
//       <div className="container mx-auto">
//         <h1 className="text-5xl font-bold text-center mb-4">3D Projects</h1>
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
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <ProjectCard 
//               key={project._id} 
//               project={project} 
//               onViewDemo={() => openDemo(project)}
//             />
//           ))}
//         </div>

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
//   return (
//     <div className="bg-slate-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
//       <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//           <div className="text-center text-white">
//             <div className="text-4xl mb-2">🎮</div>
//             <div className="text-sm">3D Model Preview</div>
//           </div>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <h3 className="text-xl font-bold mb-2">{project.title}</h3>
//         <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.technologies?.map((tech, index) => (
//             <span key={index} className="px-3 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
//               {tech}
//             </span>
//           ))}
//         </div>

//         <div className="flex justify-between items-center">
//           <span className="text-blue-400 font-semibold">{project.category}</span>
//           {project.featured && (
//             <span className="px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
//               Featured
//             </span>
//           )}
//         </div>

//         <div className="flex gap-3 mt-4">
//           <button
//             onClick={onViewDemo}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg text-sm font-semibold transition-colors"
//           >
//             View Demo
//           </button>
//           {project.projectUrl && (
//             <a 
//               href={project.projectUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex-1 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white py-2 rounded-lg text-sm font-semibold text-center transition-colors"
//             >
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

//   return (
//     <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
//       <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex justify-between items-center p-6 border-b border-slate-700">
//           <h2 className="text-2xl font-bold">{project.title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white text-2xl"
//           >
//             ×
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-slate-700">
//           <button
//             onClick={() => setActiveTab('demo')}
//             className={`px-6 py-3 font-semibold ${
//               activeTab === 'demo' 
//                 ? 'text-blue-400 border-b-2 border-blue-400' 
//                 : 'text-gray-400'
//             }`}
//           >
//             3D Demo
//           </button>
//           <button
//             onClick={() => setActiveTab('details')}
//             className={`px-6 py-3 font-semibold ${
//               activeTab === 'details' 
//                 ? 'text-blue-400 border-b-2 border-blue-400' 
//                 : 'text-gray-400'
//             }`}
//           >
//             Project Details
//           </button>
//           <button
//             onClick={() => setActiveTab('gallery')}
//             className={`px-6 py-3 font-semibold ${
//               activeTab === 'gallery' 
//                 ? 'text-blue-400 border-b-2 border-blue-400' 
//                 : 'text-gray-400'
//             }`}
//           >
//             Gallery
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6 max-h-[60vh] overflow-y-auto">
//           {activeTab === 'demo' && <DemoViewer project={project} />}
//           {activeTab === 'details' && <ProjectDetails project={project} />}
//           {activeTab === 'gallery' && <ProjectGallery project={project} />}
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-slate-700 flex justify-between items-center">
//           <div className="text-gray-400">
//             <span className="text-blue-400 font-semibold">{project.category}</span>
//             {project.featured && (
//               <span className="ml-4 px-2 py-1 bg-yellow-600 text-yellow-100 rounded text-xs">
//                 Featured Project
//               </span>
//             )}
//           </div>
//           <div className="flex gap-3">
//             {project.projectUrl && (
//               <a 
//                 href={project.projectUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition-colors"
//               >
//                 View Live
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

// // Demo Viewer Component
// const DemoViewer = ({ project }) => {
//   return (
//     <div className="text-center">
//       <div className="bg-slate-900 rounded-xl p-8 mb-6">
//         <div className="text-6xl mb-4">🎮</div>
//         <h3 className="text-xl font-bold mb-2">3D Model Interactive Viewer</h3>
//         <p className="text-gray-400 mb-4">
//           Interactive 3D model demonstration
//         </p>
//         <div className="bg-slate-800 rounded-lg p-4 text-sm text-gray-300">
//           <p>• Rotate: Click and drag</p>
//           <p>• Zoom: Scroll wheel</p>
//           <p>• Pan: Right click and drag</p>
//         </div>
//       </div>
//       <p className="text-gray-400">
//         This is a placeholder for an actual 3D model viewer. 
//         You can integrate with Three.js, Babylon.js, or Model Viewer.
//       </p>
//     </div>
//   );
// };

// // Project Details Component
// const ProjectDetails = ({ project }) => {
//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="text-lg font-bold mb-2">Project Description</h3>
//         <p className="text-gray-300">{project.description}</p>
//       </div>

//       <div>
//         <h3 className="text-lg font-bold mb-2">Technologies Used</h3>
//         <div className="flex flex-wrap gap-2">
//           {project.technologies?.map((tech, index) => (
//             <span key={index} className="px-3 py-1 bg-blue-600 rounded-full text-sm">
//               {tech}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <h4 className="font-semibold mb-2">Category</h4>
//           <p className="text-blue-400">{project.category}</p>
//         </div>
//         <div>
//           <h4 className="font-semibold mb-2">Project Type</h4>
//           <p className="text-gray-300">3D Modeling & Animation</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Project Gallery Component
// const ProjectGallery = ({ project }) => {
//   const images = project.images && project.images.length > 0 
//     ? project.images 
//     : ['https://via.placeholder.com/400x300/1e293b/64748b?text=3D+Render'];

//   return (
//     <div className="grid grid-cols-2 gap-4">
//       {images.map((image, index) => (
//         <div key={index} className="bg-slate-900 rounded-lg overflow-hidden">
//           <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//             <span className="text-white text-sm">3D Render {index + 1}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Projects;



// import React, { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';

// const Refrigerator3DViewer = () => {
//   const viewerRef = useRef(null);
//   const modelRef = useRef(null);
//   const doorRef = useRef(null);
//   const freezerRef = useRef(null);
//   const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
//   const [scale, setScale] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
//   const [autoRotate, setAutoRotate] = useState(true);
//   const [doorOpen, setDoorOpen] = useState(false);
//   const [freezerOpen, setFreezerOpen] = useState(false);
//   const [lightOn, setLightOn] = useState(false);
//   const [selectedCompartment, setSelectedCompartment] = useState(null);
//   const [viewMode, setViewMode] = useState('closed'); // closed, exploded, xray

//   const refrigerator = {
//     name: "Smart French Door Refrigerator",
//     brand: "CoolMaster Pro",
//     model: "CM-789X",
//     capacity: "28.5 cu.ft",
//     features: [
//       "Smart Cooling System",
//       "Energy Star Rated",
//       "Ice & Water Dispenser",
//       "Convertible Drawer",
//       "Door Alarm"
//     ],
//     dimensions: {
//       height: "70 inches",
//       width: "36 inches",
//       depth: "34 inches"
//     }
//   };

//   // 3D Controls
//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//     setAutoRotate(false);
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     const deltaX = e.clientX - lastMousePos.x;
//     const deltaY = e.clientY - lastMousePos.y;
    
//     setRotation(prev => ({
//       x: Math.max(-60, Math.min(60, prev.x + deltaY * 0.3)),
//       y: (prev.y + deltaX * 0.5) % 360,
//       z: prev.z
//     }));
    
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => setIsDragging(false);

//   const handleWheel = (e) => {
//     e.preventDefault();
//     const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
//     setScale(Math.max(0.5, Math.min(2, newScale)));
//   };

//   // Door Animations
//   const toggleDoor = () => {
//     if (viewMode === 'exploded') return;
    
//     if (doorOpen) {
//       gsap.to(doorRef.current, {
//         rotationY: 0,
//         duration: 1,
//         ease: 'power2.out'
//       });
//     } else {
//       gsap.to(doorRef.current, {
//         rotationY: -85,
//         duration: 1,
//         ease: 'power2.out'
//       });
//     }
//     setDoorOpen(!doorOpen);
//   };

//   const toggleFreezer = () => {
//     if (viewMode === 'exploded') return;
    
//     if (freezerOpen) {
//       gsap.to(freezerRef.current, {
//         rotationY: 0,
//         duration: 1,
//         ease: 'power2.out'
//       });
//     } else {
//       gsap.to(freezerRef.current, {
//         rotationY: 85,
//         duration: 1,
//         ease: 'power2.out'
//       });
//     }
//     setFreezerOpen(!freezerOpen);
//   };

//   // View Mode Animations
//   const toggleExplodedView = () => {
//     if (viewMode === 'exploded') {
//       // Assemble view
//       gsap.to('.compartment', {
//         x: 0,
//         y: 0,
//         z: 0,
//         duration: 1.5,
//         stagger: 0.1,
//         ease: 'back.out(1.7)'
//       });
//       setViewMode('closed');
//       setDoorOpen(false);
//       setFreezerOpen(false);
//     } else {
//       // Exploded view
//       gsap.to('.freezer-compartment', { y: -80, duration: 1, ease: 'power2.out' });
//       gsap.to('.fresh-food-compartment', { y: -40, duration: 1, ease: 'power2.out' });
//       gsap.to('.crisper-drawers', { y: 40, duration: 1, ease: 'power2.out' });
//       gsap.to('.door-shelves', { x: 30, duration: 1, ease: 'power2.out' });
//       gsap.to('.ice-maker', { x: -25, y: -60, duration: 1, ease: 'power2.out' });
//       setViewMode('exploded');
//     }
//   };

//   // Auto-rotation
//   useEffect(() => {
//     if (!autoRotate) return;

//     const interval = setInterval(() => {
//       setRotation(prev => ({
//         ...prev,
//         y: (prev.y + 0.3) % 360
//       }));
//     }, 50);

//     return () => clearInterval(interval);
//   }, [autoRotate]);

//   // Initial animations
//   useEffect(() => {
//     const tl = gsap.timeline();
    
//     tl.fromTo(modelRef.current, 
//       { scale: 0, rotationY: 180, opacity: 0 },
//       { scale: 1, rotationY: 0, opacity: 1, duration: 2, ease: 'back.out(1.7)' }
//     );

//     // Subtle floating animation
//     gsap.to(modelRef.current, {
//       y: 5,
//       duration: 4,
//       repeat: -1,
//       yoyo: true,
//       ease: 'sine.inOut'
//     });

//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6">
//       <div className="container mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Refrigerator</span> 3D Explorer
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//             Explore every detail of our smart refrigerator with interactive 3D controls
//           </p>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//           {/* Product Info */}
//           <div className="xl:col-span-1">
//             <div className="glass-effect rounded-3xl p-8 border border-slate-700 backdrop-blur-sm h-full">
//               <div className="flex items-start justify-between mb-6">
//                 <div>
//                   <h2 className="text-3xl font-bold text-white mb-2">{refrigerator.name}</h2>
//                   <div className="text-cyan-400 text-lg">{refrigerator.brand} • {refrigerator.model}</div>
//                 </div>
//                 <div className="text-green-400 text-2xl font-bold">{refrigerator.capacity}</div>
//               </div>

//               {/* Dimensions */}
//               <div className="space-y-3 mb-6">
//                 <h3 className="text-white font-bold text-lg">Dimensions</h3>
//                 {Object.entries(refrigerator.dimensions).map(([key, value]) => (
//                   <div key={key} className="flex justify-between items-center py-2 border-b border-slate-700">
//                     <span className="text-gray-400 capitalize">{key}:</span>
//                     <span className="text-white font-medium">{value}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Features */}
//               <div className="mb-6">
//                 <h3 className="text-white font-bold text-lg mb-3">Smart Features</h3>
//                 <div className="space-y-2">
//                   {refrigerator.features.map((feature, index) => (
//                     <div key={index} className="flex items-center space-x-3 text-gray-300">
//                       <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
//                       <span>{feature}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Interactive Controls */}
//               <div className="space-y-3">
//                 <button 
//                   onClick={toggleDoor}
//                   className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
//                 >
//                   <span>🚪</span>
//                   {doorOpen ? 'Close Main Door' : 'Open Main Door'}
//                 </button>
//                 <button 
//                   onClick={toggleFreezer}
//                   className="w-full bg-cyan-600 hover:bg-cyan-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
//                 >
//                   <span>🧊</span>
//                   {freezerOpen ? 'Close Freezer' : 'Open Freezer'}
//                 </button>
//                 <button 
//                   onClick={toggleExplodedView}
//                   className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
//                 >
//                   <span>💥</span>
//                   {viewMode === 'exploded' ? 'Assemble View' : 'Exploded View'}
//                 </button>
//                 <button 
//                   onClick={() => setLightOn(!lightOn)}
//                   className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
//                 >
//                   <span>💡</span>
//                   {lightOn ? 'Turn Off Light' : 'Turn On Light'}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* 3D Viewer */}
//           <div className="xl:col-span-2">
//             <div className="glass-effect rounded-3xl p-6 border border-slate-700 backdrop-blur-sm">
//               {/* Viewer Controls */}
//               <div className="flex flex-wrap gap-3 mb-6">
//                 <button 
//                   onClick={() => setAutoRotate(!autoRotate)}
//                   className={`px-4 py-2 rounded-xl transition-all duration-300 ${
//                     autoRotate 
//                       ? 'bg-green-600 text-white shadow-lg shadow-green-500/25' 
//                       : 'bg-slate-800 text-gray-300 hover:text-white'
//                   }`}
//                 >
//                   {autoRotate ? '⏸️ Pause Rotation' : '▶️ Auto Rotate'}
//                 </button>
//                 <button 
//                   onClick={() => setRotation({ x: 0, y: 0, z: 0 })}
//                   className="px-4 py-2 bg-slate-800 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:bg-slate-700"
//                 >
//                   🔄 Reset View
//                 </button>
//                 <button 
//                   onClick={() => setScale(1)}
//                   className="px-4 py-2 bg-slate-800 text-gray-300 hover:text-white rounded-xl transition-all duration-300 hover:bg-slate-700"
//                 >
//                   ⊞ Reset Zoom
//                 </button>
//               </div>

//               {/* Main 3D Viewer */}
//               <div 
//                 ref={viewerRef}
//                 className="relative h-96 lg:h-[500px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-slate-600 overflow-hidden cursor-grab active:cursor-grabbing"
//                 onMouseDown={handleMouseDown}
//                 onMouseMove={handleMouseMove}
//                 onMouseUp={handleMouseUp}
//                 onMouseLeave={handleMouseUp}
//                 onWheel={handleWheel}
//               >
//                 {/* 3D Scene */}
//                 <div 
//                   ref={modelRef}
//                   className="absolute inset-0 flex items-center justify-center"
//                   style={{
//                     transform: `
//                       perspective(1200px) 
//                       rotateX(${rotation.x}deg) 
//                       rotateY(${rotation.y}deg) 
//                       rotateZ(${rotation.z}deg) 
//                       scale(${scale})
//                     `
//                   }}
//                 >
//                   {/* Refrigerator Main Body */}
//                   <div className="relative w-80 h-96">
                    
//                     {/* Main Cabinet */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl">
                      
//                       {/* Freezer Section - Top */}
//                       <div className="compartment freezer-compartment absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg border-b-4 border-gray-400">
//                         {/* Freezer Door */}
//                         <div 
//                           ref={freezerRef}
//                           className="absolute inset-0 bg-gradient-to-br from-gray-250 to-gray-350 rounded-t-lg border-2 border-gray-500 transform-style-preserve-3d"
//                           style={{ transformOrigin: 'left center' }}
//                         >
//                           {/* Freezer Handle */}
//                           <div className="absolute right-4 top-1/2 w-6 h-16 bg-gray-600 rounded-lg transform -translate-y-1/2"></div>
//                           {/* Freezer Controls */}
//                           <div className="absolute left-4 top-4 w-8 h-8 bg-gray-700 rounded-full"></div>
//                           <div className="absolute left-4 top-12 w-12 h-4 bg-gray-600 rounded"></div>
//                         </div>
//                       </div>

//                       {/* Fresh Food Section - Middle */}
//                       <div className="compartment fresh-food-compartment absolute top-32 left-0 right-0 h-48 bg-gradient-to-br from-gray-200 to-gray-300 border-b-4 border-gray-400">
//                         {/* Main Doors */}
//                         <div 
//                           ref={doorRef}
//                           className="absolute inset-0 bg-gradient-to-br from-gray-250 to-gray-350 border-2 border-gray-500 transform-style-preserve-3d"
//                           style={{ transformOrigin: 'right center' }}
//                         >
//                           {/* Door Handles */}
//                           <div className="absolute left-4 top-1/2 w-6 h-20 bg-gray-600 rounded-lg transform -translate-y-1/2"></div>
//                           <div className="absolute left-4 top-1/3 w-6 h-12 bg-gray-600 rounded-lg transform -translate-y-1/2"></div>
                          
//                           {/* Door Shelves Preview */}
//                           <div className="absolute right-8 top-8 w-16 h-4 bg-gray-400/50 rounded"></div>
//                           <div className="absolute right-8 top-16 w-16 h-4 bg-gray-400/50 rounded"></div>
//                           <div className="absolute right-8 top-24 w-16 h-4 bg-gray-400/50 rounded"></div>
//                         </div>
//                       </div>

//                       {/* Crisper Drawers - Bottom */}
//                       <div className="compartment crisper-drawers absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-b-lg">
//                         {/* Drawer 1 */}
//                         <div className="absolute bottom-12 left-4 right-4 h-6 bg-gray-400 rounded-t-lg border-t-2 border-gray-500">
//                           <div className="absolute left-4 top-1/2 w-8 h-1 bg-gray-600 transform -translate-y-1/2"></div>
//                         </div>
//                         {/* Drawer 2 */}
//                         <div className="absolute bottom-4 left-4 right-4 h-6 bg-gray-400 rounded-t-lg border-t-2 border-gray-500">
//                           <div className="absolute left-4 top-1/2 w-8 h-1 bg-gray-600 transform -translate-y-1/2"></div>
//                         </div>
//                       </div>

//                       {/* Water & Ice Dispenser */}
//                       <div className="compartment ice-maker absolute top-8 right-0 w-16 h-24 bg-gradient-to-br from-gray-400 to-gray-500 rounded-l-lg border-2 border-gray-600">
//                         <div className="absolute top-4 left-2 w-3 h-3 bg-blue-400 rounded-full"></div>
//                         <div className="absolute top-10 left-2 w-8 h-2 bg-gray-600 rounded"></div>
//                         <div className="absolute bottom-4 left-2 w-10 h-1 bg-gray-700 rounded"></div>
//                       </div>

//                       {/* Interior Lighting Effect */}
//                       {lightOn && (doorOpen || freezerOpen) && (
//                         <div className="absolute inset-4 bg-yellow-200/20 rounded pointer-events-none">
//                           <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
//                         </div>
//                       )}

//                       {/* Brand Logo */}
//                       <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
//                         <div className="text-gray-700 font-bold text-sm bg-white/80 px-3 py-1 rounded-lg">
//                           {refrigerator.brand}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Internal Components (Visible when doors open) */}
//                     {(doorOpen || viewMode === 'exploded') && (
//                       <>
//                         {/* Refrigerator Shelves */}
//                         <div className="door-shelves compartment absolute top-36 left-8 right-8 h-4 bg-gray-300/80 rounded border border-gray-400"></div>
//                         <div className="door-shelves compartment absolute top-44 left-8 right-8 h-4 bg-gray-300/80 rounded border border-gray-400"></div>
//                         <div className="door-shelves compartment absolute top-52 left-8 right-8 h-4 bg-gray-300/80 rounded border border-gray-400"></div>
                        
//                         {/* Door Shelves */}
//                         <div className="door-shelves compartment absolute top-40 right-8 w-12 h-3 bg-gray-400/70 rounded-l border border-gray-500"></div>
//                         <div className="door-shelves compartment absolute top-48 right-8 w-12 h-3 bg-gray-400/70 rounded-l border border-gray-500"></div>
                        
//                         {/* Crisper Content */}
//                         <div className="compartment absolute bottom-8 left-6 right-6 h-4 bg-green-400/40 rounded"></div>
//                       </>
//                     )}

//                     {/* Freezer Interior (Visible when open) */}
//                     {(freezerOpen || viewMode === 'exploded') && (
//                       <>
//                         <div className="compartment absolute top-12 left-6 right-6 h-4 bg-blue-300/40 rounded"></div>
//                         <div className="compartment absolute top-20 left-6 right-6 h-4 bg-blue-300/40 rounded"></div>
//                         <div className="compartment absolute top-8 left-24 w-4 h-4 bg-white/60 rounded-full"></div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Interactive Hotspots */}
//                 <div className="absolute inset-0 pointer-events-none">
//                   {[
//                     { x: '50%', y: '20%', part: 'Freezer Compartment', info: '-4°F | Ice Maker & Frozen Storage' },
//                     { x: '50%', y: '45%', part: 'Fresh Food Zone', info: '37°F | Smart Cooling Technology' },
//                     { x: '80%', y: '15%', part: 'Ice & Water Dispenser', info: 'Filtered Water & Instant Ice' },
//                     { x: '50%', y: '80%', part: 'Crisper Drawers', info: 'Humidity Controlled Freshness' },
//                     { x: '20%', y: '50%', part: 'Smart Controls', info: 'WiFi Connected | Energy Monitoring' }
//                   ].map((hotspot, index) => (
//                     <div
//                       key={index}
//                       className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
//                       style={{ left: hotspot.x, top: hotspot.y }}
//                       onClick={() => setSelectedCompartment(hotspot)}
//                     >
//                       <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping absolute inset-0"></div>
//                       <div className="w-6 h-6 bg-cyan-600 rounded-full border-2 border-white"></div>
                      
//                       <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <div className="bg-slate-900/95 backdrop-blur-sm text-white text-sm rounded-lg px-3 py-2 whitespace-nowrap border border-slate-700">
//                           <div className="font-bold">{hotspot.part}</div>
//                           <div className="text-cyan-300">{hotspot.info}</div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Controls Overlay */}
//                 <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700">
//                   <div className="text-white font-mono text-sm space-y-1">
//                     <div>Rotation: {Math.round(rotation.y)}°</div>
//                     <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
//                     <div className="text-cyan-400">
//                       {doorOpen && freezerOpen ? 'Both Open' : 
//                        doorOpen ? 'Main Open' :
//                        freezerOpen ? 'Freezer Open' : 'Closed'}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Selected Compartment Info */}
//                 {selectedCompartment && (
//                   <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/50 max-w-xs">
//                     <div className="text-white font-bold text-lg mb-1">{selectedCompartment.part}</div>
//                     <div className="text-cyan-300 text-sm mb-2">{selectedCompartment.info}</div>
//                     <button 
//                       onClick={() => setSelectedCompartment(null)}
//                       className="text-red-400 hover:text-red-300 text-sm transition-colors"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Instructions */}
//               <div className="mt-4 text-center">
//                 <div className="inline-flex flex-wrap gap-6 text-sm text-gray-400">
//                   <span className="flex items-center gap-1">
//                     <span className="text-blue-400">← Drag →</span> Rotate Fridge
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <span className="text-green-400">Scroll</span> Zoom In/Out
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <span className="text-cyan-400">Click Dots</span> Features
//                   </span>
//                   <span className="flex items-center gap-1">
//                     <span className="text-yellow-400">Buttons</span> Open/Close
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Showcase */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
//           {[
//             {
//               icon: '🧊',
//               title: 'Smart Freezer',
//               description: '-4°F precision cooling with automatic ice making'
//             },
//             {
//               icon: '🌡️',
//               title: 'Climate Control',
//               description: 'Independent temperature zones for optimal freshness'
//             },
//             {
//               icon: '💧',
//               title: 'Water Dispenser',
//               description: 'Filtered water and instant ice with smart monitoring'
//             },
//             {
//               icon: '📱',
//               title: 'Smart Connect',
//               description: 'WiFi enabled with mobile app control and alerts'
//             }
//           ].map((feature, index) => (
//             <div key={index} className="glass-effect rounded-2xl p-6 border border-slate-700 backdrop-blur-sm text-center hover:transform hover:scale-105 transition-all duration-300">
//               <div className="text-4xl mb-4">{feature.icon}</div>
//               <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
//               <p className="text-gray-400 text-sm">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Refrigerator3DViewer;


import React, { useEffect, useRef, useState } from 'react';

const Refrigerator3DViewer = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(false);

  const refrigerator = {
    name: "Smart French Door Refrigerator",
    brand: "CoolMaster Pro",
    model: "CM-789X",
    capacity: "28.5 cu.ft",
    price: "$2,499",
    features: [
      "Smart Cooling System",
      "Energy Star Rated",
      "Ice & Water Dispenser",
      "Convertible Drawer",
      "Door Alarm",
      "WiFi Connected"
    ],
    specs: {
      height: "70 inches",
      width: "36 inches",
      depth: "34 inches",
      capacity: "28.5 cubic feet",
      energy: "Energy Star Certified",
      warranty: "10 years compressor"
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: prev.x - deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.5, Math.min(2, newScale)));
  };

  // Global event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, lastMousePos]);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 1
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Refrigerator
            </span>{' '}
            3D Explorer
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Drag to rotate • Scroll to zoom • Explore every angle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Information */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 h-full">
              {/* Product Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">{refrigerator.name}</h2>
                <div className="text-cyan-400 text-lg mb-1">{refrigerator.brand} • {refrigerator.model}</div>
                <div className="text-green-400 text-2xl font-bold">{refrigerator.price}</div>
              </div>

              {/* Capacity */}
              <div className="mb-6 p-4 bg-slate-700/30 rounded-xl">
                <div className="text-white font-bold text-lg mb-2">Capacity</div>
                <div className="text-3xl font-bold text-blue-400">{refrigerator.capacity}</div>
                <div className="text-gray-400 text-sm">Total Storage Space</div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-3">Specifications</h3>
                <div className="space-y-2">
                  {Object.entries(refrigerator.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-slate-600">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <span className="text-white font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-3">Smart Features</h3>
                <div className="space-y-2">
                  {refrigerator.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 text-gray-300">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <button 
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                    autoRotate 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <span>{autoRotate ? '⏸️' : '▶️'}</span>
                  {autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
                </button>
                <button 
                  onClick={resetView}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>🔄</span>
                  Reset View
                </button>
              </div>
            </div>
          </div>

          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
              {/* Viewer Container */}
              <div 
                ref={containerRef}
                className="relative h-96 md:h-[500px] bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl border-2 border-slate-600 overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
              >
                {/* 3D Scene */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Refrigerator Model */}
                  <div 
                    className="relative w-64 h-80"
                    style={{
                      transform: `
                        rotateX(${rotation.x}deg) 
                        rotateY(${rotation.y}deg) 
                        scale(${scale})
                      `,
                      transformStyle: 'preserve-3d',
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                  >
                    {/* Main Refrigerator Body */}
                    <div className="absolute inset-0">
                      {/* Cabinet Structure */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl border-4 border-gray-500">
                        
                        {/* Freezer Section - Top */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg border-b-2 border-gray-400">
                          {/* Freezer Door */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-250 to-gray-350 rounded-t-lg border-2 border-gray-500">
                            {/* Freezer Handle */}
                            <div className="absolute right-3 top-1/2 w-4 h-12 bg-gray-600 rounded-lg transform -translate-y-1/2 shadow-lg"></div>
                            {/* Freezer Control Panel */}
                            <div className="absolute left-3 top-3 w-6 h-6 bg-gray-700 rounded-full"></div>
                            <div className="absolute left-3 top-10 w-10 h-2 bg-gray-600 rounded"></div>
                          </div>
                        </div>

                        {/* Fresh Food Section - Middle */}
                        <div className="absolute top-24 left-0 right-0 h-40 bg-gradient-to-br from-gray-200 to-gray-300 border-b-2 border-gray-400">
                          {/* Main Doors */}
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-250 to-gray-350 border-2 border-gray-500">
                            {/* Door Handles */}
                            <div className="absolute left-3 top-1/2 w-4 h-16 bg-gray-600 rounded-lg transform -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute left-3 top-1/3 w-4 h-10 bg-gray-600 rounded-lg transform -translate-y-1/2 shadow-lg"></div>
                            
                            {/* Door Shelves Preview */}
                            <div className="absolute right-6 top-6 w-12 h-2 bg-gray-400/50 rounded"></div>
                            <div className="absolute right-6 top-12 w-12 h-2 bg-gray-400/50 rounded"></div>
                            <div className="absolute right-6 top-18 w-12 h-2 bg-gray-400/50 rounded"></div>
                            <div className="absolute right-6 top-24 w-12 h-2 bg-gray-400/50 rounded"></div>
                          </div>
                        </div>

                        {/* Crisper Drawers - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-b-lg">
                          {/* Drawer 1 */}
                          <div className="absolute bottom-10 left-3 right-3 h-5 bg-gray-400 rounded-t-lg border-t-2 border-gray-500">
                            <div className="absolute left-3 top-1/2 w-6 h-1 bg-gray-600 transform -translate-y-1/2"></div>
                          </div>
                          {/* Drawer 2 */}
                          <div className="absolute bottom-3 left-3 right-3 h-5 bg-gray-400 rounded-t-lg border-t-2 border-gray-500">
                            <div className="absolute left-3 top-1/2 w-6 h-1 bg-gray-600 transform -translate-y-1/2"></div>
                          </div>
                        </div>

                        {/* Water & Ice Dispenser */}
                        <div className="absolute top-6 right-0 w-12 h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-l-lg border-2 border-gray-600">
                          <div className="absolute top-3 left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <div className="absolute top-8 left-2 w-6 h-1 bg-gray-600 rounded"></div>
                          <div className="absolute bottom-3 left-2 w-8 h-1 bg-gray-700 rounded"></div>
                        </div>

                        {/* Brand Logo */}
                        <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
                          <div className="text-gray-700 font-bold text-xs bg-white/80 px-2 py-1 rounded shadow-lg">
                            {refrigerator.brand}
                          </div>
                        </div>

                        {/* Model Info */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="text-gray-600 text-xs bg-white/60 px-2 py-1 rounded">
                            {refrigerator.model}
                          </div>
                        </div>
                      </div>

                      {/* 3D Depth Elements */}
                      <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg transform translateZ(-10px)"></div>
                      <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-lg transform translateZ(-20px)"></div>
                    </div>

                    {/* Floating Animation Elements */}
                    <div className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-slate-700">
                  <div className="text-white font-mono text-sm space-y-1">
                    <div>X: {Math.round(rotation.x)}°</div>
                    <div>Y: {Math.round(rotation.y)}°</div>
                    <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
                  </div>
                </div>

                {/* Auto Rotate Indicator */}
                {autoRotate && (
                  <div className="absolute top-4 right-4 bg-green-600/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-green-500">
                    <div className="text-white text-sm font-medium flex items-center gap-2">
                      <span className="animate-spin">🌀</span>
                      Auto Rotating
                    </div>
                  </div>
                )}

                {/* Initial Instruction */}
                {!isDragging && rotation.y === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600 text-center max-w-xs">
                      <div className="text-4xl mb-3">👆</div>
                      <div className="text-white font-bold text-lg mb-2">Drag to Rotate</div>
                      <div className="text-gray-300 text-sm">Click and drag anywhere to rotate the refrigerator</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Live Stats */}
              <div className="mt-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
                    <div className="text-blue-400 text-lg font-bold">{Math.round(rotation.y)}°</div>
                    <div className="text-gray-400 text-xs">Rotation</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
                    <div className="text-green-400 text-lg font-bold">{scale.toFixed(1)}x</div>
                    <div className="text-gray-400 text-xs">Zoom Level</div>
                  </div>
                  <div className="bg-slate-700/50 rounded-xl p-3 border border-slate-600">
                    <div className={`text-lg font-bold ${autoRotate ? 'text-green-400' : 'text-yellow-400'}`}>
                      {autoRotate ? 'ON' : 'OFF'}
                    </div>
                    <div className="text-gray-400 text-xs">Auto Rotate</div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center">
                <div className="inline-flex flex-wrap gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <span className="text-blue-400">← Drag →</span>
                    <span>Rotate 360°</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-400">Scroll</span>
                    <span>Zoom In/Out</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-400">Auto</span>
                    <span>Continuous Spin</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: '🎮',
              title: 'Interactive 3D',
              description: 'Full 360° rotation with smooth dragging'
            },
            {
              icon: '📐',
              title: 'Real Scale',
              description: 'Accurate 70" height and 36" width'
            },
            {
              icon: '⚡',
              title: 'Smart Features',
              description: 'Ice maker, digital controls, WiFi'
            },
            {
              icon: '💎',
              title: 'Premium Design',
              description: 'French doors with stainless steel'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="mt-8 text-center">
          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-4 inline-block">
            <div className="text-green-400 font-bold text-lg flex items-center gap-2">
              <span>✅</span>
              <span>3D Rotation is Working Perfectly!</span>
            </div>
            <div className="text-green-300 text-sm mt-1">
              Drag the refrigerator to see it from all angles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refrigerator3DViewer;