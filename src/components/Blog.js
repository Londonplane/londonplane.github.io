import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './Blog.module.css';

const UNSPLASH_ACCESS_KEY = 'Blr8ufIe5CWNcAMFxuKxcQJ0dgIOGmhq9mxuLVC1RPA';

const BlogCard = ({ title, excerpt, date, imageUrl, onClick }) => (
    <motion.div
        className={styles.blogCard}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
    >
        <img src={imageUrl} alt={title} className={styles.blogCardImage} />
        <div className={styles.blogCardContent}>
            <h2 className={styles.blogCardTitle}>{title}</h2>
            <p className={styles.blogCardExcerpt}>{excerpt}</p>
            <span className={styles.blogCardDate}>{date}</span>
        </div>
    </motion.div>
);

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [postContent, setPostContent] = useState('');
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
        const fetchPostsAndImages = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/data/blogPosts.json');
                const blogPosts = await response.json();

                const postsWithImagePromises = blogPosts.map(async (post) => {
                    const query = encodeURIComponent(post.title);
                    const imageResponse = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`);
                    if (!imageResponse.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    const imageData = await imageResponse.json();
                    return { ...post, imageUrl: imageData.urls.regular };
                });

                const postsWithImages = await Promise.all(postsWithImagePromises);
                setPosts(postsWithImages);
            } catch (error) {
                console.error('Error fetching posts or images:', error);
                const response = await fetch('/data/blogPosts.json');
                const blogPosts = await response.json();
                setPosts(blogPosts.map(post => ({ ...post, imageUrl: 'https://via.placeholder.com/400x300' })));
            } finally {
                setIsLoading(false);
            }
        };

        fetchPostsAndImages();
    }, []);

    const loadPostContent = async (post) => {
        try {
            const response = await fetch(`/content/${post.contentFile}`);
            const content = await response.text();
            setPostContent(content);
            setSelectedPost(post);
        } catch (error) {
            console.error('Error loading post content:', error);
            setPostContent('Failed to load post content.');
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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

    const renderers = {
        code: ({node, inline, className, children, ...props}) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={tomorrow}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            )
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
                    className={styles.underline}
                ></motion.span>
            </motion.h1>

            {isLoading ? (
                <p className={styles.loading}>Loading...</p>
            ) : selectedPost ? (
                <div className={styles.articleContainer}>
                    <button onClick={() => setSelectedPost(null)} className={styles.backButton}>
                        Back to Posts
                    </button>
                    <article className={styles.articleContent}>
                        <ReactMarkdown 
                            remarkPlugins={[remarkGfm]} 
                            components={renderers}
                        >
                            {postContent}
                        </ReactMarkdown>
                    </article>
                </div>
            ) : (
                <>
                    <motion.div
                        className={styles.blogGrid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {currentPosts.map((post) => (
                            <BlogCard key={post.id} {...post} onClick={() => loadPostContent(post)} />
                        ))}
                    </motion.div>
                    
                    <div className={styles.pagination}>
                        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`${styles.paginationButton} ${currentPage === index + 1 ? styles.activePage : ''}`}
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