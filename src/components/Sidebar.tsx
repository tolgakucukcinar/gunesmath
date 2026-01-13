import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MATH_CONTENT } from '../data/mathContent';
import { useProgress } from '../context/ProgressContext';
import { X, CheckCircle, Gamepad2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { completedTopics } = useProgress();
  const location = useLocation();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-paper-white shadow-[8px_0_0_0_rgba(0,0,0,0.1)] z-50 overflow-y-auto border-r-4 border-fun-yellow"
          >
            <div className="p-6 flex items-center justify-between bg-fun-yellow">
              <h2 className="text-2xl font-black text-white drop-shadow-md">Menü</h2>
              <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/40 rounded-xl transition text-white">
                <X className="w-8 h-8" strokeWidth={3} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <Link
                to="/games"
                onClick={onClose}
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-fun-green to-fun-blue text-white rounded-2xl shadow-fun hover:shadow-fun-hover hover:-translate-y-1 transition transform"
              >
                <Gamepad2 className="w-8 h-8" />
                <span className="font-bold text-xl">Oyun Alanı</span>
              </Link>

              <div className="space-y-6 mt-6">
                {MATH_CONTENT.map((topic) => (
                  <div key={topic.id} className="bg-white p-3 rounded-2xl shadow-sm border-2 border-slate-100">
                    <h3 className="text-sm font-black text-fun-purple uppercase tracking-wider mb-2 px-2">
                      {topic.title}
                    </h3>
                    <div className="space-y-1">
                      {topic.subTopics.map((sub) => {
                        const isCompleted = completedTopics.includes(sub.id);
                        const isActive = location.pathname.includes(sub.id);

                        return (
                          <Link
                            key={sub.id}
                            to={`/lesson/${topic.id}/${sub.id}`}
                            onClick={onClose}
                            className={`flex items-center justify-between p-3 rounded-xl transition font-bold ${isActive
                                ? 'bg-fun-orange/10 text-fun-orange border-2 border-fun-orange/20'
                                : 'hover:bg-slate-50 text-slate-600 border-2 border-transparent'
                              }`}
                          >
                            <span className="text-base">{sub.title}</span>
                            {isCompleted && <CheckCircle className="w-5 h-5 text-fun-green fill-green-100" />}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
