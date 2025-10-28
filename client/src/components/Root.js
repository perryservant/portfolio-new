import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProjectProvider } from '../context/ProjectContext';



import styles from '../styles/root.module.css';
import NavProfile from "./NavProfile";
import Profile from "./Profile";
import LoadingBar from "./LoadingBar";

const Root = () => {
    const canvasRef = useRef(null);
    const contactRef = useRef(null);
    const location = useLocation();

    const [isLoading, setIsLoading] = useState(true);
    const [isCollapsedA, setIsCollapsedA] = useState(() => window.innerWidth < 820);
    const [isCollapsedB, setIsCollapsedB] = useState(true);

    const scrollToContact = () => {
        if (contactRef.current) {
            contactRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 820) {
                setIsCollapsedA(true);
            } else {
                setIsCollapsedA(false);
            }
        };
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const generateNoise = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const imageData = ctx.createImageData(canvas.width, canvas.height);
            const buffer = new Uint32Array(imageData.data.buffer);
            for (let i = 0; i < buffer.length; i++) {
                buffer[i] = ((255 * Math.random()) | 0) << 24;
            }
            ctx.putImageData(imageData, 0, 0);
        };

        const loop = () => {
            generateNoise();
            animationFrameId = requestAnimationFrame(loop);
        };

        resize();
        loop();
        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };

    }, []);

    return (
        <ProjectProvider>
            <div className={styles.rootContainer} >
                <canvas
                    ref={canvasRef} className={styles.canva}
                />
                {isLoading && (
                    <LoadingBar onComplete={() => setIsLoading(false)}/>
                )}
                
                <Profile 
                    isCollapsedA={isCollapsedA}
                    setIsCollapsedA={setIsCollapsedA}
                />
                <NavProfile 
                    location={location}
                    isCollapsedA={isCollapsedA}
                    setIsCollapsedA={setIsCollapsedA}
                    isCollapsedB={isCollapsedB} 
                    setIsCollapsedB={setIsCollapsedB}
                    scrollToContact={scrollToContact}
                />
                <Outlet context={{ isLoaded: !isLoading, contactRef, scrollToContact }}/>

            </div>
        </ProjectProvider>
        
    );
};

export default Root;