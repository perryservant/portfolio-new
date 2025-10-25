import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';

import styles from '../styles/navprofile.module.css';
import { GoGrabber } from "react-icons/go";

const NavProfile = ({ location }) => {
    const { selectedProject } = useProject();

    const [isCollapsed, setIsCollapsed] = useState(true);

    const containerRef = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [menuOpen, setMenuOpen] = useState(false);


    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

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
        }
    };

    useEffect(() => {
        updatePosition();
    }, []);

    console.log(selectedProject)

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
            
            <div className={styles.menuSection} onClick={handleCollapseToggle}>
                <div className={styles.menuHeader}>
                    <p className={styles.menuText}>cd:</p>
                    <p className={styles.menuTextMiddle}>\ novellum \</p>
                </div>
            </div>
                
            <div className={styles.menuWrapper}>
                <div className={!isCollapsed ? styles.accordionContentOpen : styles.accordionContentClosed}>
                    <div className={styles.innerMenu}>
                        <ul className={styles.menuList}>
                            <li><NavLink className={styles.linkStyle}  onClick={handleCollapseToggle} to='/'>\ home</NavLink></li>
                            <li><NavLink className={styles.linkStyle} onClick={handleCollapseToggle} to='projects'>\ projects</NavLink></li>
                            <li><NavLink className={styles.linkStyle} onClick={handleCollapseToggle} to='contact'>\ contact</NavLink></li>
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