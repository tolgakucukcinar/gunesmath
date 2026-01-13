import React from 'react';
import { Trophy, Medal } from 'lucide-react';

export const AchievementsPage: React.FC = () => {
    return (
        <div className="text-center p-10 space-y-6">
            <div className="bg-lego-yellow inline-block p-6 rounded-full border-4 border-lego-dark-yellow shadow-lg">
                <Trophy className="w-24 h-24 text-white drop-shadow-md" strokeWidth={2} />
            </div>
            <h1 className="text-4xl font-black text-lego-red drop-shadow-sm">Başarılar</h1>
            <p className="text-xl font-bold text-slate-600">Henüz hiç başarım kazanmadın. Dersleri tamamla, rozetleri topla!</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-10">
                {[1, 2, 3].map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border-b-4 border-slate-200 flex flex-col items-center opacity-50 grayscale hover:grayscale-0 hover:scale-105 transition-all cursor-not-allowed">
                        <Medal className="w-16 h-16 mb-4 text-lego-blue" />
                        <h3 className="font-bold text-lg text-slate-700">Gizli Başarım</h3>
                        <p className="text-sm text-slate-500">Kilitli</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
