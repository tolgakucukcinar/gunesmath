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
    return <Icon className="w-12 h-12 text-white/90" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">Hoş Geldin! 👋</h1>
        <p className="text-xl text-slate-600">Bugün hangi konuyu öğrenmek istersin?</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {MATH_CONTENT.map((topic) => (
          <div key={topic.id} className={`${topic.color} rounded-3xl p-6 sm:p-8 shadow-xl transform transition-all duration-300 hover:scale-[1.01]`}>
            <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl">
                    {getIcon(topic.icon)}
                </div>
                <h2 className="text-3xl font-bold text-white">{topic.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topic.subTopics.map((sub) => (
                    <Link 
                        key={sub.id} 
                        to={`/lesson/${topic.id}/${sub.id}`}
                        className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-full border border-white/50"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{sub.title}</h3>
                            <p className="text-slate-500 text-sm line-clamp-2">{sub.description}</p>
                        </div>
                        <div className="mt-4 flex items-center text-indigo-500 font-semibold group-hover:translate-x-1 transition-transform">
                            <span>Derse Başla</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
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
