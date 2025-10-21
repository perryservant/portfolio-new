
import ProjectCard from '../components/ProjectCard';
import styles from '../styles/projects.module.css';

const Projects = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <div className={styles.left}>
                    <h1>Projects</h1>
                </div>
                
                <div className={styles.right}>
                    <div className={styles.text}>
                        <p>
                            Here you’ll find a selection of my projects that showcase 
                            my skills as a full-stack software engineer. 
                            Each project highlights my ability to design, build, 
                            and deploy applications with attention to both functionality
                            and user experience. Feel free to explore and see the 
                             and approaches I’ve applied in real-world scenarios.
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.projectContainer}>
                <ProjectCard/>
            </div>
        </div>
    );
};

export default Projects;