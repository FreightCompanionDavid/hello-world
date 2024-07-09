import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoLoopProps {
  onLoopComplete: (blocks: LegoBlockItem[], iterations: number) => void;
}

export const LegoLoop: React.FC<LegoLoopProps> = ({ onLoopComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [iterations, setIterations] = useState<number>(1);

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

  const handleIterationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setIterations(isNaN(value) ? 1 : Math.max(1, value));
  };

  const handleLoopComplete = () => {
    onLoopComplete(blocks, iterations);
    setBlocks([]);
    setIterations(1);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Loop</h2>
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
            Drag and drop Lego blocks here to create a loop
          </p>
        )}
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="iterations" className="mr-2">
          Iterations:
        </label>
        <input
          id="iterations"
          type="number"
          min="1"
          value={iterations}
          onChange={handleIterationChange}
          className="border rounded px-2 py-1 w-20"
        />
      </div>
      <Button onClick={handleLoopComplete} disabled={blocks.length === 0}>
        Create Loop
      </Button>
    </div>
  );
};
