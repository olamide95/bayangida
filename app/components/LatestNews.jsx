import { motion } from 'framer-motion'; // Import Framer Motion
import styles from '../styles/Home.module.css';
import { FaCalendar, FaComment } from 'react-icons/fa'; // Import icons for date and comments

const LatestNews = () => {
  const articles = [
    {
      id: 1,
      image: "/images/testimonial.png",
      category: "Articles",
      title: "How to Grow Organic Vegetables at Home",
      date: "October 10, 2023",
      comments: "No Comments",
    },
    {
      id: 2,
      image: "/images/testimonial.png",
      category: "Articles",
      title: "Top 10 Tips for Sustainable Farming",
      date: "October 5, 2023",
      comments: "2 Comments",
    },
    {
      id: 3,
      image: "/images/testimonial.png",
      category: "Articles",
      title: "The Future of Agriculture in Africa",
      date: "September 28, 2023",
      comments: "5 Comments",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and in place
      transition={{ duration: 0.8 }} // Animation duration
      viewport={{ once: true }} // Only animate once
      className={styles.latestNews}
    >
      <h2 className={styles.latestNewsTitle}>Latest News and Blogs</h2>
      <h3 className={styles.popularArticlesTitle}>Popular Articles and Tips</h3>
      <div className={styles.articleGrid}>
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }} // Initial state for each article card
            whileInView={{ opacity: 1, y: 0 }} // Animate to visible
            transition={{ delay: index * 0.2, duration: 0.8 }} // Staggered delay based on index
            className={styles.articleCard}
          >
            <img src={article.image} alt={article.title} className={styles.articleImage} />
            <div className={styles.articleContent}>
              <span className={styles.articleCategory}>{article.category}</span>
              <h4 className={styles.articleTitle}>{article.title}</h4>
              <div className={styles.articleMeta}>
                <div className={styles.metaItem}>
                  <FaCalendar className={styles.metaIcon} />
                  <span>{article.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <FaComment className={styles.metaIcon} />
                  <span>{article.comments}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default LatestNews;