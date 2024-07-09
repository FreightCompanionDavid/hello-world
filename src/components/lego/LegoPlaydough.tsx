import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoPlaydoughProps {
  onPlaydoughCreated: (playdough: {
    blocks: LegoBlockItem[];
    color: string;
    malleability: number;
  }) => void;
}

export const LegoPlaydough: React.FC<LegoPlaydoughProps> = ({
  onPlaydoughCreated,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [color, setColor] = useState<string>('#000000');
  const [malleability, setMalleability] = useState<number>(50);

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

  const handleCreatePlaydough = () => {
    onPlaydoughCreated({ blocks, color, malleability });
    setBlocks([]);
    setColor('#000000');
    setMalleability(50);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Playdough Creator</h2>
      <Input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mb-4"
      />
      <Input
        type="range"
        min="1"
        max="100"
        value={malleability}
        onChange={(e) => setMalleability(Number(e.target.value))}
        className="mb-4"
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
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
            Drag and drop Lego blocks here to add to your playdough
          </p>
        )}
      </div>
      <Button onClick={handleCreatePlaydough} disabled={blocks.length === 0}>
        Create Playdough
      </Button>
    </div>
  );
};
