import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Timer, PieChart, Search } from 'lucide-react';

export const GamesHub: React.FC = () => {
  return (
    <div className="space-y-8">
        <div className="text-center py-8">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-4 flex items-center justify-center">
                <Gamepad2 className="w-10 h-10 mr-3" />
                Oyun Alanı
            </h1>
            <p className="text-xl text-slate-600">Eğlenerek öğrenmeye hazır mısın?</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link to="/games/number-rush" className="bg-orange-500 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition group">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-4">
                    <Timer className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Sayı Avcısı</h3>
                <p className="opacity-90">30 saniyede ne kadar hızlı işlem yapabilirsin?</p>
            </Link>

            <Link to="/games/fraction-match" className="bg-blue-500 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition group">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-4">
                    <PieChart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Kesir Eşleştirme</h3>
                <p className="opacity-90">Kesirleri görselleriyle eşleştir.</p>
            </Link>

            <Link to="/games/geo-detective" className="bg-slate-700 rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition group">
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-4">
                    <Search className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Geometri Dedektifi</h3>
                <p className="opacity-90">İpuçlarını takip et, şekli bul.</p>
            </Link>
        </div>
    </div>
  );
};
