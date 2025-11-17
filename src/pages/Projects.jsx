
// import React, { useState, useEffect } from 'react';
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

// // Project Card Component - EMBED CODE SHOWS IN PREVIEW
// const ProjectCard = ({ project, onViewDemo }) => {
//   // Get actual project image or fallback
//   const getProjectImage = () => {
//     if (project.images && project.images.length > 0) {
//       if (project.images[0].startsWith('http')) {
//         return project.images[0];
//       } else {
//         return `${API_BASE_URL}${project.images[0]}`;
//       }
//     }
//     return null;
//   };

//   const projectImage = getProjectImage();

//   // Check if project has embed code for 3D preview
//   const hasEmbedPreview = project.demoEmbed && project.demoEmbed.includes('iframe');

//   return (
//     <div className="bg-slate-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group border border-slate-700">
//       {/* PROJECT PREVIEW SECTION - EMBED CODE OR IMAGE */}
//       <div 
//         className="h-48 relative overflow-hidden bg-slate-700 cursor-pointer"
//         onClick={onViewDemo}
//       >
//         {hasEmbedPreview ? (
//           // EMBED CODE PREVIEW - Show actual 3D model
//           <div className="w-full h-full">
//             <div 
//               dangerouslySetInnerHTML={{ 
//                 __html: project.demoEmbed
//                   .replace('width="100%"', 'width="100%"')
//                   .replace('height="100%"', 'height="100%"')
//                   .replace('width="640"', 'width="100%"')
//                   .replace('height="480"', 'height="100%"')
//               }} 
//               className="w-full h-full"
//             />
//           </div>
//         ) : projectImage ? (
//           // ACTUAL PROJECT IMAGE
//           <img 
//             src={projectImage}
//             alt={project.title}
//             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//           />
//         ) : (
//           // FALLBACK - Simple gray background
//           <div className="h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center group-hover:brightness-110 transition-all duration-300">
//             <div className="text-center text-white">
//               <div className="text-4xl mb-2">🎨</div>
//               <div className="text-sm">3D Preview</div>
//             </div>
//           </div>
//         )}
        
//         {/* Featured Badge */}
//         {project.featured && (
//           <div className="absolute top-4 left-4 bg-yellow-600 text-yellow-100 px-3 py-1 rounded-full text-sm font-semibold">
//             ⭐ Featured
//           </div>
//         )}

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
//           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
//               {hasEmbedPreview ? 'Interactive 3D Model' : 'View Details'}
//             </div>
//           </div>
//         </div>
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
//             {hasEmbedPreview ? 'View in 360°' : 'View Details'}
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

// // Project Demo Component - SQUARE SHAPE 360° VIEWER
// const ProjectDemo = ({ project, onClose }) => {
//   const [activeTab, setActiveTab] = useState('demo');
//   const [rotation, setRotation] = useState({ x: 0, y: 0 });
//   const [scale, setScale] = useState(1);
//   const [isDragging, setIsDragging] = useState(false);
//   const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

//   // Get actual project images
//   const getProjectImages = () => {
//     if (project.images && project.images.length > 0) {
//       return project.images.map(img => 
//         img.startsWith('http') ? img : `${API_BASE_URL}${img}`
//       );
//     }
//     return [];
//   };

//   const projectImages = getProjectImages();

//   // Check if project has embed code
//   const hasEmbed = project.demoEmbed && project.demoEmbed.includes('iframe');

//   // 3D Controls (for non-embed projects)
//   const handleMouseDown = (e) => {
//     if (hasEmbed) return; // Don't interfere with embed
//     setIsDragging(true);
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging || hasEmbed) return;
    
//     const deltaX = e.clientX - lastMousePos.x;
//     const deltaY = e.clientY - lastMousePos.y;
    
//     setRotation(prev => ({
//       x: prev.x - deltaY * 0.5,
//       y: prev.y + deltaX * 0.5
//     }));
    
//     setLastMousePos({ x: e.clientX, y: e.clientY });
//   };

//   const handleMouseUp = () => {
//     if (hasEmbed) return;
//     setIsDragging(false);
//   };

