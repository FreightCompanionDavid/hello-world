import React from 'react';
import { LegoBlockItem } from '../lego/types';

interface LegoProps {
  block: LegoBlockItem;
}

export const Lego: React.FC<LegoProps> = ({ block }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 m-2">
      <h3 className="text-lg font-semibold mb-2">{block.type}</h3>
      <p className="text-sm text-gray-600">{block.content}</p>
      <span className="text-xs text-gray-400 mt-2 block">ID: {block.id}</span>
    </div>
  );
};
