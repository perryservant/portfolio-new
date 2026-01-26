import { useState, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import ScrollPort from '../components/ScrollPort';
import Clock from '../components/Clock';
import Marquee from "react-fast-marquee";
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

interface OutletContext {
    isLoaded: boolean;
}

const Home = () => {
    const { isLoaded } = useOutletContext<OutletContext>();

    const [activeIndex, setActiveIndex] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const sections = [
        { id: 0, label: 'About', full: 'Full-stack Developer' },
        { id: 1, label: 'Skills', full: 'Core Competencies' },
        { id: 2, label: 'Work', full: 'Highlighted Projects' },
        { id: 3, label: 'Expertise', full: 'Skills & Expertise' }
    ];

    const currentYear = new Date().getFullYear();

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {/* Hero Section */}
            <div className="relative flex-1 min-h-0 flex flex-col">
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
                    <div className="absolute top-[20%] left-[10%] text-[300px] font-bold uppercase font-grotesk-mono whitespace-nowrap">
                        NOVELLUM
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                    {/* Top Navigation Tabs */}
                    <div className="px-[50px] pt-[70px] pb-[35px] max-[820px]:px-[20px] max-[820px]:pt-[220px] max-[820px]:pb-[20px] pl-[380px] max-[1200px]:pl-[350px] max-[1024px]:pl-[50px]">
                        <div className="flex gap-[30px] items-center flex-wrap max-[820px]:gap-[15px]">
                            {sections.map((section, idx) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveIndex(section.id)}
                                    className={`relative text-[13px] uppercase font-medium transition-all duration-300 pb-[8px] ${
                                        activeIndex === section.id
                                            ? 'text-[rgb(154,207,41)]'
                                            : 'text-black hover:text-gray-600'
                                    }`}
                                >
                                    {section.label}
                                    {activeIndex === section.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(154,207,41)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-h-0 px-[50px] pb-[40px] max-[820px]:px-[20px] max-[820px]:pb-[30px] pl-[380px] max-[1200px]:pl-[350px] max-[1024px]:pl-[50px]">
                        <div className="h-full flex max-[1200px]:flex-col">
                            {/* Left Side - Intro Text */}
                            <div className="w-[380px] flex flex-col justify-center pr-[50px] max-[1200px]:w-full max-[1200px]:pr-0 max-[1200px]:mb-[40px] max-[1200px]:text-center max-[1024px]:hidden">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h1 className="text-6xl font-medium uppercase mb-[25px] leading-tight">
                                        Full-Stack<br/>Engineer
                                    </h1>
                                    <p className="font-grotesk text-[14px] leading-relaxed text-gray-700 mb-[35px]">
                                        Building modern web applications with clean code, 
                                        scalable architecture, and thoughtful design.
                                    </p>
                                    <Link
                                        to="/projects"
                                        className="inline-block bg-black text-white px-[28px] py-[10px] text-[11px] uppercase font-medium hover:bg-[rgb(154,207,41)] hover:text-black transition-all duration-300"
                                    >
                                        View Work
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Right Side - Scrollable Content */}
                            <div 
                                ref={containerRef}
                                className="flex-1 h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[1200px]:w-full"
                            >
                                {isLoaded && (
                                    <ScrollPort 
                                        activeIndex={activeIndex} 
                                        setActiveIndex={setActiveIndex}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Footer with Marquee */}
            <div className="border-t-2 border-black">
                <div className="min-h-[60px] flex items-center justify-between px-[50px] max-[820px]:px-[20px] max-[430px]:px-[15px] max-[430px]:flex-col max-[430px]:justify-center max-[430px]:py-[15px] max-[430px]:gap-[10px]">
                    <div className="flex items-center gap-[30px] max-[820px]:gap-[20px] max-[430px]:flex-col max-[430px]:gap-[10px] max-[430px]:w-full max-[430px]:items-center">
                        <p className="text-[11px] uppercase font-medium whitespace-nowrap max-[430px]:text-[10px]">
                            © copyright {currentYear} perry servant
                        </p>
                        <div className="max-[430px]:hidden">
                            <p>{'///////////////////////////////////////////////////'}</p>
                        </div>
                        <div className="flex items-center gap-[20px] max-[430px]:gap-[12px]">
                            <a 
                                href="mailto:perry@perryservant.com"
                                className="text-[11px] uppercase font-medium hover:text-[rgb(154,207,41)] transition-colors duration-300 max-[430px]:text-[10px]"
                            >
                                perry@perryservant.com
                            </a>
                            <a 
                                href="https://github.com/perryservant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-[30px] h-[30px] border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex-shrink-0 max-[430px]:w-[26px] max-[430px]:h-[26px]"
                                aria-label="GitHub"
                            >
                                <FaGithub className="text-[16px] max-[430px]:text-[13px]" />
                            </a>
                            <Clock/>
                        </div>
                    </div>
                </div>
                
                <div className="h-[40px] max-[430px]:h-[30px] flex border-t border-black overflow-hidden opacity-60">
                    <Marquee autoFill={true} speed={40}>
                        <p className="text-[11px] max-[430px]:text-[8px] uppercase font-medium text-gray-600">
                            React • Node.js • PostgreSQL • Full-Stack Engineering • Engine Building • UI/UX Design • Architecture • TypeScript
                        </p>
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default Home;
