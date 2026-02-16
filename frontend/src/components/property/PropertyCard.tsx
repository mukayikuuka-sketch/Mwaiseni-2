import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Heart } from 'lucide-react';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  isSaved?: boolean;
  onSave?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  price,
  rating,
  image,
  isSaved = false,
  onSave
}) => {
  return (
    <div className="group glass-card overflow-hidden float-slow">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition duration-500"
        />
        <button 
          onClick={onSave}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition"
        >
          <Heart size={20} className={isSaved ? 'fill-red-500 text-red-500' : 'text-white'} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <div className="flex items-center gap-1 bg-yellow-400/20 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-bold">{rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-600 mt-1">
          <MapPin size={14} />
          <span className="text-sm">{location}</span>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div>
            <span className="text-xl font-black text-gray-900">K{price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>
          <Link 
            to={/property/}
            className="btn-glass-primary px-4 py-2 rounded-xl text-sm font-bold"
          >
            View Stay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
