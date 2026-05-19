import AllFacilities from '@/components/AllFacilities'
import { getSportUserData } from '@/service/SportUserData'
import React from 'react'

const AllFacilitiesPage = async() => {
  const sportsData = await getSportUserData()
  return (
    <div className='max-w-7xl mx-auto'>
       <div className="">
        <h2>AllFacilities</h2>
       </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sportsData.map(sport => <AllFacilities key={sport._id} sport={sport}/>)}
        </div>
    </div>
  )
}

export default AllFacilitiesPage