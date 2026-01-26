import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProjectProvider } from '../context/ProjectContext';
import NavProfile from "./NavProfile";
import Profile from "./Profile";
import LoadingBar from "./LoadingBar";

interface OutletContext {
    isLoaded: boolean;
}

const Root = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const location = useLocation();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isCollapsedA, setIsCollapsedA] = useState<boolean>(() => {
        // Collapse by default if not on home page or if mobile
        return location.pathname !== '/' || window.innerWidth < 820;
    });
    const [isCollapsedB, setIsCollapsedB] = useState<boolean>(true);

    // Update collapse state when route changes
    useEffect(() => {
        if (location.pathname === '/') {
            // On home page, only collapse if mobile
            setIsCollapsedA(window.innerWidth < 820);
        } else {
            // On other pages, always collapse
            setIsCollapsedA(true);
        }
    }, [location.pathname]);

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
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        let animationFrameId: number;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
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
            <div className="bg-[rgb(241,241,241)] h-[100dvh] w-full pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-hidden transition-opacity duration-400">
                <canvas
                    ref={canvasRef} 
                    className="fixed top-0 left-0 w-full h-[100dvh] opacity-[0.08] pointer-events-none z-[9999]"
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
                />
                <Outlet context={{ isLoaded: !isLoading } as OutletContext}/>

            </div>
        </ProjectProvider>
        
    );
};

export default Root;
