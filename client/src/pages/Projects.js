import { useEffect, useState } from 'react';
import api from '../api/Axios';

import ProjectCard from '../components/ProjectCard';
import styles from '../styles/projects.module.css';

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
            <div
                className={styles.projectsContainer}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
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
    );
};

export default Projects;