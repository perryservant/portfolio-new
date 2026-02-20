import { useEffect, useRef, ReactNode } from 'react';
import AnimatedParagraph from './AnimatedParagraph';

interface ScrollPortProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

const ScrollPort = ({ activeIndex, setActiveIndex }: ScrollPortProps) => {
    const sectionRef = useRef<(HTMLElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef<boolean>(false);

    const sections: Array<{
        title: string;
        content: string | ReactNode;
    }> = [
        {
            title: "Engineering",
            content: "I build native applications for iOS, Android, macOS, and Windows using React Native and TypeScript. I specialize in creating seamless cross-platform experiences with React Native, leveraging my expertise in modern React ecosystems. My passion lies in delivering high-performance, platform-optimized applications that provide native user experiences across all major platforms using a single codebase."
        },
        {
            title: "Core Competencies",
            content: "Proficient in TypeScript, React Native, Node.js, Fastify, Zustand, Tanstack, Express, PostgreSQL. Experienced with RESTful APIs, version control with Git, and agile development methodologies to deliver clean and maintainable code."
        },
        {
            title: "Highlighted Projects",
            content: "Collaborated as part of a three-person team to develop FlowMaestro, a comprehensive AI workflow orchestration platform featuring visual workflow builders and autonomous AI agents. Independently architected and built The Wetland Shop, a full-stack e-commerce solution, and Novellum, a backend-as-a-service platform for modern businesses. Each project demonstrates expertise in scalable system design, production-ready deployment strategies, and collaborative development practices."
        },
        {
            title: "Skills & Expertise",
            content: "As a full-stack engineer, I specialize in architecting and building complete systems from the ground up, including custom engines and scalable infrastructure. With expertise in designing full-stack architectures, developing reusable engine components, and implementing production-ready solutions. I focus on writing clean, maintainable code, understanding modern development practices, and continuously improving my technical abilities through collaborative team projects and independent development work."
        }
    ];

    // Scroll to section when activeIndex changes programmatically (from navigation tabs)
    useEffect(() => {
        const section = sectionRef.current[activeIndex];
        if (section && containerRef.current && !isScrollingRef.current) {
            // Check if section is already in view to avoid unnecessary scrolling
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            
            // Only scroll if section is not already in view
            const isInView = sectionRect.top >= containerRect.top && 
                           sectionRect.bottom <= containerRect.bottom;
            
            if (!isInView) {
                isScrollingRef.current = true;
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Reset flag after scroll completes
                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 1000);
            }
        }
    }, [activeIndex]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                // Don't update if we're programmatically scrolling
                if (isScrollingRef.current) return;
                
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveIndex(index);
                    }
                });
            },
            {
                root: containerRef.current,
                threshold: 0.8
            }
        );

        sectionRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, [setActiveIndex]);

    const handleClick = (index: number) => {
        const section = sectionRef.current[index];
        if (section && containerRef.current) {
            isScrollingRef.current = true;
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                isScrollingRef.current = false;
            }, 1000);
        }
    };

    return (
        <div className="h-full w-full grid grid-cols-[1fr_40px] max-[430px]:flex" style={{ height: '100%' }}>
            <div 
                ref={containerRef}
                className="h-full w-full overflow-y-scroll scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-y snap-mandatory"
                style={{ height: '100%' }}
            >
                {sections.map((section, idx) => (
                    <section
                        key={idx}
                        data-index={idx}
                        ref={(el) => {
                            sectionRef.current[idx] = el;
                        }}
                        className="h-full w-full snap-start flex flex-col justify-center items-center font-grotesk-mono text-center px-[20px] max-[1200px]:px-[15px] max-[820px]:min-h-0 max-[820px]:py-[20px] max-[820px]:h-full"
                        style={{ height: '100%', minHeight: '100%' }}
                    >
                        <div className="flex flex-col items-center gap-[20px] w-full flex-shrink-0">
                            <h1
                                className={`text-6xl font-medium uppercase leading-tight max-[1200px]:text-5xl max-[820px]:text-4xl max-[430px]:text-3xl break-words flex-shrink-0 transition-all duration-[800ms] ease-out ${
                                    activeIndex === idx 
                                        ? 'opacity-100 translate-y-0' 
                                        : 'opacity-0 translate-y-5'
                                }`}
                            >
                                {section.title}
                            </h1>
                            
                            {typeof section.content === 'string' ? (
                                <AnimatedParagraph text={section.content} isActive={activeIndex === idx}/>
                            ) : (
                                <div className="flex justify-center items-center flex-shrink-0">
                                    {section.content}
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
            <div className="flex flex-col items-end justify-center gap-[10px] max-[430px]:hidden">
                {sections.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(idx)}
                        className={`w-[65%] h-[5px] border-t border-gainsboro transition-all duration-300 cursor-pointer hover:w-full hover:border-t-black ${
                            activeIndex === idx ? 'w-full border-t-black' : ''
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ScrollPort;
