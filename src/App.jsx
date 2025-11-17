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
        {/* 🔥 SEO Meta Tags for entire app */}
        <Helmet>
          <html lang="en" />
          <title>ArtIn3D - Professional 3D Modeling Website</title>
          <meta 
            name="description" 
            content="Professional 3D modeling portfolio showcasing stunning 3D animations, architectural visualizations, character modeling, and product designs. Expert 3D artist creating immersive digital experiences." 
          />
          <meta 
            name="keywords" 
            content="3D modeling, 3D animation, architectural visualization, character modeling, product design, 3D artist, Blender, Maya, 3D portfolio, 3D visualizations, ArtIn3D" 
          />
          <link rel="canonical" href="https://artin3d.fun" />
          
          {/* Open Graph */}
          <meta property="og:title" content="ArtIn3D - Professional 3D Modeling Portfolio" />
          <meta property="og:description" content="Professional 3D modeling portfolio showcasing stunning 3D animations, architectural visualizations, and immersive digital experiences." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://artin3d.fun" />
          <meta property="og:image" content="https://artin3d.fun/og-image.jpg" />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ArtIn3D - Professional 3D Modeling Portfolio" />
          <meta name="twitter:description" content="Professional 3D modeling portfolio showcasing stunning 3D animations and visualizations." />
          <meta name="twitter:image" content="https://artin3d.fun/og-image.jpg" />
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