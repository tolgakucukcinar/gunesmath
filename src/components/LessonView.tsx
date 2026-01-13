import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MATH_CONTENT } from '../data/mathContent';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LessonView: React.FC = () => {
  const { topicId, subTopicId } = useParams();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const topic = MATH_CONTENT.find(t => t.id === topicId);
  const subTopic = topic?.subTopics.find(s => s.id === subTopicId);

  if (!topic || !subTopic) {
    return <Navigate to="/" replace />;
  }

  const currentCard = subTopic.cards[currentCardIndex];
  const isLastCard = currentCardIndex === subTopic.cards.length - 1;

  const handleNext = () => {
    if (!isLastCard) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
        {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <Link to="/" className="text-slate-500 hover:text-slate-800 flex items-center font-medium">
            <ArrowLeft className="w-5 h-5 mr-1" />
            Konulara Dön
        </Link>
        <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {currentCardIndex + 1} / {subTopic.cards.length}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">{subTopic.title}</h1>
      </div>

      {/* Card Display */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-slate-100 min-h-[400px] flex flex-col justify-center"
            >
                {currentCard.type === 'text' && (
                    <div className="prose prose-lg text-slate-700">
                        {/* Simple markdown-like bold parsing */}
                        <p className="text-2xl leading-relaxed">
                            {currentCard.content.split('**').map((part, i) => 
                                i % 2 === 1 ? <span key={i} className="font-bold text-indigo-900">{part}</span> : part
                            )}
                        </p>
                    </div>
                )}

                {currentCard.type === 'example' && currentCard.example && (
                    <div className="space-y-6">
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                            <h3 className="font-bold text-yellow-800 text-lg mb-1">Örnek Soru</h3>
                            <p className="text-2xl font-mono text-slate-800">{currentCard.example.problem}</p>
                        </div>
                        
                        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                             <h4 className="font-bold text-green-700 mb-4 flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                Çözüm
                             </h4>
                             <div className="space-y-3">
                                {currentCard.example.stepByStep.map((step, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                                            {idx + 1}
                                        </span>
                                        <p className="text-slate-700 text-lg">{step}</p>
                                    </div>
                                ))}
                             </div>
                             <div className="mt-6 pt-4 border-t border-green-200">
                                <p className="text-right font-bold text-2xl text-green-800">
                                    Cevap: {currentCard.example.solution}
                                </p>
                             </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex justify-between items-center">
        <button 
            onClick={handlePrev} 
            disabled={currentCardIndex === 0}
            className={`px-6 py-3 rounded-xl font-bold transition flex items-center ${currentCardIndex === 0 ? 'opacity-0 cursor-default' : 'bg-white text-slate-600 shadow-md hover:bg-slate-50'}`}
        >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri
        </button>

        {!isLastCard ? (
            <button 
                onClick={handleNext}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 hover:scale-105 transition flex items-center text-lg"
            >
                İlerle
                <ArrowRight className="w-6 h-6 ml-2" />
            </button>
        ) : (
            <Link 
                to={`/quiz/${topicId}/${subTopicId}`}
                className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-green-600 hover:scale-105 transition flex items-center text-lg animate-bounce"
            >
                Teste Başla!
                <BookOpen className="w-6 h-6 ml-2" />
            </Link>
        )}
      </div>
    </div>
  );
};
