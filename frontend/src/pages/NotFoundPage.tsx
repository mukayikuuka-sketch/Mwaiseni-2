import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const location = useLocation();
  const attemptedPath = location.state?.from || location.pathname;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-9xl font-black text-blue-600">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2">
          The page <span className="font-mono bg-gray-100 px-2 py-1 rounded">{attemptedPath}</span> does not exist.
        </p>
        <Link 
          to="/" 
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;