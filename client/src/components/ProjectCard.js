import { useNavigate } from 'react-router-dom';
import styles from '../styles/projectcard.module.css';

const ProjectCard = () => {
    const navigate = useNavigate();

    const goToProject = () => {
        navigate('/projectpage');
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.label}>
                <p>The Wetland Shop</p>
            </div>
            <div className={styles.imgContainer} onClick={goToProject}>
                <img src='/imgs/Screenshot 2025-10-20 at 16.53.44.png' alt='screen shot of project'/>
            </div>
            <div className={styles.projectInfo}>
                <p>Short project description</p>
                <div className={styles.language}>
                    <p className={styles.yellow}>JS</p>
                    <p className={styles.blue}>RCT</p>
                    <p className={styles.green}>NODE</p>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;