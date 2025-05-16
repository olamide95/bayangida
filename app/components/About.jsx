import { motion } from 'framer-motion'; // Import Framer Motion
import styles from '../styles/Home.module.css';

const About = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and in place
      transition={{ duration: 0.8 }} // Animation duration
      viewport={{ once: true }} // Only animate once
      className={styles.about}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }} // Initial state for the image (hidden and slightly left)
        whileInView={{ opacity: 1, x: 0 }} // Animate to visible
        transition={{ delay: 0.2, duration: 0.8 }} // Slight delay for staggered effect
        className={styles.aboutImage}
      >
        <img src="/images/second.jpeg" alt="About Bayangida Farms" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }} // Initial state for the content (hidden and slightly right)
        whileInView={{ opacity: 1, x: 0 }} // Animate to visible
        transition={{ delay: 0.4, duration: 0.8 }} // Slight delay for staggered effect
        className={styles.aboutContent}
      >
        <h2 className={styles.aboutTitle}>About Bayangida</h2>
        <h3 className={styles.aboutSubtitle}>Improve the Crop Production of Africa</h3>
        <p className={styles.aboutText}>
          At Bayangida, our goal is to build an online-based platform that provides easy access for consumers to order and receive any agricultural product swiftly and at cheaper rates. We offer a mobile app and web-based platform that serves as an online farm market, providing online payment, delivery, and logistics services, connecting farmers to millions of consumers.
        </p>
        <Link
        href="/products">
        <motion.button
         // Link to the signup page
          initial={{ opacity: 0, y: 20 }} // Initial state for the button
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ delay: 0.6, duration: 0.8 }} // Slight delay for staggered effect
          className={styles.aboutButton}
        >
          Sign Up
        </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  );
};

export default About;