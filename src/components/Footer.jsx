import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 px-6">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} 3D Designer Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;