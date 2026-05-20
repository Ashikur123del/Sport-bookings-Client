"use client";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  TextArea,
  TextField,
  Select,
  Card,
} from "@heroui/react";
import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { ImManWoman } from "react-icons/im";
import { IoCamera } from "react-icons/io5";
import { LuAlarmClock } from "react-icons/lu";
import { TbCoinTakaFilled } from "react-icons/tb";
import { toast } from "react-toastify";

const AddFacilityPage = () => {
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState("");

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!currentSlot.trim()) return;
    if (slots.includes(currentSlot.trim())) {
      toast.error("This slot is already added!");
      return;
    }
    setSlots([...slots, currentSlot.trim()]);
    setCurrentSlot("");
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter((slot) => slot !== slotToRemove));
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (slots.length === 0) {
      toast.error("Please add at least one available time slot!");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const facilityRawData = Object.fromEntries(formData.entries());

    const finalFacilityData = {
      name: facilityRawData.facilityName,
      facility_type: facilityRawData.facilityType,
      image: facilityRawData.imageUrl,
      location: facilityRawData.location,
      price_per_hour: Number(facilityRawData.pricePerHour),
      capacity: Number(facilityRawData.facilityCapacity),
      available_slots: slots,
      description: facilityRawData.description,
      booking_count: 0,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sport-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalFacilityData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Server Response:", data);
        toast.success(" Facility Added Successfully!");
        e.target.reset();
        setSlots([]);
      } else {
        toast.error("Failed to add facility. Server returned an error.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Server connection failed! Make sure backend is running.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-5 px-4">
      <h2 className="text-center py-5 text-4xl font-black text-gray-800 tracking-tight">
        Add Sports Facility
      </h2>

      <Card className="border border-cyan-100 shadow-md bg-white rounded-3xl overflow-hidden">
        <form onSubmit={handleForm} className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <TextField isRequired aria-label="Facility Name">
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Facility Name
                </Label>
                <Input
                  name="facilityName"
                  placeholder="Skyline Futsal Arena"
                  className="rounded-2xl"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>
            <div>
              <Select
                name="facilityType"
                isRequired
                className="w-full"
                placeholder="Select facility type"
                aria-label="Facility Type"
              >
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Facility Type
                </Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Futsal Court" textValue="Futsal Court">
                      Futsal Court
                    </ListBox.Item>
                    <ListBox.Item
                      id="Cricket Indoor"
                      textValue="Cricket Indoor"
                    >
                      Cricket Indoor
                    </ListBox.Item>
                    <ListBox.Item
                      id="Badminton Court"
                      textValue="Badminton Court"
                    >
                      Badminton Court
                    </ListBox.Item>
                    <ListBox.Item
                      id="Basketball Court"
                      textValue="Basketball Court"
                    >
                      Basketball Court
                    </ListBox.Item>
                    <ListBox.Item id="Gym & Fitness" textValue="Gym & Fitness">
                      Gym & Fitness
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <TextField isRequired aria-label="Location">
              <Label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1 ">
                <span className="text-orange-400"><FaLocationDot /></span> Location
              </Label>
              <Input
                name="location"
                placeholder="Dhaka, Bangladesh"
                className="rounded-2xl"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField isRequired aria-label="Price Per Hour">
              <Label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <span className="text-orange-400"><TbCoinTakaFilled />   </span> Price Per Hour (BDT) 
              </Label>
              <Input
                name="pricePerHour"
                type="number"
                placeholder="2000"
                className="rounded-2xl"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField isRequired aria-label="Capacity">
              <Label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <span className="text-orange-400"><ImManWoman /> </span>  Max Capacity (Players) 
              </Label>
              <Input
                name="facilityCapacity"
                type="number"
                placeholder="12"
                className="rounded-2xl"
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <div className="md:col-span-2">
              <TextField isRequired aria-label="Image URL">
                <Label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                  <span className="text-orange-400"><IoCamera /> </span> Uploaded Image URL 
                </Label>
                <Input
                  name="imageUrl"
                  type="url"
                  placeholder="https://i.ibb.co/your-image-id/futsal.jpg"
                  className="rounded-2xl"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            <div className="md:col-span-2 space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                 <span className="text-orange-400"><LuAlarmClock /> </span> Create Available Time Slots
              </Label>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <TextField aria-label="Time Slot Input">
                    <Input
                      placeholder="e.g., 07:00 PM - 08:00 PM"
                      className="rounded-2xl w-full"
                      value={currentSlot}
                      onChange={(e) => setCurrentSlot(e.target.value)}
                    />
                  </TextField>
                </div>
                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="bg-gray-900 text-white px-5 py-3 rounded-2xl font-semibold text-sm hover:bg-gray-800 transition-colors h-[48px] cursor-pointer"
                >
                  Add Slot
                </button>
              </div>

              {slots.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-100 rounded-2xl">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-green-100"
                    >
                      <span>{slot}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSlot(slot)}
                        className="hover:text-red-500 font-bold ml-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <TextField isRequired aria-label="Description">
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">
                  Description
                </Label>
                <TextArea
                  name="description"
                  placeholder="Describe the court features, wooden/synthetic floor, lightning etc..."
                  className="rounded-3xl"
                />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>
          </div>

          <Button
            type="submit"
            variant="outline"
            className="rounded-xl w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 text-sm tracking-wide shadow-md transition-all border-none"
          >
            Add Facility
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddFacilityPage;
