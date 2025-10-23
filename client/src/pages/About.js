import styles from '../styles/about.module.css'

const About = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div>
                        <p>console setup</p>
                        <br/>
                        <p>-------------</p>
                        <br/>
                        <p>loading portfolio progile : in progress</p>
                        <p>loading language progress : in progress</p>
                        <p>loading profile photo : in progress</p>
                    </div>
                    <div className={styles.middle}>
                        <p><span>01</span> configuring name</p>
                        <p><span>02</span> configuring certification</p>
                        <p><span>03</span> configuring language</p>
                        <p><span>05</span> configuring technologies</p>
                        <p><span>06</span> configuring language progress</p>
                    </div>

                    <div className={styles.bottomLeft}>
                        <p>welcome to my portfolio</p>
                        <br/>
                        <p>-------------</p>
                        <br/>
                        <p>name : perry servant</p>
                        <p>type : full-stack engineer</p>
                        <p>year : 2025</p>
                        <p>language : js, node, react</p>
                        <p>technologies : git, postgresql, web security, data structure, algorithms</p>
                        <p>javascript : 100%</p>
                        <p>react : 100%</p>
                        <p>node : 100%</p>
                        <p>python : 30%</p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className=''>
                        <div className={styles.label}>
                            <p>photo</p>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.imgContainer}>
                                <div className={styles.test}>
                                    <img src='/imgs/CT-Scan-008-Face-2.png' alt='' className={styles.ctScan}/>
                                </div>
                                
                                <img src='/imgs/E4F5398A-0B35-4B45-8156-16643614BFC4_1_105_c.jpeg' alt=''/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;