import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Send, Terminal, AlertCircle, CheckCircle2, X } from 'lucide-react';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const alertRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Entry animation
        gsap.fromTo(containerRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
        
        const lines = formRef.current?.children;
        if (lines) {
            gsap.fromTo(lines,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.3 }
            );
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });

        // Animate success alert
        if (alertRef.current) {
            gsap.fromTo(alertRef.current,
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
            );
        }
    };

    return (
        <section className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
            
            <div ref={containerRef} className="w-full max-w-3xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="text-tokyo-blue">contact</span>.<span className="text-tokyo-yellow">ts</span>
                    </h1>
                    <p className="text-tokyo-comment font-mono text-sm">Let's build something amazing together.</p>
                </div>

                {/* Editor Window */}
                <div className="bg-tokyo-bg_dark rounded-lg overflow-hidden border border-tokyo-comment/20 shadow-2xl relative">
                    
                    {/* Window Controls */}
                    <div className="bg-tokyo-bg border-b border-tokyo-comment/20 px-4 py-2 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-tokyo-red" />
                            <div className="w-3 h-3 rounded-full bg-tokyo-yellow" />
                            <div className="w-3 h-3 rounded-full bg-tokyo-green" />
                        </div>
                        <div className="text-xs text-tokyo-comment font-mono">contact.tsx</div>
                        <div className="w-16"></div> {/* Spacer for centering */}
                    </div>

                    {/* Code Area */}
                    <div className="p-6 md:p-8 font-mono text-sm md:text-base overflow-x-auto">
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-1">
                            
                            {/* Line 1 */}
                            <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">1</span>
                                <span className="text-tokyo-purple">import</span>
                                <span className="text-tokyo-fg mx-2">{'{'}</span>
                                <span className="text-tokyo-red">send</span>
                                <span className="text-tokyo-fg mx-2">{'}'}</span>
                                <span className="text-tokyo-purple">from</span>
                                <span className="text-tokyo-green mx-2">'@/lib/email'</span>;
                            </div>

                            {/* Line 2 */}
                            <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">2</span>
                                <span>&nbsp;</span>
                            </div>

                            {/* Line 3 */}
                            <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">3</span>
                                <span className="text-tokyo-purple">const</span>
                                <span className="text-tokyo-blue mx-2">message</span>
                                <span className="text-tokyo-cyan">=</span>
                                <span className="text-tokyo-yellow mx-2">{'{'}</span>
                            </div>

                            {/* Line 4 - Name Input */}
                            <div className="flex items-center group">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">4</span>
                                <span className="ml-4 md:ml-8 text-tokyo-red">name</span>:
                                <span className="text-tokyo-green ml-2">"</span>
                                <input 
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="bg-transparent border-none outline-none text-tokyo-green w-full max-w-[200px] placeholder-tokyo-comment/50 focus:bg-tokyo-comment/10 rounded px-1"
                                    autoComplete="off"
                                />
                                <span className="text-tokyo-green">"</span>,
                            </div>

                            {/* Line 5 - Email Input */}
                            <div className="flex items-center group">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">5</span>
                                <span className="ml-4 md:ml-8 text-tokyo-red">email</span>:
                                <span className="text-tokyo-green ml-2">"</span>
                                <input 
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="email@example.com"
                                    className="bg-transparent border-none outline-none text-tokyo-green w-full max-w-[250px] placeholder-tokyo-comment/50 focus:bg-tokyo-comment/10 rounded px-1"
                                    autoComplete="off"
                                />
                                <span className="text-tokyo-green">"</span>,
                            </div>

                            {/* Line 6 - Message Input */}
                            <div className="flex items-start group pt-1">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">6</span>
                                <span className="ml-4 md:ml-8 text-tokyo-red">content</span>:
                                <span className="text-tokyo-green ml-2">`</span>
                            </div>
                            
                            {/* Line 7 - Textarea */}
                            <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">7</span>
                                <textarea 
                                    name="message"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Type your message here..."
                                    className="ml-4 md:ml-8 bg-transparent border-none outline-none text-tokyo-green w-full placeholder-tokyo-comment/50 focus:bg-tokyo-comment/10 rounded px-1 resize-none"
                                />
                            </div>

                            {/* Line 8 */}
                            <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">8</span>
                                <span className="ml-4 md:ml-8 text-tokyo-green">`</span>
                            </div>

                            {/* Line 9 */}
                            <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">9</span>
                                <span className="text-tokyo-yellow">{'}'}</span>;
                            </div>

                             {/* Line 10 */}
                             <div className="flex">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">10</span>
                                <span>&nbsp;</span>
                            </div>

                            {/* Line 11 - Submit Button */}
                            <div className="flex items-center pt-2">
                                <span className="text-tokyo-comment w-6 md:w-8 text-right mr-4 select-none opacity-50">11</span>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="ml-4 md:ml-8 group flex items-center gap-2 px-4 py-2 bg-tokyo-blue/10 text-tokyo-blue border border-tokyo-blue/50 rounded hover:bg-tokyo-blue hover:text-tokyo-bg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="font-bold">await</span>
                                    <span>send(message);</span>
                                    {isSubmitting ? (
                                        <span className="animate-spin ml-2">⟳</span>
                                    ) : (
                                        <Send size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Success Alert Modal */}
                {showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowSuccess(false)}>
                        <div 
                            ref={alertRef}
                            onClick={e => e.stopPropagation()}
                            className="bg-tokyo-bg border border-tokyo-green rounded-lg shadow-[0_0_50px_rgba(158,206,106,0.2)] max-w-md w-full overflow-hidden"
                        >
                            <div className="bg-tokyo-green/10 border-b border-tokyo-green/20 px-4 py-2 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-tokyo-green font-bold">
                                    <Terminal size={16} />
                                    <span>System Notification</span>
                                </div>
                                <button onClick={() => setShowSuccess(false)} className="text-tokyo-comment hover:text-tokyo-fg transition-colors">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="p-6 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-tokyo-green/20 flex items-center justify-center mb-4 text-tokyo-green">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-tokyo-fg mb-2">Message Transmitted</h3>
                                <div className="text-tokyo-comment font-mono text-sm bg-tokyo-bg_dark p-3 rounded w-full text-left mb-4">
                                    <div className="flex justify-between">
                                        <span>status:</span>
                                        <span className="text-tokyo-green">200 OK</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>timestamp:</span>
                                        <span>{new Date().toLocaleTimeString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>recipient:</span>
                                        <span className="text-tokyo-blue">dev.portfolio</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setShowSuccess(false)}
                                    className="px-6 py-2 bg-tokyo-green text-tokyo-bg font-bold rounded hover:bg-tokyo-green/90 transition-colors"
                                >
                                    Acknowledge
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Contact;