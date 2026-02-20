import { FaGithub } from 'react-icons/fa';
import Clock from './Clock';
import Marquee from 'react-fast-marquee';

interface FooterProps {
    showMarquee?: boolean;
}

const Footer = ({ showMarquee = false }: FooterProps) => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="border-t-2 border-black">
            <div className="min-h-[60px] flex items-center justify-between px-[50px] max-[820px]:px-[20px] max-[430px]:px-[15px] max-[430px]:flex-col max-[430px]:justify-center max-[430px]:py-[15px] max-[430px]:gap-[10px]">
                <div className="flex items-center gap-[30px] max-[878px]:gap-[20px] max-[430px]:flex-col max-[430px]:gap-[10px] max-[430px]:w-full max-[430px]:items-center">
                    <p className="text-[11px] uppercase font-medium whitespace-nowrap max-[430px]:text-[10px]">
                        © copyright {currentYear} perry servant
                    </p>
                    <div className="max-[878px]:hidden">
                        <p>{'///////////////////////////////////////////////////'}</p>
                    </div>
                    <div className="flex items-center gap-[20px] max-[878px]:gap-[12px]">
                        <a 
                            href="mailto:perry@perryservant.com"
                            className="text-[11px] uppercase font-medium hover:text-[rgb(207,171,41)] transition-colors duration-300 max-[430px]:text-[10px]"
                        >
                            perry@perryservant.com
                        </a>
                        <a 
                            href="https://github.com/perryservant"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-[30px] h-[30px] border border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex-shrink-0 max-[430px]:w-[26px] max-[430px]:h-[26px]"
                            aria-label="GitHub"
                        >
                            <FaGithub className="text-[16px] max-[430px]:text-[13px]" />
                        </a>
                        <Clock/>
                    </div>
                </div>
            </div>
            
            {showMarquee && (
                <div className="h-[40px] max-[430px]:h-[30px] flex border-t border-black overflow-hidden opacity-60">
                    <Marquee autoFill={true} speed={40}>
                        <p className="text-[11px] max-[430px]:text-[8px] uppercase font-medium text-gray-600 mr-[7px]">
                            React Native • Node.js • PostgreSQL • Full-Stack Engineering • Engine Building • UI/UX Design • Architecture • TypeScript • Fastify • Zustand • Tanstack •
                        </p>
                    </Marquee>
                </div>
            )}
        </div>
    );
};

export default Footer;
