import React from 'react';

export const Footer = () => {
  return (
    <footer
      className="py-6 px-4 text-center text-xs transition-colors duration-300"
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        color: 'var(--text-muted)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} MessSphere System. All rights reserved.</p>
        <p className="flex items-center space-x-4">
          <span className="hover:text-indigo-500 cursor-pointer transition-colors">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-indigo-500 cursor-pointer transition-colors">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-indigo-500 cursor-pointer transition-colors">Help &amp; Support</span>
        </p>
      </div>
    </footer>
  );
};

