import React from 'react';
import { Link } from 'react-router-dom';
import { MATH_CONTENT } from '../data/mathContent';
import { PieChart, Calculator, Book, ArrowRight } from 'lucide-react';

const IconMap: Record<string, React.ElementType> = {
  PieChart,
  Calculator,
  Book
};

export const Dashboard: React.FC = () => {
  const getIcon = (iconName: string) => {
    const Icon = IconMap[iconName] || Book;
    return <Icon className="w-16 h-16 text-white drop-shadow-md" strokeWidth={2.5} />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-8 bg-white rounded-[3rem] shadow-fun border-4 border-fun-yellow relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-4 bg-fun-yellow/20"></div>
        <h1 className="text-5xl font-black text-fun-blue mb-4 tracking-tight drop-shadow-sm">Hoş Geldin! 👋</h1>
        <p className="text-2xl text-slate-500 font-bold">Bugün hangi maceraya atılmak istersin?</p>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {MATH_CONTENT.map((topic) => (
          <div key={topic.id} className={`${topic.color} rounded-[2.5rem] p-8 shadow-fun transform transition-all duration-300 hover:scale-[1.02] hover:shadow-fun-hover border-4 border-white/20 relative overflow-hidden`}>
            {/* Decorative Background Circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

            <div className="flex items-center space-x-6 mb-8 relative z-10">
              <div className="p-4 bg-white/25 rounded-3xl backdrop-blur-sm shadow-inner">
                {getIcon(topic.icon)}
              </div>
              <div>
                <h2 className="text-4xl font-black text-white drop-shadow-md tracking-wide">{topic.title}</h2>
                <div className="h-2 w-24 bg-white/30 rounded-full mt-2"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              {topic.subTopics.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/lesson/${topic.id}/${sub.id}`}
                  className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full border-4 border-transparent hover:border-white/50"
                >
                  <div>
                    <h3 className="text-2xl font-black text-slate-800 mb-3 group-hover:text-fun-orange transition-colors">{sub.title}</h3>
                    <p className="text-slate-500 text-base font-medium line-clamp-2 leading-relaxed">{sub.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-end text-fun-blue font-bold group-hover:translate-x-2 transition-transform bg-fun-blue/5 p-2 rounded-xl w-fit ml-auto group-hover:bg-fun-blue group-hover:text-white">
                    <span className="mr-2">Maceraya Başla</span>
                    <ArrowRight className="w-5 h-5" strokeWidth={3} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
