import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './TechStack.module.css';

const TechStack = () => {
  const skills = [
    { category: 'Programming Languages', techs: ['Java', 'Python', 'Bash/Zsh'] },
    { category: 'Web Technologies & APIs', techs: ['Flask', 'FastAPI', 'RESTful API'] },
    { category: 'Version Control & CI/CD', techs: ['Git', 'GitHub', 'GitLab', 'GitHub Actions'] },
    { category: 'Containerization & Cloud', techs: ['Docker', 'Docker Compose', 'AWS'] },
    { category: 'Databases', techs: ['SQL', 'MySQL', 'SQLite', 'PostgreSQL'] },
    { category: 'Frontend Technologies', techs: ['HTML', 'CSS', 'JavaScript', 'React'] }
  ];

  return (
    <div className={styles.techStack}>
      <h2 className={styles.title}>My Tech Stack</h2>
      <div className={styles.cardContainer}>
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
};

const SkillCard = ({ skill, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1  // 为每个卡片添加一个小延迟，创造逐个出现的效果
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={styles.card}
    >
      <h3 className={styles.categoryTitle}>{skill.category}</h3>
      <ul className={styles.techList}>
        {skill.techs.map((tech, techIndex) => (
          <li key={techIndex} className={styles.tech}>{tech}</li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TechStack;