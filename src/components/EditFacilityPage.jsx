"use client"
import React, { useEffect, useState, use } from 'react'
import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select, Card } from '@heroui/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const EditFacilityPage = ({ params }) => {
  // Next.js 15+ এর জন্য params আনর‍্যাপ করা
  const { id } = use(params);
  const router = useRouter();

  // ফর্মের স্টেটসমূহ
  const [facility, setFacility] = useState(null);
  const [slots, setSlots] = useState([]);
  const [currentSlot, setCurrentSlot] = useState('');
  const [loading, setLoading] = useState(true);

  // ১. পুরনো ডাটা লোড করার ফাংশন
  useEffect(() => {
    const fetchSingleFacility = async () => {
      try {
        const res = await fetch(`http://localhost:8000/sport-user/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFacility(data);
          setSlots(data.available_slots || []);
        } else {
          toast.error("Failed to fetch facility data!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error loading data from server");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleFacility();
  }, [id]);

  // স্লট অ্যাড ও রিমুভ হ্যান্ডেলার
  const handleAddSlot = (e) => {
    e.preventDefault();
    if (!currentSlot.trim()) return;
    if (slots.includes(currentSlot.trim())) {
      toast.error("This slot is already added! 🕒");
      return;
    }
    setSlots([...slots, currentSlot.trim()]);
    setCurrentSlot('');
  };

  const handleRemoveSlot = (slotToRemove) => {
    setSlots(slots.filter(slot => slot !== slotToRemove));
  };

  // ২. ফর্ম সাবমিট করে আপডেট করার ফাংশn (PUT API Call)
  const handleUpdateForm = async (e) => {
    e.preventDefault();

    if (slots.length === 0) {
      toast.error("Please add at least one available time slot! 🕒");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const updatedFacilityData = {
      name: rawData.facilityName,
      facility_type: rawData.facilityType,
      image: rawData.imageUrl,
      location: rawData.location,
      price_per_hour: Number(rawData.pricePerHour),
      capacity: Number(rawData.facilityCapacity),
      available_slots: slots,
      description: rawData.description
    };

    try {
      const res = await fetch(`http://localhost:8000/sport-user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFacilityData)
      });

      if (res.ok) {
        toast.success("🎉 Facility Updated Successfully!");
        router.push("/manage-facilities"); // আপডেট শেষে মেইন লিস্ট পেজে ফেরত যাবে
        router.refresh();
      } else {
        toast.error("Failed to update facility.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error occurred!");
    }
  };

  if (loading) return <div className="text-center py-20 font-bold text-gray-500">Loading Facility Details...</div>;
  if (!facility) return <div className="text-center py-20 text-red-500">No facility found!</div>;

  return (
    <div className='max-w-4xl mx-auto py-5 px-4'>
      <h2 className='text-center py-5 text-4xl font-black text-gray-800 tracking-tight'>Edit Sports Facility</h2>
      
      <Card className='border border-cyan-100 shadow-md bg-white rounded-3xl overflow-hidden'>
        <form onSubmit={handleUpdateForm} className="p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Facility Name */}
            <div className="md:col-span-2">
              <TextField isRequired aria-label="Facility Name" defaultValue={facility.name}>
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">Facility Name</Label>
                <Input name="facilityName" placeholder="Skyline Futsal Arena" className="rounded-2xl" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Facility Type */}
            <div>
              <Select
                name="facilityType"
                isRequired
                className="w-full"
                placeholder="Select facility type"
                aria-label="Facility Type"
                defaultSelectedKeys={[facility.facility_type]}
              >
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">Facility Type</Label>
                <Select.Trigger className="rounded-2xl">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="Futsal Court" textValue="Futsal Court">Futsal Court</ListBox.Item>
                    <ListBox.Item id="Cricket Indoor" textValue="Cricket Indoor">Cricket Indoor</ListBox.Item>
                    <ListBox.Item id="Badminton Court" textValue="Badminton Court">Badminton Court</ListBox.Item>
                    <ListBox.Item id="Basketball Court" textValue="Basketball Court">Basketball Court</ListBox.Item>
                    <ListBox.Item id="Gym & Fitness" textValue="Gym & Fitness">Gym & Fitness</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Location */}
            <TextField isRequired aria-label="Location" defaultValue={facility.location}>
              <Label className="text-sm font-semibold text-gray-700 mb-1 block">📍 Location</Label>
              <Input name="location" placeholder="Dhaka, Bangladesh" className="rounded-2xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Price Per Hour */}
            <TextField isRequired aria-label="Price Per Hour" defaultValue={String(facility.price_per_hour)}>
              <Label className="text-sm font-semibold text-gray-700 mb-1 block">💰 Price Per Hour (BDT)</Label>
              <Input name="pricePerHour" type="number" placeholder="2000" className="rounded-2xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Capacity */}
            <TextField isRequired aria-label="Capacity" defaultValue={String(facility.capacity)}>
              <Label className="text-sm font-semibold text-gray-700 mb-1 block">👥 Max Capacity (Players)</Label>
              <Input name="facilityCapacity" type="number" placeholder="12" className="rounded-2xl" />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField isRequired aria-label="Image URL" defaultValue={facility.image}>
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">📸 Uploaded Image URL</Label>
                <Input name="imageUrl" type="url" placeholder="https://link.com/image.jpg" className="rounded-2xl" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>

            {/* Available Time Slots */}
            <div className="md:col-span-2 space-y-3">
              <Label className="text-sm font-semibold text-gray-700 block">🕒 Edit Available Time Slots</Label>
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

              {/* স্লট লিস্ট চিপস */}
              {slots.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-100 rounded-2xl">
                  {slots.map((slot, index) => (
                    <div key={index} className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-xl border border-green-100">
                      <span>{slot}</span>
                      <button type="button" onClick={() => handleRemoveSlot(slot)} className="hover:text-red-500 font-bold ml-1 cursor-pointer">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField isRequired aria-label="Description" defaultValue={facility.description}>
                <Label className="text-sm font-semibold text-gray-700 mb-1 block">Description</Label>
                <TextArea name="description" placeholder="Describe the court features..." className="rounded-3xl" />
                <FieldError className="text-xs text-red-500 mt-1" />
              </TextField>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="rounded-xl w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-sm tracking-wide shadow-md transition-all border-none"
          >
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default EditFacilityPage;