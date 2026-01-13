import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Search } from 'lucide-react';

interface Mystery {
  id: number;
  clue: string;
  options: { id: string, label: string, isCorrect: boolean }[];
}

const MYSTERIES: Mystery[] = [
  {
    id: 1,
    clue: "Benim 3 kenarım ve 3 köşem var. İç açılarımın toplamı 180 derecedir. Ben kimim?",
    options: [
        { id: 'a', label: 'Kare', isCorrect: false },
        { id: 'b', label: 'Üçgen', isCorrect: true },
        { id: 'c', label: 'Çember', isCorrect: false }
    ]
  },
  {
    id: 2,
    clue: "Benim 4 kenarım var ve hepsi birbirine eşit. Bütün açılarım 90 derecedir.",
    options: [
        { id: 'a', label: 'Dikdörtgen', isCorrect: false },
        { id: 'b', label: 'Kare', isCorrect: true },
        { id: 'c', label: 'Yamuk', isCorrect: false }
    ]
  },
  {
    id: 3,
    clue: "Benim ne başım var ne sonum. İki yöne sonsuza kadar giderim.",
    options: [
        { id: 'a', label: 'Doğru', isCorrect: true },
        { id: 'b', label: 'Işın', isCorrect: false },
        { id: 'c', label: 'Doğru Parçası', isCorrect: false }
    ]
  }
];

export const GeoDetective: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleGuess = (isCorrect: boolean) => {
    if (isCorrect) {
        setFeedback('correct');
        setTimeout(() => {
            setFeedback(null);
            if (currentLevel < MYSTERIES.length - 1) {
                setCurrentLevel(prev => prev + 1);
            } else {
                setFeedback('finished');
            }
        }, 1500);
    } else {
        setFeedback('wrong');
        setTimeout(() => setFeedback(null), 1000);
    }
  };

  const mystery = MYSTERIES[currentLevel];

  if (feedback === 'finished') {
      return (
          <div className="text-center p-12">
              <h2 className="text-4xl font-bold text-indigo-900 mb-4">Dava Çözüldü! 🕵️‍♂️</h2>
              <p className="text-xl">Bütün şekilleri tanıdın.</p>
          </div>
      );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
        <div className="bg-slate-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Search className="w-48 h-48" />
            </div>

            <div className="flex items-center space-x-2 mb-6 text-yellow-400">
                <HelpCircle className="w-8 h-8" />
                <span className="text-xl font-bold font-mono">İPUCU #{currentLevel + 1}</span>
            </div>

            <p className="text-2xl leading-relaxed font-medium mb-12">
                "{mystery.clue}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mystery.options.map((opt) => (
                    <button
                        key={opt.id}
                        onClick={() => handleGuess(opt.isCorrect)}
                        className="bg-slate-700 hover:bg-slate-600 p-4 rounded-xl font-bold text-lg transition border-2 border-transparent hover:border-indigo-400 focus:scale-95"
                    >
                        {opt.label}
                    </button>
                ))}
            </div>

            {feedback === 'correct' && (
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="absolute inset-0 bg-green-500/90 flex items-center justify-center z-10"
                >
                    <span className="text-4xl font-black">DOĞRU! 🎉</span>
                </motion.div>
            )}

            {feedback === 'wrong' && (
                <motion.div 
                    initial={{ x: -10 }} animate={{ x: [0, -10, 10, -10, 0] }}
                    className="absolute inset-0 bg-red-500/90 flex items-center justify-center z-10"
                >
                    <span className="text-4xl font-black">TEKRAR DENE ❌</span>
                </motion.div>
            )}
        </div>
    </div>
  );
};
