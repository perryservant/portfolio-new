import styles from '../styles/home.module.css';
import { PiStackLight } from "react-icons/pi";


const Home = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
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
                            <img src='imgs/Full-Stack Engineer  Codecademy[1] copy.png.png' alt=''/>
                            <p>880DD579-4</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <div className={styles.progressContainer}>
                    <div className={styles.label}>
                        <p>PROGRESS</p>
                    </div>
                    <div className={styles.progress}>
                        <div>
                            <p>
                                loading progress 100%<br/>
                                <br/>
                                <br/>
                                javascript progress 100%<br/>
                                react progress 100%<br/>
                                node.js progress 100%<br/>
                                express.js progress 100%<br/>
                                <br/>
                                <br/>
                                postgressql progress 100%<br/>
                                web security progress 100%<br/>
                                data structures progress 100%<br/>
                                algorithms progress 100%<br/>
                                <br/>
                                <br/>
                                python progress 30%<br/>
                                c++ progress 5%
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;