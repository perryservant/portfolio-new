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
    const [pos, setPos] = useState({});
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
    
    const handleMouseDown = (e, id) => {
        setDragging(id);
        setOffset({
            x: e.clientX - pos[id]?.x ?? 0,
            y: e.clientY - pos[id]?.y ?? 0
        });
    };


    const fetchProjectsData = async () => {
        try {
            const res = await api.get('/projects');
            const data = res.data;

            const newPositions = {};
            const targetPositionsInit = {};

            data.forEach((p, index) => {
                const fixedPositions = [
                    { x: 100, y: 120 },
                    { x: 650, y: 320 },
                    { x: 100, y: 180 },
                    { x: 750, y: 480 },
                ];

                const position = fixedPositions[index] || { x: 100, y: 120 };

                newPositions[p.id] = { x: position.x, y: position.y };
                targetPositionsInit[p.id] = { x: position.x, y: position.y };
            });

            setProjects(data);
            setPositions(newPositions);
            setPos(newPositions);
            setTargetPos(newPositions);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjectsData();
    }, []);

    useEffect(() => {
        const handleGlobalMouseMove = e => {
            if (!dragging) return;
            const newX = e.clientX - offset.x;
            const newY = e.clientY - offset.y;
            setTargetPos(prev => ({ ...prev, [dragging]: { x: newX, y: newY } }));
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [dragging, offset]);

    useEffect(() => {
        const handleGlobalMouseUp = () => setDragging(null);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, []);

    useEffect(() => {
        let animationFrame;
        const followCursor = () => {
            setPos(prev => {
                const updated = { ...prev };
                Object.keys(targetPos).forEach(id => {
                    const target = targetPos[id];
                    const current = prev[id] || { x: target.x, y: target.y };
                    updated[id] = {
                    x: current.x + (target.x - current.x) * 0.2,
                    y: current.y + (target.y - current.y) * 0.2
                    };
                });
                return updated;
            });
            animationFrame = requestAnimationFrame(followCursor);
        };
        animationFrame = requestAnimationFrame(followCursor);
        return () => cancelAnimationFrame(animationFrame);
    }, [targetPos]);

    const handleMouseMove = (e) => {
        if (!dragging) return;

        const cardWidth = 670;
        const cardHeight = 250; 
        const containerWidth = window.innerWidth;
        const containerHeight = window.innerHeight;

        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        newX = Math.max(0, Math.min(newX, containerWidth - cardWidth));
        newY = Math.max(0, Math.min(newY, containerHeight - cardHeight));

        setTargetPos(prev => ({
            ...prev,
            [dragging]: { x: newX, y: newY }
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
                        Welcome to my projects showcase. Each project represents a 
                        unique blend of creativity and technical expertise, carefully 
                        crafted to solve real-world problems. From responsive web 
                        applications to dynamic interactive experiences, these projects 
                        highlight my ability to design, develop, and deploy high-quality 
                        solutions that meet client and user needs.
                    </p>
                    <p>
                        Every project demonstrates a commitment to clean code, scalable 
                        architecture, and intuitive user interfaces. I focus on combining 
                        modern technologies with thoughtful design to create experiences 
                        that are both functional and engaging. Please explore each project 
                        to see the diverse range of skills and technologies applied, from 
                        front-end development with React to back-end solutions with Node.js 
                        and database management.
                    </p>
                </div>
                    {projects.map(project => (
                        <div
                            key={project.id}
                            className={styles.projectWrapper}
                            style={{
                            left: pos[project.id]?.x ?? 0,
                            top: pos[project.id]?.y ?? 0
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