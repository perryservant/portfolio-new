import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ProjectProvider } from '../context/ProjectContext';

import { PiStackLight } from "react-icons/pi";
import styles from '../styles/root.module.css';
import NavProfile from "./NavProfile";

const Root = () => {
  const canvasRef = useRef(null);
  const location = useLocation();

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
            <div className={styles.box}>
                <div className={styles.boxTop}>
                    <div className={styles.boxTopLeft}>
                        <p>Full-Stack Engineer</p>
                    </div>
                    <div className={styles.boxTopRight}>
                        <PiStackLight className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.boxBottom}>
                    <div className={styles.boxBottomLeft}>
                        <div className={styles.certiDate}>
                            <p>SEPT</p>
                            <p>25</p>
                        </div>
                        
                    </div>
                    <div className={styles.boxBottomRight}>
                        <img src='/imgs/Full-Stack Engineer  Codecademy[1] copy.png.png' alt=''/>
                        <p>880DD579-4</p>
                    </div>
                </div>
            </div>
            <div>
                <NavProfile location={location}/>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    </ProjectProvider>
    
  );
};

export default Root;