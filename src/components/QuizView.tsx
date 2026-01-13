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
        <div className="bg-white rounded-[3rem] shadow-fun-hover p-8 border-4 border-white ring-4 ring-indigo-50 relative overflow-hidden">
          <div className="absolute top-0 w-full left-0 h-4 bg-gradient-to-r from-fun-yellow via-fun-pink to-fun-purple"></div>

          <Award className="w-32 h-32 mx-auto text-fun-yellow drop-shadow-md mb-6 animate-pulse" strokeWidth={1.5} />
          <h2 className="text-5xl font-black text-fun-blue mb-4 tracking-tight">Sınav Bitti!</h2>
          <p className="text-3xl text-slate-600 mb-8 font-bold">
            Skorun: <span className="text-fun-green bg-fun-green/10 px-4 py-1 rounded-xl">{finalScore} / {subTopic.quiz.length}</span>
          </p>

          <div className="w-full bg-slate-100 rounded-full h-6 mb-10 p-1">
            <div
              className={`h-4 rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-fun-green' : percentage >= 50 ? 'bg-fun-yellow' : 'bg-red-400'}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="w-full py-4 bg-fun-blue text-white rounded-2xl font-black shadow-fun hover:shadow-fun-hover hover:-translate-y-1 transition transform flex items-center justify-center text-xl"
            >
              <Home className="w-6 h-6 mr-3" strokeWidth={3} />
              Ana Sayfaya Dön
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-white border-2 border-slate-200 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 hover:text-slate-700 transition flex items-center justify-center text-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" strokeWidth={3} />
              Tekrar Dene
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center justify-between px-2">
        <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest">Soru {currentQuestionIndex + 1} / {subTopic.quiz.length}</h2>
        <div className="text-fun-blue font-black bg-white px-4 py-2 rounded-xl shadow-sm text-lg border border-fun-blue/10">Puan: {score}</div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-fun overflow-hidden border-4 border-transparent hover:border-fun-blue/20 transition-all duration-300">
        <div className="bg-fun-blue p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <h3 className="text-2xl font-black leading-relaxed relative z-10">{currentQuestion.question}</h3>
        </div>

        <div className="p-8 space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "w-full text-left p-5 rounded-2xl border-b-4 transition-all duration-200 text-lg font-bold flex justify-between items-center transform active:scale-[0.99] ";

            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                btnClass += "border-fun-green bg-green-50 text-fun-green shadow-none translate-y-1";
              } else if (idx === selectedOption) {
                btnClass += "border-red-400 bg-red-50 text-red-500 shadow-none translate-y-1";
              } else {
                btnClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-50 shadow-none";
              }
            } else {
              btnClass += "bg-white border-slate-200 shadow-sm hover:border-fun-orange hover:bg-orange-50 hover:text-fun-orange text-slate-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctIndex && <Check className="w-8 h-8 text-fun-green" strokeWidth={3} />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <X className="w-8 h-8 text-red-500" strokeWidth={3} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="px-8 pb-8 animate-fade-in">
            <div className={`p-6 rounded-2xl mb-6 border-l-8 shadow-sm ${selectedOption === currentQuestion.correctIndex ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
              <p className={`font-black text-lg mb-1 ${selectedOption === currentQuestion.correctIndex ? 'text-green-700' : 'text-red-700'}`}>
                {selectedOption === currentQuestion.correctIndex ? 'Harika! Doğru Cevap.' : 'Üzgünüm, yanlış cevap.'}
              </p>
              <p className="text-base font-medium text-slate-600 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-4 bg-fun-blue text-white rounded-2xl font-black shadow-fun hover:shadow-fun-hover hover:-translate-y-1 transition transform text-xl"
            >
              {currentQuestionIndex < subTopic.quiz.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
