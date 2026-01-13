import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, BookOpen, Menu } from 'lucide-react';
import { Mascot } from './Mascot';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper-white font-fredoka text-slate-800">
      <nav className="bg-gradient-to-r from-fun-orange to-fun-pink p-4 shadow-fun text-white sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-white/20 rounded-xl transition shadow-sm"
            >
              <Menu className="w-8 h-8" strokeWidth={3} />
            </button>
            <Link to="/" className="flex items-center space-x-3 text-3xl font-black tracking-tight hover:scale-105 transition">
              <BookOpen className="w-10 h-10" strokeWidth={3} />
              <span className="hidden sm:inline drop-shadow-md">GüneşMath</span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition font-bold shadow-sm">
              <Home className="w-6 h-6" strokeWidth={3} />
              <span className="hidden sm:inline">Ana Sayfa</span>
            </Link>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="max-w-6xl mx-auto p-4 sm:p-6 pb-20">
        <Outlet />
      </main>
      <Mascot />
    </div>
  );
};
