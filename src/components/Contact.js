import React, { useState } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import styles from './Contact.module.css';

const Contact = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please fill in all fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    // Here, you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    console.log('Form data:', formData);
    setFormStatus('Message sent successfully!');
    
    // Clear form after submission
    setFormData({ name: '', email: '', message: '' });
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
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className={styles.textarea}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button type="submit" className={styles.submit}>SUBMIT</button>
        </form>
        {formStatus && <p className={styles.formStatus}>{formStatus}</p>}
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