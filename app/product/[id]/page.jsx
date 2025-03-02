'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import styles from '../../styles/ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the URL

  // Mock product data (replace with an API call or data mapping)
  const products = {
    1: { id: 1, name: 'Rice', price: '17,000', description: 'High-quality rice', image: '/images/avocado.jpeg', rating: 4.5 },
    2: { id: 2, name: 'Beans', price: '12,000', description: 'Organic beans', image: '/images/avocado.jpeg', rating: 4.0 },
    3: { id: 3, name: 'Maize', price: '10,000', description: 'Fresh maize', image: '/images/avocado.jpeg', rating: 4.2 },
    4: { id: 4, name: 'Wheat', price: '15,000', description: 'Premium wheat', image: '/images/avocado.jpeg', rating: 4.7 },
    5: { id: 5, name: 'Millet', price: '8,000', description: 'Organic millet', image: '/images/avocado.jpeg', rating: 4.1 },
    6: { id: 6, name: 'Sorghum', price: '9,000', description: 'Fresh sorghum', image: '/images/avocado.jpeg', rating: 4.3 },
    7: { id: 7, name: 'Lentils', price: '11,000', description: 'High-quality lentils', image: '/images/avocado.jpeg', rating: 4.6 },
    8: { id: 8, name: 'Chickpeas', price: '13,000', description: 'Organic chickpeas', image: '/images/avocado.jpeg', rating: 4.4 },
    9: { id: 9, name: 'Barley', price: '14,000', description: 'Fresh barley', image: '/images/avocado.jpeg', rating: 4.8 },
  };

  const product = products[id]; // Get the product data based on the ID

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Mock reviews data
  const reviews = [
    { id: 1, name: 'Veronica', rating: 5, comment: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed ...' },
    { id: 2, name: 'John', rating: 4, comment: 'Great product! Highly recommended.' },
    { id: 3, name: 'Alice', rating: 5, comment: 'Excellent quality and fast delivery.' },
    { id: 4, name: 'Bob', rating: 3, comment: 'Good product but a bit expensive.' },
    { id: 5, name: 'Charlie', rating: 4, comment: 'Very satisfied with the purchase.' },
  ];

  // Mock similar products data
  const similarProducts = [
    { id: 1, name: 'Rice', price: '17,000', image: '/images/avocado.jpeg', rating: 4.5 },
    { id: 2, name: 'Beans', price: '12,000', image: '/images/avocado.jpeg', rating: 4.0 },
    { id: 3, name: 'Maize', price: '10,000', image: '/images/avocado.jpeg', rating: 4.2 },
    { id: 4, name: 'Wheat', price: '15,000', image: '/images/avocado.jpeg', rating: 4.7 },
    { id: 5, name: 'Millet', price: '8,000', image: '/images/avocado.jpeg', rating: 4.1 },
  ];

  return (
    <div>
      <Navbar />

      {/* Main Container */}
      <div className={styles.mainContainer}>
        {/* Product Details Section */}
        <div className={styles.productDetailsContainer}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Product Image */}
            <div className={styles.productImageContainer}>
              <img src={product.image} alt={product.name} className={styles.productImage} />
            </div>

            {/* Thumbnail Images */}
            <div className={styles.thumbnailContainer}>
              <img src={product.image} alt="Thumbnail 1" className={styles.thumbnail} />
              <img src={product.image} alt="Thumbnail 2" className={styles.thumbnail} />
              <img src={product.image} alt="Thumbnail 3" className={styles.thumbnail} />
            </div>
          </div>

          {/* Right Column */}
          <div className={styles.rightColumn}>
            {/* Product Name */}
            <h1 className={styles.productName}>{product.name}</h1>

            {/* Rating */}
            <div className={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <span key={index} className={styles.starIcon}>
                  ⭐
                </span>
              ))}
            </div>

            {/* Price */}
            <p className={styles.productPrice}>{product.price}</p>

            {/* Description */}
            <p className={styles.productDescription}>{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className={styles.quantityContainer}>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>

            {/* Add to Wishlist */}
            <button className={styles.addToWishlistButton}>Add to Wishlist</button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <h2 className={styles.reviewsTitle}>Reviews</h2>
            <button className={styles.seeAllButton}>See All</button>
          </div>

          <div className={styles.reviewsContainer}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h3 className={styles.reviewName}>{review.name}</h3>
                <div className={styles.reviewRating}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={styles.starIcon}>
                      ⭐
                    </span>
                  ))}
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Section */}
        <div className={styles.similarProductsSection}>
          <div className={styles.similarProductsHeader}>
            <h2 className={styles.similarProductsTitle}>Similar Products</h2>
            <button className={styles.seeAllButton}>See All</button>
          </div>

          <div className={styles.similarProductsContainer}>
            {similarProducts.map((product) => (
              <div key={product.id} className={styles.similarProductCard}>
                <img src={product.image} alt={product.name} className={styles.similarProductImage} />
                <div className={styles.similarProductDetails}>
                  <div className={styles.similarProductHeader}>
                    <h4 className={styles.similarProductName}>{product.name}</h4>
                    <p className={styles.similarProductPrice}>{product.price}</p>
                  </div>
                  <div className={styles.similarProductFooter}>
                    <div className={styles.rating}>
                      <span>⭐ {product.rating}</span>
                    </div>
                    <button className={styles.addToCartButton}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;