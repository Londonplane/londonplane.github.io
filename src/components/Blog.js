import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styles from './Blog.module.css';

const UNSPLASH_ACCESS_KEY = 'Blr8ufIe5CWNcAMFxuKxcQJ0dgIOGmhq9mxuLVC1RPA';

// Simulated blog post data
const blogPosts = [
    {
        id: 1,
        title: "Deep Dive into React Hooks",
        excerpt: "Explore the power of React Hooks and learn how to simplify component logic...",
        date: "2024-08-15",
        category: "REACT/NEXT"
    },
    {
        id: 2,
        title: "Rapid Development Techniques with Ruby on Rails",
        excerpt: "Master the Ruby on Rails framework to accelerate your web application development process...",
        date: "2024-08-20",
        category: "RUBY/RAILS"
    },
    {
        id: 3,
        title: "Detailed Guide to JavaScript ES6+ Features",
        excerpt: "Gain a deep understanding of modern JavaScript features to enhance code quality and efficiency...",
        date: "2024-08-25",
        category: "JAVASCRIPT"
    },
    {
        id: 4,
        title: "Optimizing Server-Side Rendering with Next.js",
        excerpt: "Learn how to leverage Next.js for server-side rendering to improve website performance...",
        date: "2024-09-01",
        category: "REACT/NEXT"
    },
    {
        id: 5,
        title: "Advanced Ruby Metaprogramming Techniques",
        excerpt: "Explore Ruby's metaprogramming capabilities to write more flexible and powerful code...",
        date: "2024-09-05",
        category: "RUBY/RAILS"
    },
    {
        id: 6,
        title: "Mastering Asynchronous JavaScript Programming",
        excerpt: "Master techniques like Promises and async/await to improve code readability in asynchronous programming...",
        date: "2024-09-10",
        category: "JAVASCRIPT"
    },
    {
        id: 7,
        title: "Best Practices for React Performance Optimization",
        excerpt: "Learn optimization techniques for React applications to enhance responsiveness and user experience...",
        date: "2024-09-15",
        category: "REACT/NEXT"
    },
    {
        id: 8,
        title: "Exploring New Features in Rails 6",
        excerpt: "Dive deep into the new functionalities introduced in Rails 6 and upgrade your Rails skills...",
        date: "2024-09-20",
        category: "RUBY/RAILS"
    },
    {
        id: 9,
        title: "Practical JavaScript Design Patterns",
        excerpt: "Learn JavaScript design patterns through practical examples to improve code maintainability...",
        date: "2024-09-25",
        category: "JAVASCRIPT"
    },
    {
        id: 10,
        title: "Integrating GraphQL with React: A Comprehensive Guide",
        excerpt: "Learn how to integrate GraphQL in React applications to optimize data fetching...",
        date: "2024-09-30",
        category: "REACT/NEXT"
    }
];

const BlogCard = ({ title, excerpt, date, imageUrl }) => (
    <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer h-full"
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.3 }}
    >
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{excerpt}</p>
            <span className="text-sm text-gray-500">{date}</span>
        </div>
    </motion.div>
);

const Blog = () => {
    const [postsWithImages, setPostsWithImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const postsPerPage = 6;

    const controls = useAnimation();
    const titleRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start("visible");
                } else {
                    controls.start("hidden");
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = titleRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [controls]);

    useEffect(() => {
        const fetchImages = async () => {
            setIsLoading(true);
            try {
                const postsWithImagePromises = blogPosts.map(async (post) => {
                    const query = encodeURIComponent(post.title);
                    const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    const data = await response.json();
                    return { ...post, imageUrl: data.urls.regular };
                });

                const resolvedPosts = await Promise.all(postsWithImagePromises);
                setPostsWithImages(resolvedPosts);
            } catch (error) {
                console.error('Error fetching images:', error);
                setPostsWithImages(blogPosts.map(post => ({ ...post, imageUrl: 'https://via.placeholder.com/400x300' })));
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages();
    }, []);

    // Calculate pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = postsWithImages.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <section id="blog" className={styles.blog}>
            <motion.h1
                ref={titleRef}
                initial="hidden"
                animate={controls}
                variants={titleVariants}
                className={styles.title}
            >
                BLOG
                <motion.span
                    variants={underlineVariants}
                    className={`${styles.underline}`}
                ></motion.span>
            </motion.h1>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {currentPosts.map((post) => (
                            <BlogCard key={post.id} {...post} />
                        ))}
                    </motion.div>
                    
                    <div className="flex justify-center mt-8">
                        {Array.from({ length: Math.ceil(postsWithImages.length / postsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-pink-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </section>
    );
};

export default Blog;
