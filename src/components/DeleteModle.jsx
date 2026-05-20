"use client";
import React from "react";
import { toast } from "react-toastify";
import { AlertDialog, Button } from "@heroui/react";
import { HiTrash } from "react-icons/hi";

const DeleteModel = ({ facility, onSuccess }) => {
  if (!facility) return null;

  const { _id, name, location, facility_type } = facility;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/sport-user/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success("Facility deleted successfully! ");
        if (onSuccess) onSuccess(); 
      } else {
        toast.error("Something went wrong while deleting!");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete from server.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <Button variant="danger" className="rounded-xl flex items-center gap-1 text-red-500 hover:bg-red-50 text-sm font-semibold px-3 py-1.5 transition-colors bg-transparent border-none">
          <HiTrash className="text-base" /> Delete
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px] rounded-3xl p-6 bg-white border">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header className="flex flex-col gap-1">
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading className="text-xl font-bold text-gray-900 mt-2">
                  Delete {name}?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body className="py-2">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Are you sure you want to permanently delete this <strong>{facility_type}</strong> located at <strong>{location || "N/A"}</strong>? This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer className="flex gap-2 justify-end mt-4">
                <Button slot="close" variant="tertiary" className="rounded-xl font-semibold text-xs">
                  Cancel
                </Button>
                <Button onClick={handleDelete} slot="close" variant="danger" className="rounded-xl font-bold text-xs bg-red-600 text-white border-none">
                  Yes, Delete
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteModel;