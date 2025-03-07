'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from '../styles/about.module.css';
import { FaLeaf, FaSeedling, FaHandsHelping } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // Import Framer Motion

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Founder & CEO',
      image: '/images/banner.jpeg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      designation: 'Head of Operations',
      image: '/images/banner.jpeg',
    },
    {
      id: 3,
      name: 'Michael Brown',
      designation: 'Head of Marketing',
      image: '/images/banner.jpeg',
    },
    {
      id: 4,
      name: 'Sarah Johnson',
      designation: 'Head of Sustainability',
      image: '/images/banner.jpeg',
    },
    {
      id: 5,
      name: 'David Wilson',
      designation: 'Head of Technology',
      image: '/images/banner.jpeg',
    },
    {
      id: 6,
      name: 'Emily Davis',
      designation: 'Head of Community Engagement',
      image: '/images/banner.jpeg',
    },
  ];

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
            About Us
          </motion.h1>
        </div>
      </motion.section>

      {/* Mission and Story Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.missionStorySection}
      >
        <div className={styles.missionStoryContainer}>
          {/* Mission Container */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.missionStoryCard}
          >
            <div className={styles.imageContainer}>
              <img src="/images/1about.jpeg" alt="Our Mission" />
            </div>
            <div className={styles.textContainer}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={styles.title}
              >
                Our Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className={styles.description}
              >
                To offer the widest range of agricultural products at the best prices while connecting farmers with millions of consumers across the globe through technology and commerce.
              </motion.p>
            </div>
          </motion.div>

          {/* Story Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.missionStoryCard}
          >
            <div className={styles.imageContainer}>
              <img src="/images/2about.png" alt="Our Story" />
            </div>
            <div className={styles.textContainer}>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={styles.title}
              >
                Our Story
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className={styles.description}
              >
                Founded in 2024, Bayangida began with a dream to cultivate a farm that values quality over quantity. From humble beginnings, we have grown into a thriving source of fresh, wholesome products.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* What We Offer Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.whatWeOfferSection}
      >
        <div className={styles.whatWeOfferContainer}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={styles.whatWeOfferTitle}
          >
            What We Offer
          </motion.h2>
          <div className={styles.offerCardsContainer}>
            {/* Fresh Produce Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={styles.offerCard}
              style={{ backgroundColor: '#B0FF66' }}
            >
              <div className={styles.iconCircle}>
                <FaLeaf className={styles.icon} />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={styles.offerDescription}
              >
                Fresh Produce: Handpicked daily for unmatched flavor and freshness.
              </motion.p>
            </motion.div>

            {/* Sustainable Practices Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className={styles.offerCard}
              style={{ backgroundColor: '#0B7F40' }}
            >
              <div className={styles.iconCircle}>
                <FaSeedling className={styles.icon} />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className={styles.offerDescription}
                style={{ color: '#FFFFFF' }}
              >
                Sustainable Practices: Ensuring a healthy planet for future generations.
              </motion.p>
            </motion.div>

            {/* Community Engagement Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={styles.offerCard}
              style={{ backgroundColor: '#B0FF66' }}
            >
              <div className={styles.iconCircle}>
                <FaHandsHelping className={styles.icon} />
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className={styles.offerDescription}
              >
                Community Engagement: Building lasting relationships with our customers and neighbors.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Meet Our Team Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={styles.teamSection}
      >
        <div className={styles.teamContainer}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className={styles.teamTitle}
          >
            Meet Our Team
          </motion.h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className={styles.teamMemberCard}
              >
                <img src={member.image} alt={member.name} className={styles.teamMemberImage} />
                <h3 className={styles.teamMemberName}>{member.name}</h3>
                <p className={styles.teamMemberDesignation}>{member.designation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default About;