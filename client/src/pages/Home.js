import { useEffect, useRef, useState } from 'react';

import styles from '../styles/home.module.css';
import ScrollPort from '../components/ScrollPort';
import Clock from '../components/Clock';
import Marquee from "react-fast-marquee";


const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <div className={styles.space}>
                </div>
                <div className={styles.right}>
                    
                    <div className={styles.t}>
                        <div className={styles.infoGrid}>
                            <div className={activeIndex === 0 ? styles.active : styles.box}>
                                <p>full-satch Developer</p>
                            </div>
                            <div className={activeIndex === 1 ? styles.active : styles.box}>
                                <p>core competencies</p>
                            </div>
                            <div className={activeIndex === 2 ? styles.active : styles.box}>
                                <p>Highlighted Projects</p>
                            </div>
                            <div className={activeIndex === 3 ? styles.active : styles.box}>
                                <p>Professional experience</p>
                            </div>

                            <div className={styles.middlex}>
                                <ScrollPort activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
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
                    <p>Hello this is a loop -</p>
               </Marquee>
            </div>
        </div>
    );
};

export default Home;