import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { Footer } from '../components/common/Footer';

export const SuperAdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app-base text-app transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
