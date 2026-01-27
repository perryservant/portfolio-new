import { useEffect, useState } from 'react';
import { mockApi, Project } from '../data/mockData';
import { useProject } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { setSelectedProject } = useProject();

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
        TS: "text-[rgb(27,76,225)] border-[rgb(27,76,225)]",
        RCT: "text-[rgb(6,116,242)] border-[rgb(6,116,242)]",
        NODE: "text-[rgb(31,176,2)] border-[rgb(31,176,2)]",
        FSTFY: "text-[rgb(146,72,238)] border-[rgb(146,72,238)]",
        PY: "text-purple-600 border-purple-600"
    };

    return (
        <div className="h-full w-full flex flex-col pb-[env(safe-area-inset-bottom)]">
            {/* Main Content */}
            <div className="flex-1 min-h-0 overflow-y-auto max-[820px]:overflow-y-scroll">
                <div className="w-full h-full relative">
                    {/* Animated Background Text */}
                    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                        <motion.div
                            initial={{ x: '-10%', y: '-10%' }}
                            animate={{ x: ['-10%', '10%', '-10%'], y: ['-10%', '10%', '-10%'] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute text-[300px] font-bold uppercase font-grotesk-mono text-gray-100/5 whitespace-nowrap"
                        >
                            PORTFOLIO PORTFOLIO PORTFOLIO
                        </motion.div>
                    </div>

                    <div className="relative z-10 px-[80px] py-[100px] max-[1024px]:px-[50px] max-[820px]:px-[20px] max-[820px]:pt-[220px] max-[820px]:py-[50px]">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-[100px] max-[820px]:mb-[60px] pl-[300px] max-[1024px]:pl-0"
                        >
                            <div className="flex items-end justify-between mb-[20px] max-[820px]:flex-col max-[820px]:items-start max-[820px]:gap-[15px]">
                                <div className="flex items-baseline gap-[25px]">
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                        className="text-[140px] font-bold text-black font-grotesk-mono leading-none max-[1024px]:text-[100px] max-[820px]:text-[70px]"
                                    >
                                        {String(projects.length).padStart(2, '0')}
                                    </motion.span>
                                    <div>
                                        <h1 className="text-7xl font-medium uppercase mb-[10px] max-[1024px]:text-6xl max-[820px]:text-4xl">
                                            Selected
                                        </h1>
                                        <h1 className="text-7xl font-medium uppercase max-[1024px]:text-6xl max-[820px]:text-4xl">
                                            Works
                                        </h1>
                                    </div>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="font-grotesk text-[13px] text-gray-600 max-w-[350px] text-right max-[820px]:text-left max-[820px]:max-w-none max-[820px]:text-[12px]"
                                >
                                    <p className="mb-[8px]">
                                        A curated collection of projects that demonstrate technical expertise, creative problem-solving, and modern development practices.
                                    </p>
                                    <p className="text-[11px] text-gray-500">
                                        Each project represents a unique challenge solved through innovative design and robust engineering.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Projects Grid - Creative Layout */}
                        <div className="grid grid-cols-12 gap-[30px] max-[1024px]:grid-cols-6 max-[820px]:grid-cols-1">
                            {projects.map((project, index) => {
                                const isHovered = hoveredIndex === index;
                                // Alternating column spans for visual interest
                                const colSpan = index === 0 ? 'col-span-7' : index === 1 ? 'col-span-5' : 'col-span-6';
                                const rowSpan = index === 0 ? 'row-span-2' : '';
                                
                                return (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.15 }}
                                        className={`${colSpan} ${rowSpan} max-[1024px]:col-span-6 max-[820px]:col-span-1`}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <Link 
                                            to={`/projectpage/${project.id}`}
                                            onClick={() => setSelectedProject(project)}
                                        >
                                            <div className="group cursor-pointer h-full">
                                                <div className="bg-white border-2 border-black rounded overflow-hidden transition-all duration-500 h-full flex flex-col hover:shadow-[8px_8px_0_0_rgb(0,0,0)] hover:-translate-x-[4px] hover:-translate-y-[4px]">
                                                    {/* Image Container */}
                                                    <div className={`relative overflow-hidden ${index === 0 ? 'h-[400px]' : 'h-[280px]'} max-[1024px]:h-[250px]`}>
                                                        <motion.img 
                                                            src={`/${project.photos?.[0]}`}
                                                            alt={project.name}
                                                            className="w-full h-full object-cover"
                                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                                        />
                                                        
                                                        
                                                        {/* Project Number - Large and Bold */}
                                                        <div className="absolute top-[25px] left-[25px]">
                                                            <motion.span
                                                                animate={{
                                                                scale: isHovered ? 1.1 : 1,
                                                                opacity: isHovered ? 0.3 : 0.1
                                                            }}
                                                                transition={{ duration: 0.3 }}
                                                                className="text-[120px] font-bold text-black font-grotesk-mono leading-none max-[1024px]:text-[90px] max-[820px]:text-[70px]"
                                                            >
                                                                {String(index + 1).padStart(2, '0')}
                                                            </motion.span>
                                                        </div>

                                                        {/* Hover Overlay Content */}
                                                        <motion.div
                                                            className="absolute inset-0 flex items-center justify-center"
                                                            animate={{
                                                                opacity: isHovered ? 1 : 0,
                                                                y: isHovered ? 0 : 20
                                                            }}
                                                            transition={{ duration: 0.4 }}
                                                        >
                                                            <div className="text-center">
                                                                <span className="text-black text-2xl uppercase font-medium block mb-[10px]">
                                                                    {project.name}
                                                                </span>
                                                                <span className="text-black/80 text-sm uppercase font-grotesk-mono">
                                                                    View Project →
                                                                </span>
                                                            </div>
                                                        </motion.div>
                                                    </div>

                                                    {/* Content Section */}
                                                    <div className="p-[30px] flex-1 flex flex-col justify-between max-[1024px]:p-[25px]">
                                                        <div>
                                                            {/* Title and Type */}
                                                            <div className="mb-[15px]">
                                                                <h2 className="text-2xl font-medium uppercase mb-[5px] max-[1024px]:text-xl">
                                                                    {project.name}
                                                                </h2>
                                                                <span className="text-[10px] uppercase text-gray-500 font-grotesk-mono">
                                                                    {project.project_type}
                                                                </span>
                                                            </div>
                                                            
                                                            {/* Description */}
                                                            <p className="font-grotesk text-[13px] leading-relaxed text-gray-700 mb-[20px] line-clamp-3 max-[820px]:line-clamp-2">
                                                                {project.description}
                                                            </p>

                                                            {/* Tech Tags */}
                                                            <div className="flex gap-[6px] flex-wrap">
                                                                {project.language_used?.map((lang, idx) => (
                                                                    <motion.span
                                                                        key={idx}
                                                                        whileHover={{ scale: 1.05 }}
                                                                        className={`font-grotesk px-[8px] py-[3px] text-[10px] uppercase border ${languageColors[lang.toUpperCase()] || 'text-gray-600 border-gray-600'}`}
                                                                    >
                                                                        {lang}
                                                                    </motion.span>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Client Footer */}
                                                        <div className="mt-[20px] pt-[15px] border-t border-black/20">
                                                            <span className="text-[10px] uppercase text-gray-500 font-grotesk-mono">
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
        </div>
    );
};

export default Projects;
