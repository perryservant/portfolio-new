import { useEffect, useRef, ReactNode } from 'react';
import AnimatedParagraph from './AnimatedParagraph';

interface ScrollPortProps {
    activeIndex: number;
    setActiveIndex: (index: number) => void;
}

const ScrollPort = ({ activeIndex, setActiveIndex }: ScrollPortProps) => {
    const sectionRef = useRef<(HTMLElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const sections: Array<{
        title: string;
        content: string | ReactNode;
    }> = [
        {
            title: "Full-Stack Developer",
            content: "I build robust and scalable web applications using modern technologies like React, Node.js, and PostgreSQL. I am passionate about creating seamless user experiences and efficient backend systems, bridging the gap between design and functionality."
        },
        {
            title: "Core Competencies",
            content: "Proficient in TypeScript, React, Node.js, Fastify, Express, PostgreSQL, and MongoDB. Experienced with RESTful APIs, version control with Git, and agile development methodologies to deliver clean and maintainable code."
        },
        {
            title: "Highlighted Projects",
            content: "Developed full-stack applications including e-commerce platforms, real-time dashboards, and portfolio management tools. Focused on responsive design, performance optimization, and integrating secure authentication and data management systems."
        },
        {
            title: "Skills & Expertise",
            content: "As a full-stack engineer in training, I have developed strong skills in JavaScript, React, Node.js, and PostgreSQL. I focus on writing clean, maintainable code, understanding modern development practices, and continuously improving my technical abilities through personal projects and hands-on learning."
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
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
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-full w-full grid grid-cols-[1fr_40px] max-[430px]:flex">
            <div 
                ref={containerRef}
                className="h-full w-full overflow-y-scroll scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-y snap-mandatory"
            >
                {sections.map((section, idx) => (
                    <section
                        key={idx}
                        data-index={idx}
                        ref={(el) => {
                            sectionRef.current[idx] = el;
                        }}
                        className="h-full w-full snap-start flex flex-col justify-center items-center font-grotesk-mono text-center"
                    >
                        <h1
                            className={`text-5xl m-0 max-[430px]:text-[50px] ${
                                activeIndex === idx 
                                    ? 'opacity-100 translate-y-0 animate-[slideFadeIn_0.8s_forwards]' 
                                    : 'opacity-0 translate-y-5'
                            }`}
                        >
                            {section.title}
                        </h1>
                        
                        {typeof section.content === 'string' ? (
                            <AnimatedParagraph text={section.content} isActive={activeIndex === idx}/>
                        ) : (
                            <div className="flex-1 flex justify-center items-center">
                                {section.content}
                            </div>
                        )}
                        
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
