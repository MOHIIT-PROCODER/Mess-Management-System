import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { MobileNavbar } from '../components/common/MobileNavbar';
import { Footer } from '../components/common/Footer';

export const StudentLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-app-base text-app overflow-x-hidden transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />
        <main className="flex-1 px-3.5 sm:px-6 py-4 pb-24 md:pb-8 overflow-y-auto min-h-[calc(100vh-120px)] space-y-5">
          <Outlet />
        </main>
      </div>
      <MobileNavbar />
      <Footer />
    </div>
  );
};
