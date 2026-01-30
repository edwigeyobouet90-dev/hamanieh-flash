
import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Music, 
} from 'lucide-react';
import { View } from './types';
import { RADIO_CONFIG } from './constants';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const navigate = (view: View) => {
    setCurrentView(view);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Force reload on play to prevent buffer issues with live streams
        audioRef.current.load();
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative">
      {/* Background Image Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={RADIO_CONFIG.STREAM_URL} 
        preload="none"
        crossOrigin="anonymous"
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Menu"
        >
          <Menu size={24} className="text-slate-700" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-royal-blue rounded-lg flex items-center justify-center shadow-md">
            <Music className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">
            <span className="text-royal-blue">Hamanieh</span>
            <span className="text-scarlet-red">-Flash</span>
            <span className="text-slate-400">.net</span>
          </h1>
        </div>

        <div className="w-10" /> {/* Spacer for centering */}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow pt-16 pb-32 z-10">
        <div className="container mx-auto px-4 max-w-4xl py-8">
          {currentView === View.HOME && <Home navigate={navigate} isPlaying={isPlaying} togglePlay={togglePlay} />}
          {currentView === View.ABOUT && <About />}
          {currentView === View.CONTACT && <Contact />}
        </div>
      </main>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={toggleSidebar} 
        currentView={currentView}
        navigate={navigate}
      />

      {/* Persistent Audio Player */}
      <Player 
        isPlaying={isPlaying} 
        togglePlay={togglePlay} 
        audioRef={audioRef}
      />
    </div>
  );
};

export default App;
