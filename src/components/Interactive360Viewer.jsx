import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Interactive360Viewer = ({ id, selectedCategory, projects, loading, setSelectedCategory }) => {
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
  const filteredProducts = selectedCategory !== null && selectedCategory !== undefined
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
              : selectedCategory !== null && selectedCategory !== undefined
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
                {selectedCategory !== null && selectedCategory !== undefined && setSelectedCategory && (
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

      </div>
    </section>
  );
};

export default Interactive360Viewer;
