import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

import styles from '../styles/projectpage.module.css';

import { GoGrabber } from "react-icons/go";
import api from '../api/Axios';
import Clock from '../components/Clock';

const ProjectPage = () => {
    const { id } = useParams();
    const [projectData, setProjectData] = useState({});
    const { setSelectedProject } = useProject();

    const containerRef1 = useRef(null);
    const containerRef2 = useRef(null);
    const [dragging, setDragging] = useState(null);
    const [index, setIndex] = useState('img2');
    const [positions, setPositions] = useState({
        img1: { x: 0, y: 0 },
        img2: { x: 0, y: 0 },
    });
    const [offsets, setOffsets] = useState({
        img1: { x: 0, y: 0 },
        img2: { x: 0, y: 0 },
    });

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

                setPositions({
                    img1: { x: centerX1, y: centerY1 },
                    img2: { x: centerX2, y: centerY2 },
                });
            }
        };

        updatePosition();
        fetchProjectData()
    }, []);

    const handleMouseDown = (e, id) => {
    if (!id || !positions[id]) return;
        setDragging(id);
        setOffsets({
            ...offsets,
            [id]: {
                x: e.clientX - positions[id].x,
                y: e.clientY - positions[id].y,
            },
        });
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;  
            setPositions({
                ...positions,
                [dragging]: {
                x: e.clientX - offsets[dragging].x,
                y: e.clientY - offsets[dragging].y,
            },
        });
    };

    const handleMouseUp = () => setDragging(null);

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
                        left: positions.img1.x,
                        top: positions.img1.y,
                        zIndex: index === 'img1' ? 1 : 'auto'
                    }}
                    onMouseDown={() => setIndex('img1')}
                >
                    <div 
                        className={styles.label}
                        onMouseDown={(e) => handleMouseDown(e, 'img1')}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
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
                        left: positions.img2.x,
                        top: positions.img2.y,
                        zIndex: index === 'img2' ? 1 : 'auto'
                    }}
                    onMouseDown={() => setIndex('img2')}
                >
                    <div 
                        className={styles.label}
                        onMouseDown={(e) => handleMouseDown(e, 'img2')}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <GoGrabber className={styles.rotate}/>
                        <span className={styles.tooltipText}>GRAB</span>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={`/${projectData.photos?.[0]}`} alt=''/>
                    </div>
                </div>
                <div className={styles.projectDesc}>
                    <p>
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