"use client"

import Navbar from "./Navbar"
import Footer from "./Footer"
import { motion } from "framer-motion"
import styles from "../styles/Blog.module.css"
import { FaCalendar, FaUser, FaTag } from "react-icons/fa"
import Link from "next/link"

const BlogLayout = ({
  children,
  title,
  image,
  date,
  author = "Bayangida Farms",
  category,
  readTime = "5 min read",
}) => {
  return (
    <div>
      <Navbar />

      <div className={styles.blogHeader} style={{ backgroundImage: `url(${image})` }}>
        <div className={styles.overlay}>
          <div className={styles.container}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.blogTitle}
            >
              {title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.blogMeta}
            >
              <div className={styles.metaItem}>
                <FaCalendar className={styles.metaIcon} />
                <span>{date}</span>
              </div>
              <div className={styles.metaItem}>
                <FaUser className={styles.metaIcon} />
                <span>{author}</span>
              </div>
              <div className={styles.metaItem}>
                <FaTag className={styles.metaIcon} />
                <span>{category}</span>
              </div>
              <div className={styles.metaItem}>
                <span>{readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <main className={styles.blogContent}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={styles.content}
          >
            {children}
          </motion.div>

          <div className={styles.relatedPosts}>
            <h3>Related Posts</h3>
            <div className={styles.relatedGrid}>
              <Link href="/blog/how-to-buy-fresh-farm-produce-online-in-nigeria" className={styles.relatedCard}>
                <h4>How to Buy Fresh Farm Produce Online in Nigeria</h4>
              </Link>
              <Link href="/blog/top-5-crops-grown-in-nigeria" className={styles.relatedCard}>
                <h4>Top 5 Crops Grown in Nigeria</h4>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BlogLayout
