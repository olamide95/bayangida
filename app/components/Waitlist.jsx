'use client'; // Mark the component as a Client Component

import { motion } from 'framer-motion'; // Import Framer Motion
import styles from '../styles/Waitlist.module.css';
import Image from 'next/image'; // Import Next.js Image component
import { db } from '../firebase.js'; // Import Firebase
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { useState } from 'react'; // Import useState for dialog state
import brevo from '@getbrevo/brevo'; // Import Brevo SDK

const Waitlist = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
  const [isSuccess, setIsSuccess] = useState(false); // Success state

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Show loading dialog

    // Get form data
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      location: formData.get('location'),
      role: formData.get('role'),
    };

    console.log('Form data:', data); // Log form data

    try {
      // Step 1: Save data to Firestore
      console.log('Attempting to add document to Firestore...'); // Log before Firestore call
      const docRef = await addDoc(collection(db, 'waitlist'), data);
      console.log('Document written with ID: ', docRef.id); // Log success

      // Step 2: Send email using Brevo
      const defaultClient = brevo.ApiClient.instance;
      const apiKey = defaultClient.authentications['api-key'];
      apiKey.apiKey = process.env.NEXT_PUBLIC_BREVO_API_KEY;
      const apiInstance = new brevo.TransactionalEmailsApi();

      // Email content
      const sendSmtpEmail = new brevo.SendSmtpEmail();
      sendSmtpEmail.subject = 'Welcome to Bayangida Farms!';
      sendSmtpEmail.sender = { email: "bayangidaapp@gmail.com", name: 'Bayangida Farms' };
      sendSmtpEmail.to = [{ email: data.email, name: data.name }];
      sendSmtpEmail.textContent = `Hi ${data.name},\n\nThank you for joining the Bayangida Farms waitlist! We have received your submission and will keep you updated.\n\nBest regards,\nThe Bayangida Farms Team`;
      sendSmtpEmail.htmlContent = `<p>Hi ${data.name},</p><p>Thank you for joining the Bayangida Farms waitlist! We have received your submission and will keep you updated.</p><p>Best regards,<br>The Bayangida Farms Team</p>`;

      await apiInstance.sendTransacEmail(sendSmtpEmail);
      console.log('Email sent successfully to:', data.email);

      // Show success message
      setIsSuccess(true);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false); // Hide loading dialog
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
          Join the Bayangida Farms Waitlist
        </motion.h1>
        <motion.p
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={styles.waitlistSubtitle}
        >
          Be the first to know about our latest updates, products, and services.
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