import { useState, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';
import ScrollPort from '../components/ScrollPort';
import { motion } from 'framer-motion';

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

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {/* Hero Section */}
            <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden" style={{ height: '100%' }}>
                {/* Background Pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02] overflow-hidden max-[820px]:overflow-hidden">
                    <div className="absolute top-[20%] text-[300px] font-bold uppercase font-grotesk-mono whitespace-nowrap max-[820px]:text-[150px] max-[430px]:text-[100px] max-[820px]:top-[30%]">
                        NOVELLUM
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-1 flex flex-col h-full">
                    {/* Top Navigation Tabs */}
                    <div className="px-[50px] pt-[70px] max-[1200px]:pl-[350px] max-[1024px]:pl-[50px] max-[820px]:px-[20px] max-[820px]:pt-[220px]">
                        <div className="ml-[350px] absolute top-[210px] flex gap-[30px] items-center flex-wrap max-[820px]:ml-[0px] max-[820px]:static max-[820px]:gap-[15px] max-[820px]:justify-center">
                            {sections.map((section, idx) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveIndex(section.id)}
                                    className={`relative text-[13px] uppercase font-medium transition-all duration-300 pb-[8px] ${
                                        activeIndex === section.id
                                            ? 'text-[rgb(207,171,41)]'
                                            : 'text-black hover:text-gray-600'
                                    }`}
                                >
                                    {section.label}
                                    {activeIndex === section.id && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(207,171,41)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-h-0 flex mt-[150px] px-[50px] pb-[40px] max-[1200px]:pl-[350px] max-[1024px]:pl-[50px] max-[820px]:px-[20px] max-[820px]:mt-[0px] max-[820px]:pb-[20px] max-[820px]:flex max-[820px]:items-center max-[820px]:justify-center max-[820px]:pt-0 max-[820px]:overflow-hidden">
                        <div className="h-full w-full flex items-center max-[1200px]:flex-col max-[1200px]:items-center max-[820px]:h-full max-[820px]:justify-center max-[820px]:overflow-hidden">
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
                                className="flex-1 h-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[1200px]:w-full max-[820px]:h-full max-[820px]:max-h-[calc(100vh-320px)]"
                                style={{ height: '100%' }}
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
        </div>
    );
};

export default Home;
