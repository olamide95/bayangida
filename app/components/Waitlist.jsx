'use client'; // Mark the component as a Client Component

import { motion } from 'framer-motion'; // Import Framer Motion
import styles from '../styles/Waitlist.module.css';
import Image from 'next/image'; // Import Next.js Image component
import { db } from '../firebase.js'; // Import Firebase
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { useState } from 'react'; // Import useState for dialog state
const Waitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [isSuccess, setIsSuccess] = useState(false); // Success state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      location: formData.get('location'),
      role: formData.get('role'),
    };
  
    try {
      // Save data to Firestore
      const docRef = await addDoc(collection(db, 'waitlist'), data);
      console.log('Document written with ID: ', docRef.id);
  
      // Send email via API route
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, name: data.name }),
      });
  
      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={styles.waitlistContainer}
    >
      {/* Top Logo (Visible on mobile) */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, type: 'spring', stiffness: 50 }}
        className={styles.logoTop}
      >
        <Image src="/images/image.png" alt="Bayangida Farms Logo" width={200} height={266} />
      </motion.div>

      {/* Left Logo (Visible on tablet and desktop) */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, type: 'spring', stiffness: 50 }}
        className={styles.logoLeft}
      >
        <Image src="/images/image.png" alt="Bayangida Farms Logo" width={300} height={400} />
      </motion.div>

      {/* Right Logo (Visible on tablet and desktop) */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1, type: 'spring', stiffness: 50 }}
        className={styles.logoRight}
      >
        <Image src="/images/image.png" alt="Bayangida Farms Logo" width={300} height={400} />
      </motion.div>

      {/* Card Content */}
      <div className={styles.waitlistContent}>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className={styles.waitlistTitle}
        >
          Coming soon on the android and ios platform
        </motion.h1>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={styles.waitlistSubtitle}
        >
          Be the first to know when we launch.
        </motion.p>
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          onSubmit={handleSubmit}
          className={styles.waitlistForm}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Enter your location"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>
            <select id="role" name="role" required>
              <option value="">Select your role</option>
              <option value="consumer">Consumer</option>
              <option value="logistics">Logistics Personnel</option>
              <option value="farmer">Farmer</option>
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
          </motion.button>
        </motion.form>
      </div>

      {/* Loading Dialog */}
      {isSubmitting && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <div className={styles.spinner}></div>
            <p>Your submission is being sent...</p>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {isSuccess && (
        <div className={styles.dialogOverlay}>
          <div className={styles.dialog}>
            <p>🎉 Success! You will receive an email shortly.</p>
            <button onClick={() => setIsSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Waitlist;