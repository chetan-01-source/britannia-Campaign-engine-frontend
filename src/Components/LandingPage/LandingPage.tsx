import React from 'react';
import britanniaLogo from '../../assets/britannia.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-100/20 to-yellow-100/20 rounded-full animate-spin-slow"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-yellow-100/20 to-orange-100/20 rounded-full animate-spin-reverse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-200/30 to-yellow-200/30 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-xl animate-float-delayed"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full py-6 px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold tracking-wide">
                <span className="text-red-600 drop-shadow-sm">SCHBANG</span>
                <span className="text-gray-500 mx-2">•</span>
                <span className="text-yellow-600 drop-shadow-sm">DIGITALS</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-linear-to-br from-white to-yellow-50 rounded-2xl p-2 shadow-lg border border-red-200">
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
            <div className="w-32 h-32 bg-linear-to-br from-white via-yellow-50 to-yellow-100 rounded-3xl p-4 shadow-2xl mx-auto mb-8 border border-red-200 backdrop-blur-sm" 
                 style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)" }}>
              <img 
                src={britanniaLogo} 
                alt="Britannia Logo" 
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          {/* Title Section */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-red-600 via-red-700 to-red-800 drop-shadow-sm">
              Britannia
            </h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-gray-700 drop-shadow-sm">
              Campaign Intelligence Engine
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create stunning marketing campaigns with AI-powered creativity. From product showcase to platform-specific content generation.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-red-600 text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Campaign Generation</h3>
              <p className="text-gray-600">Create targeted campaigns across Instagram, LinkedIn, and Email with AI-powered content</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-yellow-600 text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Visual Branding</h3>
              <p className="text-gray-600">Generate beautiful product images and platform-specific designs automatically</p>
            </div>
            
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:bg-white/80 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-orange-600 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Campaign History</h3>
              <p className="text-gray-600">Track and manage all your generated campaigns with detailed analytics and insights</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <button 
              onClick={onGetStarted}
              className="bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-12 rounded-full text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform active:scale-95"
            >
              Start Creating Campaigns
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-6 px-8">
          <div className="text-center text-gray-600 text-sm font-medium">
            © 2025 Britannia Campaign Engine. Powered by AI Intelligence.
          </div>
        </footer>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(-180deg);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
