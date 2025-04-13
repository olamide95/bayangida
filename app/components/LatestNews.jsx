"use client"

import { motion } from "framer-motion"
import styles from "../styles/Home.module.css"
import { FaCalendar, FaComment } from "react-icons/fa"
import Link from "next/link"

const LatestNews = () => {
  const articles = [
    {
      id: 1,
      slug: "how-bayangida-farms-is-transforming-nigerias-agricultural-supply-chain",
      image: "/images/Blog03.png",
      category: "Agriculture",
      title: "How Bayangida Farms is Transforming Nigeria's Agricultural Supply Chain!",
      date: "October 15, 2023",
      comments: "No Comments",
    },
    {
      id: 2,
      slug: "top-5-crops-grown-in-nigeria",
      image: "/images/Blog02.png",
      category: "Farming",
      title: "Top 5 Crops Grown in Nigeria and How Bayangida Farms Supports Farmers!",
      date: "October 10, 2023",
      comments: "2 Comments",
    },
    {
      id: 3,
      slug: "how-to-buy-fresh-farm-produce-online-in-nigeria",
      image: "/images/Blog01.png",
      category: "E-commerce",
      title: "How to Buy Fresh Farm Produce Online in Nigeria with Bayangida Farms!",
      date: "October 5, 2023",
      comments: "5 Comments",
    },
    {
      id: 4,
      slug: "role-of-technology-in-nigerian-agriculture",
      image: "/images/Blog04.png",
      category: "Technology",
      title: "The Role of Technology in Nigerian Agriculture: Bayangida Farms Leading the Way",
      date: "September 28, 2023",
      comments: "3 Comments",
    },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={styles.latestNews}
    >
      <h2 className={styles.latestNewsTitle}>Latest News and Blogs</h2>
      <h3 className={styles.popularArticlesTitle}>Popular Articles and Tips</h3>
      <div className={styles.articleGrid}>
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className={styles.articleCard}
          >
            <Link href={`/blog/${article.slug}`} className={styles.articleLink}>
              <img src={article.image || "/placeholder.svg"} alt={article.title} className={styles.articleImage} />
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
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default LatestNews
