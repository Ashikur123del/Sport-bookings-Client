import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AllFacilities = ({ sport }) => {
  if (!sport) return null;
  const {
    _id,
    name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
    booking_count
  } = sport;

 

  return (
    <Link href={`/all-facilities/${_id}`} className="block h-full">
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between overflow-hidden h-full transform hover:-translate-y-1 cursor-pointer">
        
  
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <Image
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            src={image && image.startsWith('http') ? image : fallbackImage} 
            alt={name || "Sports Facility"} 
            fill 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true} 
          />
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-100 z-10">
             {booking_count || 0} Booked
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md">
                {facility_type || "Sports"}
              </span>
              <span className="text-xs text-gray-400 font-medium truncate max-w-[150px]">
                 {location ? location.split(',')[0] : "N/A"}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-800 tracking-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
              {name}
            </h3>

            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
              {description || "No description available."}
            </p>
          </div>

          <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Rate</p>
              <p className="text-base font-extrabold text-emerald-600">
                ৳{price_per_hour || 0}<span className="text-[10px] text-gray-400 font-normal">/hr</span>
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Capacity & Slots</p>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">
                 Max {capacity || 0} • 🟢 {available_slots?.length || 0} Slots
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 pt-0">
          <div className="w-full bg-gray-900 group-hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 shadow-sm text-center text-xs tracking-wide uppercase">
            View Details & Book
          </div>
        </div>

      </div>
    </Link>
  );
};

export default AllFacilities;