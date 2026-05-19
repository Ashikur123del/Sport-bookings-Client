'use client'; 

import React from 'react';
import { Card } from '@heroui/react';
import { motion } from 'framer-motion';
import { FiCalendar, FiShield, FiClock, FiAward } from 'react-icons/fi'; 


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, 
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const WhyChooseSports = () => {
  const features = [
    {
      id: 1,
      title: 'Easy & Fast Booking',
      description: 'Book your favorite sports ground or facility in just a few clicks without any hassle.',
      icon: <FiCalendar />,
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      id: 2,
      title: 'Verified Facilities',
      description: 'We partner only with verified and top-rated sports venues to ensure the best quality.',
      icon: <FiShield />,
      iconBg: 'bg-green-100 text-green-600',
    },
    {
      id: 3,
      title: '24/7 Support',
      description: 'Our dedicated support team is always available to help you with your queries and bookings.',
      icon: <FiClock />,
      iconBg: 'bg-purple-100 text-purple-600',
    },
    {
      id: 4,
      title: 'Affordable Pricing',
      description: 'Get the best rates, exclusive discounts, and zero hidden charges for all bookings.',
      icon: <FiAward />,
      iconBg: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="py-20 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3 py-1 rounded-full">
            Our Benefits
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-4 tracking-tight">
            Why Choose Our Sports Platform?
          </h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            We provide the ultimate experience for sports lovers, making it easier than ever to play, connect, and stay fit.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                transition: { type: 'spring', stiffness: 300, damping: 15 } 
              }}
              className="h-full"
            >
              <Card
                shadow="sm"
                className="p-6 bg-white border border-gray-100/80 hover:shadow-md transition-all duration-300 flex flex-col items-start text-left h-full"
              >

                <div className={`p-4 rounded-2xl text-2xl mb-5 inline-flex items-center justify-center ${feature.iconBg}`}>
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default WhyChooseSports;