import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActionButton: React.FC = () => {
  return (
    <Link
      to="/list-property"
      className="fixed bottom-6 right-6 z-50 btn-glass-primary w-14 h-14 rounded-full flex items-center justify-center shadow-2xl float-fast"
      title="List your property"
    >
      <MessageCircle size={24} />
    </Link>
  );
};

export default FloatingActionButton;
