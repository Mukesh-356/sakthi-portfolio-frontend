import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../hooks/useAuth';

const RESUME_URL = 'https://drive.google.com/file/d/16mIY5lJwHHl6lEidPj2pQiHhRTz9GkE3/view?usp=drivesdk';

const Navbar = () => {
  const navRef = useRef(null);
  const brandRef = useRef(null);
  const resourcesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = useMemo(
    () => [
      { path: '/', label: 'Home', eyebrow: 'Intro' },
      { path: '/projects', label: 'Projects', eyebrow: 'Portfolio' },
      { path: '/contact', label: 'Contact', eyebrow: 'Brief' },
    ],
    []
  );

  const resourceLinks = useMemo(() => {
    const links = [
      {
        label: 'Resume',
        description: 'Capabilities, tools, and recent experience.',
        href: RESUME_URL,
        external: true,
        badge: 'PDF'
      },
      {
        label: 'Project Library',
        description: 'Browse the complete 3D portfolio collection.',
        href: '/projects',
        external: false,
        badge: 'Route'
      }
    ];

    if (user) {
      links.push({
        label: 'Admin Dashboard',
        description: 'Manage uploads, cases, and portfolio content.',
        href: '/admin',
        external: false,
        badge: 'Secure'
      });
    }

    return links;
  }, [user]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    );
    tl.fromTo(
      brandRef.current,
      { scale: 0.92, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.45'
    );
    tl.fromTo(
      '.nav-item',
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: 'power2.out' },
      '-=0.35'
    );

    const handleScroll = () => {
      const nextScrolled = window.scrollY > 28;
      const pageHeight = document.body.scrollHeight - window.innerHeight;

      setScrolled(nextScrolled);
      setScrollProgress(pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.45,
        ease: 'power3.out'
      });
      gsap.fromTo(
        '.mobile-nav-item',
        { x: 32, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
      );
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in'
      });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsLinksOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setIsLinksOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-3'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <div
            className={`rounded-[24px] transition-all duration-500 ${
              scrolled
                ? 'panel-surface border-white/10'
                : 'border border-white/10 bg-white/6 shadow-[0_20px_60px_rgba(2,6,23,0.28)] backdrop-blur-xl'
            }`}
          >
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 sm:px-5">
              <div ref={brandRef} className="group relative flex items-center gap-4">
                <Link to="/admin" className="relative z-10 block" title="Admin Login">
                  <div className="h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition-transform duration-500 hover:scale-105 hover:-rotate-3 sm:h-11 sm:w-11">
                    <img
                      src="/mainlogo.jpg"
                      alt="Artin3D Logo"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-amber-300/30 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                </Link>

                <Link to="/" className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-100 sm:text-xl">
                    ArtIn3D
                  </span>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-slate-400 sm:text-[11px]">
                    <span>3D Visual Studio</span>
                    <span className="hidden h-1 w-1 rounded-full bg-cyan-300 sm:block"></span>
                    <span className="hidden sm:block text-cyan-200/80">Available</span>
                  </div>
                </Link>
              </div>

              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/30 px-2 py-1.5 backdrop-blur-xl">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-item rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-white text-slate-950 shadow-[0_8px_30px_rgba(255,255,255,0.12)]'
                          : 'text-slate-300 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      <span className="block leading-tight">{item.label}</span>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-500">
                        {item.eyebrow}
                      </span>
                    </Link>
                  ))}
                </div>

                <div ref={resourcesRef} className="nav-item relative">
                  <button
                    onClick={() => setIsLinksOpen(!isLinksOpen)}
                    className={`group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                      isLinksOpen
                        ? 'border-cyan-300/30 bg-cyan-300/10 text-white'
                        : 'border-white/10 bg-slate-950/30 text-slate-300 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    <span>Resources</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-[0.24em] text-cyan-200/80">
                      Quick
                    </span>
                    <span className={`text-xs transition-transform duration-300 ${isLinksOpen ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {isLinksOpen && (
                    <div className="absolute right-0 top-full z-50 mt-4 w-[22rem] overflow-hidden rounded-3xl panel-surface">
                      <div className="border-b border-white/10 px-5 py-4">
                        <p className="text-sm font-semibold text-white">Studio Resources</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Useful links for briefs, portfolio review, and account access.
                        </p>
                      </div>

                      <div className="space-y-2 p-3">
                        {resourceLinks.map((link) => {
                          const itemClassName = 'flex items-start gap-4 rounded-2xl border border-transparent px-4 py-3 transition-all duration-300 hover:border-white/10 hover:bg-white/5';

                          if (link.external) {
                            return (
                              <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={itemClassName}
                                onClick={() => setIsLinksOpen(false)}
                              >
                                <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-amber-300/20 text-sm font-bold text-cyan-100">
                                  {link.badge.slice(0, 1)}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between gap-3">
                                    <span className="font-semibold text-white">{link.label}</span>
                                    <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                                      {link.badge}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{link.description}</p>
                                </div>
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={link.label}
                              to={link.href}
                              className={itemClassName}
                              onClick={() => setIsLinksOpen(false)}
                            >
                              <div className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-amber-300/20 text-sm font-bold text-cyan-100">
                                {link.badge.slice(0, 1)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <span className="font-semibold text-white">{link.label}</span>
                                  <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.22em] text-slate-400">
                                    {link.badge}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm leading-relaxed text-slate-400">{link.description}</p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {user && (
                  <div className="nav-item flex items-center gap-3">
                    <Link
                      to="/admin"
                      className="rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300 px-4 py-2.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(251,191,36,0.28)]"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="rounded-full border border-red-400/20 bg-red-500/8 px-4 py-2.5 text-sm font-semibold text-red-200 transition-all duration-300 hover:border-red-300/30 hover:bg-red-500/12"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <div className="hidden items-center gap-3 md:flex lg:hidden">
                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-cyan-100/80">
                  Available for new work
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-slate-950/30 transition-all duration-300 hover:border-white/20 hover:bg-white/8 lg:hidden"
                aria-label="Toggle navigation"
              >
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`h-0.5 w-6 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
        isMobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}>
        <div
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div className="mobile-menu absolute right-0 top-0 h-full w-full max-w-sm translate-x-full panel-surface border-l border-white/10">
          <div className="flex h-full flex-col px-6 pb-6 pt-5">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200/80">ArtIn3D</div>
                <div className="mt-1 text-2xl font-bold text-white">Studio Navigation</div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:text-white"
                aria-label="Close navigation"
              >
                X
              </button>
            </div>

            <div className="space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`mobile-nav-item block rounded-3xl border px-5 py-4 transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'border-cyan-300/25 bg-cyan-300/10'
                      : 'border-white/10 bg-white/4 hover:bg-white/6'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.eyebrow}</div>
                  <div className="mt-1 text-lg font-semibold text-white">{item.label}</div>
                </Link>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-slate-950/35 p-4">
              <div className="mb-3 text-sm font-semibold text-white">Resources</div>
              <div className="space-y-2">
                {resourceLinks.map((link) => (
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mobile-nav-item block rounded-2xl border border-white/8 px-4 py-3 transition-all duration-300 hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-white">{link.label}</span>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{link.badge}</span>
                      </div>
                      <div className="mt-1 text-sm text-slate-400">{link.description}</div>
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="mobile-nav-item block rounded-2xl border border-white/8 px-4 py-3 transition-all duration-300 hover:bg-white/5"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-white">{link.label}</span>
                        <span className="text-[10px] uppercase tracking-[0.22em] text-slate-400">{link.badge}</span>
                      </div>
                      <div className="mt-1 text-sm text-slate-400">{link.description}</div>
                    </Link>
                  )
                ))}
              </div>
            </div>

            <div className="mt-auto pt-8">
              {user && (
                <div className="space-y-3">
                  <Link
                    to="/admin"
                    className="block rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Open Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full rounded-full border border-red-400/20 px-5 py-3 text-sm font-semibold text-red-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed left-0 top-0 z-50 h-1 w-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-300 via-blue-400 to-amber-300 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </>
  );
};

export default Navbar;