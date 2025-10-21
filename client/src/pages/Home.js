import styles from '../styles/home.module.css';


const Home = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
               
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