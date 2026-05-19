"use client"; 

import React from "react";
import { Card } from "@heroui/react";
import { motion } from "framer-motion"; 
import { IoMdFootball } from "react-icons/io";
import { GiTennisRacket } from "react-icons/gi";
import { FaPersonSwimming, FaBasketball } from "react-icons/fa6";
import { MdSportsCricket } from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const PopularSports = () => {
  const popularSports = [
    {
      id: 1,
      name: "Football",
      icon: <IoMdFootball />,
      bgColor: "bg-green-50/60 hover:bg-green-50",
      textColor: "text-green-600",
    },
    {
      id: 2,
      name: "Badminton",
      icon: <GiShuttlecock />,
      bgColor: "bg-yellow-50/60 hover:bg-yellow-50",
      textColor: "text-amber-700",
    },
    {
      id: 3,
      name: "Tennis",
      icon: <GiTennisRacket />,
      bgColor: "bg-orange-50/60 hover:bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      id: 4,
      name: "Swimming",
      icon: <FaPersonSwimming />,
      bgColor: "bg-cyan-50/60 hover:bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      id: 5,
      name: "Basketball",
      icon: <FaBasketball />,
      bgColor: "bg-red-50/60 hover:bg-red-50",
      textColor: "text-red-600",
    },
    {
      id: 6,
      name: "Cricket",
      icon: <MdSportsCricket />,
      bgColor: "bg-blue-50/60 hover:bg-blue-50",
      textColor: "text-blue-700",
    },
  ];

  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Popular Sports
          </h2>
          <p className="text-gray-500 font-medium text-base sm:text-lg">
            Find facilities for every sport you love
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 justify-center"
        >
          {popularSports.map((sport) => (
            <motion.div
              key={sport.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
              whileTap={{ scale: 0.95 }}
              className="h-full"
            >
              <Card
                isPressable
                shadow="sm"
                className={`border border-transparent hover:border-gray-100 transition-colors duration-300 w-full h-full ${sport.bgColor}`}
              >
                <div className="flex flex-col items-center justify-center p-6 gap-3 w-full h-full">
                  <motion.div
                    className={`text-4xl ${sport.textColor}`}
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    {sport.icon}
                  </motion.div>
                  <span className={`font-semibold text-sm ${sport.textColor}`}>
                    {sport.name}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PopularSports;
