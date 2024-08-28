import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Contact.module.css';

const Contact = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.content}>
        <h2 className={styles.title}>CONTACT</h2>
        <div className={styles.underline}></div>
        <p className={styles.subtitle}>Have a question or want to work together?</p>
        
        <form className={styles.form}>
          <input type="text" placeholder="Name" className={styles.input} />
          <input type="email" placeholder="Enter email" className={styles.input} />
          <textarea placeholder="Your Message" rows="4" className={styles.textarea}></textarea>
          <button type="submit" className={styles.submit}>SUBMIT</button>
        </form>
      </div>
      
      <button className={styles.scrollTop} onClick={scrollToTop}>
        <span className={styles.arrowUp}></span>
      </button>
      
      <div className={styles.socialIcons}>
        <SocialIcon Icon={FaLinkedinIn} href="www.linkedin.com/in/tong-wu-3b3a6319a" />
        <SocialIcon Icon={FaXTwitter} href="https://x.com/wut0049" />
        <SocialIcon Icon={FaGithub} href="https://github.com/Londonplane" />
      </div>
      
      <p className={styles.copyright}>TONG WU ©{currentYear}</p>
    </section>
  );
};

const SocialIcon = ({ Icon, href }) => (
  <a href={href} className={styles.socialIcon}>
    <Icon />
  </a>
);

export default Contact;