import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedPageTransitionProps {
    children: ReactNode;
}

const AnimatedPageTransition = ({ children }: AnimatedPageTransitionProps) => {
    const animation = (variants: any) => {
        return {
            initial: 'initial',
            animate: 'enter',
            exit: 'exit',
            variants
        };
    };

    const opacity = {
        initial: { opacity: 1 },
        enter: {
            opacity: 1,
            transition: {
                delay: 1,
                duration: 0.2,
                delayChildren: 1,
                staggerChildren: 0.2
            }
        },
        exit: {}
    };
    

    const slide = {
        initial: { top: "100vh" },
        enter: {
            top: "100vh",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            top: "0",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        }
    };

    const perspective = {
        initial: { 
            y: 0,
            scale: 1,
            opacity: 1
        },
        enter: {
            y: 0,
            scale: 1,
            opacity: 1
        },
        exit: {
            y: -100,
            scale: 0.9,
            opacity: 0.5,
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }
    };
    
    return (
        <div className="bg-black">
            <motion.div {...animation(slide)} className="fixed top-0 left-0 bg-[rgb(241,241,241)] w-screen h-screen z-[9998]"/>
            <motion.div {...animation(perspective)} className="relative w-full h-full bg-[rgb(241,241,241)] z-[1]">
                <motion.div {...animation(opacity)}>
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AnimatedPageTransition;
