import React from 'react';
import Features from './Features';
import PersonalIntro from './PersonalIntro';
import TechStack from './TechStack';
import styles from './About.module.css';

function About() {
  return (
    <section id="about" className={styles.about}>
      <h1 className={styles.title}>ABOUT</h1>
      <Features />
      <div className={styles.content}>
        <PersonalIntro />
        <TechStack />
      </div>
    </section>
  );
}

export default About;