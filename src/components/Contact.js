import React, { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Contact.module.css';

const Contact = () => {
  const currentYear = new Date().getFullYear();
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    try {
      const response = await fetch("https://formspree.io/f/mldrvnol", { // 替换为您的 Formspree 表单 ID
        method: "POST",
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus("Thanks for your submission!");
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus("Oops! There was a problem submitting your form. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.content}>
        <h2 className={styles.title}>CONTACT</h2>
        <div className={styles.underline}></div>
        <p className={styles.subtitle}>Have a question or want to work together?</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={styles.input}
            required
          />
          <input
            type="email"
            name="_replyto"
            placeholder="Enter email"
            className={styles.input}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className={styles.textarea}
            required
          ></textarea>
          <button type="submit" className={styles.submit}>SUBMIT</button>
        </form>
        {formStatus && <p className={styles.formStatus}>{formStatus}</p>}
      </div>
      
      <button className={styles.scrollTop} onClick={scrollToTop}>
        <span className={styles.arrowUp}></span>
      </button>
      
      <div className={styles.socialIcons}>
        <SocialIcon Icon={FaLinkedinIn} href="https://www.linkedin.com/in/tong-wu-3b3a6319a" />
        <SocialIcon Icon={FaXTwitter} href="https://x.com/wut0049" />
        <SocialIcon Icon={FaGithub} href="https://github.com/Londonplane" />
      </div>
      
      <p className={styles.copyright}>TONG WU ©{currentYear}</p>
    </section>
  );
};

const SocialIcon = ({ Icon, href }) => (
  <a href={href} className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
    <Icon />
  </a>
);

export default Contact;