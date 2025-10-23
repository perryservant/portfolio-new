import { useState } from 'react';
import styles from '../styles/contact.module.css';

const Contact = () => {
   
    return (
        <div className={styles.mainContainer}>
            <div className={styles.top}>
                <h1>Contact</h1>
            </div>
            <div className={styles.bottom}>
                <div className={styles.left}>
                    <div className={styles.contactInfo}>
                        <p><span>Every great project starts with a conversation. 
                            If you have a question, an idea, or a proposal, this is 
                            the place to share it.</span></p>
                        <p>
                            Complete the form on the right, and I’ll respond personally 
                            as soon as I can. Prefer email? Reach out directly at 
                            contact@perryservant.com
                        </p>
                        
                        <p>Let’s turn creative ideas into real, working solutions—together.</p>
                    </div>
                </div>
                <form className={styles.contactForm}>
                    <div className={styles.containerForm}>
                        <div className={styles.topConsole}>
                            <p>console setup</p>
                            <br/>
                            <p>-------------</p>
                            <br/>
                            <p>loading contact form : 100%</p>
                        </div>

                        <div className={styles.between}><p>start of contact form</p></div>

                        <div className={styles.middleConsole}>
                            <p><span>01</span> enter name:</p>
                            <p><span>02</span>  <input type='text' name='name'/></p>
                            <p><span>03</span> </p>
                            <p><span>04</span> </p>
                            <p><span>05</span> enter email:</p>
                            <p><span>06</span>  <input type='email' name='email' /></p> 
                            <p><span>07</span> </p>
                            <p><span>08</span> </p>
                            <p><span>09</span> select request:</p>
                            <p><span>10</span> </p>
                            <p><span>12</span> </p>
                            <p><span>13</span> <input 
                                    type='checkbox' 
                                    name='request' 
                                    id='demo' 
                                    value='demo request'
                                    className={styles.customCheckbox}
                                /> <label htmlFor='demo'>demo request(s)</label></p>
                            <p><span>14</span> </p>
                            <p><span>15</span> <input 
                                    type='checkbox' 
                                    name='request' 
                                    id='demo' 
                                    value='come work for us'
                                    className={styles.customCheckbox}
                                /> <label htmlFor='demo'>work for us</label></p>
                            <p><span>16</span> </p>
                            <p><span>17</span> <input 
                                    type='checkbox' 
                                    name='request' 
                                    id='demo' 
                                    value='come work for us'
                                    className={styles.customCheckbox}
                                /> <label htmlFor='demo'>i have a project idea</label></p>
                        </div>
                        <div className={styles.bottomConsole}>
                            <p>end of contact form</p>
                            <br/>
                            <p>-------------------</p>
                            <br/>
                            <button type='submit'><p>submit here</p></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;