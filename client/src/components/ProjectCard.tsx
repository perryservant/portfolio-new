import { useNavigate, Link } from 'react-router-dom';
import { GoGrabber } from "react-icons/go";
import { Project } from '../data/mockData';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const navigate = useNavigate();

    const languageColors: Record<string, string> = {
        JS: "text-[rgb(242,167,6)] border-[rgb(242,167,6)]",
        RCT: "text-[rgb(6,116,242)] border-[rgb(6,116,242)]",
        NODE: "text-[rgb(31,176,2)] border-[rgb(31,176,2)]",
        PY: "text-purple-600 border-purple-600"
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className="h-[23px] w-[50px] bg-white/37 backdrop-blur-[0.8px] flex justify-center items-center mb-[1px] text-[31px] rounded-[5px] cursor-grab active:cursor-grabbing relative group max-[820px]:hidden">
                <GoGrabber className="rotate-90 w-full group-hover:text-white transition-colors duration-300"/>
                <span className="font-normal invisible opacity-0 absolute bottom-[110%] left-1/2 -translate-x-1/2 text-white text-[11px] whitespace-nowrap transition-opacity duration-300 z-10 uppercase group-hover:visible group-hover:opacity-100">GRAB</span>
            </div>
            <div className="flex-1 border-2 border-black rounded-[5px] cursor-pointer">
                <Link to={`/projectpage/${project.id}`}>
                    <img 
                        src={`/${project.photos?.[0]}`} 
                        alt='screen shot of project'
                        className="h-full w-full object-cover rounded-[3px] block"
                    />
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <p className="uppercase font-medium">{project.name}</p>
                <div className="flex gap-[5px]">
                    {project?.language_used?.map((lang, idx) => (
                        <p 
                            key={idx} 
                            className={`font-grotesk px-[3px] uppercase border ${languageColors[lang.toUpperCase()] || ''}`}
                        >
                            {lang}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
