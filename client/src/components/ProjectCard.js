import { useNavigate, Link } from 'react-router-dom';
import styles from '../styles/projectcard.module.css';
import { GoGrabber } from "react-icons/go";

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    const languageColors = {
        JS: styles.yellow,
        RCT: styles.blue,
        NODE: styles.green,
        PY: styles.purple
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.label}>
                <GoGrabber className={styles.rotate}/>
                <span className={styles.tooltipText}>GRAB</span>
            </div>
            <div className={styles.imgContainer}>
                <Link to={`/projectpage/${project.id}`}><img src={`/${project.photos?.[0]}`} alt='screen shot of project'/></Link>
            </div>
            <div className={styles.projectInfo}>
                <p className={styles.name}>{project.name}</p>
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