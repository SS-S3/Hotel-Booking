// components/HotelSection.jsx
import React, { useState, useEffect } from "react";
import { ExpandableCardDemo } from "./ui/expandable-cards";

export function HotelSection({ searchData }) {
  const allHotels = [
    {
      description: "Luxury Resort",
      title: "The Grand Palace",
      location: "Goa",
      price: "₹12,500",
      pricePerNight: 12500,
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/grand-palace",
      content: () => {
        return (
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Experience luxury at its finest with our premium suites, world-class spa, 
              and breathtaking ocean views. The Grand Palace offers an unforgettable 
              stay with personalized service and exceptional amenities.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Premium Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Private beach access with cabanas</li>
                <li>Infinity pool overlooking the ocean</li>
                <li>Three fine dining restaurants</li>
                <li>Full-service spa and wellness center</li>
                <li>24/7 concierge service</li>
                <li>Butler service for suites</li>
              </ul>
            </div>
          </div>
        );
      },
    },
    {
      description: "Boutique Hotel",
      title: "Urban Retreat",
      location: "Bangalore",
      price: "₹8,750",
      pricePerNight: 8750,
      src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/urban-retreat",
      content: () => {
        return (
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              A modern boutique hotel in the heart of the city. Perfect for business 
              travelers and urban explorers seeking comfort and style in a prime location.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">City Amenities:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Rooftop bar with city skyline views</li>
                <li>State-of-the-art fitness center</li>
                <li>Executive business lounge</li>
                <li>Premium downtown location</li>
                <li>High-speed WiFi throughout</li>
                <li>Valet parking service</li>
              </ul>
            </div>
          </div>
        );
      },
    },
    {
      description: "Mountain Lodge",
      title: "Alpine Haven",
      location: "Lonavala",
      price: "₹6,200",
      pricePerNight: 6200,
      src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/alpine-haven",
      content: () => {
        return (
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Escape to the mountains and enjoy pristine nature, hiking trails, 
              and cozy fireplaces. Alpine Haven offers the perfect mountain getaway 
              with breathtaking views and outdoor adventures.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Mountain Activities:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Guided hiking and nature trails</li>
                <li>Skiing and snowboarding (seasonal)</li>
                <li>Mountain biking adventures</li>
                <li>Photography workshops</li>
                <li>Cozy fireplace lounges</li>
                <li>Hot tub with mountain views</li>
              </ul>
            </div>
          </div>
        );
      },
    },
    {
      description: "Beach Resort",
      title: "Coastal Paradise",
      location: "Goa",
      price: "₹15,800",
      pricePerNight: 15800,
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/coastal-paradise",
      content: () => {
        return (
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Wake up to pristine white sand beaches and crystal-clear waters. 
              Our beachfront resort offers the ultimate tropical escape with 
              world-class amenities and stunning ocean views.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Beach Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Private beach with water sports</li>
                <li>Beachfront infinity pools</li>
                <li>Tiki bar and grill</li>
                <li>Snorkeling and diving center</li>
                <li>Beach volleyball courts</li>
                <li>Sunset cruise packages</li>
              </ul>
            </div>
          </div>
        );
      },
    },
    {
      description: "Historic Hotel",
      title: "Heritage Manor",
      location: "Hyderabad",
      price: "₹9,500",
      pricePerNight: 9500,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/heritage-manor",
      content: () => {
        return (
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Step back in time at our beautifully restored historic manor. 
              Combining old-world charm with modern luxury, Heritage Manor 
              offers a unique and elegant experience.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Historic Charm:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Restored 19th-century architecture</li>
                <li>Antique furnishings and artwork</li>
                <li>Formal gardens and courtyards</li>
                <li>Library with rare book collection</li>
                <li>Wine cellar tastings</li>
                <li>Historical tours available</li>
              </ul>
            </div>
          </div>
        );
      },
    },
    {
      description: "Eco Lodge",
      title: "Green Valley Retreat",
      location: "Lonavala",
      price: "₹7,300",
      pricePerNight: 7300,
      src: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=3540&auto=format&fit=crop",
      ctaText: "Book Now",
      ctaLink: "/book/green-valley",
      content: () => {
        return (
          <div className="space-y-4">
            <p className="text-base leading-relaxed">
              Immerse yourself in nature at our sustainable eco-lodge. 
              Built with environmentally friendly materials and powered by 
              renewable energy, offering a guilt-free luxury experience.
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Eco Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Solar-powered facilities</li>
                <li>Organic farm-to-table dining</li>
                <li>Wildlife observation decks</li>
                <li>Sustainable building materials</li>
                <li>Nature conservation programs</li>
                <li>Zero-waste initiatives</li>
              </ul>
            </div>
          </div>
        );
      },
    },
  ];

  const [filteredHotels, setFilteredHotels] = useState(allHotels);

  useEffect(() => {
    if (!searchData || !searchData.destination) {
      setFilteredHotels(allHotels);
      return;
    }

    const searchTerm = searchData.destination.toLowerCase();
    // Only filter by location, not hotel names
    const filtered = allHotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(searchTerm)
    );

    setFilteredHotels(filtered);
  }, [searchData]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {filteredHotels.length > 0 ? (
        <>
          {searchData?.destination && (
            <div className="mb-6 text-center">
              <p className="text-gray-400 text-lg">
                Found {filteredHotels.length} hotel{filteredHotels.length !== 1 ? 's' : ''} 
                {searchData.destination && ` in "${searchData.destination}"`}
              </p>
            </div>
          )}
          <ExpandableCardDemo cards={filteredHotels} />
        </>
      ) : (
        <div className="text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              No Hotels Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              No hotels found in "{searchData?.destination}". Try searching for a different destination.
            </p>
            <p className="text-sm text-gray-500">
              Available destinations: Goa, Bangalore, Lonavala, Hyderabad
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
