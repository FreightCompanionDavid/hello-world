import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoLustProps {
  onLustComplete: (blocks: LegoBlockItem[], intensity: number) => void;
}

export const LegoLust: React.FC<LegoLustProps> = ({ onLustComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [intensity, setIntensity] = useState<number>(50);

  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setBlocks((prevBlocks) => [...prevBlocks, item]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(dropRef);

  const handleLustComplete = () => {
    onLustComplete(blocks, intensity);
    setBlocks([]);
    setIntensity(50);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Lust</h2>
      <Input
        type="range"
        min="1"
        max="100"
        value={intensity}
        onChange={(e) => setIntensity(Number(e.target.value))}
        className="mb-4"
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-pink-100' : ''
        }`}
      >
        {blocks.map((block, index) => (
          <LegoBlock
            key={`${block.id}-${index}`}
            id={block.id}
            type={block.type}
            content={`${block.type} Block ${index + 1}`}
            onBlockCreated={() => {}}
          />
        ))}
        {blocks.length === 0 && (
          <p className="text-gray-400">
            Drag and drop Lego blocks here to create lustful connections
          </p>
        )}
      </div>
      <Button onClick={handleLustComplete} disabled={blocks.length < 2}>
        Complete Lustful Connection
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Lust component allows blocks to form passionate connections.
        Adjust the intensity slider to determine the strength of their desire to
        be together.
      </p>
    </div>
  );
};
