"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import logo from "@/assets/logo.png";

import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FaSignInAlt, FaUserPlus, FaCalendarCheck, FaPlusSquare, FaBuilding, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src={logo} 
                width={80} 
                height={80} 
                alt='SportNest Logo' 
                className="object-contain transform group-hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="hidden xl:flex items-center space-x-1.5">
            <Link 
              href="/" 
              className={`font-semibold text-sm transition-colors px-3 py-2 rounded-xl ${
                isActive('/') 
                  ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-500'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/all-facilities" 
              className={`font-semibold text-sm transition-colors px-3 py-2 rounded-xl ${
                isActive('/all-facilities') 
                  ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-500'
              }`}
            >
              All Facilities
            </Link>
            <Link 
              href="/my-bookings" 
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors rounded-xl ${
                isActive('/my-bookings') 
                  ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/40'
              }`}
            >
              My Bookings
            </Link>
            <Link 
              href="/add-facility" 
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors rounded-xl ${
                isActive('/add-facility') 
                  ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/40'
              }`}
            >
              Add Facility
            </Link>
            <Link 
              href="/manage-facilities" 
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors rounded-xl ${
                isActive('/manage-facilities') 
                  ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700/40'
              }`}
            >
              Manage My Facilities
            </Link>
          </div>

          <div className="hidden xl:flex items-center gap-4">
            
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-neutral-700 dark:text-neutral-200 hover:text-emerald-500 dark:hover:text-emerald-400 font-bold text-sm px-3 py-2 rounded-xl transition-all">
                Login
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-md transition-all duration-200 flex items-center gap-1.5">
                <FaUserPlus /> Register
              </Link>
            </div>
          
            <div className="relative group/profile py-2">
              <button className="flex items-center gap-2 focus:outline-none p-1 rounded-full border-2 border-transparent hover:border-emerald-500 transition-all">
                <FaUserCircle className="text-3xl text-neutral-600 dark:text-neutral-400 cursor-pointer" />
              </button>

              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl shadow-xl py-2 text-neutral-700 dark:text-neutral-200 opacity-0 scale-95 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:scale-100 group-hover/profile:pointer-events-auto transition-all duration-200 z-50">
                <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700/50">
                  <p className="font-bold text-sm text-neutral-900 dark:text-white">User Name</p>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">user@example.com</p>
                </div>
                
                <Link 
                  href="/my-bookings" 
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive('/my-bookings') ? 'text-emerald-500 bg-emerald-50 dark:bg-neutral-700/60' : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/40'
                  }`}
                >
                  <FaCalendarCheck className={isActive('/my-bookings') ? 'text-emerald-500' : 'text-neutral-400'} /> My Bookings
                </Link>
                <Link 
                  href="/add-facility" 
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive('/add-facility') ? 'text-emerald-500 bg-emerald-50 dark:bg-neutral-700/60' : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/40'
                  }`}
                >
                  <FaPlusSquare className={isActive('/add-facility') ? 'text-emerald-500' : 'text-blue-500'} /> Add Facility
                </Link>
                <Link 
                  href="/manage-facilities" 
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-colors ${
                    isActive('/manage-facilities') ? 'text-emerald-500 bg-emerald-50 dark:bg-neutral-700/60' : 'hover:bg-neutral-50 dark:hover:bg-neutral-700/40'
                  }`}
                >
                  <FaBuilding className={isActive('/manage-facilities') ? 'text-emerald-500' : 'text-purple-500'} /> Manage My Facilities
                </Link>
                
                <div className="border-t border-neutral-100 dark:border-neutral-700/50 mt-1.5 pt-1.5">
                  <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                    <FaSignOutAlt className="text-base" /> Logout
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 dark:text-neutral-300 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none"
            >
              {isOpen ? <HiX className="text-2xl text-emerald-500" /> : <HiMenuAlt3 className="text-2xl" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden border-t border-neutral-100 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)} 
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-colors ${
              isActive('/') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/facilities" 
            onClick={() => setIsOpen(false)} 
            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-colors ${
              isActive('/facilities') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
            }`}
          >
            All Facilities
          </Link>

          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 mt-2 space-y-1.5">
            <div className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-neutral-400">
              Dashboard
            </div>
            <Link 
              href="/my-bookings" 
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-colors ${
                isActive('/my-bookings') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <FaCalendarCheck className={isActive('/my-bookings') ? 'text-emerald-500' : 'text-neutral-400'} /> My Bookings
            </Link>
            <Link 
              href="/add-facility" 
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-colors ${
                isActive('/add-facility') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <FaPlusSquare className={isActive('/add-facility') ? 'text-emerald-500' : 'text-neutral-400'} /> Add Facility
            </Link>
            <Link 
              href="/manage-facilities" 
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-colors ${
                isActive('/manage-facilities') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <FaBuilding className={isActive('/manage-facilities') ? 'text-emerald-500' : 'text-neutral-400'} /> Manage My Facilities
            </Link>
            <button className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-left">
              <FaSignOutAlt /> Logout
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60 mt-3 flex flex-col gap-2 px-2">
            <Link href="/login" onClick={() => setIsOpen(false)} className="w-full text-center font-bold py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200">
              Login
            </Link>
            <Link href="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl shadow-md">
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;