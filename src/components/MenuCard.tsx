import React from 'react';
import { MenuItem } from '../types';

interface MenuCardProps {
  item: MenuItem;
  onClick?: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, onClick }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-left w-full"
    >
      <div className={`${item.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {item.title}
      </h2>
      <p className="text-gray-600 text-sm">
        {item.description}
      </p>
    </button>
  );
};

export default MenuCard;
