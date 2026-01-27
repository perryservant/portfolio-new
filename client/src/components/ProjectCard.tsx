import { Link } from 'react-router-dom';
import { Project } from '../data/mockData';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

    const languageColors: Record<string, string> = {
        JS: "text-[rgb(242,167,6)] border-[rgb(242,167,6)]",
        RCT: "text-[rgb(6,116,242)] border-[rgb(6,116,242)]",
        NODE: "text-[rgb(31,176,2)] border-[rgb(31,176,2)]",
        PY: "text-purple-600 border-purple-600"
    };

    return (
        <div className="w-full h-full flex flex-col">
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
