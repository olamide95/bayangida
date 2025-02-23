// components/About.js
import styles from '../styles/Home.module.css';

const About = () => {
  return (
    <section className={styles.about}>
      <div className={styles.aboutImage}>
        <img src="/images/second.jpeg" alt="About Bayangida Farms" />
      </div>
      <div className={styles.aboutContent}>
        <h2 className={styles.aboutTitle}>About Bayangida</h2>
        <h3 className={styles.aboutSubtitle}>Improve the Crop Production of Africa</h3>
        <p className={styles.aboutText}>
          At Bayangida, our goal is to build an online-based platform that provides easy access for consumers to order and receive any agricultural product swiftly and at cheaper rates. We offer a mobile app and web-based platform that serves as an online farm market, providing online payment, delivery, and logistics services, connecting farmers to millions of consumers.
        </p>
        <button className={styles.aboutButton}>Sign Up</button>
      </div>
    </section>
  );
};

export default About;