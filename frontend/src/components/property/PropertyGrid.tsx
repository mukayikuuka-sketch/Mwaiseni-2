// src/components/property/PropertyGrid.tsx - SIMPLE VERSION
import React from "react";
import PropertyCard from "./PropertyCard";

interface Property {
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
}

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No properties found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
