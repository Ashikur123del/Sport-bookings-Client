"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { HiPlus, HiUserGroup } from "react-icons/hi";
import { HiMapPin } from "react-icons/hi2";
import DeleteModel from "@/components/DeleteModle";
import EditModle from "@/components/EditModle";

const ManageFacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFacilities = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sport-user`);
      if (res.ok) {
        const data = await res.json();
        setFacilities(data);
      } else {
        toast.error("Failed to load facilities! ");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Server connection failed! 🔌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 font-semibold animate-pulse">
          Loading your facilities...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Manage My Facilities
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Edit or remove your listed venues
          </p>
        </div>
        <Link
          href="/add-facility"
          className="inline-flex items-center justify-center gap-1.5 bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors shadow-sm self-start sm:self-center"
        >
          <HiPlus className="text-base" /> Add New
        </Link>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">
            No facilities found. Click Add New to create one!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {facilities.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-gray-100 rounded-3xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all hover:shadow-md"
            >

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
                <div className="relative h-24 w-full sm:w-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2"
                    }
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                      {item.name}
                    </h3>
                    <span className="bg-green-50 text-green-700 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border border-green-100">
                      {item.facility_type}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1">
                      <HiMapPin className="text-gray-400 text-base" /> 
                      {item.location ? item.location.split(",")[0] : "N/A"}
                    </span>
                    <span className="text-emerald-600 font-bold">
                      ৳ {item.price_per_hour}/hr
                    </span>
                    <span className="flex items-center gap-1">
                      <HiUserGroup className="text-gray-400 text-base" /> 
                      {item.capacity} players
                    </span>
                    <span className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.booking_count || 0} Bookings
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t border-gray-50 pt-3 md:pt-0 md:border-none">
  
                <div>
                  <EditModle facility={item} onSuccess={fetchFacilities} />
                </div>
                
                <div>
                  <DeleteModel facility={item} onSuccess={fetchFacilities} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageFacilitiesPage;