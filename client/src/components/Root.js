import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";

import styles from '../styles/root.module.css';
import NavProfile from "./NavProfile";

const Root = () => {
  const canvasRef = useRef(null);

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
    <div className={styles.rootContainer} >
        <canvas
            ref={canvasRef} className={styles.canva}
        />
        <div>
            <NavProfile/>
        </div>
        <div>
            <Outlet />
        </div>
    </div>
  );
};

export default Root;