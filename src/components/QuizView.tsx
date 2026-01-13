import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MATH_CONTENT } from '../data/mathContent';
import { useProgress } from '../context/ProgressContext';
import { Check, X, Award, RotateCcw, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizView: React.FC = () => {
  const { markTopicComplete, saveQuizScore } = useProgress();
  const { topicId, subTopicId } = useParams();
  const topic = MATH_CONTENT.find(t => t.id === topicId);
  const subTopic = topic?.subTopics.find(s => s.id === subTopicId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  if (!topic || !subTopic || !subTopic.quiz.length) {
    return <Navigate to="/" replace />;
  }

  const currentQuestion = subTopic.quiz[currentQuestionIndex];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#22c55e', '#ffffff'] // Green and white
      });
      (window as any).speakMascot("Aferin! Harika gidiyorsun.");
    } else {
       (window as any).speakMascot("Üzgünüm, yanlış oldu. Açıklamayı oku bakalım.");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < subTopic.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      if (score === subTopic.quiz.length) {
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 }
          });
      }
    }
  };

  if (showResults) {
    const finalScore = score;
    const percentage = Math.round((finalScore / subTopic.quiz.length) * 100);

    // Save Progress
    if (subTopicId) {
        saveQuizScore(subTopicId, finalScore);
        if (percentage >= 50) {
            markTopicComplete(subTopicId);
        }
    }
    
    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-indigo-100">
            <Award className="w-24 h-24 mx-auto text-yellow-500 mb-6" />
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-4">Sınav Bitti!</h2>
            <p className="text-2xl text-slate-600 mb-8">
                Skorun: <span className="font-bold text-indigo-600">{finalScore} / {subTopic.quiz.length}</span>
            </p>
            
            <div className="w-full bg-slate-200 rounded-full h-4 mb-8">
                <div 
                    className={`h-4 rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="flex flex-col space-y-4">
                <Link 
                    to="/"
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition flex items-center justify-center"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Ana Sayfaya Dön
                </Link>
                <button 
                    onClick={() => window.location.reload()}
                    className="w-full py-4 bg-white border-2 border-indigo-200 text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 transition flex items-center justify-center"
                >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Tekrar Dene
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between">
         <h2 className="text-xl font-bold text-slate-500">Soru {currentQuestionIndex + 1} / {subTopic.quiz.length}</h2>
         <div className="text-indigo-600 font-bold">Puan: {score}</div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white">
            <h3 className="text-2xl font-bold leading-relaxed">{currentQuestion.question}</h3>
        </div>

        <div className="p-8 space-y-4">
            {currentQuestion.options.map((option, idx) => {
                let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 text-lg font-medium flex justify-between items-center ";
                
                if (isAnswered) {
                    if (idx === currentQuestion.correctIndex) {
                        btnClass += "border-green-500 bg-green-50 text-green-700";
                    } else if (idx === selectedOption) {
                        btnClass += "border-red-500 bg-red-50 text-red-700";
                    } else {
                        btnClass += "border-slate-100 text-slate-400 opacity-50";
                    }
                } else {
                    btnClass += "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700";
                }

                return (
                    <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        disabled={isAnswered}
                        className={btnClass}
                    >
                        <span>{option}</span>
                        {isAnswered && idx === currentQuestion.correctIndex && <Check className="w-6 h-6 text-green-600" />}
                        {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <X className="w-6 h-6 text-red-600" />}
                    </button>
                );
            })}
        </div>

        {isAnswered && (
            <div className="px-8 pb-8 animate-fade-in">
                <div className={`p-4 rounded-xl mb-6 ${selectedOption === currentQuestion.correctIndex ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <p className="font-bold mb-1">
                        {selectedOption === currentQuestion.correctIndex ? 'Harika! Doğru Cevap.' : 'Üzgünüm, yanlış cevap.'}
                    </p>
                    <p className="text-sm opacity-90">{currentQuestion.explanation}</p>
                </div>
                <button 
                    onClick={handleNext}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition"
                >
                    {currentQuestionIndex < subTopic.quiz.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
