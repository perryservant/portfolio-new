import { useState } from "react";

import { PiStackLight } from "react-icons/pi";
import { BiCertification } from "react-icons/bi";
import styles from '../styles/profile.module.css';

const Profile = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapseToggle = () => {
        setIsCollapsed(!isCollapsed);
    };
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.box}>
                <div className={styles.boxTop}>
                    <div className={styles.boxTopLeft}>
                        <p>Full-Stack Engineer</p>
                    </div>
                    <div className={styles.boxTopRight}>
                        <PiStackLight className={styles.icon}/>
                    </div>
                </div>
                <div className={styles.boxBottom}>
                    <div className={styles.boxBottomLeft}>
                        <div className={styles.certiDate}>
                            <p>SEPT</p>
                            <p>25</p>
                        </div>
                        
                    </div>
                    <div className={styles.boxBottomRight}>
                        <img src='/imgs/Full-Stack Engineer  Codecademy[1] copy.png.png' alt=''/>
                        <p>880DD579-4</p>
                    </div>
                </div>
            </div>
            <div className={styles.block}>
                    <div className={styles.collapse} onClick={handleCollapseToggle}>
                        <p>{isCollapsed ? 'v' : '^'}</p>
                        <p>{isCollapsed ? 'expand' : 'collapse'}</p>
                        <p>{isCollapsed ? 'v' : '^'}</p>
                    </div>
                    <div className={!isCollapsed ? styles.accordionContentOpen : styles.accordionContentClosed}>
                        <div className={styles.profile}>
                            <div className={styles.container}>
                                <div className={styles.imgContainer}>
                                    <div className={styles.ctScan}>
                                        <img src='/imgs/CT-Scan-008-Face-2.png' alt='' className={styles.ctScan}/>
                                    </div>
                                    
                                    <img src='/imgs/E4F5398A-0B35-4B45-8156-16643614BFC4_1_105_c.jpeg' alt=''/>
                                </div>
                            </div>
                            <div className={styles.exams}>
                                <div className={styles.stamp}>
                                    <BiCertification/>
                                </div>
                                <p>Front-End Dev</p>
                                <p>Back-End Dev</p>
                                <p>Full-Stack Dev</p>
                            </div>
                        </div>
                        <div className={styles.name}>
                            <p>perry servant</p>
                        </div>
                        <div className={styles.bottomBlock}>
                            <div className={styles.bottomBlockTop}>
                                <div className={styles.bottomBlockTopLeft}>
                                    <div className={styles.leftLabel}>
                                        <p>Technologies</p>
                                    </div>
                                </div>
                                <div className={styles.contentBox}>
                                    <p>
                                        Javascript, Git & GitHub, React, Redux, Node.js, 
                                        Express.js, SQL, PostegresSQL, Web Security, 
                                        Data structures, Algorithms
                                    </p>
                                </div>
                            </div>
                            <div className={styles.bottomBlockBottom}>
                                <div className={styles.bottomBlockBottomRight}>
                                    <div className={styles.leftLabel}>
                                        <p>Language Progress</p>
                                    </div>
                                </div>
                                <div className={styles.contentBoxBottom}>
                                    <p><span>Javascript</span> : 100%</p>
                                    <p><span>Node</span> : 100%</p>
                                    <p><span>React</span> : 100%</p>
                                    <p><span>Python</span> : 30%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
        </div>
            
        
    );
};

export default Profile;