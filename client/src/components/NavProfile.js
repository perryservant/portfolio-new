import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../styles/navprofile.module.css';
import { GoGrabber } from "react-icons/go";

const NavProfile = ({ location }) => {
    const containerRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [menuOpen, setMenuOpen] = useState(false);

    const currentPath = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');

    useEffect(() => {
        const updatePosition = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = window.innerWidth / 2 - rect.width / 2;
                const centerY = window.innerHeight / 2 - rect.height / 2;
                setPos({ x: centerX, y: centerY });
            }
        };

        updatePosition();
    }, []);

    const handleMouseDown = (e) => {
        setDragging(true);
        setOffset({
        x: e.clientX - pos.x,
        y: e.clientY - pos.y
        });
    };

    const handleMouseMove = (e) => {
        if (dragging) {
        setPos({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });
        }
    };

    const handleMouseUp = () => setDragging(false);

    return (
        <div 
            ref={containerRef}
            className={styles.mainContainer}
            style={{ left: pos.x, top: pos.y }}
        >
            <div 
                className={styles.grab}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <GoGrabber className={styles.grabIcon}/>
                <span className={styles.tooltipText}>GRAB</span>
            </div>
            <div className={styles.menuWrapper}>
                <div className={styles.menuSection} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className={styles.menuHeader}>
                        <p className={styles.menuText}>cd:</p>
                        <p className={styles.menuTextMiddle}>\ novellum \</p>
                    </div>
                </div>
                
                <div 
                    className={`${styles.menuPanel} ${menuOpen ? styles.menuPanelOpen : ''}`}
                    aria-hidden={!menuOpen}
                    role="menu"
                >
                    <ul className={styles.menuList}>
                        <li role="menuitem"><NavLink to='/'>home</NavLink></li>
                        <li role="menuitem"><NavLink to='projects'>projects</NavLink></li>
                    </ul>
                </div>
                
            </div>
                
            <div className={styles.portfolio}>
                <p className={styles.menuText}>perry_servant \</p>
            </div>
            <div className={styles.language}>
                <p className={styles.menuText}>{currentPath} \</p>
            </div>

            {currentPath.startsWith('projectpage') && (
                <div className={styles.projectName}>
                    <p className={styles.menuText}>novellum \</p>
                </div>
            )}
        </div>
    );
};

export default NavProfile;