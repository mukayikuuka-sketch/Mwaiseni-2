import React from 'react';
export default () => (
  <div className="p-8">
    <h1 className="text-3xl font-black mb-8">My Properties</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400 font-bold">
        No properties listed yet.
      </div>
    </div>
  </div>
);
