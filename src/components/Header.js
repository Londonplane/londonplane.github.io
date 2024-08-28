import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

function Header() {
  const [activeSection, setActiveSection] = useState('');
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'blog', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 50 && rect.bottom > 50;
        }
        return false;
      });

      setActiveSection(currentSection || '');
      setIsHome(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.navigation} ${isHome ? styles.hidden : ''}`}>
      <nav>
        <ul>
          {['home', 'about', 'projects', 'blog', 'contact'].map((section) => (
            <li key={section} className={activeSection === section ? styles.active : ''}>
              <a href={`#${section}`}>{section.toUpperCase()}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;