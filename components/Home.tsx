
import React, { useEffect } from 'react';
import Hero from './Hero';
import Skills from './Skills';
import Experience from './Experience';
import { ViewType } from '../types';

interface HomeProps {
    initialScrollId?: string | null;
    onNavigate?: (view: ViewType, id?: string) => void;
}

const Home: React.FC<HomeProps> = ({ initialScrollId, onNavigate }) => {
    
    useEffect(() => {
        if (initialScrollId) {
            // Small delay to ensure rendering is complete
            setTimeout(() => {
                const element = document.getElementById(initialScrollId.replace('#', ''));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [initialScrollId]);

    return (
        <div className="animate-in fade-in duration-500">
            <Hero onNavigate={onNavigate} />
            <Skills />
            <Experience />
        </div>
    );
};

export default Home;
