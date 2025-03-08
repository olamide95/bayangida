import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
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
              We offer the widest range of agricultural products at the best prices while connecting farmers with millions of consumers across the globe through technology and commerce.
            </p>

            {/* Follow Us */}
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[31.2px] mb-4">
              Follow Us
            </h3>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="https://x.com/bayangidafarms?s=08" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61559698063938&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
              <a href="https://www.linkedin.com/company/bayangida-farms/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
              <a href="https://www.instagram.com/bayangidafarms?igsh=dWVkNHJhOGxiZWRo" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-6 h-6 text-[#0B7F40] hover:text-[#095c32]" />
              </a>
            </div>
          </div>

          {/* Second Column: Quick Links */}
          <div>
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[31.2px] mb-6">
              Quick Links
            </h3>
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
          <div>
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[29.39px] mb-6">
              Get the Bayangida Mobile App
            </h3>
            {/* App Download Links */}
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <Link href="/products">
                <img src="/images/ios.png" alt="Download on iOS" className="w-[123px] h-[53px]" />
              </Link>
              <Link href="/products">
                <img src="/images/android.png" alt="Download on Android" className="w-[123px] h-[53px]" />
              </Link>
            </div>

            {/* Sign In Buttons */}
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/products">
                <button className="w-full md:w-[229px] h-[43.19px] bg-[#0B7F40] rounded-full font-inter font-normal text-sm leading-[18.15px] text-white hover:bg-[#095c32] transition-colors">
                  Sign In as a Farmer
                </button>
              </Link>
              <Link href="/products">
                <button className="w-full md:w-[229px] h-[43.19px] bg-[#0B7F40] rounded-full font-inter font-normal text-sm leading-[18.15px] text-white hover:bg-[#095c32] transition-colors">
                  Sign In as Logistics Provider
                </button>
              </Link>
            </div>
          </div>

          {/* Fourth Column: Newsletter */}
          <div>
            <h3 className="font-cabinet-grotesk font-bold text-2xl leading-[31.2px] mb-6">
              Newsletter
            </h3>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[49px] rounded-xl px-4 py-3 mb-4 font-inter font-normal text-sm leading-[18.15px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0099FF]"
            />
            <button className="w-full md:w-[180.28px] h-[40px] bg-[#0B7F40] rounded-full font-inter font-normal text-sm leading-[18.15px] text-white hover:bg-[#095c32] transition-colors">
              Subscribe
            </button>
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
