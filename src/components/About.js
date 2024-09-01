import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Features from './Features';
import PersonalIntro from './PersonalIntro';
import TechStack from './TechStack';
import styles from './About.module.css';

function About() {
  const controls = useAnimation();
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden");
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = titleRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '60px',
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  return (
    <section id="about" className={styles.about}>
      <motion.h1
        ref={titleRef}
        initial="hidden"
        animate={controls}
        variants={titleVariants}
        className={styles.title}
      >
        ABOUT
        <motion.span
          variants={underlineVariants}
          className={`${styles.underline}`}
        ></motion.span>
      </motion.h1>
      <Features />
      <div className={styles.mainContent}>
        <div className={styles.leftColumn}>
          <PersonalIntro />
        </div>
        <div className={styles.rightColumn}>
          <TechStack />
        </div>
      </div>
    </section>
  );
}

export default About;