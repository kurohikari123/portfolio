
export type ViewType = 'home' | 'contact' | 'projects';

export interface Skill {
  name: string;
  icon: string; // Lucide icon name or simple string identifier
  level: number;
  category: 'Language' | 'Framework' | 'Tool';
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
}

export interface NavItem {
  label: string;
  href: string; // Used for ID reference
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // URL or gradient class
  tech: string[];
  githubUrl: string;
  liveUrl: string;
  status: 'Deployed' | 'In Development' | 'Prototype';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Nightmare';
}
