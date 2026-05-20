"use client";

import React, { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaHourglassHalf, 
  FaUser, 
  FaHistory, 
  FaBoxOpen,
  FaShieldAlt
} from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

const MyBookingsPage = () => {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
        
        const { data: tokenData } = await authClient.token(); 
  
        const res = await fetch(`${serverUrl}/my-bookings`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${tokenData?.token}`,
            "Content-Type": "application/json"
          },
          cache: "no-store"
        });

        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        } else {
          toast.error("Failed to sync your booking basket");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Network issue. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, [user?.email, authLoading]);

  const totalAmount = bookings.reduce((sum, item) => sum + (Number(item.totalPrice) || 0), 0);

  if (authLoading || loading) {
    return (
      <div className="min-h-[75vh] flex justify-center items-center bg-zinc-50/50">
        <div className="relative flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-4 border-t-emerald-500 border-emerald-100 animate-spin"></div>
          <p className="text-xs font-bold text-neutral-400 tracking-wider">Syncing Your Account...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[65vh] flex flex-col justify-center items-center text-center px-4 bg-zinc-50/30">
        <div className="w-16 h-16 bg-white border border-neutral-200/80 text-neutral-400 flex items-center justify-center rounded-2xl shadow-sm text-xl mb-4">
          <span className='text-orange-400'><RiLockPasswordFill /></span>
        </div>
        <h2 className="text-xl font-bold text-neutral-800 tracking-tight">Access Secure Area</h2>
        <p className="text-sm text-neutral-500 max-w-xs mt-1">Please login to isolate and manage your personal sport court bookings.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
      
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-neutral-200/60 p-6 rounded-2xl shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest bg-emerald-50 w-max px-2.5 py-1 rounded-md mb-2">
              <FaShieldAlt /> Personal Workspace Locked
            </div>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">My Private Cart</h1>
            <p className="text-xs text-neutral-400 mt-0.5">Displaying items reserved exclusively under your verified account</p>
          </div>
          
          <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-100 p-3 rounded-xl self-start sm:self-auto">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 text-white flex items-center justify-center font-bold overflow-hidden relative border shadow-inner">
              {user.image ? (
                <Image src={user.image} alt="Avatar" fill className="object-cover" />
              ) : (
                <FaUser className="text-neutral-400 text-sm" />
              )}
            </div>
            <div>
              <p className="text-xs font-black text-neutral-800">{user.name}</p>
              <p className="text-[10px] font-bold text-emerald-600 tracking-wide">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-md flex justify-between items-center bg-gradient-to-r from-emerald-900 to-teal-950">
          <div>
            <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Active Basket</p>
            <p className="text-2xl font-black mt-1">{bookings.length} Verified Slots</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest">Total Value</p>
            <p className="text-2xl font-black mt-1 text-emerald-400">৳{totalAmount}</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white border border-neutral-200/60 rounded-2xl p-16 text-center shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 bg-neutral-50 border rounded-2xl flex items-center justify-center mx-auto text-neutral-300 text-xl shadow-inner">
              <FaBoxOpen />
            </div>
            <div className="space-y-1">
              <p className="text-neutral-800 font-bold text-sm">Your Cart is Empty</p>
              <p className="text-neutral-400 text-xs max-w-xs mx-auto">No sports grounds have been booked under <b>{user.email}</b> yet.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bookings.map((booking) => {
              const isUpcoming = booking.bookingDate 
                ? new Date(booking.bookingDate).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0)
                : false;

              return (
                <div 
                  key={booking._id} 
                  className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-sm">
                    My Slot
                  </div>

                  <div className="flex gap-4">
                    <div className="relative h-20 w-24 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/40 flex-shrink-0">
                      <Image 
                        src={booking.facilityImage || "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0"} 
                        alt="Venue" 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <span className="text-[9px] bg-neutral-100 text-neutral-500 font-bold px-2 py-0.5 rounded uppercase tracking-wide inline-block">
                        {booking.facilityType || "Sports"}
                      </span>
                      <h3 className="font-bold text-neutral-900 text-sm truncate group-hover:text-emerald-600 transition-colors">
                        {booking.facilityName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
                        <FaMapMarkerAlt className="flex-shrink-0 text-neutral-400" />
                        <span className="truncate text-neutral-500">{booking.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-neutral-100 my-4"></div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[11px] font-semibold text-neutral-600 bg-neutral-50/60 p-3 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-neutral-400" />
                      <div>
                        <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider leading-none">Date</p>
                        <p className="mt-0.5 text-neutral-800 font-bold">
                          {booking.bookingDate 
                            ? new Date(booking.bookingDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) 
                            : 'N/A'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaClock className="text-neutral-400" />
                      <div>
                        <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider leading-none">Time Slot</p>
                        <p className="mt-0.5 text-neutral-800 font-bold truncate max-w-[110px]">{booking.timeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaHourglassHalf className="text-neutral-400" />
                      <div>
                        <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider leading-none">Duration</p>
                        <p className="mt-0.5 text-neutral-800 font-bold">{booking.duration} Hour{booking.duration > 1 ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                      <div>
                        <p className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider leading-none">Status</p>
                        <div className="mt-0.5">
                          {isUpcoming ? (
                            <span className="text-emerald-600 font-bold flex items-center gap-1">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span> Upcoming
                            </span>
                          ) : (
                            <span className="text-neutral-400 font-bold flex items-center gap-1">
                              <FaHistory className="text-[9px]" /> History
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-neutral-100 flex justify-between items-center">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Amount Paid</span>
                    <span className="text-base font-black text-neutral-900">৳{booking.totalPrice}</span>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;