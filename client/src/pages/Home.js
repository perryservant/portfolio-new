import { useState, useEffect, useRef } from 'react';
import { useOutletContext } from "react-router-dom";

import styles from '../styles/home.module.css';
import ScrollPort from '../components/ScrollPort';
import Clock from '../components/Clock';
import Marquee from "react-fast-marquee";


const Home = () => {
    const { isLoaded } = useOutletContext();

    const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    const boxText = [
        {full: 'Full-stack Developer', short: 'Full-stack Dev'},
        {full: 'Core Compentencies', short: 'compentencies'},
        {full: 'highlighted projects', short: 'Projects'},
        {full: 'Skills & Expertise', short: 'Expertise'}
    ];

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);



    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <div className={styles.space}>
                </div>
                <div className={styles.right}>
                    
                    <div className={styles.t}>
                        <div className={styles.infoGrid}>
                            <div className={activeIndex === 0 ? styles.active : styles.box}>
                                <p>{containerWidth <= 630 ? boxText[0].short : boxText[0].full}</p>
                            </div>
                            <div className={activeIndex === 1 ? styles.active : styles.box}>
                                <p>{containerWidth <= 630 ? boxText[1].short : boxText[1].full}</p>
                            </div>
                            <div className={activeIndex === 2 ? styles.active : styles.box}>
                                <p>{containerWidth <= 630 ? boxText[2].short : boxText[2].full}</p>
                            </div>
                            <div className={activeIndex === 3 ? styles.active : styles.box}>
                                <p>{containerWidth <= 630 ? boxText[3].short : boxText[3].full}</p>
                            </div>

                            <div ref={containerRef} className={styles.middlex}>
                                {isLoaded && <ScrollPort activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>}
                            </div>

                            <div className={activeIndex === 4 ? styles.bottomLineActive : styles.bottomLine}>
                            </div>
                            <div className={styles.copyright}>
                                <p>© copyright 2025 perry servant<br/><span>all right reserved</span></p>
                            </div>
                            <div className={styles.spacer}>
                                <p>///////////////////////////////////////////////////</p>
                            </div>
                            <div className={styles.time}>
                                <Clock/>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            
            <div className={styles.marquee}>
               <Marquee autoFill={true}>
                    <p>| React  | Node.js  | PostgreSQL  | Full-Stack Development | Creative Problem Solving | UI/UX Design | Always Learning</p>
               </Marquee>
            </div>
        </div>
    );
};

export default Home;