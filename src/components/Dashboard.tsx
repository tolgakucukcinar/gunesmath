import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, CheckCircle2 } from 'lucide-react';
import { MATH_CONTENT, IconMap } from '../data/mathContent';
import { useProgress } from '../context/ProgressContext';

export const Dashboard: React.FC = () => {
  const { completedTopics } = useProgress();

  return (
    <div className="space-y-10">
      {/* Welcome Banner - Lego Baseplate Style */}
      <div className="bg-lego-blue rounded-xl p-8 border-b-8 border-lego-dark-blue flex items-center justify-between text-white shadow-xl relative overflow-hidden group">
        {/* Stud Pattern Overlay */}
        <div className="absolute inset-0 lego-studs-pattern opacity-10"></div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-black mb-2 drop-shadow-md tracking-wide">Merhaba Kahraman! 👋</h1>
          <p className="text-xl font-bold opacity-90">Lego dünyasında matematiği keşfetmeye hazır mısın? Tuğlaları birleştir, puanları topla!</p>
        </div>
        <div className="relative z-10 hidden md:block transform hover:scale-105 transition-transform duration-300">
          {/* Placeholder for mascot if needed, or keeping it clean */}
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm border-4 border-white/30">
            <Star className="w-16 h-16 text-lego-yellow fill-lego-yellow drop-shadow-md" />
          </div>
        </div>
      </div>

      {/* Topics Grid - Stacked Bricks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {MATH_CONTENT.map((topic) => {
          const Icon = IconMap[topic.icon];
          let brickColorClass = "";
          // Refined mapping for Authentic Palette
          if (topic.color.includes("red")) brickColorClass = "brick-red";
          else if (topic.color.includes("blue")) brickColorClass = "brick-blue";
          else if (topic.color.includes("green")) brickColorClass = "brick-green";
          else if (topic.color.includes("yellow")) brickColorClass = "brick-yellow";
          else brickColorClass = "brick-white";

          return (
            <div key={topic.id} className="group relative pt-4">
              {/* Top Studs for 3D Realism */}
              <div className="absolute top-0 left-4 flex space-x-3 z-0">
                <div className={`w-10 h-6 rounded-t-lg ${brickColorClass.split(' ')[0]} brightness-90 shadow-inner`}>
                  <div className="w-full h-full bg-black/10 rounded-t-lg"></div>
                </div>
                <div className={`w-10 h-6 rounded-t-lg ${brickColorClass.split(' ')[0]} brightness-90 shadow-inner`}>
                  <div className="w-full h-full bg-black/10 rounded-t-lg"></div>
                </div>
              </div>

              <div className={`lego-brick ${brickColorClass} p-6 h-full flex flex-col transform transition-transform hover:-translate-y-1 hover:shadow-2xl z-10 relative`}>
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-black/10 p-3 rounded-lg backdrop-blur-sm border border-white/10 shadow-inner">
                    <Icon className={`w-8 h-8 ${brickColorClass.includes('yellow') ? 'text-slate-800' : 'text-white'}`} strokeWidth={3} />
                  </div>
                  <div className={`px-3 py-1 rounded text-sm font-black uppercase tracking-wider ${brickColorClass.includes('yellow') ? 'bg-black/10 text-slate-800' : 'bg-black/20 text-white/90'}`}>
                    {topic.subTopics.length} Bölüm
                  </div>
                </div>

                <h3 className={`text-2xl font-black mb-4 tracking-tight leading-none drop-shadow-sm ${brickColorClass.includes('yellow') ? 'text-slate-900' : 'text-white'}`}>
                  {topic.title}
                </h3>

                <div className="space-y-3 mt-auto">
                  {topic.subTopics.map((sub) => {
                    const isCompleted = completedTopics.includes(sub.id);
                    return (
                      <Link
                        key={sub.id}
                        to={`/lesson/${topic.id}/${sub.id}`}
                        className={`flex items-center p-3 rounded-lg transition-all border-2 border-transparent hover:border-white/30 ${brickColorClass.includes('yellow')
                          ? 'bg-black/5 hover:bg-black/10 text-slate-800'
                          : 'bg-black/10 hover:bg-black/20 text-white'
                          }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 shadow-md ${isCompleted
                          ? 'bg-lego-green text-white border-2 border-white'
                          : 'bg-white/20 text-current'
                          }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" strokeWidth={4} /> : <Play className="w-4 h-4 fill-current" />}
                        </div>
                        <span className="font-bold text-sm truncate">{sub.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
