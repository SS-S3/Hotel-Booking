// pages/Booking.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { BookingForm } from "../components/BookingForm";
import { BookingSummary } from "../components/BookingSummary";
import { PaymentSection } from "../components/PaymentSection";

const Booking = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const [bookingData, setBookingData] = useState({
    hotel: null,
    searchData: null,
    guestDetails: {},
    roomSelection: {},
    totalAmount: 0
  });

  useEffect(() => {
    // Get hotel and search data from navigation state
    if (location.state) {
      setBookingData(prev => ({
        ...prev,
        hotel: location.state.hotel,
        searchData: location.state.searchData
      }));
    }
  }, [location.state]);

  const updateBookingData = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  if (!bookingData.hotel) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Hotel Not Found</h1>
          <p className="text-gray-400">Please select a hotel to proceed with booking.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-[55px] font-bold text-gray-200 mb-8 text-center">
          Complete Your <span className="text-yellow-400">Booking</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            <BookingForm 
              hotel={bookingData.hotel}
              searchData={bookingData.searchData}
              onUpdate={updateBookingData}
            />
            <PaymentSection 
              bookingData={bookingData}
              onUpdate={updateBookingData}
            />
          </div>
          
          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <BookingSummary 
              bookingData={bookingData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
