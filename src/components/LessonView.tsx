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
            <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <Link to="/" className="text-slate-500 hover:text-fun-blue flex items-center font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-1" strokeWidth={3} />
                    Konulara Dön
                </Link>
                <div className="text-sm font-black text-white bg-fun-purple px-4 py-2 rounded-xl shadow-fun">
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
                        className="bg-white rounded-[2rem] shadow-fun-hover p-8 border-4 border-fun-blue/10 min-h-[400px] flex flex-col justify-center relative overflow-hidden"
                    >
                        {/* Decorative background blob */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-fun-yellow/10 rounded-full blur-2xl"></div>
                        {currentCard.type === 'text' && (
                            <div className="prose prose-lg text-slate-700">
                                {/* Simple markdown-like bold parsing */}
                                <p className="text-2xl leading-relaxed text-slate-600 font-medium">
                                    {currentCard.content.split('**').map((part, i) =>
                                        i % 2 === 1 ? <span key={i} className="font-black text-fun-blue bg-fun-blue/5 px-1 rounded mx-0.5">{part}</span> : part
                                    )}
                                </p>
                            </div>
                        )}

                        {currentCard.type === 'example' && currentCard.example && (
                            <div className="space-y-6">
                                <div className="bg-fun-yellow/10 border-l-8 border-fun-yellow p-6 rounded-r-3xl">
                                    <h3 className="font-black text-fun-orange text-xl mb-2 flex items-center uppercase tracking-wide">
                                        <span className="bg-fun-orange text-white px-2 py-1 rounded-lg text-sm mr-2">SORU</span>
                                        Örnek
                                    </h3>
                                    <p className="text-3xl font-black text-slate-800">{currentCard.example.problem}</p>
                                </div>

                                <div className="bg-fun-green/10 p-6 rounded-3xl border-2 border-fun-green/20">
                                    <h4 className="font-black text-fun-green mb-4 flex items-center text-lg">
                                        <CheckCircle className="w-6 h-6 mr-2 fill-fun-green text-white" />
                                        Çözüm Adımları
                                    </h4>
                                    <div className="space-y-4">
                                        {currentCard.example.stepByStep.map((step, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <span className="bg-white text-fun-green border-2 border-fun-green rounded-xl w-8 h-8 flex items-center justify-center text-base font-black mr-4 mt-0.5 flex-shrink-0 shadow-sm">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-slate-700 text-xl font-medium">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t-2 border-fun-green/20">
                                        <p className="text-right font-black text-3xl text-fun-green">
                                            Cevap: <span className="bg-white px-4 py-2 rounded-xl shadow-sm ml-2 border-2 border-fun-green/30">{currentCard.example.solution}</span>
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
                    className={`px-6 py-4 rounded-2xl font-black transition flex items-center text-lg ${currentCardIndex === 0 ? 'opacity-0 cursor-default' : 'bg-white text-slate-500 shadow-fun hover:bg-slate-50 hover:text-slate-700'}`}
                >
                    <ArrowLeft className="w-6 h-6 mr-2" strokeWidth={3} />
                    Geri
                </button>

                {!isLastCard ? (
                    <button
                        onClick={handleNext}
                        className="btn-primary flex items-center text-xl shadow-fun hover:shadow-fun-hover"
                    >
                        İlerle
                        <ArrowRight className="w-6 h-6 ml-2" strokeWidth={3} />
                    </button>
                ) : (
                    <Link
                        to={`/quiz/${topicId}/${subTopicId}`}
                        className="bg-fun-green text-white px-8 py-4 rounded-2xl font-black shadow-fun hover:shadow-fun-hover transition flex items-center text-xl animate-bounce"
                    >
                        Teste Başla!
                        <BookOpen className="w-6 h-6 ml-2" strokeWidth={3} />
                    </Link>
                )}
            </div>
        </div>
    );
};
