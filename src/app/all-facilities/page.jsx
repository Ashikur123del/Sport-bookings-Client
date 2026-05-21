import AllFacilities from '@/components/AllFacilities';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';

const AllFacilitiesPage = async ({ searchParams }) => {
  const resolvedParams = await searchParams;
  

  const searchQuery = resolvedParams?.search || '';
  const facilityType = resolvedParams?.facility_type || 'All Sports';
  const sortOrder = resolvedParams?.sort || ''; 

  let sportsData = [];
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (serverUrl && serverUrl.startsWith('http')) {
    try {
      const apiUrl = `${serverUrl}/sport-user?search=${searchQuery}&facility_type=${facilityType}&sort=${sortOrder}`;
      
      const res = await fetch(apiUrl, {
        cache: 'no-store'
      });

      if (res.ok) {
        sportsData = await res.json();
      }
    } catch (error) {
      console.error("Build Prerender Safe-Catch:", error.message);
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
    
      <div className="mb-8">
        <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
          All Facilities
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Browse {sportsData.length} sports venues available for booking
        </p>
      </div>
      <div className="mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        
        <form action="" method="GET" className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
  
          {sortOrder && <input type="hidden" name="sort" value={sortOrder} />}

          <div className="w-full lg:w-1/2 flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search by facility name..."
                className="w-full border border-gray-200 rounded-lg pl-4 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 shadow-sm"
            >
              <span><IoSearchOutline /></span>
              <span>Search</span>
            </button>
          </div>

          <div className="w-full lg:w-auto flex flex-wrap gap-2 items-center justify-end">
            

            <select
              name="facility_type"
              defaultValue={facilityType}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Sports">All Sports</option>
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Badminton">Badminton</option>
              <option value="Tennis">Tennis</option>
            </select>

      
            <button 
              type="submit" 
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Apply Filter
            </button>

     
            <Link
              href={`?sort=asc${searchQuery ? `&search=${searchQuery}` : ''}${facilityType !== 'All Sports' ? `&facility_type=${facilityType}` : ''}`}
              className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors flex gap-1 items-center ${
                sortOrder === 'asc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <IoIosArrowRoundUp className="text-lg" />
              <span>High </span>  
            </Link>


            <Link
              href={`?sort=desc${searchQuery ? `&search=${searchQuery}` : ''}${facilityType !== 'All Sports' ? `&facility_type=${facilityType}` : ''}`}
              className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors flex gap-1 items-center ${
                sortOrder === 'desc' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <IoIosArrowRoundDown className="text-lg" />
              <span>Low </span>
            </Link>

            {(searchQuery || facilityType !== 'All Sports' || sortOrder) && (
              <Link href="/all-facilities" className="text-xs text-red-500 hover:underline font-bold px-2">
                Clear All
              </Link>
            )}
          </div>
        </form>
      </div>


      {sportsData.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white border border-gray-100 rounded-2xl">
          No sports facilities match your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sportsData.map((sport) => (
            <AllFacilities key={sport._id} sport={sport} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFacilitiesPage;