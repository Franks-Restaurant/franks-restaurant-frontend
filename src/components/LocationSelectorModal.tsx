import React from "react";
import { setLocation } from "@/store/slices/userSlice";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

const LocationSelectorModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Optional: Reverse geocode (see below)
          dispatch(setLocation({ latitude, longitude }));
          onClose();
        },
        (error) => {
          console.error("Location error:", error.message);
        }
      );
    }
  };

  const handleSelectOnMap = () => {
    // Navigate to a "/select-location" page with a map picker
    window.location.href = '/select-location'; // Or use `navigate` from React Router
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-lg relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <IoClose size={22} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">
          Choose Your Location
        </h2>

        <button
          onClick={handleUseCurrentLocation}
          className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90 text-white py-3 rounded-lg mb-3"
        >
          📍 Use Current Location
        </button>

        <button
          onClick={handleSelectOnMap}
          className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
        >
          🗺️ Select Location on Map
        </button>
      </div>
    </div>
  );
};

export default LocationSelectorModal;
