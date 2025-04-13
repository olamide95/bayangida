"use client"

import Head from "next/head"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { motion } from "framer-motion"
import styles from "../../styles/Blog.module.css"
import Link from "next/link"
import { blogPosts } from "../../data/blogPosts"
import { FaCalendar, FaTag } from "react-icons/fa"

export default function BlogIndex() {
  return (
    <div>
      <Head>
        <title>Blog | Bayangida Farms</title>
        <meta name="description" content="Latest news, articles and tips from Bayangida Farms" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className={styles.blogHeader} style={{ backgroundImage: `url('/images/blog-header.jpg')` }}>
        <div className={styles.overlay}>
          <div className={styles.container}>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={styles.blogTitle}
            >
              Bayangida Farms Blog
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={styles.blogSubtitle}
            >
              Latest news, articles and tips on agriculture, farming and food in Nigeria
            </motion.p>
          </div>
        </div>
      </div>

      <main className={styles.blogContent}>
        <div className={styles.container}>
          <div className={styles.blogGrid}>
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.blogCard}
              >
                <Link href={`/blog/${post.slug}`} className={styles.blogCardLink}>
                  <div className={styles.blogCardImage} style={{ backgroundImage: `url(${post.image})` }}></div>
                  <div className={styles.blogCardContent}>
                    <div className={styles.blogCardMeta}>
                      <div className={styles.metaItem}>
                        <FaCalendar className={styles.metaIcon} />
                        <span>{post.date}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <FaTag className={styles.metaIcon} />
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <h2 className={styles.blogCardTitle}>{post.title}</h2>
                    <div className={styles.blogCardReadMore}>Read More</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
