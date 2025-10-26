import { useEffect, useState } from 'react';
import api from '../api/Axios';

import ProjectCard from '../components/ProjectCard';
import styles from '../styles/projects.module.css';
import Clock from '../components/Clock';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [positions, setPositions] = useState({});
    const [dragging, setDragging] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const fetchProjectsData = async () => {
        try {
            const res = await api.get('/projects');
            const data = res.data;

            const newPositions = {};
            data.forEach((p, index) => {
                const baseX = 170 + (index % 4) * 520; 
                const baseY = 10 + Math.floor(index / 1) * 140; 
                const offsetX = (Math.random() - 0.5) * 20; 
                const offsetY = (Math.random() - 0.5) * 40;

                newPositions[p.id] = {
                    x: baseX + offsetX,
                    y: baseY + offsetY,
                };
            });

            setProjects(data);
            setPositions(newPositions);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjectsData();
    }, []);

    const handleMouseDown = (e, id) => {
        e.preventDefault();
        setDragging(id);
        setOffset({
            x: e.clientX - positions[id].x,
            y: e.clientY - positions[id].y,
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const cardWidth = 670;
        const cardHeight = 250; 
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        // Clamp values
        newX = Math.max(0, Math.min(newX, containerWidth - cardWidth));
        newY = Math.max(0, Math.min(newY, containerHeight - cardHeight));

        setPositions((prev) => ({
            ...prev,
            [dragging]: { x: newX, y: newY },
        }));
    };

    const handleMouseUp = () => setDragging(null);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <div className={styles.box}>
                    <p>projects</p>
                </div>
                <div className={styles.box}>
                    <p>projects</p>
                </div >
                <div className={styles.box}>
                    <p>projects</p>
                </div>
                <div className={styles.box}>
                    <p>projects</p>
                </div>
            </div>
            <div className={styles.middle}>
                
                <div
                    className={styles.projectsContainer}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    <div className={styles.intro}>
                    <p className={styles.topP}>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. 
                        It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old. Richard McClintock, a Latin professor 
                        at Hampden-Sydney College in Virginia, looked up one of the more 
                    </p>
                    <p>
                        bscure Latin words, consectetur, from a Lorem Ipsum passage, and 
                        going through the cites of the word in classical literature, 
                        discovered the undoubtable source. Lorem Ipsum comes from sections 
                        1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
                        (The Extremes of Good and Evil) by Cicero, written in 45 BC. 
                        This book is a treatise on the theory of ethics, very popular 
                        during the Renaissance. The first line of Lorem Ipsum, "Lorem 
                        ipsum dolor sit amet..", comes from a line in section 1.10.32.
                    </p>
                </div>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className={styles.projectWrapper}
                            style={{
                                left: positions[project.id]?.x ?? 0,
                                top: positions[project.id]?.y ?? 0,
                            }}
                            onMouseDown={(e) => handleMouseDown(e, project.id)}
                        >
                        <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
            
            <div className={styles.bottom}>
                <div className={styles.bottomLine}></div>
                <div className={styles.footerContainer}>
                    <div className={styles.copyright}>
                        <p>© copyright 2025 perry servant<br/><span>all right reserved</span></p>
                    </div>
                    <div className={styles.spacer}>
                        <p>
                            ///////////////////////////////////////////////////////////////
                        </p>
                    </div>
                    <div className={styles.clock}>
                        <Clock/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;