import React, { useEffect, useState } from 'react';
import { Cat, Volume2, VolumeX } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { motion, AnimatePresence } from 'framer-motion';

export const Mascot: React.FC = () => {
  const { mascotVisible, audioEnabled, toggleAudio } = useProgress();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Expose a speak function to the window object so other components can trigger it
  // This is a simple hack; in a larger app, we'd use a custom hook or context for speech
  useEffect(() => {
    (window as any).speakMascot = (text: string) => {
      if (!audioEnabled || !mascotVisible) return;
      
      setIsSpeaking(true);
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'tr-TR';
      utterance.rate = 1.0;
      utterance.pitch = 1.2; // Slightly higher pitch for a "cute" voice
      
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };

    return () => {
        (window as any).speakMascot = null;
        window.speechSynthesis.cancel();
    }
  }, [audioEnabled, mascotVisible]);

  if (!mascotVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
       {/* Speech Bubble (only when speaking) */}
       <AnimatePresence>
         {isSpeaking && (
             <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 10 }}
                className="bg-white border-2 border-indigo-200 p-3 rounded-t-xl rounded-bl-xl shadow-lg mb-2 max-w-[200px]"
             >
                <div className="flex space-x-1 justify-center items-center h-4">
                    <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-1 bg-indigo-500 rounded-full" />
                    <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-1 bg-indigo-500 rounded-full" />
                </div>
             </motion.div>
         )}
       </AnimatePresence>

       <div className="flex items-center space-x-2">
          {/* Audio Toggle */}
          <button 
            onClick={toggleAudio}
            className="bg-white text-slate-600 p-2 rounded-full shadow-md hover:bg-slate-100 transition"
            title={audioEnabled ? "Sesi Kapat" : "Sesi Aç"}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Cat Avatar */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => (window as any).speakMascot("Merhaba! Ben Tekir. Matematik öğrenmene yardım edeceğim.")}
            className="bg-orange-400 p-4 rounded-full shadow-xl border-4 border-white text-white relative overflow-hidden group"
          >
             <Cat className={`w-8 h-8 ${isSpeaking ? 'animate-bounce' : ''}`} />
          </motion.button>
       </div>
    </div>
  );
};
