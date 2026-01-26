import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { mockApi, Project } from '../data/mockData';
import Clock from '../components/Clock';
import { FaGithub } from 'react-icons/fa';

const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const [projectData, setProjectData] = useState<Project | null>(null);
    const { setSelectedProject } = useProject();

    const fetchProjectData = async () => {
        if (!id) return;
        try {
            const data = await mockApi.getProject(Number(id));
            if (data) {
                setProjectData(data);
                setSelectedProject(data);
            }
        } catch (error) {
            console.error('Error fetch project data', error);
        }
    };

    useEffect(() => {
        fetchProjectData();
    }, [id, setSelectedProject]);

    if (!projectData) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }

    const languageColors: Record<string, string> = {
        JS: "text-[rgb(242,167,6)] border-[rgb(242,167,6)]",
        RCT: "text-[rgb(6,116,242)] border-[rgb(6,116,242)]",
        NODE: "text-[rgb(31,176,2)] border-[rgb(31,176,2)]",
        PY: "text-purple-600 border-purple-600"
    };
    
    const currentYear = new Date().getFullYear();

    return (
        <div className="h-full w-full flex flex-col">
            
            <div className="flex-1 min-h-0 overflow-y-auto max-[820px]:overflow-y-scroll">
                <div className="w-full py-[40px] px-[30px] max-[820px]:px-[20px] max-[820px]:pt-[220px]">
                    {/* Back Button */}
                    <div className="mb-[30px] flex justify-end">
                        <NavLink 
                            className="text-[13px] uppercase font-medium hover:text-[rgb(154,207,41)] transition-colors inline-flex items-center gap-[8px]"
                            to='/projects'
                        >
                            ← Back to Projects
                        </NavLink>
                    </div>

                    {/* Project Header */}
                    <div className="mb-[80px] max-[820px]:mb-[30px] flex flex-col items-end text-right max-[820px]:items-start max-[820px]:text-left">
                        <h1 className="text-5xl font-medium uppercase mb-[20px] max-[820px]:text-3xl">
                            {projectData.name}
                        </h1>
                        <div className="flex gap-[15px] items-center flex-wrap justify-end max-[820px]:justify-start">
                            <span className="text-[13px] uppercase font-medium">{projectData.project_type}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-[13px] uppercase">{projectData.client_name}</span>
                        </div>
                    </div>

                    {/* Project Images */}
                    {projectData.photos && projectData.photos.length > 0 && (
                        <div className="mb-[50px] max-[820px]:mb-[30px]">
                            <div className="grid grid-cols-2 gap-[30px] max-[820px]:grid-cols-1">
                                {projectData.photos.map((photo, idx) => (
                                    <div 
                                        key={idx}
                                        className="bg-white/30 backdrop-blur-[1px] rounded border border-black/10 p-[20px]"
                                    >
                                        <img 
                                            src={`/${photo}`} 
                                            alt={`${projectData.name} screenshot ${idx + 1}`}
                                            className="w-full h-auto object-contain rounded border-2 border-black"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Project Details */}
                    <div className="grid grid-cols-[2fr_1fr] gap-[50px] max-[820px]:grid-cols-1 max-[820px]:gap-[30px]">
                        {/* Description */}
                        <div>
                            <h2 className="text-xl font-medium uppercase mb-[20px]">About This Project</h2>
                            <p className="font-grotesk text-[15px] leading-relaxed text-gray-700">
                                {projectData.description}
                            </p>
                        </div>

                        {/* Project Info Sidebar */}
                        <div className="bg-white/30 backdrop-blur-[1px] rounded border border-black/10 p-[30px] h-fit max-[820px]:h-auto">
                            <div className="space-y-[25px]">
                                <div>
                                    <h3 className="text-[11px] uppercase font-medium mb-[10px] text-gray-500">
                                        Technologies Used
                                    </h3>
                                    <div className="flex flex-wrap gap-[8px]">
                                        {projectData.language_used?.map((lang, idx) => (
                                            <span 
                                                key={idx} 
                                                className={`font-grotesk px-[8px] py-[4px] text-[11px] uppercase border ${languageColors[lang.toUpperCase()] || 'text-gray-600 border-gray-600'}`}
                                            >
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-[11px] uppercase font-medium mb-[10px] text-gray-500">
                                        Project Type
                                    </h3>
                                    <p className="text-[14px] uppercase font-medium">
                                        {projectData.project_type}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-[11px] uppercase font-medium mb-[10px] text-gray-500">
                                        Client
                                    </h3>
                                    <p className="text-[14px] uppercase font-medium">
                                        {projectData.client_name}
                                    </p>
                                </div>
                            </div>
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

export default ProjectPage;
