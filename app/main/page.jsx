'use client';

import Head from 'next/head';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Waitlist from '../components/waitmain.jsx'; // Import Waitlist
import LatestNews from '../components/LatestNews';
import Footer from '../components/Footer';
import { motion } from 'framer-motion'; // Import Framer Motion
import styles from '../styles/Home.module.css';

export default function Main() {
  return (
    <div>
      <Head>
        <title>Bayangida Farms</title>
        <meta name="description" content="Fresh farm produce delivered to your doorstep." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />

      {/* About Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <About />
      </motion.div>

      {/* Waitlist Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className={styles.waitlistWrapper}
      >
        <Waitlist />
      </motion.div>

      {/* Latest News Section with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <LatestNews />
      </motion.div>

      <Footer />
    </div>
  );
}