import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Database, Globe, Layers, Server, Cpu } from 'lucide-react';
import { Skill } from '../types';

const skillsData: Skill[] = [
    { name: 'React / Next.js', icon: 'Globe', level: 95, category: 'Framework' },
    { name: 'TypeScript', icon: 'Code', level: 90, category: 'Language' },
    { name: 'Node.js', icon: 'Server', level: 85, category: 'Framework' },
    { name: 'Tailwind CSS', icon: 'Layers', level: 95, category: 'Tool' },
    { name: 'PostgreSQL', icon: 'Database', level: 80, category: 'Tool' },
    { name: 'Three.js / R3F', icon: 'Cpu', level: 75, category: 'Framework' },
];

const getIcon = (name: string) => {
    switch(name) {
        case 'Globe': return <Globe size={32} />;
        case 'Code': return <Code size={32} />;
        case 'Server': return <Server size={32} />;
        case 'Layers': return <Layers size={32} />;
        case 'Database': return <Database size={32} />;
        case 'Cpu': return <Cpu size={32} />;
        default: return <Code size={32} />;
    }
};

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = containerRef.current?.children;

    if (cards && titleRef.current) {
        gsap.fromTo(titleRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 1,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                }
            }
        );

        gsap.fromTo(cards, 
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                }
            }
        );
    }
  }, []);

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
            <h2 ref={titleRef} className="text-4xl font-bold mb-4">
                <span className="text-tokyo-purple">const</span> <span className="text-tokyo-blue">skills</span> = {'['}
            </h2>
            <p className="text-tokyo-comment font-mono">My technical stack and proficiency</p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill, index) => (
                <div 
                    key={skill.name}
                    className="group relative bg-tokyo-bg_dark border border-tokyo-comment/20 rounded-lg p-6 hover:border-tokyo-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(125,207,255,0.1)] overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                        {getIcon(skill.icon)}
                    </div>
                    
                    <div className="relative z-10">
                        <div className="text-tokyo-blue mb-4 group-hover:text-tokyo-cyan transition-colors">
                            {getIcon(skill.icon)}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                        <div className="flex items-center justify-between text-sm text-tokyo-comment mb-3">
                            <span>{skill.category}</span>
                            <span>{skill.level}%</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-tokyo-bg rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-tokyo-blue to-tokyo-purple transform origin-left transition-transform duration-1000 ease-out scale-x-0 group-hover:scale-x-100"
                                style={{ width: `${skill.level}%`, transformOrigin: 'left' }}
                            />
                        </div>
                    </div>

                    {/* Code snippet decoration */}
                    <div className="mt-4 pt-4 border-t border-tokyo-comment/10 text-xs text-tokyo-comment font-mono opacity-50">
                        {'<'}Component type="{skill.category}" {'/>'}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center mt-12 text-4xl font-bold text-tokyo-comment opacity-50">
            {'];'}
        </div>
      </div>
    </section>
  );
};

export default Skills;