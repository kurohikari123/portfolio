
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';
import { ViewType } from '../types';

interface HeroProps {
    onNavigate?: (view: ViewType, id?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const binaryRef = useRef<HTMLDivElement>(null);
  
  // Create a grid of binary numbers for the visual
  const [binaryGrid, setBinaryGrid] = useState<string>('');

  useEffect(() => {
    // Generate random binary string
    const rows = 20;
    const cols = 40;
    let grid = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid += Math.random() > 0.5 ? '1' : '0';
        }
        grid += '\n';
    }
    setBinaryGrid(grid);

    // Animate binary changing
    const interval = setInterval(() => {
        setBinaryGrid(prev => {
            const arr = prev.split('');
            // Change a few bits randomly
            for(let k=0; k<10; k++) {
                const idx = Math.floor(Math.random() * arr.length);
                if(arr[idx] !== '\n') arr[idx] = Math.random() > 0.5 ? '1' : '0';
            }
            return arr.join('');
        });
    }, 100);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const tl = gsap.timeline();

    if (textRef.current) {
        const children = textRef.current.children;
        tl.fromTo(children, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out" }
        );
    }
    
    if (binaryRef.current) {
        gsap.fromTo(binaryRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 0.5, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.5 }
        );
    }

  }, []);

  const handleProjectsClick = () => {
    if (onNavigate) {
        onNavigate('projects');
    }
  };

  const handleContactClick = () => {
    if (onNavigate) {
        onNavigate('contact');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div ref={textRef} className="space-y-6 z-10 order-2 lg:order-1">
          <div className="inline-block px-3 py-1 rounded-full border border-tokyo-green/50 bg-tokyo-green/10 text-tokyo-green text-sm font-mono mb-4">
            Available for hire
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tokyo-blue to-tokyo-purple">
              experiences
            </span>
          </h1>
          <p className="text-xl text-tokyo-comment max-w-lg">
            Full-stack engineer specializing in scalable architecture, React ecosystems, and creative web solutions.
          </p>
          
          <div className="flex items-center gap-4 pt-4">
             <button 
                onClick={handleProjectsClick}
                className="px-6 py-3 bg-tokyo-blue text-tokyo-bg font-bold rounded hover:bg-tokyo-cyan transition-colors shadow-[0_0_15px_rgba(122,162,247,0.5)]"
             >
                View Projects
             </button>
             <button 
                onClick={handleContactClick}
                className="px-6 py-3 border border-tokyo-purple text-tokyo-purple font-bold rounded hover:bg-tokyo-purple/10 transition-colors"
             >
                Contact Me
             </button>
          </div>

          <div className="flex gap-6 pt-8 text-tokyo-comment">
             <a href="#" className="hover:text-tokyo-fg transition-colors hover:scale-110 transform duration-200"><Github size={24} /></a>
             <a href="#" className="hover:text-tokyo-fg transition-colors hover:scale-110 transform duration-200"><Linkedin size={24} /></a>
             <a href="#" className="hover:text-tokyo-fg transition-colors hover:scale-110 transform duration-200"><Twitter size={24} /></a>
          </div>
        </div>

        {/* Visual Content (Binary Portrait) */}
        <div className="relative z-10 flex justify-center order-1 lg:order-2">
            <div ref={binaryRef} className="relative w-80 h-80 md:w-96 md:h-96">
                {/* Decorative Circles */}
                <div className="absolute inset-0 rounded-full border border-tokyo-blue/30 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-tokyo-purple/30 animate-[spin_15s_linear_infinite_reverse]" />
                
                {/* ASCII/Binary Container */}
                <div className="absolute inset-8 bg-tokyo-bg_dark rounded-full overflow-hidden border-2 border-tokyo-cyan/50 flex items-center justify-center shadow-[0_0_50px_rgba(122,162,247,0.2)]">
                    <pre className="text-[10px] leading-[10px] text-tokyo-blue opacity-80 whitespace-pre font-mono select-none">
                        {binaryGrid}
                    </pre>
                    {/* Overlay Image (Silhouette effect) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-tokyo-bg via-transparent to-transparent opacity-80" />
                    <img 
                        src="https://picsum.photos/400/400?grayscale" 
                        alt="Profile" 
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                    />
                </div>
            </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-tokyo-comment">
         <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;
