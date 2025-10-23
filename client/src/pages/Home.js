import { useEffect, useRef, useState } from 'react';

import styles from '../styles/home.module.css';


const Home = () => {
    const marqueeRef = useRef(null);
    const [repeats, setRepeats] = useState(1);
    const text = "Your looping text goes here — ";

    useEffect(() => {
    // calculate how many times to repeat the text so it fills the container
        if (!marqueeRef.current) return; // exit if ref not ready

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
            <div className={styles.block}>

            </div>
            <div className={styles.marquee}>
                <div className={styles.marqueeInner}>
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