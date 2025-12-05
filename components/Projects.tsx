
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight, ChevronLeft, Github, ExternalLink, Gamepad2, Play, Filter } from 'lucide-react';
import { Project } from '../types';

// Mock Project Data
const projects: Project[] = [
    {
        id: 1,
        title: "NEURAL_NEXUS",
        description: "An AI-powered dashboard visualizing real-time neural network training data. Features WebGL rendering and WebSocket streams.",
        image: "from-tokyo-blue to-tokyo-purple",
        tech: ["React", "Three.js", "Python", "TensorFlow"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Deployed",
        difficulty: "Hard"
    },
    {
        id: 2,
        title: "CYBER_COMMERCE",
        description: "A decentralized e-commerce platform built on the blockchain. Includes smart contract integration and crypto payments.",
        image: "from-tokyo-green to-tokyo-blue",
        tech: ["Next.js", "Solidity", "Web3.js", "Tailwind"],
        githubUrl: "#",
        liveUrl: "#",
        status: "In Development",
        difficulty: "Nightmare"
    },
    {
        id: 3,
        title: "SYNTH_WAVE_AUDIO",
        description: "Browser-based synthesizer and sequencer. Create retro-wave beats using Web Audio API.",
        image: "from-tokyo-red to-tokyo-orange",
        tech: ["Vue", "Web Audio", "Canvas", "Firebase"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Deployed",
        difficulty: "Medium"
    },
    {
        id: 4,
        title: "QUANTUM_TASKS",
        description: "A productivity app that uses quantum-inspired algorithms to optimize your daily schedule.",
        image: "from-tokyo-cyan to-tokyo-blue",
        tech: ["TypeScript", "Node.js", "PostgreSQL", "Docker"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Prototype",
        difficulty: "Easy"
    }
];

interface ProjectsProps {
    filter: string;
    setFilter: (filter: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ filter, setFilter }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    // Derive unique technologies for the filter list
    const uniqueTechs = Array.from(new Set(projects.flatMap(p => p.tech)));
    const allTechs = ['All', ...uniqueTechs.sort()];

    // Filter projects
    const filteredProjects = projects.filter(p => 
        filter === 'All' ? true : p.tech.includes(filter)
    );

    // Safe access to project to prevent crash when switching filters
    // If activeIndex is out of bounds for the new filtered list, default to 0 for this render
    const currentIndex = activeIndex >= filteredProjects.length ? 0 : activeIndex;
    const project = filteredProjects[currentIndex];

    // Reset index when filter changes
    useEffect(() => {
        setActiveIndex(0);
        
        // Quick fade in effect for card when filter changes to signal update
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, 
                { opacity: 0, scale: 0.95 }, 
                { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            );
        }
    }, [filter]);

    // Game loop logic for controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return;
            
            if (e.key === 'ArrowRight') {
                handleNext();
            } else if (e.key === 'ArrowLeft') {
                handlePrev();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex, isAnimating, filteredProjects.length]);

    // Entrance Animation
    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        )
        .fromTo(".hud-element",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
            "-=0.5"
        )
        .fromTo(cardRef.current,
            { y: 100, opacity: 0, rotateX: 20 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: "power3.out" },
            "-=0.3"
        );
    }, []);

    const animateTransition = (direction: 'next' | 'prev', callback: () => void) => {
        setIsAnimating(true);
        const tl = gsap.timeline({
            onComplete: () => {
                callback();
                setIsAnimating(false);
                // Animate In
                gsap.fromTo(cardRef.current,
                    { x: direction === 'next' ? 100 : -100, opacity: 0, scale: 0.8 },
                    { x: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
                );
                
                // Text glitch effect simulation
                gsap.fromTo(detailsRef.current,
                    { opacity: 0, x: -20 },
                    { opacity: 1, x: 0, duration: 0.3, delay: 0.2 }
                );
            }
        });

        // Animate Out
        tl.to(cardRef.current, {
            x: direction === 'next' ? -100 : 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in"
        });
    };

    const handleNext = () => {
        if (isAnimating || filteredProjects.length === 0) return;
        animateTransition('next', () => {
            setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
        });
    };

    const handlePrev = () => {
        if (isAnimating || filteredProjects.length === 0) return;
        animateTransition('prev', () => {
            setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
        });
    };

    // Card Tilt Effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power1.out"
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power1.out"
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen pt-20 pb-12 flex flex-col items-center justify-center relative z-10 overflow-hidden">
            
            {/* HUD Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-24 left-8 text-tokyo-comment/20 font-mono text-xs hud-element">
                    SYSTEM: ONLINE<br/>
                    MODE: EXPLORATION
                </div>
                <div className="absolute top-24 right-8 text-tokyo-comment/20 font-mono text-xs text-right hud-element">
                    COORDS: {filteredProjects.length > 0 ? currentIndex + 1 : 0}/{filteredProjects.length}<br/>
                    FILTER: {filter.toUpperCase()}
                </div>
                
                {/* Grid Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(187,154,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(187,154,247,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            {/* Header */}
            <div className="mb-4 text-center hud-element">
                <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-tokyo-blue via-tokyo-purple to-tokyo-red uppercase">
                    Mission Select
                </h2>
                <div className="w-64 h-1 bg-gradient-to-r from-transparent via-tokyo-purple to-transparent mx-auto mt-2" />
            </div>

            {/* Tech Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-3 max-w-4xl px-4 hud-element">
                <div className="flex items-center gap-2 text-tokyo-comment text-sm mr-2">
                    <Filter size={14} />
                    <span className="font-mono text-xs">FILTER_PROTOCOL:</span>
                </div>
                {allTechs.map(tech => (
                    <button
                        key={tech}
                        onClick={() => setFilter(tech)}
                        className={`
                            px-3 py-1 text-xs font-mono border rounded transition-all duration-300 relative overflow-hidden group
                            ${filter === tech 
                                ? 'bg-tokyo-purple/20 border-tokyo-purple text-tokyo-purple shadow-[0_0_10px_rgba(187,154,247,0.3)]' 
                                : 'border-tokyo-comment/30 text-tokyo-comment hover:border-tokyo-cyan hover:text-tokyo-cyan'
                            }
                        `}
                    >
                        <span className="relative z-10">[{tech}]</span>
                        {filter === tech && <span className="absolute inset-0 bg-tokyo-purple/10 animate-pulse"></span>}
                    </button>
                ))}
            </div>

            {/* Main Carousel Area */}
            <div className="relative w-full max-w-6xl flex items-center justify-center px-4 md:px-12 gap-8">
                
                {filteredProjects.length > 0 && project ? (
                    <>
                        {/* Left Button */}
                        <button 
                            onClick={handlePrev}
                            className="hidden md:flex p-4 rounded-full border border-tokyo-comment/30 text-tokyo-comment hover:text-tokyo-purple hover:border-tokyo-purple transition-all duration-300 hud-element group"
                        >
                            <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                        </button>

                        {/* Main Card */}
                        <div 
                            className="perspective-1000 w-full max-w-4xl"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div 
                                ref={cardRef}
                                className="bg-tokyo-bg_dark/80 backdrop-blur-md border border-tokyo-purple/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(187,154,247,0.15)] flex flex-col md:flex-row h-auto md:h-[500px] relative group"
                            >
                                {/* Decorative Corner lines */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-tokyo-cyan rounded-tl-xl opacity-50" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-tokyo-cyan rounded-br-xl opacity-50" />

                                {/* Image Section */}
                                <div className={`w-full md:w-1/2 h-64 md:h-full bg-gradient-to-br ${project.image} relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Gamepad2 size={64} className="text-white/20" />
                                    </div>
                                    
                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-tokyo-bg/80 backdrop-blur text-xs font-bold rounded border border-tokyo-white/10 text-tokyo-fg uppercase tracking-wider">
                                        {project.status}
                                    </div>

                                    {/* Difficulty Rating */}
                                    <div className="absolute bottom-4 left-4 flex gap-1">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-2 h-6 rounded-sm skew-x-12 ${
                                                    i < ['Easy', 'Medium', 'Hard', 'Nightmare'].indexOf(project.difficulty) + 1 
                                                        ? 'bg-tokyo-red' 
                                                        : 'bg-tokyo-comment/20'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div ref={detailsRef} className="w-full md:w-1/2 p-8 flex flex-col relative bg-tokyo-bg_dark">
                                    <div className="flex-grow">
                                        <h3 className="text-3xl font-bold mb-2 text-tokyo-blue font-mono">{project.title}</h3>
                                        <div className="h-1 w-12 bg-tokyo-cyan mb-6" />
                                        
                                        <p className="text-tokyo-fg/80 leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        <div className="mb-6">
                                            <h4 className="text-xs uppercase text-tokyo-comment tracking-wider mb-3">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(tech => (
                                                    <span key={tech} className="px-2 py-1 text-xs font-mono border border-tokyo-purple/30 text-tokyo-purple rounded bg-tokyo-purple/5">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="pt-6 border-t border-tokyo-comment/10 flex gap-4 mt-auto">
                                        <button className="flex-1 py-3 bg-tokyo-blue text-tokyo-bg font-bold rounded hover:bg-tokyo-cyan transition-colors flex items-center justify-center gap-2 group/btn">
                                            <Play size={18} className="fill-current group-hover/btn:scale-110 transition-transform" />
                                            LAUNCH
                                        </button>
                                        <button className="flex-1 py-3 border border-tokyo-comment/30 text-tokyo-fg font-bold rounded hover:bg-tokyo-comment/10 transition-colors flex items-center justify-center gap-2">
                                            <Github size={18} />
                                            SOURCE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Button */}
                        <button 
                            onClick={handleNext}
                            className="hidden md:flex p-4 rounded-full border border-tokyo-comment/30 text-tokyo-comment hover:text-tokyo-purple hover:border-tokyo-purple transition-all duration-300 hud-element group"
                        >
                            <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </>
                ) : (
                    <div className="h-[500px] flex flex-col items-center justify-center text-tokyo-comment border border-tokyo-comment/20 rounded-xl w-full max-w-4xl bg-tokyo-bg_dark/50">
                        <Gamepad2 size={48} className="mb-4 opacity-50" />
                        <h3 className="text-xl font-bold mb-2">NO MISSIONS FOUND</h3>
                        <p className="font-mono text-sm">TRY DIFFERENT FILTER PROTOCOLS</p>
                    </div>
                )}
            </div>

            {/* Mobile Navigation Controls */}
            {filteredProjects.length > 0 && (
                <div className="flex md:hidden gap-8 mt-8">
                    <button 
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-tokyo-comment/30 text-tokyo-comment active:bg-tokyo-comment/10"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex items-center text-tokyo-comment font-mono text-sm">
                        {currentIndex + 1} / {filteredProjects.length}
                    </div>
                    <button 
                        onClick={handleNext}
                        className="p-3 rounded-full border border-tokyo-comment/30 text-tokyo-comment active:bg-tokyo-comment/10"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}

            {/* Keyboard Hint */}
            <div className="absolute bottom-8 text-tokyo-comment/40 text-xs font-mono flex items-center gap-2 animate-pulse hud-element">
                <span className="border border-tokyo-comment/30 px-1 rounded">←</span>
                <span className="border border-tokyo-comment/30 px-1 rounded">→</span>
                TO NAVIGATE
            </div>

        </div>
    );
};

export default Projects;
