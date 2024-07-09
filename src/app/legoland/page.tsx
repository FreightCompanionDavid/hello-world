'use client';

import React, { createContext, useState } from 'react';
import { LegoBin } from '../../components/lego/LegoBin';
import { LegoSearch } from '../../components/lego/LegoSearch';
import { LegoBlock } from '../../types/lego';

// Create a context for Lego blocks
export const LegoContext = createContext<{
  blocks: LegoBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<LegoBlock[]>>;
}>({ blocks: [], setBlocks: () => {} });

export default function LegoLand() {
  const [blocks, setBlocks] = useState<LegoBlock[]>([]);

  const handleBinUpdate = (updatedBlocks: LegoBlock[]) => {
    setBlocks(updatedBlocks);
    console.log('Bin updated:', updatedBlocks);
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    console.log('Blocks to search:', blocks);
  };

  return (
    <LegoContext.Provider value={{ blocks, setBlocks }}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">LegoLand</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LegoBin onBinUpdate={handleBinUpdate} />
          <LegoSearch onSearch={handleSearch} />
        </div>
      </div>
    </LegoContext.Provider>
  );
}
