"use client"; 

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/effect-fade';


import banner1 from "@/assets/b-1.avif";
import banner2 from "@/assets/b-2.avif";
import banner3 from "@/assets/b-3.webp";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { IoMdTrophy } from 'react-icons/io';

const Banner = () => {
  const slides = [
    { id: 1, image: banner1 },
    { id: 2, image: banner2 },
    { id: 3, image: banner3 },
  ];

  return (
    <div className="w-full h-screen min-h-[600px] relative text-white">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect={'fade'} 
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center flex flex-col justify-center items-center relative px-4"
              style={{ backgroundImage: `url(${slide.image.src})` }}
            >
    
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"></div>


              <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
                
                <div className="bg-[#1b4322]/80 border border-emerald-600/30 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 mb-6 flex items-center gap-1.5">
                  <span className='text-orange-400'><IoMdTrophy /> </span> #1 Sports Booking Platform
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Book Your <br />
                  <span className="text-emerald-400">Perfect Court</span>
                </h1>

                <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                  Discover and reserve premium sports facilities — football turfs, 
                  badminton courts, swimming lanes, and more. Instant booking, zero hassle.
                </p>

                <div className="flex flex-row gap-4 mb-14">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition duration-300 flex items-center gap-2 shadow-lg shadow-emerald-900/40 text-sm md:text-base">
                    Explore Facilities <span><HiOutlineArrowNarrowRight /></span>
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium px-6 py-3 rounded-xl transition duration-300 text-sm md:text-base">
                    Get Started Free
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-4 md:gap-12 border-t border-white/10 pt-6 w-full max-w-2xl">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">500+</h3>
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mt-1">Facilities</p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">10K+</h3>
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mt-1">Bookings</p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">6</h3>
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mt-1">Sports</p>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold flex items-center justify-center gap-0.5">
                      4.9<span className="text-amber-400 text-sm md:text-base">★</span>
                    </h3>
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase tracking-wider mt-1">Rating</p>
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-10 left-6 z-20 hidden md:block bg-black/40 border border-white/10 px-3 py-1.5 rounded-full text-xs text-gray-300">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
        500+ Active Facilities
      </div>
    </div>
  );
};

export default Banner;