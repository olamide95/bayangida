'use client';

import { motion } from 'framer-motion';
import styles from '../styles/Waitmain.module.css';
import { waitlistDb } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';

const Waitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
       createdAt: serverTimestamp(), // Add server timestamp
     };
   
     try {
       // Save data to Firestore
       const docRef = await addDoc(collection(waitlistDb, 'waitlist'), data);
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
      {/* Left Side: Write-Up */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={styles.writeUp}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.writeUpTitle}
        >
          Join the Bayangida Farms Waitlist
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={styles.writeUpText}
        >
          Be the first to know about our latest updates, products, and services. By joining our waitlist, you’ll gain exclusive access to:
        </motion.p>
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className={styles.writeUpList}
        >
          <li>Early access to new farm produce and products.</li>
          <li>Exclusive discounts and promotions.</li>
          <li>Updates on sustainable farming practices and tips.</li>
          <li>Invitations to special events and webinars.</li>
        </motion.ul>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={styles.writeUpText}
        >
          Don’t miss out on the opportunity to be part of a community that values fresh, sustainable, and high-quality farm produce. Sign up now!
        </motion.p>
      </motion.div>

      {/* Right Side: Waitlist Form Card */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={styles.formCard}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className={styles.formTitle}
        >
          Join the Waitlist
        </motion.h1>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
          </motion.button>
        </motion.form>
      </motion.div>

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