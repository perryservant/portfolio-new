import { useEffect, useRef, useState } from 'react';

import styles from '../styles/home.module.css';
import ScrollPort from '../components/ScrollPort';
import Clock from '../components/Clock';


const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const marqueeRef = useRef(null);
    const [repeats, setRepeats] = useState(6);
    const text = "Your looping text goes here — ";

    useEffect(() => {
    
        if (!marqueeRef.current) return; 

        const containerWidth = marqueeRef.current.offsetWidth;

        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'nowrap';
        tempSpan.innerText = text;
        document.body.appendChild(tempSpan);
        const textWidth = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        const neededRepeats = Math.ceil(containerWidth / textWidth) + 1;
        setRepeats(neededRepeats);
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
                            <div>
                                <p>© copyright 2025 perry servant<br/><span>all right reserved</span></p>
                            </div>
                            <div>
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
                <div className={styles.marqueeInner}>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                    <span>{text}</span>
                </div>
            </div>
        </div>
    );
};

export default Home;