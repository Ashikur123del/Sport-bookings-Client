import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const SportDetailsPage = async ({ params }) => {
  const { id } = await params;
  
  
  const res = await fetch(`http://localhost:8000/sport-user/${id}`, {
    cache: 'no-store' 
  });
  
  if (!res.ok) {
    notFound(); 
  }
  
  const data = await res.json();

  const {
    name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
    booking_count
  } = data;

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div className="relative h-64 sm:h-[400px] w-full rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
              <Image
                className="object-cover"
                src={image}
                alt={name}
                fill
                priority
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                {facility_type}
              </span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{name}</h1>

         
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">📍 Location</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{location}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">👥 Capacity</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">Up to {capacity} players</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">💰 Price</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">৳{price_per_hour}/hour</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">📅 Slots</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{available_slots?.length || 0} Available Today</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">About this facility</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              <p className="text-xs text-gray-400 pt-2 border-t border-gray-50">
                 This facility has been booked <strong>{booking_count} times</strong> recently.
              </p>
            </div>

          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-md space-y-5 lg:sticky lg:top-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Book This Facility</h2>
              <p className="text-xs text-gray-400 mt-1">Fill in your details to reserve this spot</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">Facility</label>
                <input 
                  type="text" 
                  value={name} 
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">📅 Booking Date</label>
                <input 
                  type="date" 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500 transition-colors cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">🕒 Time Slot</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500 transition-colors cursor-pointer">
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
                  defaultValue={1} 
                  min={1}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="bg-green-50/60 border border-green-100/80 rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-xs text-gray-500 font-medium">
                <span>৳{price_per_hour} × 1 hr</span>
                <span>৳{price_per_hour}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-green-200/40 text-green-700 font-bold">
                <span className="text-sm">Total Price</span>
                <span className="text-lg">৳{price_per_hour}</span>
              </div>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-center text-sm tracking-wide">
              Confirm Booking
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default SportDetailsPage;