
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import Loader from './components/Loader';
import { ViewType } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
  
  // Lifted state for project filtering
  const [projectFilter, setProjectFilter] = useState('All');

  const handleNavigate = (view: ViewType, id?: string) => {
      if (view === currentView && view === 'home' && id) {
          // If already on home, just scroll
          const element = document.getElementById(id.replace('#', ''));
          element?.scrollIntoView({ behavior: 'smooth' });
      } else {
          // Change view
          setCurrentView(view);
          if (id) {
              setScrollTarget(id);
          } else {
              setScrollTarget(null);
          }
      }
      
      // Reset scroll target after a while so it doesn't persist inappropriately if we navigate away and back
      if (id) {
          setTimeout(() => setScrollTarget(null), 1000);
      }
  };

  const renderContent = () => {
      switch (currentView) {
          case 'home':
              return <Home initialScrollId={scrollTarget} onNavigate={handleNavigate} />;
          case 'projects':
              return <Projects filter={projectFilter} setFilter={setProjectFilter} />;
          case 'contact':
              return <Contact />;
          default:
              return <Home initialScrollId={scrollTarget} onNavigate={handleNavigate} />;
      }
  };

  return (
    <div className="relative min-h-screen bg-tokyo-bg text-tokyo-fg font-mono selection:bg-tokyo-blue/30 selection:text-tokyo-cyan">
      
      {/* Loader Overlay */}
      {isLoading && (
        <Loader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Application */}
      {!isLoading && (
        <>
          {/* 3D Background Layer */}
          <Background3D />
          
          {/* Content Layer */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar 
                currentView={currentView} 
                onNavigate={handleNavigate} 
                projectFilter={projectFilter}
            />
            
            <main className="flex-grow">
                {renderContent()}
            </main>

            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
