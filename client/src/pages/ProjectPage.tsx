import { useMemo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { mockProjects } from '../data/mockData';

const ProjectPage = () => {
    const { id } = useParams<{ id: string }>();
    const { selectedProject, setSelectedProject } = useProject();
    
    // Get project data instantly from mock data (no async delay)
    const projectData = useMemo(() => {
        if (!id) return null;
        
        // First check if we already have it in context
        if (selectedProject && selectedProject.id === Number(id)) {
            return selectedProject;
        }
        
        // Otherwise, get it directly from mock data (instant, no delay)
        const project = mockProjects.find(p => p.id === Number(id));
        if (project) {
            setSelectedProject(project);
        }
        return project || null;
    }, [id, selectedProject, setSelectedProject]);

    const languageColors: Record<string, string> = {
        JS: "text-[rgb(242,167,6)] border-[rgb(242,167,6)]",
        TS: "text-[rgb(27,76,225)] border-[rgb(27,76,225)]",
        RCT: "text-[rgb(6,116,242)] border-[rgb(6,116,242)]",
        NODE: "text-[rgb(31,176,2)] border-[rgb(31,176,2)]",
        FSTFY: "text-[rgb(146,72,238)] border-[rgb(146,72,238)]",
        PY: "text-purple-600 border-purple-600"
    };

    // Handle project not found (instant, no loading state)
    if (!projectData) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium uppercase mb-[20px]">Project Not Found</h1>
                    <NavLink 
                        className="text-[13px] uppercase font-medium hover:text-[rgb(207,171,41)] transition-colors inline-flex items-center gap-[8px]"
                        to='/projects'
                    >
                        ← Back to Projects
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col">
            
            <div className="flex-1 min-h-0 overflow-y-auto max-[820px]:overflow-y-scroll">
                <div className="w-full py-[40px] px-[30px] max-[820px]:px-[20px] max-[820px]:pt-[220px]">
                    {/* Back Button */}
                    <div className="mb-[30px] flex justify-end">
                        <NavLink 
                            className="text-[13px] uppercase font-medium hover:text-[rgb(207,171,41)] transition-colors inline-flex items-center gap-[8px]"
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
        </div>
    );
};

export default ProjectPage;
