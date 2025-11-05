import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navbar entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    tl.fromTo(
      logoRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.5'
    );
    tl.fromTo(
      '.nav-item',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    );

    // Scroll effect
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu animations
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.5,
        ease: 'power3.out'
      });
      gsap.fromTo('.mobile-nav-item', 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1 }
      );
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: 'hover:text-blue-400' },
    { name: 'GitHub', url: 'https://github.com', icon: '💻', color: 'hover:text-purple-400' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📷', color: 'hover:text-pink-400' },
    { name: 'Behance', url: 'https://behance.net', icon: '🎨', color: 'hover:text-green-400' },
  ];

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/projects', label: 'Projects', icon: '🚀' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <>
      {/* Enhanced Navbar */}
      <nav 
        ref={navRef} 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'glass-effect border-b border-slate-700/50 backdrop-blur-xl' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* 3D Logo */}
            <Link 
              ref={logoRef}
              to="/" 
              className="group relative"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                 <div className="w-12 h-12 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500 shadow-2xl shadow-blue-500/25 overflow-hidden">
  <img 
    src="/mainlogo.jpg" 
    alt="Artin3D Logo" 
    className="w-full h-full object-cover"
  />
</div>
                  {/* 3D Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                    ArtIn3D
                  </span>
                  <span className="text-xs text-gray-400 group-hover:text-blue-300 transition-colors">
                    Interactive Showcase
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div ref={menuRef} className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item group relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'text-white bg-blue-500/20 border border-blue-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 ${
                    location.pathname === item.path ? 'opacity-100' : ''
                  }`}></div>
                  
                  {/* Active indicator */}
                  {location.pathname === item.path && (
                    <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 animate-ping"></div>
                  )}
                </Link>
              ))}

              {/* Enhanced Links Dropdown */}
              <div className="nav-item relative">
                <button
                  onClick={() => setIsLinksOpen(!isLinksOpen)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isLinksOpen 
                      ? 'text-white bg-purple-500/20 border border-purple-500/30' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <span className="text-lg">🔗</span>
                  <span className="font-medium">Connect</span>
                  <span className={`transform transition-transform duration-300 ${
                    isLinksOpen ? 'rotate-180' : ''
                  }`}>▼</span>
                </button>

                {isLinksOpen && (
                  <div className="absolute top-full left-0 mt-3 w-64 bg-slate-800/95 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    {/* Dropdown header */}
                    <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
                      <h3 className="text-white font-bold text-lg">Let's Connect</h3>
                      <p className="text-gray-400 text-sm">Find me on social platforms</p>
                    </div>
                    
                    <div className="p-3 space-y-2">
                      {socialLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 hover:transform hover:scale-105 ${link.color} hover:bg-slate-700/50 border border-transparent hover:border-slate-600`}
                          onClick={() => setIsLinksOpen(false)}
                        >
                          <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-lg">
                            {link.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-medium">{link.name}</div>
                            <div className="text-gray-400 text-xs">{link.url.replace('https://', '')}</div>
                          </div>
                          <div className="text-gray-400 text-lg">↗</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Auth Section */}
              {user ? (
                <div className="nav-item flex items-center space-x-4">
                  <Link
                    to="/admin"
                    className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
                  >
                    <span>⚡</span>
                    <span>Admin Panel</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group flex items-center space-x-2 px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red-500/30"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin"
                  className="nav-item group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center space-x-2"
                >
                  <span>🔐</span>
                  <span>Admin Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center space-y-1.5 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Mobile Menu Panel */}
        <div className="mobile-menu absolute top-0 right-0 h-full w-80 bg-slate-800/95 backdrop-blur-xl border-l border-slate-700 transform translate-x-full">
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-lg">
                  🎨
                </div>
                <div>
                  <div className="text-white font-bold">3D Portfolio</div>
                  <div className="text-gray-400 text-xs">Navigation</div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="space-y-4 flex-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="mobile-nav-item flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-slate-700/50 border border-transparent hover:border-slate-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                    location.pathname === item.path 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'bg-slate-700 text-gray-400'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      location.pathname === item.path ? 'text-white' : 'text-gray-300'
                    }`}>
                      {item.label}
                    </div>
                    <div className="text-gray-400 text-sm">Navigate to {item.label}</div>
                  </div>
                  {location.pathname === item.path && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}

              {/* Social Links in Mobile */}
              <div className="pt-6 border-t border-slate-700">
                <h3 className="text-white font-bold mb-4">Social Links</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all duration-300 border border-slate-600 hover:border-slate-500"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span className="text-white text-sm font-medium">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Auth Section Mobile */}
            <div className="pt-6 border-t border-slate-700">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to="/admin"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>⚡</span>
                    <span>Admin Panel</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-300 border border-red-500/30 flex items-center justify-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/admin"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>🔐</span>
                  <span>Admin Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{
            width: `${scrolled ? (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 : 0}%`
          }}
        ></div>
      </div>
    </>
  );
};

export default Navbar;