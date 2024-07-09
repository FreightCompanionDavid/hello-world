'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useCallback, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';

interface LegoSearchProps {
  onSearch: (query: string, blocks: LegoBlockItem[]) => void;
}

export const LegoSearch: React.FC<LegoSearchProps> = ({ onSearch }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      const newBlock = { ...item, id: `${item.id}-${Date.now()}` };
      setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Use the drop function to set up the ref
  drop(dropRef);

  const handleSearch = useCallback(() => {
    onSearch(searchQuery, blocks);
  }, [searchQuery, blocks, onSearch]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Search</h2>
      <Input
        type="text"
        placeholder="Enter search query"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
        }`}
      >
        {blocks.map((block) => (
          <LegoBlock
            key={block.id}
            id={block.id}
            type={block.type}
            content={`${block.type} Block`}
            onBlockCreated={() => {}}
          />
        ))}
        {blocks.length === 0 && (
          <p className="text-gray-400">
            Drag and drop Lego blocks here to include in search
          </p>
        )}
      </div>
      <Button onClick={handleSearch} disabled={!searchQuery}>
        Search
      </Button>
    </div>
  );
};