//   const handleWheel = (e) => {
//     if (hasEmbed) return;
//     e.preventDefault();
//     const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
//     setScale(Math.max(0.5, Math.min(3, newScale)));
//   };

//   useEffect(() => {
//     if (hasEmbed) return;

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
//   }, [isDragging, lastMousePos, hasEmbed]);

//   return (
//     <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
//       <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700">
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
//             🎮 {hasEmbed ? '3D Model' : '3D Demo'}
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
//                 <h3 className="text-xl font-bold text-white mb-2">
//                   {hasEmbed ? 'Interactive 3D Model' : 'Interactive 360° Viewer'}
//                 </h3>
//                 <p className="text-gray-400">
//                   {hasEmbed ? 'Embedded 3D model from Sketchfab' : 'Drag to rotate • Scroll to zoom'}
//                 </p>
//               </div>
              
//               {/* SQUARE SHAPE 360° VIEWER */}
//               <div className="flex justify-center">
//                 <div 
//                   className={`relative w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden ${
//                     hasEmbed ? '' : 'cursor-grab active:cursor-grabbing'
//                   }`}
//                   onMouseDown={handleMouseDown}
//                   onWheel={handleWheel}
//                 >
//                   {hasEmbed ? (
//                     // EMBED CODE - Full 3D Model in Square Container
//                     <div 
//                       dangerouslySetInnerHTML={{ 
//                         __html: project.demoEmbed
//                           .replace('width="100%"', 'width="100%"')
//                           .replace('height="100%"', 'height="100%"')
//                           .replace('width="640"', 'width="100%"')
//                           .replace('height="480"', 'height="100%"')
//                       }} 
//                       className="w-full h-full"
//                     />
//                   ) : projectImages.length > 0 ? (
//                     // IMAGE BASED 3D VIEWER - CENTERED IN SQUARE
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div 
//                         className="w-64 h-64 rounded-xl shadow-2xl overflow-hidden"
//                         style={{
//                           transform: `
//                             rotateX(${rotation.x}deg) 
//                             rotateY(${rotation.y}deg) 
//                             scale(${scale})
//                           `,
//                           transition: isDragging ? 'none' : 'transform 0.1s ease-out'
//                         }}
//                       >
//                         <img 
//                           src={projectImages[0]} 
//                           alt={project.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     // FALLBACK 3D VIEWER - CENTERED IN SQUARE
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div 
//                         className="w-64 h-64 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-2xl flex items-center justify-center"
//                         style={{
//                           transform: `
//                             rotateX(${rotation.x}deg) 
//                             rotateY(${rotation.y}deg) 
//                             scale(${scale})
//                           `,
//                           transition: isDragging ? 'none' : 'transform 0.1s ease-out'
//                         }}
//                       >
//                         <div className="text-white text-center">
//                           <div className="text-4xl mb-2">🎨</div>
//                           <div className="text-sm font-semibold">3D Model</div>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Controls Overlay - Only for non-embed */}
//                   {!hasEmbed && (
//                     <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
//                       <div className="text-white text-sm space-y-1">
//                         <div>X: {Math.round(rotation.x)}°</div>
//                         <div>Y: {Math.round(rotation.y)}°</div>
//                         <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="text-center text-gray-400 text-sm">
//                 <p>
//                   {hasEmbed 
//                     ? 'This 3D model is embedded from Sketchfab and fully interactive'
//                     : 'Interactive 3D viewer with your project content'
//                   }
//                 </p>
//               </div>
//             </div>
//           )}

