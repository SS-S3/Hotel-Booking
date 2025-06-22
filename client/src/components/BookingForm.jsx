// components/BookingForm.jsx
import React, { useState } from "react";

export function BookingForm({ hotel, searchData, onUpdate }) {
  const [guestDetails, setGuestDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: ""
  });

  const [roomSelection, setRoomSelection] = useState({
    roomType: "standard",
    numberOfRooms: 1,
    addOns: []
  });

  const roomTypes = [
    { id: "standard", name: "Standard Room", price: 150, description: "Comfortable room with basic amenities" },
    { id: "deluxe", name: "Deluxe Room", price: 250, description: "Spacious room with premium amenities" },
    { id: "suite", name: "Executive Suite", price: 400, description: "Luxury suite with separate living area" },
    { id: "presidential", name: "Presidential Suite", price: 800, description: "Ultimate luxury with panoramic views" }
  ];

  const addOns = [
    { id: "breakfast", name: "Breakfast Included", price: 25 },
    { id: "spa", name: "Spa Package", price: 100 },
    { id: "airport", name: "Airport Transfer", price: 50 },
    { id: "wifi", name: "Premium WiFi", price: 15 },
    { id: "parking", name: "Valet Parking", price: 30 }
  ];

  const handleGuestChange = (field, value) => {
    const newDetails = { ...guestDetails, [field]: value };
    setGuestDetails(newDetails);
    onUpdate('guestDetails', newDetails);
  };

  const handleRoomChange = (field, value) => {
    const newSelection = { ...roomSelection, [field]: value };
    setRoomSelection(newSelection);
    onUpdate('roomSelection', newSelection);
    
    // Calculate total amount
    const selectedRoom = roomTypes.find(room => room.id === newSelection.roomType);
    const addOnTotal = newSelection.addOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    
    const nights = searchData?.checkIn && searchData?.checkOut 
      ? Math.ceil((new Date(searchData.checkOut) - new Date(searchData.checkIn)) / (1000 * 60 * 60 * 24))
      : 1;
    
    const totalAmount = (selectedRoom.price + addOnTotal) * newSelection.numberOfRooms * nights;
    onUpdate('totalAmount', totalAmount);
  };

  const handleAddOnToggle = (addOnId) => {
    const newAddOns = roomSelection.addOns.includes(addOnId)
      ? roomSelection.addOns.filter(id => id !== addOnId)
      : [...roomSelection.addOns, addOnId];
    
    handleRoomChange('addOns', newAddOns);
  };

  return (
    <div className="space-y-8">
      {/* Guest Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Guest Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name *
            </label>
            <input
              type="text"
              value={guestDetails.firstName}
              onChange={(e) => handleGuestChange('firstName', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Enter first name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              value={guestDetails.lastName}
              onChange={(e) => handleGuestChange('lastName', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Enter last name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              value={guestDetails.email}
              onChange={(e) => handleGuestChange('email', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              value={guestDetails.phone}
              onChange={(e) => handleGuestChange('phone', e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Special Requests
          </label>
          <textarea
            value={guestDetails.specialRequests}
            onChange={(e) => handleGuestChange('specialRequests', e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
            placeholder="Any special requests or preferences..."
          />
        </div>
      </div>

      {/* Room Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Room Selection
        </h2>
        
        <div className="space-y-4">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                roomSelection.roomType === room.id
                  ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => handleRoomChange('roomType', room.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    {room.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {room.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-yellow-600">
                    ${room.price}
                  </p>
                  <p className="text-sm text-gray-500">per night</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Rooms
          </label>
          <select
            value={roomSelection.numberOfRooms}
            onChange={(e) => handleRoomChange('numberOfRooms', parseInt(e.target.value))}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none text-gray-800 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add-ons */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
          Additional Services
        </h2>
        
        <div className="space-y-3">
          {addOns.map((addOn) => (
            <div key={addOn.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={addOn.id}
                  checked={roomSelection.addOns.includes(addOn.id)}
                  onChange={() => handleAddOnToggle(addOn.id)}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor={addOn.id} className="ml-3 text-gray-800 dark:text-gray-200">
                  {addOn.name}
                </label>
              </div>
              <span className="text-yellow-600 font-semibold">
                +${addOn.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
