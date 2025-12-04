import React from 'react';
import britanniaLogo from '../../assets/britannia.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #8B0000 0%, #DAA520 25%, #F5F5F5 50%, #DAA520 75%, #8B0000 100%)",
          backgroundSize: "400% 400%",
          animation: "gradientShift 8s ease infinite",
        }}
      />
      
      {/* Additional overlay for depth */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgba(218, 165, 32, 0.2) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 0, 0, 0.2) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-8">
          <div className="flex justify-between items-center">
            <div className="text-white font-bold text-2xl tracking-widest uppercase" 
                 style={{
                   textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.5)",
                   WebkitTextStroke: "1px rgba(0, 0, 0, 0.3)"
                 }}>
              Schbang-digitals
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-white to-yellow-50 rounded-lg p-2 shadow-md border-2 border-yellow-400/30">
              <img 
                src={britanniaLogo} 
                alt="Britannia Logo" 
                className="w-full h-full object-contain filter drop-shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center items-center px-8 text-center">
          {/* Logo Section */}
          <div className="mb-12">
            <div className="w-32 h-32 bg-gradient-to-br from-white via-yellow-50 to-yellow-100 rounded-lg p-4 shadow-lg mx-auto mb-8 border-3 border-yellow-400/50" 
                 style={{ borderColor: "#DAA520" }}>
              <img 
                src={britanniaLogo} 
                alt="Britannia Logo" 
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-300 to-red-800 drop-shadow-2xl">
              Britannia
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-white drop-shadow-lg">
              Croissant Intelligence Engine
            </h2>
          </div>

          {/* Feature Cards or CTA Section */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-black/20 shadow-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-yellow-600 text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-3">Intelligent</h3>
              <p className="text-white/90">Advanced AI-powered solutions for modern business needs</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-black/20 shadow-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-yellow-600 text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">Fast</h3>
              <p className="text-white/90">Lightning-quick processing and real-time insights</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-black/20 shadow-sm hover:bg-white/15 transition-all duration-300 hover:scale-105">
              <div className="text-yellow-600 text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">Precise</h3>
              <p className="text-white/90">Accurate results tailored to your specific requirements</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <button 
              onClick={onGetStarted}
              className="bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 hover:from-yellow-800 hover:via-yellow-900 hover:to-yellow-950 text-white font-bold py-4 px-12 rounded-lg text-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-black/20"
            >
              Get Started
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-8">
          <div className="text-center text-white/80 text-sm font-medium" 
               style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)" }}>
            © 2024 Schbang-digitals. All rights reserved.
          </div>
        </footer>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .border-gold {
          border-color: #FFD700;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
