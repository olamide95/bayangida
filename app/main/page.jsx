// pages/index.js
import Head from 'next/head';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import TrendingProducts from '../components/TrendingProducts.jsx';
import styles from '../styles/Home.module.css';
import LatestNews from '../components/LatestNews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bayangida Farms</title>
        <meta name="description" content="Fresh farm produce delivered to your doorstep." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <div className={styles.container}>
     
      <About />
      <TrendingProducts />
      <LatestNews />
      </div>
      <Footer />

    </div>
  );
}