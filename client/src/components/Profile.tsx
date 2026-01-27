import { PiStackLight } from "react-icons/pi";
import { BiCertification } from "react-icons/bi";
import { motion } from 'framer-motion';

interface ProfileProps {
    isCollapsedA: boolean;
    setIsCollapsedA: (value: boolean) => void;
}

const Profile = ({ isCollapsedA, setIsCollapsedA }: ProfileProps) => {

    const handleCollapseToggle = () => {
        setIsCollapsedA(!isCollapsedA);
    };
    
    return (
        <div className="absolute flex flex-col ml-[30px] mt-[60px] z-[100] w-[300px] max-[820px]:absolute max-[820px]:flex max-[820px]:mt-5 max-[820px]:w-full max-[820px]:px-[10px] max-[820px]:ml-0">
            {/* Header Card */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white border-2 border-black rounded flex flex-col z-[1] w-full max-[820px]:w-full"
            >
                <div className="h-[50px] border-b-2 border-black grid grid-cols-[1fr_80px]">
                    <div className="border-r-2 border-black flex justify-center items-center bg-black/5">
                        <p className="m-0 text-[13px] font-medium uppercase">Full-Stack Engineer</p>
                    </div>
                    <div className="flex justify-center items-center bg-black/5">
                        <PiStackLight className="text-[25px]"/>
                    </div>
                </div>
                <div className="flex-1 min-h-0 grid grid-cols-[60px_1fr]">
                    <div className="flex justify-center items-center border-r-2 border-black bg-black/5">
                        <div className="-rotate-90">
                            <p className="m-0 text-[11px] font-medium uppercase">SEPT</p>
                            <p className="m-0 text-[11px] font-medium uppercase">25</p>
                        </div>
                    </div>
                    <div className="flex justify-around items-center p-[15px]">
                        <img 
                            src='/imgs/Full-Stack Engineer  Codecademy[1] copy.png.png' 
                            alt='' 
                            className="h-[50px] object-contain"
                        />
                        <p className="m-0 text-[11px] font-grotesk-mono">880DD579-4</p>
                    </div>
                </div>
            </motion.div>

            {/* Collapsible Section */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border-2 border-black rounded mt-[5px] w-full max-[820px]:w-full"
            >
                {/* Toggle Button */}
                <div 
                    className="flex justify-around items-center h-[35px] border-b-2 border-black cursor-pointer hover:bg-black/5 transition-colors"
                    onClick={handleCollapseToggle}
                >
                    <p className="m-0 text-[11px] uppercase font-medium">{isCollapsedA ? '▼' : '▲'}</p>
                    <p className="m-0 text-[11px] uppercase font-medium">{isCollapsedA ? 'expand' : 'collapse'}</p>
                    <p className="m-0 text-[11px] uppercase font-medium">{isCollapsedA ? '▼' : '▲'}</p>
                </div>

                {/* Collapsible Content */}
                <motion.div 
                    initial={false}
                    animate={{
                        height: isCollapsedA ? 0 : 'auto',
                        opacity: isCollapsedA ? 0 : 1
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div className="p-0">
                        {/* Profile Image Section */}
                        <div className="flex max-[820px]:border-b-2 max-[820px]:border-black">
                            <div className="w-[140px] h-[130px] border-r-2 border-black flex items-center justify-center bg-black/5 flex-shrink-0 max-[820px]:w-[120px] max-[820px]:h-[110px]">
                                <div className="relative w-full h-full flex justify-center items-center">
                                    <img 
                                        src='/imgs/E4F5398A-0B35-4B45-8156-16643614BFC4_1_105_c.jpeg' 
                                        alt=''
                                        className="h-[120px] w-[120px] object-cover rounded-full border-2 border-black max-[820px]:h-[100px] max-[820px]:w-[100px]"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col min-w-0">
                                <div className="flex justify-center items-center h-[45px] border-b-2 border-black bg-black/5">
                                    <BiCertification className="text-[22px] text-gray-600"/>
                                </div>
                                <div className="flex-1 flex flex-col justify-center p-[8px] gap-[3px] max-[820px]:pb-0 max-[820px]:p-[8px_8px_0_8px]">
                                    <p className="m-0 p-0 text-[11px] font-medium uppercase whitespace-nowrap">Front-End Eng</p>
                                    <p className="m-0 p-0 text-[11px] font-medium uppercase whitespace-nowrap">Back-End Eng</p>
                                    <p className="m-0 p-0 text-[11px] font-medium uppercase whitespace-nowrap">Full-Stack Eng</p>
                                </div>
                            </div>
                        </div>

                        {/* Name Section */}
                        <div className="flex justify-center items-center h-[40px] border-t-2 border-b-2 border-black bg-black/5 max-[820px]:border-t-0 max-[820px]:-mt-[2px] max-[820px]:pt-0 max-[820px]:pb-0">
                            <p className="uppercase font-medium m-0 p-0 text-[13px] leading-none">perry servant</p>
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col">
                            {/* Technologies */}
                            <div className="flex border-b-2 border-black">
                                <div className="w-[80px] border-r-2 border-black flex justify-center items-center bg-black/5">
                                    <div className="-rotate-90">
                                        <p className="text-[11px] m-0 font-medium uppercase">Tech</p>
                                    </div>
                                </div>
                                <div className="flex-1 p-[15px]">
                                    <p className="m-0 text-[12px] leading-relaxed font-grotesk">
                                        Typescript, Git & GitHub, React, Redux, Node.js, Fastify, 
                                        Express.js, SQL, PostegresSQL, Web Security, 
                                        Data structures, Algorithms
                                    </p>
                                </div>
                            </div>

                            {/* Language Progress */}
                            <div className="flex border-b-2 border-black">
                                <div className="w-[80px] border-r-2 border-black flex justify-center items-center bg-black/5">
                                    <div className="-rotate-90">
                                        <p className="text-[11px] m-0 font-medium uppercase">Progress</p>
                                    </div>
                                </div>
                                <div className="flex-1 p-[15px] flex flex-col gap-[8px]">
                                    <p className="m-0 text-[12px]">
                                        <span className="uppercase font-medium">Typescript</span> : 100%
                                    </p>
                                    <p className="m-0 text-[12px]">
                                        <span className="uppercase font-medium">Node</span> : 100%
                                    </p>
                                    <p className="m-0 text-[12px]">
                                        <span className="uppercase font-medium">React</span> : 100%
                                    </p>
                                    <p className="m-0 text-[12px]">
                                        <span className="uppercase font-medium">Python</span> : 30%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Profile;
