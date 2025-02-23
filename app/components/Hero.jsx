// components/Hero.js
import styles from '../styles/Home.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Fresh Farm Produce Delivered to Your Doorstep</h1>
        <p className={styles.heroSubtitle}>
          Enjoy farm-fresh goodness, sustainably grown and harvested with love. From our fields to your table, experience the best nature has to offer.
        </p>
        <button className={styles.heroButton}>Shop Now</button>
      </div>
    </section>
  );
};

export default Hero;