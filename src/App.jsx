import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import { AuthProvider } from './hooks/useAuth'; 
import './index.css';

function App() {
  useEffect(() => {
    // Dynamic SEO Management
    document.title = "ArtIn3D - Professional 3D Modeling & Animation Portfolio";
    
    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Professional 3D modeling portfolio showcasing stunning 3D animations, architectural visualizations, character modeling, and product designs.";
    
    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "3D modeling, 3D animation, architectural visualization, character modeling, product design, 3D artist";
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://artin3d.fun";
    
    // Viewport
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(viewport);
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        {/* Hidden SEO Content for Search Engines */}
        <div className="seo-rich-content" style={{ display: 'none' }}>
          <h1>ArtIn3D - Professional 3D Modeling Studio</h1>
          <h2>3D Animation Services | Architectural Visualization | Character Modeling</h2>
          <p>We provide professional 3D modeling, animation, and visualization services using Blender, Maya, and industry-standard tools.</p>
          <ul>
            <li>3D Character Design and Modeling</li>
            <li>Architectural 3D Visualization</li>
            <li>Product Design and Prototyping</li>
            <li>3D Animation and VFX</li>
            <li>Virtual Reality Experiences</li>
          </ul>
        </div>
        
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;