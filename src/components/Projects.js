import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon } from 'lucide-react';

const ProjectCard = ({ title, description, skills, github, demo }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white shadow-md rounded-lg p-6 mb-6"
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {skills.map((skill, index) => (
        <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {skill}
        </span>
      ))}
    </div>
    <div className="flex space-x-4">
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800">
          <GithubIcon className="w-5 h-5 mr-1" />
          GitHub
        </a>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-600 hover:text-gray-800">
          <ExternalLinkIcon className="w-5 h-5 mr-1" />
          Live Demo
        </a>
      )}
    </div>
  </motion.div>
);

const TabButton = ({ name, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 font-semibold transition-colors duration-300 ${
      isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
    }`}
    onClick={onClick}
  >
    {name}
  </motion.button>
);

const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const titleRef = useRef(null);

  const projects = [
    {
      title: "Personal Website",
      description: "Designed and developed a responsive personal website using React and Tailwind CSS to showcase my skills and projects.",
      skills: ["React", "Tailwind CSS", "Responsive Design"],
      github: "https://github.com/Londonplane/londonplane.github.io",
      demo: "https://londonplane.github.io/"
    },
    {
      title: "Library Management System",
      description: "Created a Java-based library management system as a course project, implementing CRUD operations and basic search functionality.",
      skills: ["Java", "SQL", "OOP"],
      github: "https://github.com/yourusername/library-system"
    },
    {
      title: "Weather App",
      description: "Developed a weather application using React that fetches real-time weather data from an API and displays it in a user-friendly interface.",
      skills: ["React", "API Integration", "JavaScript"],
      github: "https://github.com/yourusername/weather-app",
      demo: "https://yourusername.github.io/weather-app"
    },
    {
      title: "Algorithm Visualizer",
      description: "Built an interactive web application to visualize various sorting algorithms, helping users understand how they work step-by-step.",
      skills: ["HTML", "CSS", "JavaScript", "Algorithms"],
      github: "https://github.com/yourusername/algo-visualizer",
      demo: "https://yourusername.github.io/algo-visualizer"
    }
  ];

  const tabs = ['All', 'JavaScript', 'React', 'Ruby'];

  const filteredProjects = activeTab === 'All'
    ? projects
    : projects.filter(project => project.skills.includes(activeTab));

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            controls.start("visible");
          } else {
            setIsVisible(false);
            controls.start("hidden");
          }
        },
        { threshold: 0.1 } // 当10%的组件可见时触发
      );
  
      if (titleRef.current) {
        observer.observe(titleRef.current);
      }
  
      return () => {
        if (titleRef.current) {
          observer.unobserve(titleRef.current);
        }
      };
    }, [controls]);
  
    useEffect(() => {
      if (isVisible) {
        controls.start("visible");
      }
    }, [isVisible, activeTab, controls]);
  
    const titleVariants = {
      hidden: { opacity: 0, y: -50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5 }
      }
    };
  
    const underlineVariants = {
      hidden: { width: 0 },
      visible: { 
        width: '60px',
        transition: { duration: 0.5, delay: 0.2 }
      }
    };

    return (
      <section id="projects" className="py-16 bg-white">
        <div className="max-w-[1300px] mx-auto px-2">
          <motion.h2
            ref={titleRef}
            initial="hidden"
            animate={controls}
            variants={titleVariants}
            className="text-center mb-12 text-[#2c3e50] text-[2.5rem] relative pb-2"
          >
            PROJECTS
            <motion.span
              variants={underlineVariants}
              className="absolute left-1/2 bottom-[-0.25rem] transform -translate-x-1/2 h-1 bg-[#2c3e50]"
            ></motion.span>
          </motion.h2>
          <div className="flex justify-center mb-8">
            {tabs.map(tab => (
              <TabButton
                key={tab}
                name={tab}
                isActive={activeTab === tab}
                onClick={() => {
                  setActiveTab(tab);
                  if (isVisible) {
                    controls.start("visible");
                  }
                }}
              />
            ))}
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    );
  };

export default Projects;