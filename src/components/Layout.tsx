import React, { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Mascot } from './Mascot';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-lego-gray relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="md:hidden bg-lego-yellow p-4 flex items-center justify-between border-b-4 border-lego-dark-yellow shadow-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 bg-white rounded-lg text-lego-dark-yellow active:scale-95 transition-transform"
          >
            <Menu className="w-8 h-8" strokeWidth={3} />
          </button>
          <span className="text-2xl font-black text-lego-dark-red tracking-wider">GÜNEŞ<span className="text-white">MATH</span></span>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-6xl mx-auto pb-24">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mascot fixed at bottom right */}
      <Mascot />
    </div>
  );
};
