import React from 'react';
import styles from './Home.module.css';
import DynamicBackground from './DynamicBackground';

const Home = () => {
  return (
    <section id="home" className={styles.home}>
      <DynamicBackground />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Hello, I'm <span className={styles.name}>Tong Wu</span>.
        </h1>
        <h2 className={styles.subtitle}>Recent graduate eager to learn and contribute to web development.</h2>
        <div className={styles.cta}>
          <a href="#about" className={styles.ctaButton}>View my work</a>
        </div>
      </div>
    </section>
  );
};

export default Home;