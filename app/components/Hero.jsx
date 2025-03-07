import { motion } from 'framer-motion'; // Import Framer Motion
import styles from '../styles/Home.module.css';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }} // Initial state (hidden and slightly below)
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and in place
      transition={{ duration: 0.8 }} // Animation duration
      viewport={{ once: true }} // Only animate once
      className={styles.hero}
    >
      <div className={styles.heroContent}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }} // Initial state for the title
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ delay: 0.2, duration: 0.8 }} // Slight delay for staggered effect
          className={styles.heroTitle}
        >
          Fresh Farm Produce Delivered to Your Doorstep
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} // Initial state for the subtitle
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ delay: 0.4, duration: 0.8 }} // Slight delay for staggered effect
          className={styles.heroSubtitle}
        >
          Enjoy farm-fresh goodness, sustainably grown and harvested with love. From our fields to your table, experience the best nature has to offer.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }} // Initial state for the button
          whileInView={{ opacity: 1, y: 0 }} // Animate to visible
          transition={{ delay: 0.6, duration: 0.8 }} // Slight delay for staggered effect
          className={styles.heroButton}
        >
          Shop Now
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Hero;