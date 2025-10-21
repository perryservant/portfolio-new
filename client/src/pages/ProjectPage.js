import { useEffect, useRef, useState } from 'react';
import styles from '../styles/projectpage.module.css';

const ProjectPage = () => {
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
                <h1>Novellum</h1>
            </div>
            <div className={styles.content}>
                <div 
                    ref={containerRef1}
                    className={styles.projectImg}
                    style={{ 
                        left: positions.img1.x,
                        top: positions.img1.y,
                        zIndex: index === 'img1' ? 900 : 'auto'
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
                        <p>project img [0]</p>
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
                        zIndex: index === 'img2' ? 900 : 'auto'
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
                        <p>project img [1]</p>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src='/imgs/Screenshot 2025-10-20 at 16.53.44.png' alt=''/>
                    </div>
                </div>
                <div className={styles.projectDesc}>
                    <p>
                        This project is a full-stack web application designed to showcase 
                        a complete workflow from frontend to backend. It demonstrates 
                        responsive design, dynamic user interactions, and integration 
                        with APIs and databases, highlighting both functionality and user 
                        experience in a modern web environment.
                    </p>
                    <div className={styles.language}>
                        <p className={styles.yellow}>JS</p>
                        <p className={styles.blue}>RCT</p>
                        <p className={styles.green}>NODE</p>
                    </div>

                    <div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectPage;