import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

import styles from '../styles/navprofile.module.css';
import { GoGrabber } from "react-icons/go";

const NavProfile = ({ 
    location, isCollapsedB, 
    setIsCollapsedB, 
    isCollapsedA, 
    setIsCollapsedA,
    scrollToContact
}) => {
    const { selectedProject } = useProject();


    const containerRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
    const navigate = useNavigate();


    const handleCollapseToggle = () => {
        setIsCollapsedB(!isCollapsedB);
    };

    const handleContactClick = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                scrollToContact?.();
            }, 50);
        } else {
            scrollToContact?.();
        }
    }

    const breadCrumbs = () => {
        if (location.pathname === '/') {
            return 'home'
        } else if (location.pathname.startsWith('/projectpage')) {
            return 'projectpage'
        } else {
            return location.pathname.replace('/', '')
        }
    };

    const updatePosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;

            setPos({ x: centerX, y: centerY });
            setTargetPos({ x: centerX, y: centerY });
        }
    };

    useEffect(() => {
        updatePosition();
    }, []);

    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (dragging) {
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;
                setTargetPos({ x: newX, y: newY });
            }
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [dragging, offset]);

    

    useEffect(() => {
        const handleGlobalMouseUp = () => setDragging(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    useEffect(() => {
        let animationFrame;

        const followCursor = () => {
            setPos(prev => ({
                x: prev.x + (targetPos.x - prev.x) * 0.2,
                y: prev.y + (targetPos.y - prev.y) * 0.2
            }));
            animationFrame = requestAnimationFrame(followCursor);
        };

        if (dragging) followCursor();
        else cancelAnimationFrame(animationFrame);

        return () => cancelAnimationFrame(animationFrame);
    }, [dragging, targetPos]);

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        });
    };

    const handlePointerDown = (e) => {
        e.preventDefault();
        const point = e.touches ? e.touches[0] : e;
        setDragging(true);
        setOffset({
            x: point.clientX - pos.x,
            y: point.clientY - pos.y
        });
    };

    const handlePointerMove = (e) => {
        if (!dragging) return;
        const point = e.touches ? e.touches[0] : e;
        setTargetPos({
            x: point.clientX - offset.x,
            y: point.clientY - offset.y
        });
    };

    const handlePointerUp = () => setDragging(false);

    const handleMouseUp = () => setDragging(false);

    return (
        <div 
            ref={containerRef}
            className={styles.mainContainer}
            style={{ left: pos.x, top: pos.y }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
        >
            <div 
                className={styles.grab}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <GoGrabber className={styles.grabIcon}/>
                <span className={styles.tooltipText}>GRAB</span>
            </div>
            
            <div className={styles.menuSection} onClick={handleCollapseToggle}>
                <div className={styles.menuHeader}>
                    <p className={styles.menuText}>cd:</p>
                    <p className={styles.menuTextMiddle}>\ novellum \</p>
                </div>
            </div>
                
            <div className={styles.menuWrapper}>
                <div className={!isCollapsedB ? styles.accordionContentOpen : styles.accordionContentClosed}>
                    <div className={styles.innerMenu}>
                        <ul className={styles.menuList}>
                            <li><NavLink className={styles.linkStyle}  onClick={() => {
                                handleCollapseToggle();
                                if (isCollapsedA) setIsCollapsedA(false);
                            }} to='/'>\ home</NavLink></li>
                            <li><NavLink className={styles.linkStyle} onClick={() => {
                                handleCollapseToggle();
                                if (!isCollapsedA) setIsCollapsedA(true);
                            }} to='projects'>\ projects</NavLink></li>
                            <li className={styles.linkStyle} onClick={() => {
                                handleContactClick();
                                handleCollapseToggle();
                                if (isCollapsedA) setIsCollapsedA(false);
                            }}> \ Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className={styles.portfolio}>
                <p className={styles.menuText}>perry_servant \</p>
            </div>
            <div className={styles.language}>
                <p className={styles.menuText}>{breadCrumbs()} \</p>
            </div>

            {breadCrumbs() === 'projectpage' && (
                <div className={styles.projectName}>
                    <p className={styles.menuText}>{selectedProject?.name} \</p>
                </div>
            )}

            {breadCrumbs() === 'contact' && (
                <div className={styles.hireMe}>
                    <p className={styles.menuText}>hire me \</p>
                </div>
            )}
        </div>
    );
};

export default NavProfile;