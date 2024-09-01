import React from 'react';
import { Hexagon, Laptop, Lightbulb, Rocket } from 'lucide-react';
import styles from './Features.module.css';

const featureData = [
  {
    keyword: "Learn by doing",
    description: "Acquire knowledge through practice, grow through action.",
    icon: Hexagon
  },
  {
    keyword: "Iterative improvement",
    description: "Constantly optimize methods, pursue continuous innovation.",
    icon: Laptop
  },
  {
    keyword: "Problem-focused",
    description: "Focus on real-world problems technology solves, not just the technology itself.",
    icon: Lightbulb
  },
  {
    keyword: "AI-empowered",
    description: "Actively leverage AI to enhance efficiency and drive innovation.",
    icon: Rocket
  }
];

const Features = () => {
  return (
    <div className={styles.featuresWrapper}>
      <div className={styles.features}>
        {featureData.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <div className={styles.iconContainer}>
              <feature.icon className={styles.icon} />
            </div>
            <h3 className={styles.keyword}>{feature.keyword}</h3>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;