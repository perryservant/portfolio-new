import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProjectProvider } from '../context/ProjectContext';
import NavProfile from "./NavProfile";
import Profile from "./Profile";
import LoadingBar from "./LoadingBar";
import Footer from "./Footer";

interface OutletContext {
    isLoaded: boolean;
}

const Root = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const location = useLocation();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Always collapsed by default - user must click to expand
    const [isCollapsedA, setIsCollapsedA] = useState<boolean>(true);
    const [isCollapsedB, setIsCollapsedB] = useState<boolean>(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        let animationFrameId: number;

        const resize = () => {
            // Use full screen dimensions to cover safe areas (notch/Dynamic Island)
            // In standalone web app mode, use screen dimensions; otherwise use window dimensions
            const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
            const width = isStandalone ? window.screen.width : (window.visualViewport?.width || window.innerWidth || document.documentElement.clientWidth);
            const height = isStandalone ? window.screen.height : (window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight);
            canvas.width = width;
            canvas.height = height;
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
            <div className="bg-[rgb(241,241,241)] w-full flex flex-col overflow-hidden transition-opacity duration-400" style={{ paddingTop: 0, paddingBottom: 'env(safe-area-inset-bottom)', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)', minHeight: '100vh', height: '100vh' }}>
                <canvas
                    ref={canvasRef} 
                    className="fixed opacity-[0.08] pointer-events-none z-[9999]"
                    style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}
                />
                {isLoading && (
                    <LoadingBar onComplete={() => setIsLoading(false)}/>
                )}
                
                <div className="pt-[env(safe-area-inset-top)] flex-1 min-h-0 flex flex-col overflow-hidden">
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
                    <div className="flex-1 min-h-0 overflow-hidden">
                        <Outlet context={{ isLoaded: !isLoading } as OutletContext}/>
                    </div>
                    <Footer showMarquee={location.pathname === '/'} />
                </div>
            </div>
        </ProjectProvider>
        
    );
};

export default Root;
