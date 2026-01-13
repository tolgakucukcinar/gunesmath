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

    try {
      if (index === currentQuestion.correctIndex) {
        setScore(prev => prev + 1);
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#22c55e', '#ffffff'] // Green and white
          });
        } catch (e) { console.error("Confetti error:", e); }

        if ((window as any).speakMascot) {
          (window as any).speakMascot("Aferin! Harika gidiyorsun.");
        }
      } else {
        if ((window as any).speakMascot) {
          (window as any).speakMascot("Üzgünüm, yanlış oldu. Açıklamayı oku bakalım.");
        }
      }
    } catch (e) {
      console.error("Interaction error:", e);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < subTopic.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Save Progress before showing results
      if (subTopicId) {
        const percentage = Math.round((score / subTopic.quiz.length) * 100);
        saveQuizScore(subTopicId, score);
        if (percentage >= 50) {
          markTopicComplete(subTopicId);
        }
      }

      setShowResults(true);

      if (score === subTopic.quiz.length) {
        try {
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.error("Confetti error:", e);
        }
      }
    }
  };

  if (showResults) {
    const finalScore = score;
    const percentage = Math.round((finalScore / subTopic.quiz.length) * 100);

    return (
      <div className="max-w-xl mx-auto py-12 px-4 text-center">
        <div className="bg-white rounded-xl shadow-2xl p-8 border-b-8 border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 w-full left-0 h-4 bg-gradient-to-r from-lego-yellow via-lego-red to-lego-blue opacity-80"></div>

          <Award className="w-32 h-32 mx-auto text-lego-yellow drop-shadow-md mb-6 animate-pulse" strokeWidth={1.5} />
          <h2 className="text-5xl font-black text-lego-blue mb-4 tracking-tight">Sınav Bitti!</h2>
          <p className="text-3xl text-slate-600 mb-8 font-bold">
            Skorun: <span className="text-white bg-lego-green px-4 py-1 rounded-lg shadow-sm border-b-4 border-lego-dark-green">{finalScore} / {subTopic.quiz.length}</span>
          </p>

          <div className="w-full bg-slate-100 rounded-full h-8 mb-10 p-2 border-2 border-slate-200">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${percentage >= 80 ? 'bg-lego-green' : percentage >= 50 ? 'bg-lego-yellow' : 'bg-lego-red'}`}
              style={{ width: `${percentage}%` }}
            >
              <div className="w-full h-full bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="lego-brick brick-blue w-full py-4 font-black flex items-center justify-center text-xl"
            >
              <Home className="w-6 h-6 mr-3" strokeWidth={3} />
              Ana Sayfaya Dön
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="lego-brick brick-white w-full py-4 text-slate-500 font-bold flex items-center justify-center text-lg"
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
      <div className="mb-8 flex items-center justify-between px-2 text-slate-600 font-bold">
        <h2 className="text-xl uppercase tracking-widest bg-white px-4 py-2 rounded-lg border-b-4 border-slate-200">Soru {currentQuestionIndex + 1} / {subTopic.quiz.length}</h2>
        <div className="text-lego-blue font-black bg-white px-4 py-2 rounded-lg shadow-sm text-lg border-b-4 border-slate-200">Puan: {score}</div>
      </div>

      <div className="lego-brick bg-white border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
        {/* Question Header */}
        <div className="bg-lego-blue p-5 md:p-8 text-white relative overflow-hidden border-b-4 border-lego-dark-blue">
          {/* Lego stud pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_20%,transparent_20%)] bg-[size:10px_10px]"></div>
          <h3 className="text-2xl font-black leading-relaxed relative z-10 text-shadow-sm">{currentQuestion.question}</h3>
        </div>

        <div className="p-4 md:p-8 space-y-4 flex-1">
          {currentQuestion.options.map((option, idx) => {
            let btnClass = "lego-brick w-full text-left p-5 text-lg font-bold flex justify-between items-center ";

            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                btnClass += "brick-green";
              } else if (idx === selectedOption) {
                btnClass += "brick-red";
              } else {
                btnClass += "bg-slate-50 border-slate-200 text-slate-400 opacity-50";
              }
            } else {
              btnClass += "bg-white border-slate-200 text-slate-600 hover:border-lego-yellow hover:bg-yellow-50 hover:text-slate-800";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={btnClass}
              >
                <span>{option}</span>
                {isAnswered && idx === currentQuestion.correctIndex && <Check className="w-8 h-8 text-white" strokeWidth={4} />}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && <X className="w-8 h-8 text-white" strokeWidth={4} />}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="px-8 pb-8 animate-fade-in bg-slate-50 pt-6 border-t border-slate-100">
            <div className={`p-6 rounded-lg mb-6 border-l-8 shadow-sm ${selectedOption === currentQuestion.correctIndex ? 'bg-green-100 border-lego-green' : 'bg-red-100 border-lego-red'}`}>
              <p className={`font-black text-lg mb-1 ${selectedOption === currentQuestion.correctIndex ? 'text-green-800' : 'text-red-800'}`}>
                {selectedOption === currentQuestion.correctIndex ? 'Harika! Doğru Cevap.' : 'Üzgünüm, yanlış cevap.'}
              </p>
              <p className="text-base font-medium text-slate-700 leading-relaxed">{currentQuestion.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="lego-brick brick-blue w-full py-4 font-black shadow-lg text-xl"
            >
              {currentQuestionIndex < subTopic.quiz.length - 1 ? 'Sonraki Soru' : 'Sonucu Gör'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
