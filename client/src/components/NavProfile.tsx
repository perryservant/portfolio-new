import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { GoGrabber } from "react-icons/go";

interface NavProfileProps {
    location: ReturnType<typeof useLocation>;
    isCollapsedB: boolean;
    setIsCollapsedB: (value: boolean) => void;
    isCollapsedA: boolean;
    setIsCollapsedA: (value: boolean) => void;
}

const NavProfile = ({ 
    location, isCollapsedB, 
    setIsCollapsedB, 
    isCollapsedA, 
    setIsCollapsedA
}: NavProfileProps) => {
    const { selectedProject } = useProject();

    const containerRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [dragging, setDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleCollapseToggle = () => {
        setIsCollapsedB(!isCollapsedB);
    };

    const breadCrumbs = (): string => {
        if (location.pathname === '/') {
            return 'home';
        } else if (location.pathname.startsWith('/projectpage')) {
            return 'projectpage';
        } else {
            return location.pathname.replace('/', '');
        }
    };

    const updatePosition = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;

            setPos({ x: centerX, y: centerY });
            setTargetPos({ x: centerX, y: centerY });
        }
    };

    useEffect(() => {
        updatePosition();
    }, []);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (dragging) {
                const newX = e.clientX - offset.x;
                const newY = e.clientY - offset.y;
                setTargetPos({ x: newX, y: newY });
            }
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [dragging, offset]);

    useEffect(() => {
        const handleGlobalMouseUp = () => setDragging(false);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, []);

    useEffect(() => {
        let animationFrame: number | undefined;

        const followCursor = () => {
            setPos(prev => ({
                x: prev.x + (targetPos.x - prev.x) * 0.2,
                y: prev.y + (targetPos.y - prev.y) * 0.2
            }));
            animationFrame = requestAnimationFrame(followCursor);
        };

        if (dragging) {
            followCursor();
        }

        return () => {
            if (animationFrame !== undefined) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [dragging, targetPos]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragging(true);
        setOffset({
            x: e.clientX - pos.x,
            y: e.clientY - pos.y
        });
    };

    const handlePointerDown = (e: React.TouchEvent | React.MouseEvent) => {
        e.preventDefault();
        const point = 'touches' in e ? e.touches[0] : e;
        setDragging(true);
        setOffset({
            x: point.clientX - pos.x,
            y: point.clientY - pos.y
        });
    };

    const handlePointerMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!dragging) return;
        const point = 'touches' in e ? e.touches[0] : e;
        setTargetPos({
            x: point.clientX - offset.x,
            y: point.clientY - offset.y
        });
    };

    const handlePointerUp = () => setDragging(false);

    return (
        <div 
            ref={containerRef}
            className="absolute min-h-[40px] w-auto flex items-center gap-[10px] z-[1000]"
            style={{ left: pos.x, top: pos.y }}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
        >
            {/* Grab Icon Container */}
            <div 
                className="bg-white/30 backdrop-blur-[1px] min-h-[40px] flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors duration-200 hover:text-white relative group rounded"
                onMouseDown={handleMouseDown}
                onMouseUp={handlePointerUp}
            >
                <GoGrabber className="text-[30px] transition-all duration-200"/>
                <span className="invisible opacity-0 absolute -bottom-[55%] left-1/2 -translate-x-1/2 text-white text-[11px] whitespace-nowrap transition-opacity duration-300 z-10 group-hover:visible group-hover:opacity-100">GRAB</span>
            </div>
            
            {/* Content Container */}
            <div className="bg-white/30 backdrop-blur-[1px] flex items-center gap-[5px] min-h-[40px] h-full rounded">
                <div className="w-auto px-[5px] flex justify-center items-center min-w-fit cursor-pointer" onClick={handleCollapseToggle}>
                    <div className="flex items-center">
                        <p className="font-medium uppercase text-[13px]">cd:</p>
                        <p className="font-medium uppercase text-[13px] ml-[15px]">\</p>
                        <p className="font-medium uppercase text-[13px] ml-[15px] hover:text-[rgb(207,171,41)] transition-colors duration-300">ovellum</p>
                        <p className="font-medium uppercase text-[13px] ml-[15px]">\</p>
                    </div>
                </div>
                
                <div className="absolute w-[136px] top-full block z-[1000] left-0">
                    <div className={`bg-white/22 backdrop-blur-[1px] w-auto px-[10px] flex justify-center items-center ${
                        !isCollapsedB 
                            ? 'bg-white/30 backdrop-blur-[1px] max-h-[500px] overflow-hidden transition-[max-height] duration-[2.5s]' 
                            : 'max-h-0 overflow-hidden transition-[max-height] duration-800'
                    }`}>
                        <div className="w-full block">
                            <ul className="list-none m-0 p-[8px_0] block">
                                <li>
                                    <NavLink 
                                        className="block py-[5px] uppercase text-[14px] no-underline text-black hover:text-[rgb(207,171,41)] transition-colors duration-300 hover:bg-none cursor-pointer" 
                                        onClick={() => {
                                            handleCollapseToggle();
                                        }} 
                                        to='/'
                                    >
                                        \ home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink 
                                        className="block py-[5px] uppercase text-[14px] no-underline text-black hover:text-[rgb(207,171,41)] transition-colors duration-300 hover:bg-none cursor-pointer" 
                                        onClick={() => {
                                            handleCollapseToggle();
                                        }} 
                                        to='projects'
                                    >
                                        \ projects
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            
                <div className="w-auto px-[5px] flex justify-center items-center min-w-fit">
                    <NavLink className="font-medium uppercase text-[13px] mr-[15px] hover:text-[rgb(207,171,41)] transition-colors duration-300" to="/">perry_servant</NavLink>
                    <p className="font-medium uppercase text-[13px]">\</p>
                </div>
                <div className="w-auto px-[5px] flex justify-center items-center min-w-fit max-[430px]:hidden">
                    <p className="font-medium uppercase text-[13px]">{breadCrumbs()} \</p>
                </div>

                {breadCrumbs() === 'projectpage' && (
                    <div className="w-auto px-[5px] flex justify-center items-center min-w-fit max-[820px]:hidden">
                        <p className="font-medium uppercase text-[13px]">{selectedProject?.name} \</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavProfile;
