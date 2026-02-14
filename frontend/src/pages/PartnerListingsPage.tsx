import React from "react"
import PropertyGrid from "../components/property/PropertyGrid";

import { useNavigate } from "react-router-dom";

const PartnerListingsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">?? My Listings</h1>

        <button
          onClick={() => navigate("/owner/wizard")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          + Add New Property
        </button>
      </div>

      {/* Listings */}
      <PropertyGrid properties={[]} />
    </div>
  );
};

export default PartnerListingsPage;
