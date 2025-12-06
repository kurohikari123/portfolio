import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Experience as ExperienceType } from '../types';

const experiences: ExperienceType[] = [
    {
        id: 1,
        role: "Full Stack Developer",
        company: "GeekWorkx Technologies",
        period: "2025 - Present",
        description: [
            "Designed and optimized client websites and pages",
            "Maintined and developed CMS dashboards",
            "Implemented fast and dynamic frontend development using PHP"
        ],
        tech: ["PHP", "TypeScript", "JavaScript", "SQL"]
    },
    {
        id: 2,
        role: "Research Intern",
        company: "NESAC",
        period: "2024- 2025",
        description: [
            "Created a Deep Learning Model for segmentation/classification",
            "Handled research and documentation",
            "Integrated deep learning framweworks with tuning",
            "Accomdated small scale testing on limited hardware"
        ],
        tech: ["Python", "Tensorflow", "Pytorch"]
    },
    {
        id: 3,
        role: "Junior Web Intern",
        company: "GeekWorkx Technologies",
        period: "2022 - 2023",
        description: [
            "Developed responsive landing pages for clients",
            "Optimized assets and improved SEO scores",
            "Maintained legacy CMS systems"
        ],
        tech: ["HTML/CSS", "JavaScript", "SQL", "PHP"]
    }
];

const Experience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (containerRef.current) {
            const items = containerRef.current.querySelectorAll('.exp-item');
            
            items.forEach((item, i) => {
                gsap.fromTo(item,
                    { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.8, ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                        }
                    }
                );
            });
        }
    }, []);

    return (
        <section id="experience" className="py-24 relative z-10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-12 text-center">
                    <span className="text-tokyo-green">git</span> log --experience
                </h2>

                <div ref={containerRef} className="space-y-12 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-tokyo-comment/20 transform -translate-x-1/2 hidden md:block" />

                    {experiences.map((exp, index) => (
                        <div key={exp.id} className={`exp-item relative flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* Dot on line */}
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-tokyo-bg border-2 border-tokyo-purple rounded-full transform -translate-x-1/2 mt-1.5 z-10 hidden md:block shadow-[0_0_10px_#bb9af7]" />

                            {/* Content */}
                            <div className="flex-1">
                                <div className="bg-tokyo-bg_dark border border-tokyo-comment/20 p-6 rounded-lg hover:border-tokyo-purple/50 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-tokyo-fg group-hover:text-tokyo-purple transition-colors">
                                            {exp.role}
                                        </h3>
                                        <span className="text-sm font-mono text-tokyo-comment bg-tokyo-bg px-2 py-1 rounded">
                                            {exp.period}
                                        </span>
                                    </div>
                                    <h4 className="text-tokyo-blue mb-4 text-sm font-mono">@{exp.company}</h4>
                                    
                                    <ul className="space-y-2 mb-6">
                                        {exp.description.map((desc, i) => (
                                            <li key={i} className="text-tokyo-comment text-sm flex items-start gap-2">
                                                <span className="text-tokyo-green mt-1">➜</span>
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap gap-2">
                                        {exp.tech.map((t) => (
                                            <span key={t} className="text-xs font-mono px-2 py-1 bg-tokyo-blue/10 text-tokyo-blue rounded border border-tokyo-blue/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Spacer for the other side */}
                            <div className="flex-1 hidden md:block" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
