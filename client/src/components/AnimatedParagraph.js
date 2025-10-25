import { useEffect, useState } from "react";
import styles from '../styles/scrollport.module.css';

const AnimatedParagraph = ({ text, isActive }) => {
    const [trigger, setTrigger] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isActive) {
            setTrigger(false);
            const timeout = setTimeout(() => {
                setTrigger(true);
                setHasAnimated(true);
            }, 150)    
            return () => clearTimeout(timeout);
        }
    }, [isActive]);

    const words = text.split(" ");

    return (
        <p>
            {words.map((word, idx) => (
                <span
                    key={idx}
                    className={`${styles.word} ${
                        trigger || hasAnimated ? styles.active : ""
                    }`}
                    style={{ animationDelay: `${idx * 0.15}s` }}
                >
                    {word}&nbsp;
                </span>
            ))}
        </p>
    );
};

export default AnimatedParagraph;