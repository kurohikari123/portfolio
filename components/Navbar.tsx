
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Terminal, Code2, Mail, Gamepad2, ArrowLeft, Layers, Atom, Server, Database, Box, Cpu, Zap, FileCode, Globe, Shield } from 'lucide-react';
import { NavItem } from '../types';
import { ViewType } from '../types';

const navItems: NavItem[] = [
  { label: '_hello', href: '#hero' },
  { label: '_skills', href: '#skills' },
  { label: '_experience', href: '#experience' },
];

interface NavbarProps {
    currentView: ViewType;
    onNavigate: (view: ViewType, id?: string) => void;
    projectFilter?: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, projectFilter = 'All' }) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate transition between styles
    if (navRef.current) {
        if (currentView === 'projects') {
            gsap.to(navRef.current, {
                borderBottomColor: '#bb9af7', // Purple for game mode
                backgroundColor: 'rgba(26, 27, 38, 0.95)',
                duration: 0.5
            });
        } else {
            gsap.to(navRef.current, {
                borderBottomColor: 'rgba(86, 95, 137, 0.2)', // Default comment color
                backgroundColor: 'rgba(26, 27, 38, 0.7)',
                duration: 0.5
            });
        }
    }
  }, [currentView]);

  // Animate badge change
  useEffect(() => {
    if (currentView === 'projects' && badgeRef.current) {
        gsap.fromTo(badgeRef.current, 
            { scale: 0.8, opacity: 0, rotationY: 90 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.4, ease: "back.out(1.7)" }
        );
    }
  }, [projectFilter, currentView]);

  const handleNavClick = (e: React.MouseEvent, view: ViewType, href?: string) => {
      e.preventDefault();
      onNavigate(view, href);
  };

  const isGameMode = currentView === 'projects';

  const getCategoryIcon = (filter: string) => {
      const lower = filter.toLowerCase();
      if (lower.includes('react') || lower.includes('next')) return <Atom size={16} />;
      if (lower.includes('node') || lower.includes('server')) return <Server size={16} />;
      if (lower.includes('python') || lower.includes('ai')) return <Cpu size={16} />;
      if (lower.includes('solidity') || lower.includes('web3')) return <Shield size={16} />;
      if (lower.includes('typescript') || lower.includes('js')) return <FileCode size={16} />;
      if (lower.includes('database') || lower.includes('sql')) return <Database size={16} />;
      if (lower.includes('three') || lower.includes('webgl')) return <Box size={16} />;
      if (lower === 'all') return <Globe size={16} />;
      return <Zap size={16} />;
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 tokyo-glass border-b border-tokyo-comment/20 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            ref={logoRef} 
            onClick={(e) => handleNavClick(e, 'home', '#hero')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded flex items-center justify-center border transition-colors duration-500 ${isGameMode ? 'bg-tokyo-purple/20 border-tokyo-purple' : 'bg-tokyo-blue/20 border-tokyo-blue'}`}>
               {isGameMode ? <Gamepad2 className="text-tokyo-purple w-5 h-5" /> : <Terminal className="text-tokyo-blue w-5 h-5" />}
            </div>
            <span className="font-bold text-xl text-tokyo-fg tracking-tighter transition-colors duration-500">
              <span className={isGameMode ? "text-tokyo-purple" : "text-tokyo-blue"}>
                {isGameMode ? "mission" : "dev"}
              </span>
              .{isGameMode ? "control" : "portfolio"}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:block">
            <div ref={linksRef} className="ml-10 flex items-baseline space-x-8">
              
              {isGameMode ? (
                  // Game Mode Navigation
                  <div className="flex items-center gap-6">
                      {/* Active Class Badge */}
                      <div ref={badgeRef} className="flex items-center gap-2 bg-tokyo-bg_dark/80 border border-tokyo-purple/50 px-3 py-1.5 rounded skew-x-[-10deg] shadow-[0_0_10px_rgba(187,154,247,0.2)]">
                         <div className="skew-x-[10deg] flex items-center gap-2">
                             <span className="text-tokyo-comment text-xs font-mono uppercase">CLASS:</span>
                             <span className="text-tokyo-purple flex items-center gap-1 font-bold text-sm">
                                {getCategoryIcon(projectFilter)}
                                {projectFilter.toUpperCase()}
                             </span>
                         </div>
                      </div>

                      <div className="h-6 w-px bg-tokyo-comment/20 mx-2"></div>

                      <div className="text-tokyo-comment/50 font-mono text-xs flex items-center gap-2 border border-tokyo-comment/20 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 rounded-full bg-tokyo-green animate-pulse"></span>
                          SYSTEM_ACTIVE
                      </div>
                      <button
                        onClick={(e) => handleNavClick(e, 'home')}
                        className="flex items-center gap-2 text-tokyo-red hover:text-white transition-colors group"
                      >
                          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                          <span>ABORT MISSION</span>
                      </button>
                  </div>
              ) : (
                  // Standard Navigation
                  <>
                    {navItems.map((item) => (
                        <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, 'home', item.href)}
                        className={`relative px-3 py-2 rounded-md text-sm font-medium group overflow-hidden transition-colors ${
                            currentView === 'home' 
                            ? 'text-tokyo-comment hover:text-tokyo-cyan' 
                            : 'text-tokyo-comment hover:text-tokyo-cyan'
                        }`}
                        >
                        {item.label}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tokyo-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                        </a>
                    ))}

                    <button 
                        onClick={(e) => handleNavClick(e, 'projects')}
                        className={`
                            px-3 py-2 rounded-md text-sm font-medium group overflow-hidden transition-colors text-tokyo-comment hover:text-tokyo-purple flex items-center gap-2
                        `}
                    >
                        <Layers size={14} />
                        _projects
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-tokyo-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                    
                    <button 
                        onClick={(e) => handleNavClick(e, 'contact')}
                        className={`
                            border px-4 py-2 rounded-md text-sm font-bold transition-all duration-300 flex items-center gap-2
                            ${currentView === 'contact' 
                                ? 'bg-tokyo-blue text-tokyo-bg border-tokyo-blue' 
                                : 'bg-tokyo-blue/10 border-tokyo-blue text-tokyo-blue hover:bg-tokyo-blue hover:text-tokyo-bg'
                            }
                        `}
                    >
                        <Mail size={16} />
                        <span>Let's Talk</span>
                    </button>
                  </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button className="text-tokyo-fg hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              <Code2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
