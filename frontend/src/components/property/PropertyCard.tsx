// src/components/property/PropertyCard.tsx - ENHANCED VERSION
import React from "react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  property: {
    id: number;
    name: string;
    location: string;
    price_per_night: number;
    currency: string;
    rating: number;
    review_count: number;
    amenities: string[];
    property_type: string;
    max_guests: number;
    is_available: boolean;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  // Image mapping for better visuals (optional - can be replaced with real images from your backend)
  const getPropertyImage = (id: number, name: string) => {
    const images = {
      1: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      2: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    };
    return images[id as keyof typeof images] || null;
  };

  const propertyImage = getPropertyImage(property.id, property.name);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      {/* Property Image Section */}
      <div className="h-64 overflow-hidden bg-gradient-to-br from-blue-500 to-green-500 relative">
        {propertyImage ? (
          <img 
            src={propertyImage}
            alt={property.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails, show gradient fallback
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : null}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        
        {/* Rating badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
          <span className="text-yellow-500 font-bold">?</span>
          <span className="ml-1 font-bold text-gray-900">{property.rating}</span>
          <span className="ml-1 text-gray-600 text-sm">({property.review_count})</span>
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-gray-900 mb-1">{property.name}</h3>
          <div className="flex items-center text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">{property.location}</span>
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="font-bold text-2xl text-blue-700">{property.currency} {property.price_per_night.toLocaleString()}</span>
          <span className="text-gray-600 ml-1">/ night</span>
          {property.max_guests && (
            <span className="ml-3 text-sm text-gray-500">• Sleeps {property.max_guests}</span>
          )}
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-3 py-1 text-gray-500 text-sm">+{property.amenities.length - 3} more</span>
          )}
        </div>

        {/* View Details Button - YOUR EXISTING FUNCTIONALITY PRESERVED */}
        <Link 
          to={`/property/${property.id}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-300"        
        >
          View Details
        </Link>
        
        {/* Availability indicator */}
        <div className="mt-4 flex justify-between items-center text-sm">
          <span className={`px-3 py-1 rounded-full ${property.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {property.is_available ? 'Available' : 'Booked'}
          </span>
          <span className="text-gray-500">{property.property_type}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
