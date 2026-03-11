import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="px-6 pb-8 pt-16 sm:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="panel-surface overflow-hidden rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">ArtIn3D</div>
              <h2 className="mt-3 max-w-md text-3xl font-bold text-white sm:text-4xl">
                Premium 3D presentation for product, architectural, and concept work.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-400">
                The portfolio now follows a cleaner studio-style direction with stronger visual hierarchy, a refined navigation system, and a more polished background atmosphere.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Navigation</div>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <Link to="/" className="block transition-colors hover:text-white">Home</Link>
                <Link to="/projects" className="block transition-colors hover:text-white">Projects</Link>
                <Link to="/contact" className="block transition-colors hover:text-white">Contact</Link>
                <Link to="/admin" className="block transition-colors hover:text-white">Admin</Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/35 p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Need a visual partner?</div>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                Use the contact page to discuss product renders, 3D walkthroughs, portfolio visuals, or ongoing design support.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition-transform duration-300 hover:scale-[1.02]"
                >
                  Start a Project
                </Link>
                <a
                  href="https://drive.google.com/file/d/1ZugLfPpdKJZpxFu9qb_INK8T5YHrbVPn/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-white/5"
                >
                  View Resume
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} ArtIn3D. All rights reserved.</p>
            <p>Built for a sharper, studio-grade portfolio presentation.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;