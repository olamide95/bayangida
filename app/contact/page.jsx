'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/contact.module.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase'; // Update this path
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Add document to Firestore
      const docRef = await addDoc(collection(db, 'contactMessages'), {
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp(),
        status: 'unread', // You can add more fields for message management
      });

      console.log('Message sent with ID:', docRef.id);
      
      // Reset form
      setFormData({ fullName: '', email: '', subject: '', message: '' });
      
      // Show success message
      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We\'ll get back to you soon.' 
      });

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Show error message
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.hero}
      >
        <div className={styles.heroContent}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={styles.heroTitle}
          >
            Contact Us!
          </motion.h1>
        </div>
      </motion.section>

      {/* Contact Info Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.contactInfoSection}
      >
        <div className={styles.contactInfoContainer}>
          {/* Email Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.contactInfoCard}
          >
            <div className={styles.iconCircle}>
              <FaEnvelope className={styles.icon} />
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.contactInfoTitle}
            >
              Email Address
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.contactInfoText}
            >
              admin@bayangidafarms.com
            </motion.p>
          </motion.div>

          {/* Location Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.contactInfoCard}
          >
            <div className={styles.iconCircle}>
              <FaMapMarkerAlt className={styles.icon} />
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.contactInfoTitle}
            >
              Main Office
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.contactInfoText}
            >
              No.18B Biltmore Estate, Abuja, Nigeria
            </motion.p>
          </motion.div>

          {/* Phone Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.contactInfoCard}
          >
            <div className={styles.iconCircle}>
              <FaPhone className={styles.icon} />
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.contactInfoTitle}
            >
              Phone Number
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.contactInfoText}
            >
              +234 814 732 4415
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Form Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.contactFormSection}
      >
        <div className={styles.contactFormContainer}>
          {/* Left Side: Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.contactFormImage}
          >
            <img src="/images/contactside.jpg" alt="Contact Us" />
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.contactFormContent}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.getInTouchText}
            >
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.sendMessageTitle}
            >
              Send Us A Message
            </motion.h2>
            
            {/* Status Message */}
            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${styles.statusMessage} ${
                  submitStatus.type === 'success' ? styles.success : styles.error
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              onSubmit={handleSubmit}
              className={styles.contactForm}
            >
              <div className={styles.formRow}>
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  type="text"
                  name="fullName"
                  placeholder="Full Name Here"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
                <motion.input
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <motion.input
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <motion.textarea
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              />
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </motion.section>

      {/* Map Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.mapSection}
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.467882347872!2d7.431206257671732!3d8.978058471287094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e759fb3981549%3A0xfb4156d3156fc0b5!2sBayangida%20Farms!5e0!3m2!1sen!2sng!4v1759167986475!5m2!1sen!2sng" 
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Contact;