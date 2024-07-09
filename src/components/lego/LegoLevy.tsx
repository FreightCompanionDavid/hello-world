import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoLevyProps {
  onLevyComplete: (blocks: LegoBlockItem[], taxRate: number) => void;
}

export const LegoLevy: React.FC<LegoLevyProps> = ({ onLevyComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [taxRate, setTaxRate] = useState<number>(0);

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

  const handleLevyComplete = () => {
    onLevyComplete(blocks, taxRate);
    setBlocks([]);
    setTaxRate(0);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Levy</h2>
      <Input
        type="number"
        placeholder="Tax Rate (%)"
        value={taxRate}
        onChange={(e) => setTaxRate(Number(e.target.value))}
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
            Drag and drop Lego blocks here to levy tax
          </p>
        )}
      </div>
      <Button
        onClick={handleLevyComplete}
        disabled={blocks.length === 0 || taxRate <= 0}
      >
        Apply Levy
      </Button>
    </div>
  );
};