//           {activeTab === 'details' && <ProjectDetails project={project} />}
//           {activeTab === 'gallery' && <ProjectGallery project={project} images={projectImages} />}
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
//             {hasEmbed && (
//               <span className="ml-4 px-2 py-1 bg-green-600 text-green-100 rounded text-xs">
//                 🎮 3D Embedded
//               </span>
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
//                 Live View
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
// const ProjectGallery = ({ project, images }) => {
//   return (
//     <div>
//       <h3 className="text-lg font-bold text-white mb-4">Project Gallery</h3>
//       {images.length > 0 ? (
//         <div className="grid grid-cols-2 gap-4">
//           {images.map((image, index) => (
//             <div key={index} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
//               <img 
//                 src={image} 
//                 alt={`${project.title} ${index + 1}`}
//                 className="w-full h-48 object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <div className="text-4xl mb-2">📷</div>
//           <p className="text-gray-400">No images available for this project</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Projects;
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://sakthi-portfolio-backend-production.up.railway.app';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // SEO Management with useEffect
  useEffect(() => {
    // Set page title
    document.title = "3D Projects Portfolio | ArtIn3D - Professional 3D Modeling Works";
    
    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Browse our collection of professional 3D modeling projects including architectural visualizations, character designs, product modeling, and 3D animations.";
    
    // Set canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_BASE_URL}/api/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const categories = useMemo(() => 
    ['all', ...new Set(projects.map(p => p.category))], 
    [projects]
  );

  const filteredProjects = useMemo(() => 
    filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter),
    [filter, projects]
  );

  const openDemo = useCallback((project) => {
    setSelectedProject(project);
    setShowDemo(true);
  }, []);

  const closeDemo = useCallback(() => {
    setShowDemo(false);
    setSelectedProject(null);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Hidden SEO Content */}
        <div className="seo-rich-content" style={{ display: 'none' }}>
          <h1>3D Projects Portfolio - ArtIn3D</h1>
          <p>Professional 3D modeling projects including architectural visualizations, character designs, product modeling, and 3D animations.</p>
          <p>Browse our collection of stunning 3D works created with Blender, Maya, and other professional tools.</p>
        </div>
        
        <div className="container mx-auto text-center">
          <div className="animate-pulse text-white text-xl">Loading projects...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hidden SEO Content for Search Engines */}
      <div className="seo-rich-content" style={{ display: 'none' }}>
        <h1>3D Projects Portfolio - ArtIn3D Professional 3D Modeling Works</h1>
        <h2>Architectural Visualizations | Character Designs | Product Modeling | 3D Animations</h2>
        <p>Explore our comprehensive collection of professional 3D modeling projects. From architectural visualizations and character designs to product modeling and 3D animations, discover stunning digital creations made with industry-leading software.</p>
        <ul>
          <li>High-quality 3D architectural visualizations</li>
          <li>Professional character modeling and design</li>
          <li>Product modeling and prototyping</li>
          <li>3D animation and motion graphics</li>
          <li>Interactive 3D experiences</li>
        </ul>
      </div>

      <div className="min-h-screen pt-20 px-4 sm:px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              3D Projects
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Explore my collection of 3D models, animations, and visualizations
            </p>
          </header>

          {error && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-center">
              {error}
              <button 
                onClick={fetchProjects}
                className="ml-4 bg-red-700 hover:bg-red-600 px-4 py-2 rounded text-sm transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <FilterButton
                key={category}
                category={category}
                isActive={filter === category}
                onClick={() => setFilter(category)}
              />
            ))}
          </div>

          {/* Projects Grid */}
          <ProjectsGrid
            projects={filteredProjects}
            onViewDemo={openDemo}
            isEmpty={projects.length === 0}
          />

          {/* Project Demo Modal */}
          {showDemo && selectedProject && (
            <ProjectDemo 
              project={selectedProject}
              onClose={closeDemo}
            />
          )}
        </div>
      </div>
    </>
  );
};

