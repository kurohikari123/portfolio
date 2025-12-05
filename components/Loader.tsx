import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Terminal, Power, Check } from 'lucide-react';

const codeLines = [
    "> initializing_kernel...",
    "> loading_modules: [react, three, gsap]...",
    "> verifying_integrity... OK",
    "> optimizing_assets... OK",
    "> establishing_secure_connection...",
    "> access_target: PORTFOLIO_V1",
];

interface LoaderProps {
    onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Typing Effect
    useEffect(() => {
        if (currentLineIndex >= codeLines.length) {
            setIsTypingComplete(true);
            return;
        }

        const currentLine = codeLines[currentLineIndex];
        
        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                // Update lines array: replace the last line or add new one
                setLines(prev => {
                    const newLines = [...prev];
                    if (newLines.length <= currentLineIndex) {
                        newLines.push(currentLine[charIndex]);
                    } else {
                        newLines[currentLineIndex] = currentLine.substring(0, charIndex + 1);
                    }
                    return newLines;
                });
                setCharIndex(prev => prev + 1);
            }, Math.random() * 30 + 20); // Random typing speed

            return () => clearTimeout(timeout);
        } else {
            // Line complete, move to next
            const timeout = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCharIndex(0);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [currentLineIndex, charIndex]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const handleEnter = () => {
        setIsExiting(true);

        const tl = gsap.timeline({
            onComplete: () => {
                onComplete();
            }
        });

        // Exit sequence
        tl.to(".loader-content", {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in"
        })
        .to(containerRef.current, {
            scaleY: 0.01,
            duration: 0.4,
            ease: "power3.inOut"
        })
        .to(containerRef.current, {
            scaleX: 0,
            duration: 0.4,
            ease: "power3.inOut"
        });
    };

    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-50 bg-tokyo-bg flex items-center justify-center p-4"
        >
            <div className="loader-content w-full max-w-2xl relative">
                {/* Terminal Window */}
                <div className="bg-tokyo-bg_dark rounded-lg border border-tokyo-comment/30 shadow-2xl overflow-hidden font-mono">
                    {/* Terminal Header */}
                    <div className="bg-tokyo-bg border-b border-tokyo-comment/30 px-4 py-2 flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-tokyo-red/80" />
                            <div className="w-3 h-3 rounded-full bg-tokyo-yellow/80" />
                            <div className="w-3 h-3 rounded-full bg-tokyo-green/80" />
                        </div>
                        <div className="ml-4 text-xs text-tokyo-comment flex items-center gap-1">
                            <Terminal size={12} />
                            root@portfolio:~
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div 
                        ref={terminalRef}
                        className="p-6 h-64 overflow-y-auto text-sm md:text-base space-y-1"
                    >
                        {lines.map((line, i) => (
                            <div key={i} className="text-tokyo-fg">
                                <span className="text-tokyo-green mr-2">➜</span>
                                <span className={line.includes("ERROR") ? "text-tokyo-red" : line.includes("OK") || line.includes("SUCCESS") ? "text-tokyo-blue" : "text-tokyo-fg"}>
                                    {line}
                                </span>
                            </div>
                        ))}
                        <div className="text-tokyo-fg animate-pulse">
                            <span className="text-tokyo-green mr-2">➜</span>
                            <span className="w-2 h-4 bg-tokyo-fg inline-block align-middle" />
                        </div>
                    </div>

                    {/* Footer / Action Area */}
                    <div className="border-t border-tokyo-comment/30 p-4 bg-tokyo-bg/50">
                        {isTypingComplete && !isExiting ? (
                            <div className="flex flex-col items-center gap-4 animate-[fadeIn_0.5s_ease-out]">
                                <div className="text-tokyo-cyan text-sm mb-2">
                                    [ System Ready ]
                                </div>
                                <button
                                    onClick={handleEnter}
                                    className="group relative px-8 py-3 bg-tokyo-blue/10 text-tokyo-blue border border-tokyo-blue rounded hover:bg-tokyo-blue hover:text-tokyo-bg transition-all duration-300 font-bold tracking-wider uppercase flex items-center gap-2 overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Power size={18} />
                                        Initialize System
                                    </span>
                                    <div className="absolute inset-0 bg-tokyo-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                                </button>
                            </div>
                        ) : isExiting ? (
                            <div className="flex items-center justify-center h-[58px] text-tokyo-green font-bold tracking-widest gap-2">
                                <Check size={20} />
                                ACCESS GRANTED
                            </div>
                        ) : (
                            <div className="h-[58px] flex items-center justify-center text-tokyo-comment/50 text-sm">
                                // Compiling resources...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loader;