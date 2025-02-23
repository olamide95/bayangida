// components/TrendingProducts.js
import styles from '../styles/Home.module.css';
import { FaStar } from 'react-icons/fa'; // Import star icon for ratings

const TrendingProducts = () => {
  const products = [
    { id: 1, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 4.5 },
    { id: 2, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 4.0 },
    { id: 3, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 3.5 },
    { id: 4, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 5.0 },
    { id: 5, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 4.2 },
    { id: 6, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 4.7 },
    { id: 7, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 3.8 },
    { id: 8, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 4.9 },
    { id: 9, name: "Avocados", price: "17,000", description: "Lorem ipsum dolor", image: "/images/avocado.jpeg", rating: 4.1 },
  ];

  return (
    <section className={styles.trendingProducts}>
      <h2 className={styles.trendingTitle}>Trending Choices</h2>
      <h3 className={styles.popularTitle}>Popular Products</h3>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} className={styles.productImage} />
            <div className={styles.productDetails}>
              <div className={styles.productHeader}>
                <h4 className={styles.productName}>{product.name}</h4>
                <p className={styles.productPrice}>{product.price}</p>
              </div>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.productFooter}>
                <div className={styles.rating}>
                  <FaStar className={styles.starIcon} />
                  <span>{product.rating}</span>
                </div>
                <button className={styles.addToCartButton}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;