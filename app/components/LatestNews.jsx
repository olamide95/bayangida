// components/LatestNews.js
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
    <section className={styles.latestNews}>
      <h2 className={styles.latestNewsTitle}>Latest News and Blogs</h2>
      <h3 className={styles.popularArticlesTitle}>Popular Articles and Tips</h3>
      <div className={styles.articleGrid}>
        {articles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestNews;