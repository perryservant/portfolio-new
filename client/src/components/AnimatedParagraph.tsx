import { useEffect, useState } from "react";

interface AnimatedParagraphProps {
    text: string;
    isActive: boolean;
}

const AnimatedParagraph = ({ text, isActive }: AnimatedParagraphProps) => {
    const [trigger, setTrigger] = useState<boolean>(false);
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);

    useEffect(() => {
        if (isActive) {
            setTrigger(false);
            const timeout = setTimeout(() => {
                setTrigger(true);
                setHasAnimated(true);
            }, 200);
            return () => clearTimeout(timeout);
        } else {
            // Reset animation state when section becomes inactive
            setTrigger(false);
            setHasAnimated(false);
        }
    }, [isActive]);

    const words = text.split(" ");

    return (
        <p className="max-w-[600px] px-[20px] text-[15px] leading-relaxed max-[1200px]:text-[14px] max-[820px]:text-[13px] max-[430px]:text-[12px]">
            {words.map((word, idx) => (
                <span
                    key={idx}
                    className={`inline-block transition-opacity duration-500 ease-out ${
                        trigger || hasAnimated ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                    {word}&nbsp;
                </span>
            ))}
        </p>
    );
};

export default AnimatedParagraph;
