import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SportUserCard = ({ user }) => {
  const {
    name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
    booking_count
  } = user;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full transform hover:-translate-y-1">
      
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          className="object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image} 
          alt={name} 
          fill
          sizes="(max-w-7xl) 33vw, 100vw"
          priority={false}
        />

        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
           {booking_count} Booked
        </div>
      </div>

   
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>

          <div className="mb-2">
            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
              {facility_type}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 tracking-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-medium">
            <span className="truncate max-w-[150px]"> {location.split(',')[0]}</span>
            <span> Max {capacity} Players</span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-50 flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Price</p>
            <p className="text-base font-extrabold text-emerald-600">
              ৳{price_per_hour}<span className="text-[10px] text-gray-400 font-normal">/hr</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Slots Available</p>
            <p className="text-xs font-bold text-blue-600 mt-0.5">
               {available_slots?.length || 0} Slots today
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0">
        <Link href="/all-facilities">
                <button className="w-full bg-gray-900 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-center text-xs tracking-wide uppercase">
          View Details & Book
        </button>
        </Link>
      </div>

    </div>
  )
}

export default SportUserCard;