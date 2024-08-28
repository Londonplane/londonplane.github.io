import React from 'react';
import styles from './TechStack.module.css';

const TechStack = () => {
  const skills = [
    { category: 'Programming Languages', techs: ['Java', 'Python', 'SQL', 'Bash/Zsh'] },
    { category: 'Web Technologies & APIs', techs: ['Flask', 'FastAPI', 'RESTful API'] },
    { category: 'Version Control & CI/CD', techs: ['Git', 'GitHub', 'GitLab', 'GitHub Actions'] },
    { category: 'Containerization & Orchestration', techs: ['Docker'] },
    { category: 'Configuration Management', techs: ['Ansible'] },
    { category: 'Cloud Platforms', techs: ['AWS'] }
  ];

  return (
    <div className={styles.techStack}>
      <h2 className={styles.title}>My Tech Stack</h2>
      <div className={styles.cardContainer}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.categoryTitle}>{skill.category}</h3>
            <ul className={styles.techList}>
              {skill.techs.map((tech, techIndex) => (
                <li key={techIndex} className={styles.tech}>{tech}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;