import { useNavigate } from 'react-router-dom';
import styles from '../styles/projectcard.module.css';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    const languageColors = {
        JS: styles.yellow,
        RCT: styles.blue,
        NODE: styles.green,
        PY: styles.purple
    };

    const goToProject = (projectId) => {
        navigate(`/projectpage/${projectId}`);
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.label}>
                <p>{project.name}</p>
            </div>
            <div className={styles.imgContainer} onClick={() => goToProject(project.id)}>
                <img src={`/${project.photos?.[0]}`} alt='screen shot of project'/>
            </div>
            <div className={styles.projectInfo}>
                <p>{project.intro}</p>
                <div className={styles.language}>
                    {project?.language_used?.map((lang, idx) =>
                        <p key={idx} className={languageColors[lang.toUpperCase()]}>{lang}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;