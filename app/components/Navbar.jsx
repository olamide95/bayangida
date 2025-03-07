'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname
import { FaBars, FaTimes, FaSearch, FaShoppingCart } from 'react-icons/fa'; // Import icons
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get the current route

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo Container */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            src="/images/image.png"
            alt="Bayangida Farms Logo"
            className={styles.logo}
            style={{ width: '117.484px', height: '45px' }}
          />
        </Link>
      </div>

      {/* Navigation Menu (centered) */}
      <div className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
        <Link
          href="/"
          className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`} // Add active class if pathname matches
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/products"
          className={`${styles.navLink} ${pathname === '/products' ? styles.active : ''}`} // Add active class if pathname matches
          onClick={() => setIsMenuOpen(false)}
        >
          Products
        </Link>
        <Link
          href="/about"
          className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`} // Add active class if pathname matches
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`} // Add active class if pathname matches
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>

      {/* Icons on the rightmost side */}
      <div className={styles.navIcons}>
        <Link href="/search">
          <FaSearch className={styles.icon} />
        </Link>
        <Link href="/cart">
          <FaShoppingCart className={styles.icon} />
        </Link>
        {/* Hamburger Menu Icon */}
        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;