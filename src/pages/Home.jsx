import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import axios from 'axios';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const API_BASE_URL = 'https://sakthi-portfolio-backend.onrender.com';

const Home = () => {
  const heroRef = useRef(null);
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);
  const [activeModel, setActiveModel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // SEO Management
  useEffect(() => {
    document.title = "Home | ArtIn3D - Professional 3D Modeling Portfolio";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Welcome to ArtIn3D - Professional 3D modeling and animation portfolio. Explore stunning 3D visualizations, architectural designs, and immersive digital experiences.";
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "3D modeling, 3D animation, architectural visualization, 3D portfolio, ArtIn3D, 3D artist, Blender, Maya, 3D design";
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://artin3d.fun";
  }, []);

  // Fetch projects
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

  const get360ViewerProducts = () => {
    if (!projects || projects.length === 0) {
      return [
        {
          id: 1,
          name: "Claas Agricultural Equipment",
          category: "Agricultural Equipment",
          icon: "🚜",
          color: "from-yellow-600 to-orange-600",
          description: "Detailed 3D model of Claas agricultural equipment",
          price: "Contact for Price",
          features: ["High Poly Model", "PBR Textures", "Optimized for Rendering"],
          categoryId: 8,
          demoEmbed: '<div class="sketchfab-embed-wrapper"> <iframe title="Claas" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="640" height="480" src="https://sketchfab.com/models/b8e19c5ab2c6437b9eba38b00c82df65/embed"> </iframe> </div>'
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
      demoEmbed: project.demoEmbed || '<div class="sketchfab-embed-wrapper"> <iframe title="3D Model" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="640" height="480" src="https://sketchfab.com/models/b8e19c5ab2c6437b9eba38b00c82df65/embed"> </iframe> </div>',
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
      'Game Assets': '🎮',
      'Agricultural Equipment': '🚜'
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
      'Game Assets': 'from-teal-500 to-blue-500',
      'Agricultural Equipment': 'from-yellow-600 to-orange-600'
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
      'Game Assets': 7,
      'Agricultural Equipment': 8
    };
    return categories[category] || 0;
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);

    if (isLoading) {
      return () => clearTimeout(loadingTimer);
    }

    const targets = gsap.utils.toArray('.floating-element');
    if (targets.length === 0) {
      return () => clearTimeout(loadingTimer);
    }

    const tl = gsap.timeline();
    tl.fromTo(targets, 
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

    return () => {
      clearTimeout(loadingTimer);
      tl.kill();
    };
  }, [isLoading]);

  useEffect(() => {
    let isMounted = true;

    if (isLoading) {
      return undefined;
    }

    const initVanta = async () => {
      if (!vantaRef.current || vantaEffectRef.current) {
        return;
      }

      window.THREE = THREE;

      if (!isMounted || !vantaRef.current) {
        return;
      }

      vantaEffectRef.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0xefe2c8,
        color: 0xf1971c,
        points: 10,
        maxDistance: 20,
        spacing: 15,
        showDots: true
      });
    };

    initVanta();

    return () => {
      isMounted = false;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, [isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModel((prev) => (prev + 1) % get360ViewerProducts().length);
    }, 5000);
    return () => clearInterval(interval);
  }, [projects]);

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
    <div className="page-shell overflow-hidden pt-24 sm:pt-28">
      {/* Hidden SEO Content */}
      <div className="seo-rich-content" style={{ display: 'none' }}>
        <h1>ArtIn3D - Professional 3D Modeling Studio</h1>
        <h2>3D Animation Services | Architectural Visualization | Character Modeling</h2>
        <p>Welcome to ArtIn3D - Professional 3D modeling and animation portfolio. Explore stunning 3D visualizations, architectural designs, and immersive digital experiences.</p>
        <p>We provide professional 3D modeling, animation, and visualization services using Blender, Maya, and industry-standard tools.</p>
        <ul>
          <li>3D Character Design and Modeling</li>
          <li>Architectural 3D Visualization</li>
          <li>Product Design and Prototyping</li>
          <li>3D Animation and VFX</li>
          <li>Virtual Reality Experiences</li>
        </ul>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center px-6 lg:px-20 relative overflow-hidden bg-[#efe2c8]">
        <div ref={vantaRef} className="absolute inset-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,226,200,0.04)_0%,rgba(239,226,200,0.1)_100%)]"></div>
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#efe2c8]/40 to-transparent"></div>
        <div className="hero-orb absolute left-[6%] top-[18%] h-28 w-28 rounded-full bg-orange-400/15 blur-3xl"></div>
        <div className="hero-orb hero-orb-delay absolute right-[14%] top-[28%] h-36 w-36 rounded-full bg-amber-500/10 blur-3xl"></div>

        <div className="container mx-auto relative z-20">
          <div className="flex justify-start">
            <div className="hero-content w-full max-w-4xl text-center lg:text-left">
              <div className="floating-element inline-flex items-center px-4 py-2 rounded-full border border-orange-500/30 bg-white/45 text-sm text-orange-700 mb-6 backdrop-blur-sm">
                <span className="mr-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                Crafted 3D Visuals for Products, Spaces, and Concepts
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-950 mb-6 leading-[0.94]">
                SakthiVel's
                <span className="block bg-gradient-to-r from-[#ff6a00] via-[#e09500] to-[#8b5a2b] bg-clip-text text-transparent animate-gradient">
                  Digital Art Gallery
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 mb-8 max-w-2xl leading-relaxed">
                Clean presentation, strong detail, and immersive 3D storytelling. Explore curated work across product visualization, concept design, and interactive model experiences.
              </p>

              <div className="floating-element hero-metric-card hero-shimmer mb-8 max-w-3xl rounded-[2rem] border border-orange-500/20 bg-white/55 px-6 py-5 backdrop-blur-md shadow-[0_24px_60px_rgba(120,53,15,0.12)]">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-sm uppercase tracking-[0.24em] text-slate-500">Featured Project</span>
                    <div className="mt-1 text-base font-semibold text-slate-800">Current highlight from the portfolio</div>
                  </div>
                  <span className="flex items-center font-semibold text-orange-700 whitespace-nowrap">
                    {currentProducts[activeModel]?.icon} {currentProducts[activeModel]?.name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-white/45 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                    <div className="text-2xl font-bold text-slate-950">4K</div>
                    <div className="text-slate-500 text-sm">Quality</div>
                  </div>
                  <div className="rounded-2xl bg-white/45 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                    <div className="text-2xl font-bold text-slate-950">3D</div>
                    <div className="text-slate-500 text-sm">Interactive</div>
                  </div>
                  <div className="rounded-2xl bg-white/45 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)]">
                    <div className="text-2xl font-bold text-slate-950">360°</div>
                    <div className="text-slate-500 text-sm">Rotation</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => setSelectedCategory(0)}
                  className="group bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    Explore 3D Models
                    <svg className="w-5 h-5 ml-2 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                </button>
                
                <a 
                  href="https://drive.google.com/file/d/1ZugLfPpdKJZpxFu9qb_INK8T5YHrbVPn/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group border border-slate-900/10 bg-slate-950 px-8 py-4 rounded-xl text-lg font-semibold text-amber-50 transition-all duration-300 hover:scale-105 hover:border-slate-950 hover:bg-[#1d2433] hover:shadow-2xl hover:shadow-slate-900/20 inline-flex items-center justify-center"
                >
                  <span className="relative z-10 flex items-center">
                    View Resume
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                </a>
              </div>
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
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-xl font-medium">Loading 3D Experience...</div>
        <div className="text-gray-400 text-sm mt-2">Preparing interactive models</div>
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
      count: "12 3D Models",
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      id: 1,
      name: "3D Animation",
      icon: "🎬",
      description: "Dynamic animations and motion graphics",
      count: "8 3D Models",
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500"
    },
    {
      id: 2,
      name: "Architectural Visualization",
      icon: "🏛️",
      description: "Realistic architectural renders",
      count: "15 3D Models",
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Product Design",
      icon: "📱",
      description: "Innovative product designs",
      count: "10 3D Models",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="section-wash py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Explore by <span className="text-cyan-400">Category</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our diverse range of 3D models across different categories and jump directly into the work that matters to you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="group relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm text-left transition-all duration-300 hover:border-cyan-500/50 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${category.gradient}`}></div>
              <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 relative z-10">{category.name}</h3>
              <p className="text-gray-400 text-sm mb-4 relative z-10">{category.description}</p>
              <div className="flex items-center justify-between relative z-10">
                <span className="text-cyan-400 text-sm font-semibold">{category.count}</span>
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center group-hover:bg-cyan-500 transition-colors duration-300 group-hover:rotate-45">
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

const Interactive360Viewer = ({ id, selectedCategory, projects, loading }) => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [viewMode, setViewMode] = useState('sketchfab');
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const getDefaultEmbed = () => {
    return '<div class="sketchfab-embed-wrapper"> <iframe title="3D Model" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share width="640" height="480" src="https://sketchfab.com/models/b8e19c5ab2c6437b9eba38b00c82df65/embed"> </iframe> </div>';
  };

  const getViewerProducts = () => {
    if (!projects || projects.length === 0) {
      return [
        {
          id: 1,
          name: 'Claas Agricultural Equipment',
          category: 'Agricultural Equipment',
          icon: '🚜',
          color: 'from-yellow-600 to-orange-600',
          description: 'Detailed 3D model of Claas agricultural equipment with realistic textures and materials',
          price: 'Contact for Price',
          features: ['High Poly Model', 'PBR Textures', 'Optimized for Rendering', '360° View'],
          categoryId: 8,
          demoEmbed: getDefaultEmbed()
        }
      ];
    }

    const categoryIds = {
      '3D Modeling': 0,
      '3D Animation': 1,
      'Architectural Visualization': 2,
      'Product Design': 3,
      'Character Modeling': 4,
      'Motion Graphics': 5,
      'VFX': 6,
      'Game Assets': 7,
      'Agricultural Equipment': 8
    };

    return projects.map((project, index) => ({
      id: project._id || index,
      name: project.title,
      category: project.category || '3D Model',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500',
      description: project.description,
      price: project.price || 'Contact for Price',
      features: project.technologies || ['3D Model', 'High Quality'],
      categoryId: categoryIds[project.category] ?? 0,
      demoEmbed: project.demoEmbed || getDefaultEmbed()
    }));
  };

  const viewerProducts = getViewerProducts();
  const filteredProducts = selectedCategory !== null
    ? viewerProducts.filter((product) => product.categoryId === selectedCategory)
    : viewerProducts;
  const currentProduct = filteredProducts[selectedProduct] || viewerProducts[0];

  const extractEmbedSrc = (embedCode) => {
    if (!embedCode) {
      return 'https://sketchfab.com/models/b8e19c5ab2c6437b9eba38b00c82df65/embed';
    }
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : embedCode;
  };

  const currentEmbedSrc = extractEmbedSrc(currentProduct?.demoEmbed);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;

    setRotation((prev) => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5,
      z: prev.z
    }));

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleProductSelect = (index) => {
    setSelectedProduct(index);
    setRotation({ x: 0, y: 0, z: 0 });
  };

  if (loading) {
    return (
      <section id={id} className="section-wash py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="animate-pulse text-white text-xl">Loading 3D Models...</div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="section-wash py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive <span className="text-purple-400">360° Project Viewer</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {projects.length === 0
              ? 'No projects yet. Add projects in the admin panel to see them here!'
              : selectedCategory !== null
                ? `Exploring ${filteredProducts.length} projects in this category. Click to view in 3D!`
                : `Viewing all ${filteredProducts.length} projects. Click on a project to view in 3D!`}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-2xl font-bold text-white mb-4">No Projects Yet</h3>
            <p className="text-gray-400 mb-6">Add your first project in the admin panel to see it here!</p>
            <Link to="/admin" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-colors inline-flex items-center">
              Go to Admin Panel
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            <div className="lg:w-1/3">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <span>📦</span>
                    Select Project
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded">
                      {filteredProducts.length} Projects
                    </span>
                  </h3>
                  
                  {/* View Mode Toggle */}
                  <div className="flex bg-slate-700/50 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("3d")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        viewMode === "3d"
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      3D View
                    </button>
                    <button
                      onClick={() => setViewMode("sketchfab")}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        viewMode === "sketchfab"
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Sketchfab
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {filteredProducts.map((product, index) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(index)}
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
                  {currentProduct.price && (
                    <div className="text-green-400 font-bold text-lg mb-3">{currentProduct.price}</div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentProduct.features?.map((feature, idx) => (
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

            {/* Sketchfab Viewer */}
            <div className="lg:w-2/3">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 backdrop-blur-sm h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className={`w-12 h-12 bg-gradient-to-br ${currentProduct.color} rounded-xl flex items-center justify-center text-xl`}>
                      {currentProduct.icon}
                    </span>
                    {currentProduct.name}
                    <span className="text-sm text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">
                      {viewMode === "sketchfab" ? "LIVE 3D VIEWER" : "3D PREVIEW"}
                    </span>
                  </h3>
                </div>

                {/* Viewer Container */}
                <div className="relative h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden">
                  {viewMode === "sketchfab" ? (
                    <div className="w-full h-full">
                      {/* Dynamic Sketchfab Embed */}
                      <div className="sketchfab-embed-wrapper w-full h-full">
                        <iframe
                          title={currentProduct.name}
                          frameBorder="0"
                          allowFullScreen
                          mozallowfullscreen="true"
                          webkitallowfullscreen="true"
                          allow="autoplay; fullscreen; xr-spatial-tracking"
                          xr-spatial-tracking="true"
                          execution-while-out-of-viewport="true"
                          execution-while-not-rendered="true"
                          web-share="true"
                          width="100%"
                          height="100%"
                          src={currentEmbedSrc}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <div 
                        className="relative"
                        style={{
                          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                          transition: isDragging ? 'none' : 'transform 0.1s ease'
                        }}
                      >
                        <div className={`w-64 h-64 bg-gradient-to-br ${currentProduct.color} rounded-3xl border-2 border-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl`}>
                          <div className="text-8xl">{currentProduct.icon}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="text-white text-sm">
                          {viewMode === "sketchfab" ? (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                              LIVE - Drag to rotate • Scroll to zoom • Right-click for menu
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                              DRAG to rotate • SCROLL to zoom
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Viewer Instructions */}
                <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-blue-500/50 transition-colors">
                    <div className="text-blue-400 font-bold text-sm">MOUSE DRAG</div>
                    <div className="text-gray-400 text-xs">Rotate 360°</div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-green-500/50 transition-colors">
                    <div className="text-green-400 font-bold text-sm">MOUSE WHEEL</div>
                    <div className="text-gray-400 text-xs">Zoom In/Out</div>
                  </div>
                  <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600 hover:border-purple-500/50 transition-colors">
                    <div className="text-purple-400 font-bold text-sm">FULLSCREEN</div>
                    <div className="text-gray-400 text-xs">Bottom-right button</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sketchfab Credit */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors">
            <span className="text-gray-400 text-sm">3D models powered by</span>
            <a 
              href="https://sketchfab.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-bold"
            >
              Sketchfab
            </a>
            <span className="text-gray-400">• Created by</span>
            <a 
              href="https://sketchfab.com/s.sakthivelappa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors font-bold"
            >
              SakthiVel
            </a>
          </div>
        </div>

        

<div className="mt-16 flex justify-center">
  <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 max-w-md text-center">
    <div className="text-4xl mb-4">🎨</div>
    <h3 className="text-xl font-bold text-white mb-2">Explore Full 3D Models with details </h3>
    <p className="text-gray-400 mb-4">
      View all 3D models with detailed information, gallery, and technical specs
    </p>
    <Link 
      to="/projects" 
      className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-3 rounded-lg text-white font-semibold transition-all hover:scale-105"
    >
      Go to Projects Page
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  </div>
</div>



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
      features: ["Character Modeling", "Product Design", "Architectural Models", "Game Assets"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎬",
      title: "3D Animation",
      description: "Bringing models to life with smooth and dynamic animations",
      features: ["Character Animation", "Product Demos", "Motion Graphics", "VFX"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🏛️",
      title: "Architectural Visualization",
      description: "Photorealistic architectural renders and walkthroughs",
      features: ["Interior Design", "Exterior Renders", "Virtual Tours", "Real-time 3D"],
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="section-wash py-20 px-6">
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
              className="group relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-green-500/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10 overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.color}`}></div>
              
              <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{service.title}</h3>
              <p className="text-gray-400 mb-6 relative z-10">{service.description}</p>
              
              <ul className="space-y-2 relative z-10">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-300 group/item hover:text-white transition-colors">
                    <svg className="w-4 h-4 text-green-500 mr-3 group-hover/item:scale-125 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    { name: "3DS Max", icon: "🔷", color: "from-blue-500 to-purple-500" },
    { name: "ZBrush", icon: "✏️", color: "from-gray-500 to-slate-500" },
    { name: "Substance", icon: "🎨", color: "from-amber-500 to-orange-500" },
    { name: "Unreal", icon: "🌌", color: "from-purple-500 to-pink-500" },
    { name: "After Effects", icon: "✨", color: "from-purple-600 to-indigo-600" },
    { name: "Maya", icon: "🌀", color: "from-cyan-500 to-blue-500" },
    { name: "Unity", icon: "🎮", color: "from-gray-400 to-gray-600" }
  ];

  return (
    <section className="section-wash py-20 px-6">
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
              className="group relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm text-center transition-all duration-300 hover:border-orange-500/50 hover:transform hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/10 overflow-hidden"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${tech.color}`}></div>
              
              <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-125 transition-transform duration-300 relative z-10`}>
                {tech.icon}
              </div>
              <div className="text-white font-semibold relative z-10">{tech.name}</div>
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
    <section className="section-wash py-20 px-6">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link 
            to="/contact"
            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 inline-flex items-center justify-center overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            
            <span className="relative z-10 flex items-center">
              Start Your Project
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          
          <Link 
            to="/projects"
            className="group relative bg-slate-800/50 border border-slate-700 hover:border-purple-500/50 px-8 py-4 rounded-xl text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 inline-flex items-center justify-center overflow-hidden"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors duration-500"></div>
            
            <span className="relative z-10">View Our 3D Models</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center group">
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">50+</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Projects</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">100%</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Client Satisfaction</div>
          </div>
          <div className="text-center group">
            <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">24/7</div>
            <div className="text-gray-400 group-hover:text-gray-300 transition-colors">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;