import { useState, useEffect } from "react";

interface LoadingBarProps {
    onComplete: () => void;
}

const LoadingBar = ({ onComplete }: LoadingBarProps) => {
    const [progress, setProgress] = useState<number>(0);
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    useEffect(() => {
        let current = 0;
        let animationFrameId: number;

        const animate = () => {
            let increment: number;
            if (current < 18) {
                increment = 0.3;
            } else if (current < 83) {
                increment = 0.7;
            } else if (current < 87) {
                increment = 0.1;
            } else {
                increment = 0.5; 
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
        <div className={`fixed top-0 left-0 w-screen h-full bg-[rgb(241,241,241)] flex justify-center items-center z-[9998] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex flex-col items-center">
                <img src="/imgs/g3.svg" alt="" className="h-10 w-[60px]"/>
                <p className="font-grotesk font-medium pl-[10px]">OVELLUM</p>
            </div>
            <div className="w-screen relative">
                {/* Label above bar */}
                <div 
                    className="absolute bottom-full left-0 -mb-[15px] text-[13px] font-normal p-2 bg-[rgb(241,241,241)]"
                    style={{
                        left: `${progress}%`,
                        transform: "translateX(-50%)"
                    }}
                >
                    {Math.floor(progress)}%
                </div>

                {/* Bar background */}
                <div className="w-full h-[1px] bg-[#ccc] overflow-hidden">
                    {/* Bar fill */}
                    <div 
                        className="h-full bg-black"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoadingBar;
