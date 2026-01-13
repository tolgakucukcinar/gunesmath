import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Card {
  id: number;
  content: string;
  type: 'text' | 'image';
  isMatched: boolean;
}

const FRACTIONS = [
  { text: '1/2', image: '🌓' },
  { text: '1/4', image: '🍰' }, // Using cake slice to represent quarter
  { text: '3/4', image: '🕒' }, // Clock at 3/4
  { text: '1/1', image: '🌕' }
];

export const FractionMatch: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);

  const initializeGame = () => {
    const gameCards: Card[] = [];
    FRACTIONS.forEach((pair, index) => {
        gameCards.push({ id: index * 2, content: pair.text, type: 'text', isMatched: false });
        gameCards.push({ id: index * 2 + 1, content: pair.image, type: 'image', isMatched: false });
    });
    // Shuffle
    gameCards.sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlippedIds([]);
    setMatchedCount(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedIds.length === 2 || flippedIds.includes(id) || cards.find(c => c.id === id)?.isMatched) return;

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
        const card1 = cards.find(c => c.id === newFlipped[0]);
        const card2 = cards.find(c => c.id === newFlipped[1]);
        
        // Simple check logic relying on the fact that pairs are index * 2 and index * 2 + 1
        // Math.floor(id / 2) should be same for pairs? No, I generated IDs sequentially.
        // Let's rely on content matching via the source array? Or just map IDs back to source index.
        // The IDs are generated: 0&1 are pair, 2&3 are pair, etc.
        const isMatch = Math.floor(card1!.id / 2) === Math.floor(card2!.id / 2);

        if (isMatch) {
            setMatchedCount(prev => prev + 1);
            setCards(prev => prev.map(c => newFlipped.includes(c.id) ? { ...c, isMatched: true } : c));
            setFlippedIds([]);
            confetti({ particleCount: 30, origin: { y: 0.7 } });
        } else {
            setTimeout(() => setFlippedIds([]), 1000);
        }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-indigo-900">Kesir Eşleştirme</h2>
            <button onClick={initializeGame} className="p-2 bg-indigo-100 rounded-full text-indigo-600 hover:bg-indigo-200">
                <RefreshCw className="w-6 h-6" />
            </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
            {cards.map((card) => {
                const isFlipped = flippedIds.includes(card.id) || card.isMatched;
                return (
                    <motion.div
                        key={card.id}
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => handleCardClick(card.id)}
                        className="h-32 perspective-1000 cursor-pointer relative"
                    >
                         <div className={`absolute inset-0 w-full h-full rounded-xl shadow-md flex items-center justify-center text-3xl font-bold backface-hidden transition-all duration-300 ${isFlipped ? 'bg-white border-2 border-indigo-400 rotate-y-180' : 'bg-indigo-600'}`}>
                            <div className="transform rotate-y-180" style={{ display: isFlipped ? 'block' : 'none' }}>
                                {card.content}
                            </div>
                            <div style={{ display: !isFlipped ? 'block' : 'none' }}>
                                ❓
                            </div>
                         </div>
                    </motion.div>
                );
            })}
        </div>
        
        {matchedCount === FRACTIONS.length && (
            <div className="mt-8 text-center animate-bounce">
                <p className="text-2xl font-bold text-green-600">Tebrikler! Hepsini buldun.</p>
            </div>
        )}
    </div>
  );
};
