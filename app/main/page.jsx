// pages/index.js
import Head from 'next/head';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import TrendingProducts from '../components/TrendingProducts.jsx';
import styles from '../styles/Home.module.css';
import LatestNews from '../components/LatestNews';
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bayangida Farms</title>
        <meta name="description" content="Fresh farm produce delivered to your doorstep." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <About />
      <TrendingProducts />
      <LatestNews />

    </div>
  );
}