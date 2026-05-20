"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation'; 


import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import { FaUserPlus, FaCalendarCheck, FaPlusSquare, FaBuilding, FaSignOutAlt, FaUserCircle, FaSignInAlt, FaRunning } from 'react-icons/fa';
import { authClient } from '@/lib/auth-client';

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          setIsOpen(false);
        },
      },
    });
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
         <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                <FaRunning className="text-lg" />
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                Sport<span className="text-neutral-800 dark:text-neutral-100">Nest</span>
              </span>
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

            {user && (
              <>
                <Link 
                  href="/my-bookings" 
                  className={`font-semibold text-sm transition-colors px-3 py-2 rounded-xl ${
                    isActive('/my-bookings') 
                      ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-500'
                  }`}
                >
                  My Bookings
                </Link>
                <Link 
                  href="/add-facility" 
                  className={`font-semibold text-sm transition-colors px-3 py-2 rounded-xl ${
                    isActive('/add-facility') 
                      ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-500'
                  }`}
                >
                  Add Facility
                </Link>
                <Link 
                  href="/manage-facilities" 
                  className={`font-semibold text-sm transition-colors px-3 py-2 rounded-xl ${
                    isActive('/manage-facilities') 
                      ? 'text-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20' 
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-emerald-500'
                  }`}
                >
                  Manage Facilities
                </Link>
              </>
            )}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            {!user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-200 font-bold text-sm px-5 py-2.5 rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow transition-all"
                >
                  Register
                </Link>
              </div>
            ) : (

              <div className="relative group/profile py-2">
                <button className="flex items-center gap-2 focus:outline-none px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 transition-all">
                  {user?.image ? (
                    <div className="relative h-7 w-7 rounded-full overflow-hidden">
                      <Image src={user.image} alt={user.name || 'User'} fill className="object-cover" />
                    </div>
                  ) : (
                    <FaUserCircle className="text-2xl text-neutral-500" />
                  )}
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 max-w-[120px] truncate">
                    {user?.name || user?.email}
                  </span>
                  <HiChevronDown className="text-neutral-500 group-hover/profile:rotate-180 transition-transform duration-200" />
                </button>

                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-2xl shadow-xl py-2 text-neutral-700 dark:text-neutral-200 opacity-0 scale-95 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:scale-100 group-hover/profile:pointer-events-auto transition-all duration-200 z-50">
                  <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-700/50">
                    <p className="font-bold text-sm text-neutral-900 dark:text-white truncate">{user?.name || 'User'}</p>
                    <p className="text-xs text-neutral-400 truncate mt-0.5">{user?.email}</p>
                  </div>
                  
                  <Link href="/my-bookings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700/40 transition-colors">
                    <FaCalendarCheck className="text-neutral-400" /> My Bookings
                  </Link>
                  <Link href="/add-facility" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700/40 transition-colors">
                    <FaPlusSquare className="text-neutral-400" /> Add Facility
                  </Link>
                  <Link href="/manage-facilities" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-700/40 transition-colors">
                    <FaBuilding className="text-neutral-400" /> Manage Facilities
                  </Link>
                  
                  <div className="border-t border-neutral-100 dark:border-neutral-700/50 mt-1.5 pt-1.5">
                    <button onClick={handleSignOut} className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
                      <FaSignOutAlt className="text-base" /> Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 dark:text-neutral-300 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 focus:outline-none"
            >
              {isOpen ? <HiX className="text-2xl text-emerald-500" /> : <HiMenuAlt3 className="text-2xl" />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="xl:hidden border-t border-neutral-100 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold ${isActive('/') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-300'}`}>
            Home
          </Link>
          <Link href="/all-facilities" onClick={() => setIsOpen(false)} className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold ${isActive('/all-facilities') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'text-neutral-700 dark:text-neutral-300'}`}>
            All Facilities
          </Link>

          {user ? (
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800/60 mt-2 space-y-1.5">
              <div className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-neutral-400">Dashboard</div>
              <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-neutral-700 dark:text-neutral-300"><FaCalendarCheck className="text-neutral-400" /> My Bookings</Link>
              <Link href="/add-facility" onClick={() => setIsOpen(false)} className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-neutral-700 dark:text-neutral-300"><FaPlusSquare className="text-neutral-400" /> Add Facility</Link>
              <Link href="/manage-facilities" onClick={() => setIsOpen(false)} className="flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold text-neutral-700 dark:text-neutral-300"><FaBuilding className="text-neutral-400" /> Manage Facilities</Link>
              <button onClick={handleSignOut} className="flex w-full items-center gap-3.5 px-4 py-3 rounded-xl font-bold text-red-500 text-left"><FaSignOutAlt /> Logout</button>
            </div>
          ) : (
          
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60 mt-3 grid grid-cols-2 gap-3">
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)} 
                className="w-full text-center border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm"
              >
                <FaSignInAlt className="text-neutral-400" /> Login
              </Link>
              <Link 
                href="/register" 
                onClick={() => setIsOpen(false)} 
                className="w-full text-center bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <FaUserPlus /> Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;