// components/BookingSummary.jsx
import React from "react";

export function BookingSummary({ bookingData }) {
  const { hotel, searchData, roomSelection, totalAmount } = bookingData;

  if (!hotel) return null;

  const roomTypes = [
    { id: "standard", name: "Standard Room", price: 150 },
    { id: "deluxe", name: "Deluxe Room", price: 250 },
    { id: "suite", name: "Executive Suite", price: 400 },
    { id: "presidential", name: "Presidential Suite", price: 800 }
  ];

  const addOns = [
    { id: "breakfast", name: "Breakfast Included", price: 25 },
    { id: "spa", name: "Spa Package", price: 100 },
    { id: "airport", name: "Airport Transfer", price: 50 },
    { id: "wifi", name: "Premium WiFi", price: 15 },
    { id: "parking", name: "Valet Parking", price: 30 }
  ];

  const selectedRoom = roomTypes.find(room => room.id === roomSelection.roomType) || roomTypes[0];
  const selectedAddOns = addOns.filter(addOn => roomSelection.addOns?.includes(addOn.id));
  
  const nights = searchData?.checkIn && searchData?.checkOut 
    ? Math.ceil((new Date(searchData.checkOut) - new Date(searchData.checkIn)) / (1000 * 60 * 60 * 24))
    : 1;

  const roomTotal = selectedRoom.price * (roomSelection.numberOfRooms || 1) * nights;
  const addOnTotal = selectedAddOns.reduce((total, addOn) => total + addOn.price, 0) * (roomSelection.numberOfRooms || 1) * nights;
  const subtotal = roomTotal + addOnTotal;
  const taxes = subtotal * 0.12; // 12% tax
  const total = subtotal + taxes;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Booking Summary
      </h2>
      
      {/* Hotel Info */}
      <div className="mb-6">
        <img
          src={hotel.src}
          alt={hotel.title}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
          {hotel.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {hotel.description}
        </p>
      </div>

      {/* Stay Details */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Check-in:</span>
          <span className="text-gray-800 dark:text-gray-200">
            {searchData?.checkIn ? new Date(searchData.checkIn).toLocaleDateString() : 'Not selected'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Check-out:</span>
          <span className="text-gray-800 dark:text-gray-200">
            {searchData?.checkOut ? new Date(searchData.checkOut).toLocaleDateString() : 'Not selected'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Nights:</span>
          <span className="text-gray-800 dark:text-gray-200">{nights}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Guests:</span>
          <span className="text-gray-800 dark:text-gray-200">{searchData?.guests || 1}</span>
        </div>
      </div>

      {/* Room Details */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Room Selection</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">
              {selectedRoom.name} x {roomSelection.numberOfRooms || 1}
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              ${roomTotal}
            </span>
          </div>
          
          {selectedAddOns.map((addOn) => (
            <div key={addOn.id} className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {addOn.name}
              </span>
              <span className="text-gray-800 dark:text-gray-200 text-sm">
                ${addOn.price * (roomSelection.numberOfRooms || 1) * nights}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-gray-200 dark:border-gray-600 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
          <span className="text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Taxes & Fees:</span>
          <span className="text-gray-800 dark:text-gray-200">${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-200 dark:border-gray-600 pt-2">
          <span className="text-gray-800 dark:text-gray-200">Total:</span>
          <span className="text-yellow-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Cancellation Policy
        </h5>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Free cancellation until 24 hours before check-in. After that, the first night will be charged.
        </p>
      </div>
    </div>
  );
}
