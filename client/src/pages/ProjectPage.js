import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

import styles from '../styles/projectpage.module.css';

import { GoGrabber } from "react-icons/go";
import api from '../api/Axios';
import Clock from '../components/Clock';

const ProjectPage = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState({});
    const { setSelectedProject } = useProject();

    const [pos, setPos] = useState({ img1: {x: 0, y: 0}, img2: {x: 0, y: 0} });
    const [targetPos, setTargetPos] = useState({ img1: {x: 0, y: 0}, img2: {x: 0, y: 0} });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const [dragging, setDragging] = useState(null);
    const [index, setIndex] = useState('img2');
    

    const languageColors = {
        JS: styles.yellow,
        RCT: styles.blue,
        NODE: styles.green
    };

    const fetchProjectData = async () => {
        try {
            const res = await api.get(`/project/${id}`);
            setProjectData(res.data);
            setSelectedProject(res.data);
        } catch (error) {
            console.error('Error fetch project data', error);
        }
    };

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef1.current && containerRef2.current) {
                const rect1 = containerRef1.current.getBoundingClientRect();
                const rect2 = containerRef2.current.getBoundingClientRect();

                const centerX1 = window.innerWidth / 3.4 - rect1.width / 2;
                const centerY1 = window.innerHeight / 2.1 - rect1.height / 2;

                const centerX2 = window.innerWidth / 1.5 - rect2.width / 2;
                const centerY2 = window.innerHeight / 1.5 - rect2.height / 2;

                setPos({
                    img1: { x: centerX1, y: centerY1 },
                    img2: { x: centerX2, y: centerY2 },
                });

                setTargetPos({
                    img1: { x: centerX1, y: centerY1 },
                    img2: { x: centerX2, y: centerY2 },
                });
            }
        };

        updatePosition();
        fetchProjectData();
    }, []);

    const handleMouseDown = (e, id) => {
        setDragging(id);
        setOffset({
            x: e.clientX - pos[id].x,
            y: e.clientY - pos[id].y
        });
    };

    useEffect(() => {
        const handleMouseMove = e => {
            if (!dragging) return;
            const newX = e.clientX - offset.x;
            const newY = e.clientY - offset.y;
            setTargetPos(prev => ({ ...prev, [dragging]: { x: newX, y: newY } }));
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [dragging, offset]);

    useEffect(() => {
        const handleMouseUp = () => setDragging(null);
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    useEffect(() => {
        let animationFrame;
        const animate = () => {
            setPos(prev => {
            const updated = { ...prev };
            ['img1', 'img2'].forEach(id => {
                const target = targetPos[id];
                const current = prev[id] || { x: target.x, y: target.y };
                updated[id] = {
                x: current.x + (target.x - current.x) * 0.2,
                y: current.y + (target.y - current.y) * 0.2
                };
            });
            return updated;
            });
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [targetPos]);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <div className={styles.box}>
                    <p>{projectData.name}</p>
                </div>
                <div className={styles.box}>
                    <p>{projectData.name}</p>
                </div>
                <div className={styles.box}>
                    <p>{projectData.name}</p>
                </div>
                <div className={styles.box}>
                    <p>{projectData.name}</p>
                </div>
            </div>
            <div className={styles.middle}>
                <div 
                    ref={containerRef1}
                    className={styles.projectImg}
                    style={{ 
                        left: pos.img1.x,
                        top: pos.img1.y,
                        zIndex: index === 'img1' ? 1 : 'auto'
                    }}
                    onMouseDown={() => setIndex('img1')}
                >
                    <div 
                        className={styles.label}
                        onMouseDown={(e) => handleMouseDown(e, 'img1')}
                        
                    >
                        <GoGrabber className={styles.rotate}/>
                        <span className={styles.tooltipText}>GRAB</span>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src='/imgs/Screenshot 2025-10-20 at 16.53.44.png' alt=''/>
                    </div>
                </div>

                <div 
                    ref={containerRef2}
                    className={styles.projectImg}
                    style={{ 
                        left: pos.img2.x,
                        top: pos.img2.y,
                        zIndex: index === 'img2' ? 1 : 'auto'
                    }}
                    onMouseDown={() => setIndex('img2')}
                >
                    <div 
                        className={styles.label}
                        onMouseDown={(e) => handleMouseDown(e, 'img2')}
                       
                    >
                        <GoGrabber className={styles.rotate}/>
                        <span className={styles.tooltipText}>GRAB</span>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={`/${projectData.photos?.[0]}`} alt=''/>
                    </div>
                </div>
                <div className={styles.projectDesc}>
                    <p><Link className={styles.back} to='/projects'>BACK</Link></p>
                    <p className={styles.desc}>
                        {projectData?.description}
                    </p>
                    <div className={styles.language}>
                        {projectData?.language_used?.map((lang, idx) =>
                            <p key={idx} className={languageColors[lang.toUpperCase()]}>{lang}</p>
                        )}
                    </div>

                    <div>
                        <div>
                            <h3>{projectData?.project_type}</h3>
                        </div>
                        <div>
                            <h3>{projectData?.client_name}</h3>
                        </div>
                    </div>
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

export default ProjectPage;