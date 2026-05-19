import { getSportUserData } from '@/service/SportUserData'
import React from 'react'
import SportUserCard from './SportUserCard';

const SportUserList = async () => {
    const sportUser = await getSportUserData()

    return (
        <div className='max-w-7xl mx-auto px-4 py-12'>
           
            <div className="mb-10 text-center md:text-left">
                <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight'>
                    Featured Facilities
                </h2>
                <p className='text-gray-500 mt-2 max-w-xl font-medium text-sm md:text-base'>
                    Discover and book the best sports venues, tracks, and courts tailored to your fitness needs.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sportUser?.slice(0, 6).map(user => (
                    <SportUserCard key={user._id} user={user}/>
                ))}
            </div>
        </div>
    )
}

export default SportUserList;