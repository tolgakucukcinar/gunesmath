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
            className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Menü</h2>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
                    <X className="w-6 h-6 text-slate-500" />
                </button>
            </div>

            <div className="p-4">
                <Link 
                    to="/games"
                    onClick={onClose}
                    className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl mb-6 shadow-md hover:shadow-lg transition"
                >
                    <Gamepad2 className="w-6 h-6" />
                    <span className="font-bold text-lg">Oyun Alanı</span>
                </Link>

                <div className="space-y-6">
                    {MATH_CONTENT.map((topic) => (
                        <div key={topic.id}>
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
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
                                            className={`flex items-center justify-between p-3 rounded-lg transition ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}
                                        >
                                            <span className="text-sm font-medium">{sub.title}</span>
                                            {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
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
