import React from 'react';

type ShapeType =
    | 'point'
    | 'line'
    | 'ray'
    | 'segment'
    | 'parallel'
    | 'intersecting'
    | 'angle-acute'
    | 'angle-right'
    | 'angle-obtuse'
    | 'angle-straight'
    | 'triangle-equilateral'
    | 'triangle-isosceles'
    | 'triangle-scalene'
    | 'circle'
    | 'circle-center'
    | 'circle-radius'
    | 'circle-diameter'
    | 'fraction-half'
    | 'fraction-quarter'
    | 'bar-chart'
    | 'grid-area'
    | 'probability-spinner';

interface GeometricShapeProps {
    type: ShapeType;
    className?: string;
    label?: string;
}

export const GeometricShape: React.FC<GeometricShapeProps> = ({ type, className = "", label }) => {
    const baseClass = "w-full h-64 mx-auto drop-shadow-sm";

    const renderShape = () => {
        switch (type) {
            case 'point':
                return (
                    <svg viewBox="0 0 200 100" className={baseClass}>
                        <circle cx="100" cy="50" r="3" className="fill-slate-800" />
                        <text x="100" y="35" textAnchor="middle" className="text-xl font-bold fill-lego-blue">A Noktası</text>
                    </svg>
                );
            case 'line':
                return (
                    <svg viewBox="0 0 200 100" className={baseClass}>
                        {/* Arrows */}
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" className="fill-lego-red" />
                            </marker>
                            <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto-start-reverse" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" className="fill-lego-red" />
                            </marker>
                        </defs>
                        <line x1="20" y1="50" x2="180" y2="50" className="stroke-lego-red stroke-4" markerEnd="url(#arrow)" markerStart="url(#arrow-start)" />
                        <text x="100" y="30" textAnchor="middle" className="text-sm font-bold fill-slate-500">Doğru (Sonsuza gider)</text>
                    </svg>
                );
            case 'ray':
                return (
                    <svg viewBox="0 0 200 100" className={baseClass}>
                        <defs>
                            <marker id="arrow-ray" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" className="fill-lego-blue" />
                            </marker>
                        </defs>
                        <circle cx="30" cy="50" r="4" className="fill-lego-blue" />
                        <line x1="30" y1="50" x2="170" y2="50" className="stroke-lego-blue stroke-4" markerEnd="url(#arrow-ray)" />
                        <text x="30" y="80" textAnchor="middle" className="text-sm font-bold fill-slate-600">Başlangıç</text>
                        <text x="170" y="80" textAnchor="middle" className="text-sm font-bold fill-slate-600">Sonsuzluk</text>
                    </svg>
                );
            case 'segment':
                return (
                    <svg viewBox="0 0 200 100" className={baseClass}>
                        <circle cx="40" cy="50" r="4" className="fill-lego-green" />
                        <circle cx="160" cy="50" r="4" className="fill-lego-green" />
                        <line x1="40" y1="50" x2="160" y2="50" className="stroke-lego-green stroke-4" />
                        <text x="100" y="30" textAnchor="middle" className="text-sm font-bold fill-slate-600">Doğru Parçası</text>
                    </svg>
                );
            case 'angle-acute': // Dar Açı
                return (
                    <svg viewBox="0 0 200 150" className={baseClass}>
                        <path d="M150,120 L50,120 L100,20" className="stroke-lego-blue stroke-4 fill-none" strokeLinecap="round" />
                        <path d="M80,120 A30,30 0 0 1 90,100" className="stroke-lego-yellow stroke-2 fill-none stroke-dasharray-4" />
                        <text x="100" y="140" textAnchor="middle" className="font-bold fill-lego-blue">Dar Açı</text>
                    </svg>
                );
            case 'angle-right': // Dik Açı
                return (
                    <svg viewBox="0 0 200 150" className={baseClass}>
                        <path d="M150,120 L50,120 L50,20" className="stroke-lego-red stroke-4 fill-none" strokeLinecap="round" />
                        <path d="M50,100 L70,100 L70,120" className="stroke-lego-red stroke-2 fill-none" />
                        <circle cx="60" cy="110" r="2" className="fill-lego-red" />
                        <text x="100" y="140" textAnchor="middle" className="font-bold fill-lego-red">Dik Açı (90°)</text>
                    </svg>
                );
            case 'angle-obtuse': // Geniş Açı
                return (
                    <svg viewBox="0 0 200 150" className={baseClass}>
                        <path d="M180,120 L100,120 L20,60" className="stroke-lego-red stroke-4 fill-none" strokeLinecap="round" />
                        <path d="M130,120 A30,30 0 0 0 115,100" className="stroke-lego-yellow stroke-2 fill-none stroke-dasharray-4" />
                        <text x="100" y="140" textAnchor="middle" className="font-bold fill-lego-red">Geniş Açı</text>
                    </svg>
                );
            case 'parallel':
                return (
                    <svg viewBox="0 0 200 120" className={baseClass}>
                        <line x1="20" y1="40" x2="180" y2="40" className="stroke-slate-600 stroke-4" />
                        <line x1="20" y1="80" x2="180" y2="80" className="stroke-slate-600 stroke-4" />
                        <text x="100" y="20" textAnchor="middle" className="font-bold fill-slate-500">Paralel Doğrular</text>
                    </svg>
                );
            case 'circle':
                return (
                    <svg viewBox="0 0 200 200" className={baseClass}>
                        <circle cx="100" cy="100" r="60" className="stroke-lego-blue stroke-4 fill-none" />
                        <circle cx="100" cy="100" r="3" className="fill-slate-800" />
                        <text x="100" y="100" dx="5" dy="-5" className="text-sm font-bold fill-slate-800">M (Merkez)</text>
                    </svg>
                );
            case 'circle-radius':
                return (
                    <svg viewBox="0 0 200 200" className={baseClass}>
                        <circle cx="100" cy="100" r="60" className="stroke-slate-300 stroke-4 fill-none" />
                        <circle cx="100" cy="100" r="3" className="fill-slate-800" />
                        <line x1="100" y1="100" x2="160" y2="100" className="stroke-lego-red stroke-4" />
                        <text x="130" y="90" textAnchor="middle" className="text-lg font-bold fill-lego-red">Yarıçap (r)</text>
                    </svg>
                );
            case 'circle-diameter':
                return (
                    <svg viewBox="0 0 200 200" className={baseClass}>
                        <circle cx="100" cy="100" r="60" className="stroke-slate-300 stroke-4 fill-none" />
                        <line x1="40" y1="100" x2="160" y2="100" className="stroke-lego-green stroke-4" />
                        <circle cx="100" cy="100" r="3" className="fill-slate-800" />
                        <text x="100" y="80" textAnchor="middle" className="text-lg font-bold fill-lego-green">Çap (R)</text>
                    </svg>
                );
            case 'fraction-half':
                return (
                    <svg viewBox="0 0 200 200" className={baseClass}>
                        <circle cx="100" cy="100" r="80" className="fill-slate-100 stroke-slate-300 stroke-2" />
                        <path d="M100,100 L100,20 A80,80 0 0 1 100,180 Z" className="fill-lego-blue stroke-lego-blue stroke-2" />
                        <text x="140" y="110" textAnchor="middle" className="text-2xl font-black fill-white">1/2</text>
                    </svg>
                );
            case 'fraction-quarter':
                return (
                    <svg viewBox="0 0 200 200" className={baseClass}>
                        <circle cx="100" cy="100" r="80" className="fill-slate-100 stroke-slate-300 stroke-2" />
                        <path d="M100,100 L100,20 A80,80 0 0 1 180,100 Z" className="fill-lego-blue stroke-lego-blue stroke-2" />
                        <text x="130" y="70" textAnchor="middle" className="text-2xl font-black fill-white">1/4</text>
                    </svg>
                );
            case 'bar-chart':
                return (
                    <svg viewBox="0 0 200 150" className={baseClass}>
                        <line x1="20" y1="130" x2="180" y2="130" className="stroke-slate-400 stroke-2" />
                        <line x1="20" y1="130" x2="20" y2="20" className="stroke-slate-400 stroke-2" />
                        <rect x="40" y="80" width="30" height="50" className="fill-lego-blue" />
                        <text x="55" y="75" textAnchor="middle" className="text-xs font-bold fill-slate-500">5</text>
                        <rect x="85" y="50" width="30" height="80" className="fill-lego-green" />
                        <text x="100" y="45" textAnchor="middle" className="text-xs font-bold fill-slate-500">8</text>
                        <rect x="130" y="100" width="30" height="30" className="fill-lego-red" />
                        <text x="145" y="95" textAnchor="middle" className="text-xs font-bold fill-slate-500">3</text>
                    </svg>
                );
            case 'grid-area':
                return (
                    <svg viewBox="0 0 200 150" className={baseClass}>
                        <defs>
                            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        <rect x="60" y="40" width="80" height="60" className="fill-lego-red/20 stroke-lego-red stroke-2" />
                        <text x="100" y="75" textAnchor="middle" className="text-sm font-bold fill-lego-red">Alan = 12 br²</text>
                    </svg>
                );
            case 'probability-spinner':
                return (
                    <svg viewBox="0 0 200 200" className={baseClass}>
                        <circle cx="100" cy="100" r="80" className="fill-white stroke-slate-300 stroke-2" />
                        <path d="M100,100 L100,20 A80,80 0 0 1 180,100 Z" className="fill-lego-blue" />
                        <path d="M100,100 L180,100 A80,80 0 0 1 100,180 Z" className="fill-lego-green" />
                        <path d="M100,100 L100,180 A80,80 0 0 1 20,100 Z" className="fill-lego-yellow" />
                        <path d="M100,100 L20,100 A80,80 0 0 1 100,20 Z" className="fill-lego-red" />
                        <circle cx="100" cy="100" r="5" className="fill-slate-800" />
                        <path d="M100,100 L100,40" className="stroke-slate-800 stroke-4" markerEnd="url(#arrow)" />
                    </svg>
                );
            default:
                return <div className="text-center text-slate-400">Görsel hazırlaniyor...</div>;
        }
    };

    return (
        <div className={`flex items-center justify-center bg-white rounded-3xl p-6 border-2 border-slate-100 ${className}`}>
            {renderShape()}
        </div>
    );
};
