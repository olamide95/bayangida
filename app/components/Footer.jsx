'use client';

import { useState } from 'react';
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styles from "../styles/StoreButtons.module.css";
import { waitlistDb } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Add to Firestore
      const docRef = await addDoc(collection(waitlistDb, 'newsletterSubscribers'), {
        email: email,
        createdAt: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);

      // Optional: Send confirmation email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail(''); // Clear the input
      } else {
        throw new Error('Failed to send confirmation email');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
      
      // Reset success message after 5 seconds
      if (isSuccess) {
        setTimeout(() => setIsSuccess(false), 5000);
      }
    }
  };

  return (
    <footer className="bg-[#042E22] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           {/* First Column: Logo and Description */}
           <div className="max-w-[270px]">
            {/* Logo */}
            <div className="w-[135px] h-[51.64px] mb-6">
              <img src="/images/image.png" alt="Bayangida Farms Logo" className="w-full h-full" />
            </div>

            {/* Description */}
            <p className="font-montserrat font-normal text-sm leading-7 mb-6">
              We offer the widest range of agricultural products at the best prices while connecting farmers with
              millions of consumers across the globe through technology and commerce.
            </p>

            {/* Follow Us */}
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[31.2px] mb-4">Follow Us</h3>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://x.com/bayangidafarms?s=08" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61559698063938&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
              <a
                href="https://www.linkedin.com/company/bayangida-farms/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
              <a
                href="https://www.instagram.com/bayangidafarms?igsh=dWVkNHJhOGxiZWRo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
            </div>
          </div>

          {/* Second Column: Quick Links */}
          <div>
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[31.2px] mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="font-montserrat font-normal text-sm leading-4 hover:text-green-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="font-montserrat font-normal text-sm leading-4 hover:text-green-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="font-montserrat font-normal text-sm leading-4 hover:text-green-300">
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-montserrat font-normal text-sm leading-4 hover:text-green-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Third Column: Mobile App */}
   {/* Third Column: Mobile App */}
<div className="flex flex-col gap-8">
  {/* User App */}
  <div>
    <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[29.39px] mb-2">
      Get the Bayangida User App
    </h3>
    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 space-x-0">
      <a href="https://play.google.com/store/apps/details?id=com.bayangida.bayangida&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.appStoreButton}`}>
        <img src="/images/android.png" alt="Download on Google Play" />
      </a>
      <a href="#" className={`${styles.storeButton} ${styles.playStoreButton}`}>
        <img src="/images/ios.png" alt="App Store - Coming Soon" />
      </a>
    </div>
  </div>

  {/* Logistics App */}
  <div>
    <h3
      className="font-cabinet-grotesk font-bold text-2xl leading-[29.39px] mb-2"
      style={{ color: '#0B7F40' }}
    >
      Get the Bayangida Logistics
    </h3>
    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 space-x-0">
      <a href="https://play.google.com/store/apps/details?id=com.bayangida.bayangida_logistics&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.appStoreButton}`}>
        <img src="/images/android.png" alt="Download on Google Play" />
      </a>
      <a href="https://apps.apple.com/ng/app/bayangida-logistics/id6752229806" target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.playStoreButton}`}>
        <img src="/images/ios.png" alt="Download on App Store" />
      </a>
    </div>
  </div>

  {/* Farmers App */}
  <div>
    <h3
      className="font-cabinet-grotesk font-bold text-2xl leading-[29.39px] mb-2"
      style={{ color: '#14b50c' }}
    >
      Get the Bayangida Farmers
    </h3>
    <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 space-x-0">
      <a href="https://play.google.com/store/apps/details?id=com.bayangida.bayangida_farmers&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.appStoreButton}`}>
        <img src="/images/android.png" alt="Download on Google Play" />
      </a>
      <a href="https://apps.apple.com/ng/app/bayangida-farmers/id6749451089" target="_blank" rel="noopener noreferrer" className={`${styles.storeButton} ${styles.playStoreButton}`}>
        <img src="/images/ios.png" alt="Download on App Store" />
      </a>
    </div>
  </div>
</div>
          {/* Fourth Column: Newsletter */}
          <div>
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[31.2px] mb-6">Newsletter</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[49px] rounded-xl px-4 py-3 mb-2 font-inter font-normal text-sm leading-[18.15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0099FF] text-black"
              />
              {error && <p className="text-red-300 text-sm mb-2">{error}</p>}
              {isSuccess && (
                <p className="text-green-300 text-sm mb-2">
                  Thank you for subscribing!
                </p>
              )}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-[180.28px] h-[40px] bg-[#0B7F40] rounded-full font-inter font-normal text-sm leading-[18.15px] text-white hover:bg-[#095c32] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8">
          <p className="font-montserrat font-normal text-sm leading-7 text-white">
            Copyright ©2025 Bayangida. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;