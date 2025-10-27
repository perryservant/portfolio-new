import { useState, useEffect } from "react";

const LoadingBar = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let current = 0;
        let animationFrameId;

        const animate = () => {
            let increment;
            if (current < 18) {
                increment = 0.1;
            } else if (current < 83) {
                increment = 0.7;
            } else {
                increment = 0.2; 
            }

            current += increment;

            if (current >= 100) {
                setProgress(100);
                setFadeOut(true);
                setTimeout(() => onComplete(), 500);
                return;
            }

            setProgress(current);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, [onComplete]);

    return (
        <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgb(241,241,241)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9998,
                opacity: fadeOut ? 0 : 1,
                transition: "opacity 0.5s ease"
            }}
        >
            <div style={{ width: "100vw", position: "relative" }}>
                {/* Label above bar */}
                <div style={{
                    position: "absolute",
                    bottom: "100%",
                    left: `${progress}%`,
                    transform: "translateX(-50%)",
                    marginBottom: "-15px",
                    fontSize: '13px',
                    fontWeight: 400,
                    padding: '8px',
                    backgroundColor: 'rgb(241,241,241)'
                }}>
                    {Math.floor(progress)}%
                </div>

                {/* Bar background */}
                <div style={{
                        width: "100%",
                        height: "1px",
                        backgroundColor: "#ccc",
                        overflow: "hidden"
                    }}
                >
                    {/* Bar fill */}
                    <div style={{
                        width: `${progress}%`,
                        height: "100%",
                        backgroundColor: "#000",
                    }} />
                </div>
            </div>
        </div>
    );
};

export default LoadingBar;