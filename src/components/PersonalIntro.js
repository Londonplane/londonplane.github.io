import React from 'react';
import styles from './PersonalIntro.module.css';
import myPhoto from '../assets/images/profile-photo.jpeg';

const PersonalIntro = () => {
  return (
    <div className={styles.personalIntro}>
      <div className={styles.photoContainer}>
        {myPhoto ? (
          <img src={myPhoto} alt="Portrait of the developer" className={styles.photo} />
        ) : (
          <div className={styles.photoPlaceholder}>Image not found</div>
        )}
      </div>
      <div className={styles.introContent}>
        <h3 className={styles.question}>Who's this guy?</h3>
        <p className={styles.bio}>
          I'm a restless explorer. From 10 years of classical piano to chemistry research, 
          then leaping from China to Germany to study computer science - my life trajectory 
          is like a genre-crossing symphony. Now, as a computer science student on the brink 
          of graduation, I stand at another turning point in life, eager to find my true 
          passion in the tech industry.
        </p>
        <p className={styles.callToAction}>
          Let's make something special together!
        </p>
      </div>
    </div>
  );
};

export default PersonalIntro;