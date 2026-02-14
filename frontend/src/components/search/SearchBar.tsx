import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white rounded-xl md:rounded-full shadow-lg border border-gray-100 p-2 w-full">
      <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 w-full">
        <MapPin className="text-blue-600 mr-2" size={20} />
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold text-gray-400">Location</p>
          <input type="text" placeholder="Where in Zambia?" className="bg-transparent outline-none text-sm font-semibold w-full" />
        </div>
      </div>
      
      <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-100 w-full">
        <Calendar className="text-blue-600 mr-2" size={20} />
        <div className="text-left">
          <p className="text-[10px] uppercase font-bold text-gray-400">Dates</p>
          <p className="text-sm font-semibold text-gray-800">Check-in — Out</p>
        </div>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl md:rounded-full ml-0 md:ml-2 mt-2 md:mt-0 w-full md:w-auto flex items-center justify-center gap-2 transition-all">
        <Search size={20} />
        <span className="md:hidden font-bold">Search</span>
      </button>
    </div>
  );
};

export default SearchBar;
