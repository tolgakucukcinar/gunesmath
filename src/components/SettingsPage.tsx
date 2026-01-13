import React from 'react';
import { Settings, Volume2, User, Moon } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const SettingsPage: React.FC = () => {
    const { audioEnabled, toggleAudio } = useProgress();

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center space-x-4 mb-8">
                <div className="bg-lego-gray p-3 rounded-lg border-b-4 border-slate-300">
                    <Settings className="w-8 h-8 text-slate-600" />
                </div>
                <h1 className="text-3xl font-black text-slate-800">Ayarlar</h1>
            </div>

            <div className="space-y-4">
                {/* Audio Setting */}
                <div className="bg-white p-6 rounded-xl border-b-4 border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="bg-lego-blue/10 p-3 rounded-full text-lego-blue">
                            <Volume2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Ses Efektleri</h3>
                            <p className="text-slate-500 text-sm">Müzik ve maskot sesi</p>
                        </div>
                    </div>
                    <button
                        onClick={toggleAudio}
                        className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out ${audioEnabled ? 'bg-lego-green' : 'bg-slate-300'}`}
                    >
                        <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${audioEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                </div>

                {/* Profile Placeholder */}
                <div className="bg-white p-6 rounded-xl border-b-4 border-slate-200 flex items-center justify-between opacity-60">
                    <div className="flex items-center space-x-4">
                        <div className="bg-lego-red/10 p-3 rounded-full text-lego-red">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Öğrenci Profili</h3>
                            <p className="text-slate-500 text-sm">Yakında gelecek...</p>
                        </div>
                    </div>
                </div>

                {/* Theme Placeholder */}
                <div className="bg-white p-6 rounded-xl border-b-4 border-slate-200 flex items-center justify-between opacity-60">
                    <div className="flex items-center space-x-4">
                        <div className="bg-lego-yellow/10 p-3 rounded-full text-lego-dark-yellow">
                            <Moon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">Gece Modu</h3>
                            <p className="text-slate-500 text-sm">Yakında gelecek...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
