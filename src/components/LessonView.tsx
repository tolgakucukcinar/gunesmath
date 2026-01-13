import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MATH_CONTENT } from '../data/mathContent';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeometricShape as GeometricShapes } from './GeometricShapes';

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
        <div className="max-w-4xl mx-auto py-4 px-4">
            {/* Header Brick */}
            <div className="mb-8 flex items-center justify-between bg-white border-b-4 border-slate-200 p-4 rounded-xl shadow-sm">
                <Link to="/" className="text-slate-500 hover:text-lego-blue flex items-center font-bold transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-2" strokeWidth={3} />
                    Çıkış
                </Link>
                <div className="flex space-x-2">
                    {/* Progress Studs */}
                    {subTopic.cards.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-4 h-4 rounded-full border-2 ${idx === currentCardIndex ? 'bg-lego-yellow border-lego-dark-yellow scale-125' : idx < currentCardIndex ? 'bg-lego-green border-lego-dark-green' : 'bg-slate-200 border-slate-300'}`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Main Content Area - Large Brick */}
            <div className="relative min-h-[500px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCard.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lego-brick bg-white border-slate-200 p-5 md:p-8 min-h-[500px] flex flex-col justify-center"
                    >
                        {/* Decorative Top Studs */}
                        <div className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 flex space-x-6">
                            <div className="w-12 h-4 bg-white/50 rounded-t border-t-2 border-x-2 border-slate-100"></div>
                            <div className="w-12 h-4 bg-white/50 rounded-t border-t-2 border-x-2 border-slate-100"></div>
                        </div>

                        {currentCard.type === 'text' && (
                            <div className="prose prose-xl text-slate-700 max-w-none">
                                <p className="leading-loose font-medium">
                                    {currentCard.content.split('**').map((part, i) =>
                                        i % 2 === 1 ? <span key={i} className="font-black text-lego-blue bg-blue-50 px-2 py-1 rounded mx-1">{part}</span> : part
                                    )}
                                </p>
                            </div>
                        )}

                        {currentCard.type === 'visual' && currentCard.visualType && (
                            <div className="flex flex-col items-center space-y-8">
                                <div className="bg-slate-50 p-8 rounded-2xl w-full border-2 border-dashed border-slate-300">
                                    <GeometricShapes type={currentCard.visualType as any} className="!border-0 !shadow-none !bg-transparent" />
                                </div>
                                <p className="text-2xl font-bold text-center text-slate-700">
                                    {currentCard.content.split('**').map((part, i) =>
                                        i % 2 === 1 ? <span key={i} className="font-black text-lego-red">{part}</span> : part
                                    )}
                                </p>
                            </div>
                        )}

                        {currentCard.type === 'example' && currentCard.example && (
                            <div className="space-y-6 w-full">
                                <div className="brick-white bg-yellow-50 border-lego-yellow p-6 rounded-xl">
                                    <h3 className="font-black text-lego-dark-yellow text-xl mb-4 flex items-center uppercase tracking-wide">
                                        <div className="bg-lego-yellow text-white w-8 h-8 flex items-center justify-center rounded-md mr-3 text-lg">?</div>
                                        Örnek Soru
                                    </h3>
                                    <p className="text-3xl font-black text-slate-800">{currentCard.example.problem}</p>
                                </div>

                                <div className="bg-blue-50/50 p-6 rounded-xl border-l-8 border-lego-blue">
                                    <div className="space-y-4">
                                        {currentCard.example.stepByStep.map((step, idx) => (
                                            <div key={idx} className="flex items-start">
                                                <span className="bg-lego-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0 shadow-sm mt-1">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-slate-700 text-xl font-medium pt-1">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t-2 border-blue-100 flex justify-end">
                                        <div className="brick-green px-8 py-3 rounded-xl font-black text-2xl animate-pulse">
                                            Cevap: {currentCard.example.solution}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="mt-8 flex justify-between items-center z-20 relative">
                <button
                    onClick={handlePrev}
                    disabled={currentCardIndex === 0}
                    className={`lego-brick px-8 py-4 font-bold text-lg flex items-center text-slate-500 bg-white border-slate-300 ${currentCardIndex === 0 ? 'opacity-0 cursor-default' : 'hover:bg-slate-50'}`}
                >
                    <ArrowLeft className="w-6 h-6 mr-2" strokeWidth={3} />
                    Önceki
                </button>

                {!isLastCard ? (
                    <button
                        onClick={handleNext}
                        className="lego-brick brick-blue px-10 py-4 font-black flex items-center text-xl shadow-lg"
                    >
                        Devam Et
                        <ArrowRight className="w-6 h-6 ml-2" strokeWidth={3} />
                    </button>
                ) : (
                    <Link
                        to={`/quiz/${topicId}/${subTopicId}`}
                        className="lego-brick brick-green px-12 py-4 font-black shadow-lg flex items-center text-xl animate-bounce"
                    >
                        Sınava Gir!
                        <BookOpen className="w-6 h-6 ml-2" strokeWidth={3} />
                    </Link>
                )}
            </div>
        </div>
    );
};
