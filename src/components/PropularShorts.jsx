import React from 'react';

const PopularSports = () => {
  // স্পোর্টস ডেটা অ্যারে (আইকন, নাম এবং ব্যাকগ্রাউন্ড/টেক্সট কালার সহ)
  const popularSports = [
    {
      id: 1,
      name: 'Football',
      icon: '⚽',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      id: 2,
      name: 'Badminton',
      icon: '🏸',
      bgColor: 'bg-yellow-50',
      textColor: 'text-amber-700',
    },
    {
      id: 3,
      name: 'Tennis',
      icon: '🎾',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
    },
    {
      id: 4,
      name: 'Swimming',
      icon: '🏊',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
    },
    {
      id: 5,
      name: 'Basketball',
      icon: '🏀',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
    {
      id: 6,
      name: 'Cricket',
      icon: '🏏',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Popular Sports
          </h2>
          <p className="text-gray-500 font-medium">
            Find facilities for every sport you love
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 justify-center items-center">
          {popularSports.map((sport) => (
            <div
              key={sport.id}
              className={`${sport.bgColor} rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 shadow-sm border border-transparent hover:border-gray-100`}
            >

              <span className="text-3xl mb-3 role='img' aria-label={sport.name}">
                {sport.icon}
              </span>
              <span className={`font-semibold text-sm ${sport.textColor}`}>
                {sport.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularSports;