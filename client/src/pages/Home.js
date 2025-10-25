import { useEffect, useRef, useState } from 'react';

import styles from '../styles/home.module.css';
import Projects from './Projects';


const Home = () => {
    const marqueeRef = useRef(null);
    const [panel, setPanel] = useState('projects')
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

    const panelToggle = (panel) => {
        if (panel === 'projects') {
            return <Projects/>
        }

    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <div className={styles.space}>
                </div>
                <div className={styles.right}>
                    
                    <div className={styles.t}>
                        <div className={styles.infoGrid}>
                            <div className={styles.box}>
                                <p>primary</p>
                            </div>
                            <div className={styles.box}>
                                <p>go deeper</p>
                            </div>
                            <div className={styles.box}>
                                <p>secure</p>
                            </div>
                            <div className={styles.box}>
                                <p>innovate</p>
                            </div>

                            <div className={styles.middlex}>
                                <h1>Let's build you next porject<br/>together</h1>
                                
                            </div>

                            <div className={styles.bottomLine}>
                            </div>
                            <div>
                                <p>© copyright 2025 perry servant<br/><span>all right reserved</span></p>
                            </div>
                            <div>
                                <p>///////////////////////////////////////////////////</p>
                            </div>
                            <div className={styles.time}>
                                <p>19:09.23</p>
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