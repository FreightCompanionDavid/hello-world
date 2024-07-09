import React from 'react';
import { LegoBin } from '@/components/lego/LegoBin';
import { LegoSearch } from '@/components/lego/LegoSearch';
import { LegoBlock } from '@/types/lego';

export default function LegoLand() {
  const handleBinUpdate = (blocks: LegoBlock[]) => {
    console.log('Bin updated:', blocks);
  };

  const handleSearch = (query: string, blocks: LegoBlock[]) => {
    console.log('Search query:', query);
    console.log('Blocks to search:', blocks);
  };

  const metadata = {
    title: 'LegoLand',
    description: 'A playground for Lego-like components',
  };
}

export const metadata = {
  title: 'LegoLand',
  description: 'A playground for Lego-like components',
};
