import { useEffect, useState } from 'react';
import { mockApi, Project } from '../data/mockData';
import Clock from '../components/Clock';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";
import { FaGithub } from 'react-icons/fa';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const fetchProjectsData = async () => {
        try {
            const data = await mockApi.getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjectsData();
    }, []);

    const languageColors: Record<string, string> = {
        JS: "text-[rgb(242,167,6)] border-[rgb(242,167,6)]",
        RCT: "text-[rgb(6,116,242)] border-[rgb(6,116,242)]",
        NODE: "text-[rgb(31,176,2)] border-[rgb(31,176,2)]",
        PY: "text-purple-600 border-purple-600"
    };

    const currentYear = new Date().getFullYear();

    return (
        <div className="h-full w-full flex flex-col pb-[env(safe-area-inset-bottom)]">
            {/* Main Content */}
            <div className="flex-1 min-h-0 overflow-y-auto max-[820px]:overflow-y-scroll">
                <div className="w-full h-full relative">
                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
                        <div className="absolute top-[20%] left-[10%] text-[250px] font-bold uppercase font-grotesk-mono whitespace-nowrap">
                            PORTFOLIO
                        </div>
                    </div>

                    <div className="relative z-10 px-[60px] py-[80px] max-[1024px]:px-[40px] max-[820px]:px-[20px] max-[820px]:pt-[220px]">
                        {/* Intro Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="mb-[100px] max-[820px]:mb-[60px]"
                        >
                            <div className="flex items-end gap-[30px] mb-[15px]">
                                <span className="text-[120px] font-bold text-gray-100 font-grotesk-mono leading-none max-[1024px]:text-[80px] max-[820px]:text-[60px]">
                                    {String(projects.length).padStart(2, '0')}
                                </span>
                                <div>
                                    <h1 className="text-5xl font-medium uppercase mb-[10px] max-[1024px]:text-4xl max-[820px]:text-3xl">
                                        Projects
                                    </h1>
                                    <p className="font-grotesk text-[13px] text-gray-600 max-w-[400px]">
                                        Exploring the intersection of design and technology
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Projects - Asymmetric Grid */}
                        <div className="grid grid-cols-2 gap-[40px] max-[1024px]:grid-cols-1 max-[1024px]:gap-[30px]">
                            {projects.map((project, index) => {
                                const isHovered = hoveredIndex === index;
                                const isLarge = index === 0; // First project is larger
                                
                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={isLarge ? 'col-span-2 max-[1024px]:col-span-1' : ''}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <Link to={`/projectpage/${project.id}`}>
                                            <div className="group cursor-pointer h-full">
                                                {/* Card Container */}
                                                <div className="bg-white/30 backdrop-blur-[1px] border-2 border-black rounded overflow-hidden transition-all duration-300 hover:bg-white/50 hover:border-[rgb(154,207,41)] h-full flex flex-col">
                                                    {/* Image Section */}
                                                    <div className={`relative overflow-hidden ${isLarge ? 'h-[400px]' : 'h-[280px]'} max-[1024px]:h-[250px]`}>
                                                        <motion.img 
                                                            src={`/${project.photos?.[0]}`}
                                                            alt={project.name}
                                                            className="w-full h-full object-cover"
                                                            animate={{
                                                                scale: isHovered ? 1.05 : 1
                                                            }}
                                                            transition={{ duration: 0.4 }}
                                                        />
                                                        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-300 ${
                                                            isHovered ? 'opacity-100' : 'opacity-0'
                                                        }`}></div>
                                                        
                                                        {/* Project Number Overlay */}
                                                        <div className="absolute top-[20px] left-[20px]">
                                                            <span className="text-[80px] font-bold text-white/20 font-grotesk-mono leading-none max-[1024px]:text-[60px]">
                                                                {String(index + 1).padStart(2, '0')}
                                                            </span>
                                                        </div>

                                                        {/* Hover Text */}
                                                        <div className={`absolute bottom-[20px] left-[20px] right-[20px] transition-opacity duration-300 ${
                                                            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                                                        }`}>
                                                            <span className="text-white text-lg uppercase font-medium">
                                                                View Project →
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="p-[25px] flex-1 flex flex-col justify-between max-[1024px]:p-[20px]">
                                                        <div>
                                                            <div className="flex items-start justify-between mb-[12px]">
                                                                <h2 className="text-2xl font-medium uppercase max-[1024px]:text-xl">
                                                                    {project.name}
                                                                </h2>
                                                                <span className="text-[10px] uppercase text-gray-500 font-grotesk-mono whitespace-nowrap ml-[15px]">
                                                                    {project.project_type}
                                                                </span>
                                                            </div>
                                                            
                                                            <p className="font-grotesk text-[12px] leading-relaxed text-gray-700 mb-[18px] line-clamp-2">
                                                                {project.description}
                                                            </p>

                                                            {/* Tech Tags */}
                                                            <div className="flex gap-[6px] flex-wrap">
                                                                {project.language_used?.map((lang, idx) => (
                                                                    <span 
                                                                        key={idx} 
                                                                        className={`font-grotesk px-[8px] py-[3px] text-[10px] uppercase border ${languageColors[lang.toUpperCase()] || 'text-gray-600 border-gray-600'}`}
                                                                    >
                                                                        {lang}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Client Name */}
                                                        <div className="mt-[15px] pt-[15px] border-t border-black/20">
                                                            <span className="text-[10px] uppercase text-gray-400 font-grotesk-mono">
                                                                {project.client_name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Footer with Marquee */}
            <div className="border-t-2 border-black">
                <div className="min-h-[60px] flex items-center justify-between px-[50px] max-[820px]:px-[20px] max-[430px]:px-[15px] max-[430px]:flex-col max-[430px]:justify-center max-[430px]:py-[15px] max-[430px]:gap-[10px]">
                    <div className="flex items-center gap-[30px] max-[820px]:gap-[20px] max-[430px]:flex-col max-[430px]:gap-[10px] max-[430px]:w-full max-[430px]:items-center">
                        <p className="text-[11px] uppercase font-medium whitespace-nowrap max-[430px]:text-[9px]">
                            © copyright {currentYear} perry servant
                        </p>
                        <div className="max-[430px]:hidden">
                            <p>///////////////////////////////////////////////////</p>
                        </div>
                        <div className="flex items-center gap-[20px] max-[430px]:gap-[12px]">
                            <a 
                                href="mailto:perry@perryservant.com"
                                className="text-[11px] uppercase font-medium hover:text-[rgb(154,207,41)] transition-colors duration-300 max-[430px]:text-[9px]"
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
            </div>
        </div>
    );
};

export default Projects;
