'use client'; 

import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { IoLocationSharp } from 'react-icons/io5';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { id: 1, icon: <FaFacebookF />, url: 'https://www.facebook.com/asik.kan.560', color: 'hover:bg-blue-600' },
    { id: 2, icon: <FaTwitter />, url: '#', color: 'hover:bg-sky-400' },
    { id: 3, icon: <FaInstagram />, url: '#', color: 'hover:bg-pink-600' },
    { id: 4, icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/asik-khan-b82390249/', color: 'hover:bg-blue-700' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Sport<span className="text-blue-500">Zon</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Discover and book top-rated sports facilities near you. Stay active, connect with players, and elevate your game.
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl bg-gray-800 text-gray-400 hover:text-white transition-colors duration-350 ${social.color}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-8 after:h-[2px] after:bg-blue-500">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {['About Us', 'Find Facilities', 'Pricing Plans', 'Our Blogs', 'Contact Us'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200 block py-0.5">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-8 after:h-[2px] after:bg-blue-500">
              Popular Sports
            </h3>
            <ul className="flex flex-col gap-3 text-sm font-medium">
              {['Football Turf', 'Cricket Ground', 'Badminton Court', 'Tennis Arena', 'Swimming Pool'].map((sport, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-blue-400 transition-colors duration-200 block py-0.5">
                    {sport}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-5 relative after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-8 after:h-[2px] after:bg-blue-500">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-medium text-gray-400">
              <li className="flex items-start gap-3">
                <IoLocationSharp className="text-blue-500 text-xl mt-0.5 shrink-0" />
                <span>123 Sports Avenue, Sector 10, Uttara, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500 text-base shrink-0" />
                <a href="tel:+880123456789" className="hover:text-blue-400 transition-colors">
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500 text-base shrink-0" />
                <a href="mailto:info@sportzon.com" className="hover:text-blue-400 transition-colors">
                  info@sportzon.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800/80 pt-8 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-gray-500">
          <p>© {currentYear} SportZon. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="https://www.facebook.com/asik.kan.560" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;