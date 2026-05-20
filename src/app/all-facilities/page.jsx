import AllFacilities from '@/components/AllFacilities'
import { getSportUserData } from '@/service/SportUserData'
import React from 'react'

const AllFacilitiesPage = async() => {

  const sportsData = await getSportUserData() || [];
  
  return (
    <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">All Sports Facilities</h2>
          <p className="text-xs text-gray-400 mt-1">Explore and reserve your favorite spots</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sportsData.map(sport => (
            <AllFacilities key={sport._id} sport={sport}/>
          ))}
        </div>
    </div>
  )
}

export default AllFacilitiesPage;