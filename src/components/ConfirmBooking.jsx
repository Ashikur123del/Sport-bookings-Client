"use client";

import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const ConfirmBooking = ({ data }) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const {
    _id,
    name,
    price_per_hour,
    available_slots,
    image,
    facility_type,
    location
  } = data || {};

  const [bookingDate, setBookingDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);

  const totalPrice = (price_per_hour || 0) * duration;

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.warning("Please login to reserve a sports facility.");
      return;
    }
    if (!bookingDate) {
      toast.warning("Please select a booking date.");
      return;
    }
    if (!selectedSlot) {
      toast.warning("Please select an available time slot.");
      return;
    }

    setLoading(true);

    try {
      const { data: tokenData } = await authClient.token();

      const bookingPayload = {
        userId: user?.id,
        userEmail: user?.email,
        userName: user?.name,
        facilityId: _id,
        facilityName: name,
        facilityImage: image,
        facilityType: facility_type,
        location,
        bookingDate: bookingDate, 
        timeSlot: selectedSlot,
        duration: Number(duration),
        totalPrice: Number(totalPrice),
      };

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ;

      const res = await fetch(`${serverUrl}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData?.token}`
        },
        body: JSON.stringify(bookingPayload)
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Facility Booked Successfully!");
        router.refresh(); 
        router.push("/my-bookings"); 
      } else {
        toast.error(responseData?.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Failed to connect to the server. Check backend running status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-5 lg:sticky lg:top-24">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Book This Facility</h2>
        <p className="text-xs text-gray-400 mt-1">Fill in your details to reserve this spot</p>
      </div>

      <form onSubmit={handleConfirmBooking} className="space-y-4">
        <div>
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Facility</label>
          <input 
            type="text" 
            value={name || ""} 
            disabled
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none cursor-not-allowed"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">📅 Booking Date</label>
          <input 
            type="date" 
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} 
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500 transition-colors cursor-pointer dark:text-neutral-800"
          />
        </div>
        <div>
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">🕒 Time Slot</label>
          <select 
            value={selectedSlot}
            onChange={(e) => setSelectedSlot(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500 transition-colors cursor-pointer"
          >
            <option value="">Select a time slot</option>
            {available_slots?.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Duration (Hours)</label>
          <input 
            type="number" 
            value={duration}
            onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))} 
            min={1}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500 transition-colors"
          />
        </div>
        <div className="bg-green-50/60 border border-green-100/80 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs text-gray-500 font-medium">
            <span>৳{price_per_hour} × {duration} hr</span>
            <span>৳{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-green-200/40 text-green-700 font-bold">
            <span className="text-sm">Total Price</span>
            <span className="text-lg">৳{totalPrice}</span>
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-center text-sm tracking-wide flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
};

export default ConfirmBooking;