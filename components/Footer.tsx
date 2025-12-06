import React from 'react';
import { Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-tokyo-bg_dark pt-24 pb-12 overflow-hidden">
        {/* Top Border Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tokyo-blue via-tokyo-purple to-tokyo-red opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Let's work <br />
                        <span className="text-tokyo-blue">together.</span>
                    </h2>
                    <p className="text-tokyo-comment text-lg max-w-md">
                        Currently working in GeekWorkx Technlogies as a Full Stack Developer.                     </p>
                </div>
                
                <div className="flex flex-col justify-center items-start md:items-end space-y-4">
                    <a href="mailto:email@example.com" className="group flex items-center gap-4 text-2xl font-bold hover:text-tokyo-blue transition-colors">
                        <span className="w-12 h-12 rounded-full border border-tokyo-comment/30 flex items-center justify-center group-hover:border-tokyo-blue group-hover:bg-tokyo-blue/10 transition-all">
                            <Mail size={20} />
                        </span>
                       patrickkharmujai123@gmail.com 
                    </a>
                </div>
            </div>

            <div className="border-t border-tokyo-comment/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex gap-6">
                    <a href="https://github.com/kurohikari123" className="text-tokyo-comment hover:text-tokyo-fg transition-colors transform hover:-translate-y-1 duration-200">
                        <Github />
                    </a>
                    <a href="#" className="text-tokyo-comment hover:text-tokyo-fg transition-colors transform hover:-translate-y-1 duration-200">
                        <Linkedin />
                    </a>
                    {/* <a href="#" className="text-tokyo-comment hover:text-tokyo-fg transition-colors transform hover:-translate-y-1 duration-200"> */}
                    {/*     <Twitter /> */}
                    {/* </a> */}
                </div>

                <div className="text-tokyo-comment text-sm flex items-center gap-2">
                    <span>© {new Date().getFullYear()} Made by</span>
                    <Heart size={14} className="text-tokyo-red fill-current animate-pulse" />
                    <span>Patrick Kharmujai</span>
                </div>
            </div>
        </div>
        
        {/* Background Text Decoration */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
            <div className="text-[20rem] font-bold whitespace-nowrap leading-none text-tokyo-fg translate-y-1/3">
                CREATIVE
            </div>
        </div>
    </footer>
  );
};

export default Footer;