// Filter Button Component
const FilterButton = ({ category, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-full transition-all duration-300 font-medium text-sm ${
      isActive 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
        : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
    }`}
  >
    {category.charAt(0).toUpperCase() + category.slice(1)}
  </button>
);

// Projects Grid Component
const ProjectsGrid = ({ projects, onViewDemo, isEmpty }) => {
  if (isEmpty) {
    return <EmptyProjectsState />;
  }

  if (projects.length === 0) {
    return <NoProjectsFound />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project._id} 
          project={project} 
          onViewDemo={onViewDemo}
        />
      ))}
    </div>
  );
};

// Empty State Components
const EmptyProjectsState = () => (
  <div className="text-center py-16">
    <div className="text-6xl mb-6">📁</div>
    <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
    <p className="text-gray-400 mb-8 max-w-md mx-auto">
      Add your first project in the admin panel to showcase your amazing 3D work here!
    </p>
    <a 
      href="/admin"
      className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
    >
      Go to Admin Panel
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </a>
  </div>
);

const NoProjectsFound = () => (
  <div className="text-center py-16">
    <div className="text-6xl mb-6">🔍</div>
    <h3 className="text-2xl font-bold text-white mb-4">No Projects Found</h3>
    <p className="text-gray-400">Try selecting a different category to see more projects.</p>
  </div>
);

// Project Card Component
const ProjectCard = ({ project, onViewDemo }) => {
  const projectImage = useMemo(() => {
    if (project.images?.length > 0) {
      return project.images[0].startsWith('http') 
        ? project.images[0] 
        : `${API_BASE_URL}${project.images[0]}`;
    }
    return null;
  }, [project.images]);

  const hasEmbedPreview = project.demoEmbed?.includes('iframe');

  return (
    <div className="group bg-slate-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-slate-700 hover:border-slate-600 shadow-lg hover:shadow-xl">
      {/* Project Preview */}
      <div 
        className="h-48 relative overflow-hidden bg-slate-700 cursor-pointer"
        onClick={() => onViewDemo(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onViewDemo(project)}
      >
        <ProjectPreview 
          hasEmbed={hasEmbedPreview}
          embedCode={project.demoEmbed}
          image={projectImage}
          title={project.title}
        />
        
        {/* Featured Badge */}
        {project.featured && <FeaturedBadge />}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm">
              {hasEmbedPreview ? 'Interactive 3D Model' : 'View Details'}
            </div>
          </div>
        </div>
      </div>
      
      {/* Project Info */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-white line-clamp-1">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        
        <TechTags technologies={project.technologies} />
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-blue-400 font-semibold text-sm capitalize">
            {project.category}
          </span>
          {project.price && (
            <span className="text-green-400 font-bold text-sm">{project.price}</span>
          )}
        </div>

        <ProjectActions 
          project={project}
          hasEmbed={hasEmbedPreview}
          onViewDemo={() => onViewDemo(project)}
        />
      </div>
    </div>
  );
};

// Project Preview Component
const ProjectPreview = ({ hasEmbed, embedCode, image, title }) => {
  if (hasEmbed) {
    return (
      <div className="w-full h-full">
        <div 
          dangerouslySetInnerHTML={{ 
            __html: embedCode
              .replace(/width="[^"]*"/g, 'width="100%"')
              .replace(/height="[^"]*"/g, 'height="100%"')
          }} 
          className="w-full h-full"
        />
      </div>
    );
  }

  if (image) {
    return (
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center group-hover:brightness-110 transition-all duration-300">
      <div className="text-center text-white">
        <div className="text-4xl mb-2">🎨</div>
        <div className="text-sm">3D Preview</div>
      </div>
    </div>
  );
};

// Featured Badge Component
const FeaturedBadge = () => (
  <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-yellow-100 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
    ⭐ Featured
  </div>
);

// Technology Tags Component
const TechTags = ({ technologies }) => (
  <div className="flex flex-wrap gap-1.5 mb-4">
    {technologies?.slice(0, 3).map((tech, index) => (
      <span key={index} className="px-2.5 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
        {tech}
      </span>
    ))}
    {technologies?.length > 3 && (
      <span className="px-2.5 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
        +{technologies.length - 3}
      </span>
    )}
  </div>
);

// Project Actions Component
const ProjectActions = ({ project, hasEmbed, onViewDemo }) => (
  <div className="flex gap-2">
    <button
      onClick={onViewDemo}
      className="flex-1 bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-sm"
    >
      <span>🔄</span>
      {hasEmbed ? 'View in 360°' : 'View Details'}
    </button>
    {project.projectUrl && (
      <a 
        href={project.projectUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white py-2.5 rounded-lg text-xs font-semibold text-center transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
      >
        <span>🔗</span>
        Live View
      </a>
    )}
  </div>
);

// Project Demo Component - SQUARE SHAPE 360° VIEWER
const ProjectDemo = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('demo');

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-demo-title"
    >
      <div className="bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-700 shadow-2xl">
        <DemoHeader project={project} onClose={onClose} />
        <DemoTabs activeTab={activeTab} onTabChange={setActiveTab} project={project} />
        <DemoContent 
          activeTab={activeTab} 
          project={project} 
          onClose={onClose}
        />
      </div>
    </div>
  );
};

// Demo Sub-Components
const DemoHeader = ({ project, onClose }) => (
  <div className="flex justify-between items-center p-6 border-b border-slate-700">
    <div>
      <h2 id="project-demo-title" className="text-2xl font-bold text-white">
        {project.title}
      </h2>
      <p className="text-gray-400 capitalize">{project.category}</p>
    </div>
    <button
      onClick={onClose}
      className="text-gray-400 hover:text-white text-2xl bg-slate-700 hover:bg-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
      aria-label="Close modal"
    >
      ×
    </button>
  </div>
);

const DemoTabs = ({ activeTab, onTabChange, project }) => {
  const hasEmbed = project.demoEmbed?.includes('iframe');
  const tabs = [
    { id: 'demo', label: `🎮 ${hasEmbed ? '3D Model' : '3D Demo'}`, show: true },
    { id: 'details', label: '📋 Project Details', show: true },
    { id: 'gallery', label: '🖼️ Gallery', show: project.images?.length > 0 },
  ];

  return (
    <div className="flex border-b border-slate-700">
      {tabs.map((tab) => tab.show && (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-3 font-semibold transition-colors duration-200 ${
            activeTab === tab.id 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const DemoContent = ({ activeTab, project, onClose }) => (
  <div className="p-6 max-h-[60vh] overflow-y-auto">
    {activeTab === 'demo' && <DemoViewer project={project} />}
    {activeTab === 'details' && <ProjectDetails project={project} />}
    {activeTab === 'gallery' && <ProjectGallery project={project} />}
  </div>
);

// Demo Viewer Component
const DemoViewer = ({ project }) => {
  const hasEmbed = project.demoEmbed?.includes('iframe');
  
  if (hasEmbed) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Interactive 3D Model</h3>
          <p className="text-gray-400">Embedded 3D model from Sketchfab</p>
        </div>
        <div className="flex justify-center">
          <div className="relative w-96 h-96 bg-slate-900 rounded-2xl border-2 border-slate-600 overflow-hidden">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: project.demoEmbed
                  .replace(/width="[^"]*"/g, 'width="100%"')
                  .replace(/height="[^"]*"/g, 'height="100%"')
              }} 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return <ImageBasedViewer project={project} />;
};

// Image Based Viewer Component
const ImageBasedViewer = ({ project }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const projectImages = useMemo(() => 
    project.images?.map(img => 
      img.startsWith('http') ? img : `${API_BASE_URL}${img}`
    ) || [], 
    [project.images]
  );

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    setRotation(prev => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePos]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = (e) => {
    e.preventDefault();
    const newScale = scale + (e.deltaY > 0 ? -0.1 : 0.1);
    setScale(Math.max(0.5, Math.min(3, newScale)));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Interactive 360° Viewer</h3>
        <p className="text-gray-400">Drag to rotate • Scroll to zoom</p>
      </div>
      
      <div className="flex justify-center">
        <div 
          className={`relative w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
          {projectImages.length > 0 ? (
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

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700">
            <div className="text-white text-sm space-y-1">
              <div>X: {Math.round(rotation.x)}°</div>
              <div>Y: {Math.round(rotation.y)}°</div>
              <div className="text-green-400">Zoom: {scale.toFixed(1)}x</div>
            </div>
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
          <p className="text-blue-400 capitalize">{project.category}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2 text-white">Status</h4>
          <p className="text-green-400">Completed</p>
        </div>
      </div>

      {(project.projectUrl || project.githubUrl) && (
        <div>
          <h3 className="text-lg font-bold text-white mb-2">Links</h3>
          <div className="flex gap-4">
            {project.projectUrl && (
              <a 
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
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
                className="text-gray-400 hover:text-gray-300 flex items-center gap-2 transition-colors"
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
const ProjectGallery = ({ project }) => {
  const images = useMemo(() => 
    project.images?.map(img => 
      img.startsWith('http') ? img : `${API_BASE_URL}${img}`
    ) || [], 
    [project.images]
  );

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-4">Project Gallery</h3>
      {images.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 group">
              <img 
                src={image} 
                alt={`${project.title} ${index + 1}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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