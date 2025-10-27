import { useEffect, useRef, useState } from 'react';
import styles from '../styles/scrollport.module.css';
import AnimatedParagraph from '../components/AnimatedParagraph';

import api from '../api/Axios';

const ScrollPort = ({ activeIndex, setActiveIndex }) => {
    const sectionRef = useRef([]);
    const containerRef = useRef(null);
    const [formMsg, setFormMsg] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        request: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/contact/submit', formData);
            const data = res.data;
            setFormMsg(data.message);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', request: [] })
        } catch (error) {
            console.error('Failed to submit form', error);
            alert('Failed to submit form');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked} = e.target;

        setFormData((prev) => {
            const updatedRequest = checked
                ? [...prev.request, value]
                : prev.request.filter((item) => item !== value);
            return { ...prev, request: updatedRequest }
        });
    };

    const sections = [
        {
            title: "Full-Stack Developer",
            content: "I build robust and scalable web applications using modern technologies like React, Node.js, and PostgreSQL. I am passionate about creating seamless user experiences and efficient backend systems, bridging the gap between design and functionality."
        },
        {
            title: "Core Competencies",
            content: "Proficient in JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, and MongoDB. Experienced with RESTful APIs, version control with Git, and agile development methodologies to deliver clean and maintainable code."
        },
        {
            title: "Highlighted Projects",
            content: "Developed full-stack applications including e-commerce platforms, real-time dashboards, and portfolio management tools. Focused on responsive design, performance optimization, and integrating secure authentication and data management systems."
        },
        {
            title: "Skills & Expertise",
            content: "As a full-stack engineer in training, I have developed strong skills in JavaScript, React, Node.js, and PostgreSQL. I focus on writing clean, maintainable code, understanding modern development practices, and continuously improving my technical abilities through personal projects and hands-on learning."
        },
        {
            title: "Contact me",
            content: (!isSubmitted ? (
                    <form onSubmit={handleSubmit} className={styles.contactForm}>
                        <input
                            type='text'
                            name='name'
                            placeholder='Enter your name'
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter your email'
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <div className={styles.checkbox}>
                                
                            <label className={styles.checkboxLabel}>
                                <input
                                    type='checkbox'
                                    name='request'
                                    value='Demo request'
                                    className={styles.customCheckbox}
                                    checked={formData.request.includes('Demo request')}
                                    onChange={handleCheckboxChange}
                                />
                                Demo request
                            </label>
                                
                            <label className={styles.checkboxLabel}>
                                <input
                                    type='checkbox'
                                    name='request'
                                    value='Come work for us'
                                    className={styles.customCheckbox}
                                    checked={formData.request.includes('Come work for us')}
                                    onChange={handleCheckboxChange}
                                />
                                Work for us
                            </label>

                            <label className={styles.checkboxLabel}>
                                <input
                                    type='checkbox'
                                    name='request'
                                    value='Project request'
                                    className={styles.customCheckbox}
                                    checked={formData.request.includes('Project request')}
                                    onChange={handleCheckboxChange}
                                />
                                I have a project idea
                            </label>
                        </div>
                        <div className={styles.buttonBox}>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                ) : (
                    <p>{formMsg}</p>
                )
            )
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
    }, []);

    const handleClick = (index) => {
        const section = sectionRef.current[index];
        if (section && containerRef.current) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentContainer} ref={containerRef}>
                {sections.map((section, idx) => (
                    <section
                        key={idx}
                        data-index={idx}
                        ref={(el) => (sectionRef.current[idx] = el)}
                        className={section.title === 'Contact me' ? styles.sectionContact : styles.section}
                    >
                        {section.title === 'Contact me' ? (
                            <h1 className={styles.sectionContactH1}>{section.title}</h1>
                        ) : (
                            <h1
                            className={`${styles.title} ${
                                activeIndex === idx ? styles.active : ""
                            }`}
                            >
                                {section.title}
                            </h1>
                        )}
                        
                        {typeof section.content === 'string' ? (
                            <AnimatedParagraph text={section.content} isActive={activeIndex === idx}/>
                        ) : (
                            <div className={styles.innerContent}>
                                {section.content}
                            </div>
                        )}
                        
                    </section>
                ))}
            </div>
            <div className={styles.indicator}>
                {sections.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleClick(idx)}
                        className={`${styles.line} ${
                            activeIndex === idx ? styles.active : ''
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default ScrollPort;