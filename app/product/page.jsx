'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/products.module.css';

const Products = () => {
  const categories = [
    { id: 1, name: 'Grains', image: '/images/avocado.jpeg' },
    { id: 2, name: 'Tubers', image: '/images/avocado.jpeg' },
    { id: 3, name: 'Fruits and Nuts', image: '/images/avocado.jpeg' },
    { id: 4, name: 'Veggies', image: '/images/avocado.jpeg' },
    { id: 5, name: 'Dairy', image: '/images/avocado.jpeg' },
    { id: 6, name: 'Spices', image: '/images/avocado.jpeg' },
  ];

  const products = {
    Grains: [
      { id: 1, name: 'Rice', price: '17,000', description: 'High-quality rice', image: '/images/avocado.jpeg', rating: 4.5 },
      { id: 2, name: 'Beans', price: '12,000', description: 'Organic beans', image: '/images/avocado.jpeg', rating: 4.0 },
      { id: 3, name: 'Maize', price: '10,000', description: 'Fresh maize', image: '/images/avocado.jpeg', rating: 4.2 },
      { id: 4, name: 'Wheat', price: '15,000', description: 'Premium wheat', image: '/images/avocado.jpeg', rating: 4.7 },
      { id: 5, name: 'Millet', price: '8,000', description: 'Organic millet', image: '/images/avocado.jpeg', rating: 4.1 },
      { id: 6, name: 'Sorghum', price: '9,000', description: 'Fresh sorghum', image: '/images/avocado.jpeg', rating: 4.3 },
      { id: 7, name: 'Lentils', price: '11,000', description: 'High-quality lentils', image: '/images/avocado.jpeg', rating: 4.6 },
      { id: 8, name: 'Chickpeas', price: '13,000', description: 'Organic chickpeas', image: '/images/avocado.jpeg', rating: 4.4 },
      { id: 9, name: 'Barley', price: '14,000', description: 'Fresh barley', image: '/images/avocado.jpeg', rating: 4.8 },
    ],
    Tubers: [
      { id: 1, name: 'Potatoes', price: '8,000', description: 'Fresh potatoes', image: '/images/avocado.jpeg', rating: 3.5 },
      { id: 2, name: 'Yams', price: '10,000', description: 'Premium yams', image: '/images/avocado.jpeg', rating: 5.0 },
      { id: 3, name: 'Cassava', price: '7,000', description: 'Organic cassava', image: '/images/avocado.jpeg', rating: 4.0 },
      { id: 4, name: 'Sweet Potatoes', price: '9,000', description: 'Fresh sweet potatoes', image: '/images/avocado.jpeg', rating: 4.2 },
      { id: 5, name: 'Cocoyam', price: '6,000', description: 'Organic cocoyam', image: '/images/avocado.jpeg', rating: 4.1 },
      { id: 6, name: 'Taro', price: '12,000', description: 'Fresh taro', image: '/images/avocado.jpeg', rating: 4.3 },
      { id: 7, name: 'Ginger', price: '15,000', description: 'Premium ginger', image: '/images/avocado.jpeg', rating: 4.6 },
      { id: 8, name: 'Turmeric', price: '14,000', description: 'Organic turmeric', image: '/images/avocado.jpeg', rating: 4.4 },
      { id: 9, name: 'Garlic', price: '13,000', description: 'Fresh garlic', image: '/images/avocado.jpeg', rating: 4.8 },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState('Grains');

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Shop Now!</h1>
        </div>
      </section>

      {/* Search Container */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search farm products here"
          className={styles.searchInput}
        />
        <button className={styles.searchButton}>Search</button>
      </div>

      {/* Filter/Sort Container */}
      <div className={styles.filterSortContainer}>
        <select className={styles.filterSelect}>
          <option value="">Filter by</option>
          <option value="grains">Grains and Legumes</option>
          <option value="tubers">Tubers</option>
          <option value="fruits">Fruits and Nuts</option>
          <option value="veggies">Veggies</option>
        </select>
        <select className={styles.sortSelect}>
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Categories Section */}
      <section className={styles.categoriesSection}>
        <h2 className={styles.categoriesTitle}>Categories</h2>
        <div className={styles.categoriesContainer}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => setSelectedCategory(category.name)}
            >
              <img src={category.image} alt={category.name} className={styles.categoryImage} />
              <h3 className={styles.categoryName}>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Products Grid Section */}
      <section className={styles.productsSection}>
        <h2 className={styles.productsTitle}>{selectedCategory}</h2>
        <div className={styles.productGrid}>
          {products[selectedCategory]?.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className={styles.productCard}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <div className={styles.productDetails}>
                  <div className={styles.productHeader}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productPrice}>{product.price}</p>
                  </div>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productFooter}>
                    <div className={styles.rating}>
                      <span>⭐ {product.rating}</span>
                    </div>
                    <button className={styles.addToCartButton}>Add to Cart</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;