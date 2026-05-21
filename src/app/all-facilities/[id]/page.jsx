import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ConfirmBooking from '@/components/ConfirmBooking';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const SportDetailsPage = async ({ params }) => {
 
  const { id } = await params; 
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  let data = null;

  try {
    const nextHeaders = await headers();

    const tokenResponse = await auth.api.getToken({
      headers: nextHeaders
    });
    const token = tokenResponse?.token;
    const res = await fetch(`${serverUrl}/sport-user/${id}`, {
      headers: {
        "authorization": token ? `Bearer ${token}` : "" 
      },
      cache: 'no-store' 
    });
    
    if (res.ok) {
      data = await res.json();
    } else {
      console.error(`Fetch failed with status: ${res.status}`);
    }
  } catch (error) {
    console.error(" Error fetching sports details:", error.message);
  }

  if (!data) {
    return notFound();
  }

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
                src={image && image.startsWith('http') ? image : "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0"}
                alt={name || "Facility"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
                priority
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide z-10">
                {facility_type || "Sports"}
              </span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{name}</h1>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{location || "Not Specified"}</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">👥 Capacity</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">Up to {capacity || 0} players</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">💰 Price</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">৳{price_per_hour || 0}/hour</p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">📅 Slots</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{available_slots?.length || 0} Available Today</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">About this facility</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description || "No description available."}</p>
              <p className="text-xs text-gray-400 pt-2 border-t border-gray-50">
                 This facility has been booked <strong>{booking_count || 0} times</strong> recently.
              </p>
            </div>
          </div>

          <ConfirmBooking data={data}/>

        </div>
      </div>
    </div>
  );
};

export default SportDetailsPage;