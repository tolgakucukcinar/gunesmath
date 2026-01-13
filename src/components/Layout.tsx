import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Home, BookOpen, Menu } from 'lucide-react';
import { Mascot } from './Mascot';
import { Sidebar } from './Sidebar';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <nav className="bg-indigo-600 p-4 shadow-lg text-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => setSidebarOpen(true)}
                    className="p-1 hover:bg-indigo-700 rounded-lg transition"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:text-indigo-100 transition">
                    <BookOpen className="w-8 h-8" />
                    <span className="hidden sm:inline">Matematik Canavarı</span>
                </Link>
            </div>
          
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:bg-indigo-700 px-3 py-2 rounded-lg transition">
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Ana Sayfa</span>
            </Link>
          </div>
        </div>
      </nav>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 pb-20">
        <Outlet />
      </main>
      <Mascot />
    </div>
  );
};
