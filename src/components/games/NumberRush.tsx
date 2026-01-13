import React, { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const NumberRush: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [question, setQuestion] = useState<{ text: string, answer: number }>({ text: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');

  const generateQuestion = () => {
    const operators = ['+', '-'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 50) + 1;
    
    if (operator === '+') {
        setQuestion({ text: `${a} + ${b}`, answer: a + b });
    } else {
        // Ensure positive result for simplicity
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        setQuestion({ text: `${max} - ${min}`, answer: max - min });
    }
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    } else if (timeLeft === 0) {
        setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(30);
    generateQuestion();
    setUserAnswer('');
  };

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === question.answer) {
        setScore(prev => prev + 10);
        confetti({ particleCount: 20, spread: 30, origin: { y: 0.8 } });
        generateQuestion();
        setUserAnswer('');
    } else {
        // Shake animation or sound could go here
        setUserAnswer('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-8 text-white shadow-xl text-center">
            <h2 className="text-4xl font-black mb-2">Sayı Avcısı</h2>
            <p className="text-white/80 mb-8">30 saniyede kaç işlem yapabilirsin?</p>

            {!isPlaying && timeLeft === 30 ? (
                <button 
                    onClick={startGame}
                    className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition flex items-center mx-auto"
                >
                    <Play className="w-6 h-6 mr-2" />
                    Başla
                </button>
            ) : !isPlaying && timeLeft === 0 ? (
                <div className="animate-fade-in">
                    <p className="text-2xl font-bold mb-4">Süre Doldu!</p>
                    <p className="text-6xl font-black mb-8">{score} Puan</p>
                    <button 
                        onClick={startGame}
                        className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:scale-105 transition flex items-center mx-auto"
                    >
                        <RotateCcw className="w-6 h-6 mr-2" />
                        Tekrar Oyna
                    </button>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-12 text-2xl font-bold">
                        <div>Süre: {timeLeft}</div>
                        <div>Puan: {score}</div>
                    </div>
                    
                    <div className="text-6xl font-black mb-8 font-mono">{question.text} = ?</div>
                    
                    <form onSubmit={checkAnswer}>
                        <input 
                            type="number" 
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            autoFocus
                            className="w-48 h-20 text-center text-4xl text-slate-800 rounded-2xl shadow-inner outline-none focus:ring-4 ring-yellow-300"
                        />
                    </form>
                </div>
            )}
        </div>
    </div>
  );
};
