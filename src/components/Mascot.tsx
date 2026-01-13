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
            className="bg-white border-4 border-fun-orange p-4 rounded-t-3xl rounded-bl-3xl shadow-fun mb-4 max-w-[250px]"
          >
            <div className="flex space-x-2 justify-center items-center h-6">
              <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-2 bg-fun-orange rounded-full" />
              <motion.div animate={{ height: [8, 24, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-2 bg-fun-orange rounded-full" />
              <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-2 bg-fun-orange rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center space-x-3">
        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="bg-white text-fun-blue p-3 rounded-full shadow-fun hover:bg-fun-blue hover:text-white transition border-2 border-fun-blue/20"
          title={audioEnabled ? "Sesi Kapat" : "Sesi Aç"}
        >
          {audioEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
        </button>

        {/* Cat Avatar */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (window as any).speakMascot("Merhaba! Ben Güneş. Matematik öğrenmene yardım edeceğim.")}
          className="bg-fun-orange p-5 rounded-full shadow-fun border-4 border-white text-white relative overflow-hidden group hover:ring-4 ring-fun-orange/30 transition-all"
        >
          <Cat className={`w-10 h-10 ${isSpeaking ? 'animate-bounce' : ''}`} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
};
