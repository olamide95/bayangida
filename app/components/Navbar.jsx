// components/Navbar.js
import Link from 'next/link';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa'; // Import icons from React Icons
import styles from '../styles/Home.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo on the leftmost side */}
      <div className={styles.logoContainer}>
        <img src="/images/logo.png" alt="Bayangida Farms Logo" className={styles.logo} />
        <span className={styles.logoText}>Bayangida Farms</span>
      </div>

      {/* Navigation Menu (centered) */}
      <div className={styles.navMenu}>
        <Link href="/" className={styles.navLink}>Home</Link>
        <Link href="/products" className={styles.navLink}>Products</Link>
        <Link href="/about" className={styles.navLink}>About Us</Link>
        <Link href="/contact" className={styles.navLink}>Contact Us</Link>
      </div>

      {/* Icons on the rightmost side */}
      <div className={styles.navIcons}>
        <FaSearch className={styles.icon} />
        <FaShoppingCart className={styles.icon} />
        <FaBars className={styles.icon} />
      </div>
    </nav>
  );
};

export default Navbar;