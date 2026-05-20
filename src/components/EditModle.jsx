"use client";
import React from "react";
import { toast } from "react-toastify";
import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextArea, TextField, Select, Card } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import { HiClock } from "react-icons/hi2";

const EditModle = ({ facility, onSuccess }) => {

  if (!facility) return null;

  const { _id, name, facility_type, price_per_hour, capacity, image, description, location } = facility;

  const handleForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const updatedFacilityData = {
      name: rawData.facilityName,
      facility_type: rawData.facilityType,
      image: rawData.imageUrl,
      location: rawData.location,
      price_per_hour: Number(rawData.pricePerHour),
      capacity: Number(rawData.facilityCapacity),
      description: rawData.description,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/sport-user/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFacilityData),
      });

      if (res.ok) {
        toast.success("Facility Updated Successfully! ");
        if (onSuccess) onSuccess(); 
      } else {
        toast.error("Failed to update facility!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Modal>
        <Button variant="tertiary" className="rounded-xl flex items-center gap-1 text-blue-600 hover:bg-blue-50 text-sm font-semibold px-3 py-1.5 transition-colors border-none">
          <FaEdit className="text-base" /> Edit
        </Button>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Icon className="bg-blue-50 text-blue-600">
                  <HiClock className="size-5" />
                </Modal.Icon>
              </Modal.Header>
              <Modal.Body className="p-6">
                <Surface variant="default">
                  <Card className="border border-cyan-100 rounded-2xl overflow-hidden shadow-none">
                    <form onSubmit={handleForm} className="p-6 space-y-6">
                      <h3 className="text-lg font-bold text-gray-800">Edit Court Details</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                          <TextField defaultValue={name} name="facilityName" isRequired>
                            <Label className="text-xs font-semibold mb-1 block">Facility Name</Label>
                            <Input placeholder="Skyline Arena" className="rounded-2xl" />
                            <FieldError className="text-xs text-red-500" />
                          </TextField>
                        </div>
                        <div>
                          <Select
                            defaultValue={facility_type}
                            name="facilityType"
                            isRequired
                            className="w-full"
                            placeholder="Select Type"
                            defaultSelectedKeys={[facility_type]}
                          >
                            <Label className="text-xs font-semibold mb-1 block">Facility Type</Label>
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
                        <TextField defaultValue={location} name="location" isRequired>
                          <Label className="text-xs font-semibold mb-1 block">Location</Label>
                          <Input placeholder="Dhaka" className="rounded-2xl" />
                          <FieldError className="text-xs text-red-500" />
                        </TextField>
                        <TextField defaultValue={String(price_per_hour)} name="pricePerHour" type="number" isRequired>
                          <Label className="text-xs font-semibold mb-1 block">Price Per Hour (BDT)</Label>
                          <Input type="number" placeholder="2000" className="rounded-2xl" />
                          <FieldError className="text-xs text-red-500" />
                        </TextField>
                        <TextField defaultValue={String(capacity)} name="facilityCapacity" type="number" isRequired>
                          <Label className="text-xs font-semibold mb-1 block">Capacity (Players)</Label>
                          <Input type="number" placeholder="12" className="rounded-2xl" />
                          <FieldError className="text-xs text-red-500" />
                        </TextField>
                       <div className="md:col-span-2">
                          <TextField defaultValue={image} name="imageUrl" isRequired>
                            <Label className="text-xs font-semibold mb-1 block">Image URL</Label>
                            <Input type="url" placeholder="https://..." className="rounded-2xl" />
                            <FieldError className="text-xs text-red-500" />
                          </TextField>
                        </div>

                        <div className="md:col-span-2">
                          <TextField defaultValue={description} name="description" isRequired>
                            <Label className="text-xs font-semibold mb-1 block">Description</Label>
                            <TextArea placeholder="Describe the court..." className="rounded-2xl" />
                            <FieldError className="text-xs text-red-500" />
                          </TextField>
                        </div>
                      </div>

                      <Modal.Footer className="px-0 pt-4 border-t flex justify-end gap-2">
                        <Button slot="close" variant="secondary" className="rounded-xl font-medium text-xs">
                          Cancel
                        </Button>
                        <Button type="submit" slot="close" className="rounded-xl bg-blue-600 font-bold text-xs text-white border-none">
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </form>
                  </Card>
                </Surface>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default EditModle;