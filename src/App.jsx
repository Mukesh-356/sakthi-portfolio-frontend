import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import { AuthProvider } from './hooks/useAuth'; 
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 🔥 SEO Optimization */}
        <Helmet>
          {/* Basic Meta Tags */}
          <title>ArtIn3D - Professional 3D Modeling & Animation Portfolio</title>
          <meta 
            name="description" 
            content="Professional 3D modeling portfolio showcasing stunning 3D animations, architectural visualizations, character modeling, and product designs. Expert 3D artist creating immersive digital experiences." 
          />
          <meta 
            name="keywords" 
            content="3D modeling, 3D animation, architectural visualization, character modeling, product design, 3D artist, Blender, Maya, 3D portfolio, 3D visualizations, ArtIn3D" 
          />
          <meta name="author" content="ArtIn3D Studio" />
          <link rel="canonical" href="https://artin3d.fun" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://artin3d.fun/" />
          <meta property="og:title" content="ArtIn3D - Professional 3D Modeling Portfolio" />
          <meta property="og:description" content="Professional 3D modeling portfolio showcasing stunning 3D animations, architectural visualizations, and immersive digital experiences." />
          <meta property="og:image" content="https://artin3d.fun/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://artin3d.fun/" />
          <meta property="twitter:title" content="ArtIn3D - Professional 3D Modeling Portfolio" />
          <meta property="twitter:description" content="Professional 3D modeling portfolio showcasing stunning 3D animations and visualizations." />
          <meta property="twitter:image" content="https://artin3d.fun/og-image.jpg" />

          {/* Additional SEO Tags */}
          <meta name="robots" content="index, follow" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Helmet>
        
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