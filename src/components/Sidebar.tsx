import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Trophy, Settings, BookOpen, X } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Ana Sayfa', path: '/' },
    { icon: BookOpen, label: 'Dersler', path: '/lessons' },
    { icon: Gamepad2, label: 'Oyunlar', path: '/games' },
    { icon: Trophy, label: 'Başarılar', path: '/achievements' },
    { icon: Settings, label: 'Ayarlar', path: '/settings' },
  ];

  return (
    <div className="h-full flex flex-col bg-lego-yellow border-r-8 border-lego-dark-yellow shadow-2xl relative overflow-hidden">
      {/* Background Stud Pattern for Realism */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at center, #000 15%, transparent 16%)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="relative z-10 flex flex-col h-full p-4">
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={onClose} className="bg-lego-red text-white p-2 rounded-lg border-b-4 border-lego-dark-red active:border-b-0 active:translate-y-1 transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Logo Area */}
        <div className="mb-6 flex justify-center">
          <div className="bg-lego-red px-4 py-2 rounded-lg border-b-6 border-lego-dark-red shadow-lg transform -rotate-2 hover:rotate-0 transition-transform duration-300">
            <h1 className="text-2xl font-black text-white tracking-widest drop-shadow-md border-2 border-white/20 rounded-md px-2">
              GÜNEŞ<span className="text-lego-yellow">MATH</span>
            </h1>
            {/* Decorative studs on logo brick */}
            <div className="flex justify-between mt-1 px-1 opacity-50">
              <div className="w-2 h-2 rounded-full bg-black/30"></div>
              <div className="w-2 h-2 rounded-full bg-black/30"></div>
              <div className="w-2 h-2 rounded-full bg-black/30"></div>
            </div>
          </div>
        </div>

        {/* Menu Items - Stacked Bricks */}
        <nav className="flex-1 space-y-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center space-x-3 px-5 py-3 rounded-lg font-bold text-lg transition-all duration-150 transform ${isActive
                  ? 'bg-lego-blue border-b-4 border-lego-dark-blue text-white shadow-lg translate-y-0.5'
                  : 'bg-white border-b-4 border-slate-300 text-slate-600 hover:bg-lego-white hover:border-lego-gray hover:translate-y-[-2px]'
                }`
              }
              onClick={onClose}
            >
              {/* Studs on top of each menu brick for detail */}
              <div className="absolute top-1 left-2 w-full flex space-x-1 opacity-20">
                <div className="w-2 h-1 rounded-full bg-black"></div>
                <div className="w-2 h-1 rounded-full bg-black"></div>
              </div>

              <div className={`p-1.5 rounded-md ${
                // Icon background logic
                (item as any).path === "/" ? "bg-white/20" : "bg-black/5"
                }`}>
                <item.icon className="w-6 h-6 drop-shadow-sm" strokeWidth={3} />
              </div>
              <span className="tracking-tight">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Character/Mascot placeholder - As a distinct brick */}
        <div className="mt-auto bg-lego-green p-4 rounded-lg border-b-6 border-lego-dark-green text-white text-center font-bold shadow-md transform rotate-1">
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span className="text-2xl">🧱</span>
            <span className="drop-shadow-md">Sürüm 2.0</span>
          </div>
          {/* Studs */}
          <div className="absolute top-1 left-0 w-full flex justify-center space-x-2 opacity-30">
            <div className="w-3 h-1 rounded-full bg-black"></div>
            <div className="w-3 h-1 rounded-full bg-black"></div>
            <div className="w-3 h-1 rounded-full bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
