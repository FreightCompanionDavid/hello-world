import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoLooseProps {
  onLooseComplete: (blocks: LegoBlockItem[]) => void;
}

export const LegoLoose: React.FC<LegoLooseProps> = ({ onLooseComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);

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

  const handleLooseComplete = useCallback(() => {
    onLooseComplete(blocks);
    setBlocks([]);
  }, [blocks, onLooseComplete]);

  const removeBlock = useCallback((id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Loose</h2>
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-gray-100' : ''
        }`}
      >
        {blocks.map((block, index) => (
          <div key={`${block.id}-${index}`} className="flex items-center mb-2">
            <LegoBlock
              id={block.id}
              type={block.type}
              content={`${block.type} Block ${index + 1}`}
              onBlockCreated={() => {}}
            />
            <Button
              onClick={() => removeBlock(block.id)}
              className="ml-2 bg-red-500 hover:bg-red-600"
            >
              Remove
            </Button>
          </div>
        ))}
        {blocks.length === 0 && (
          <p className="text-gray-400">
            Drag and drop Lego blocks here to create loose connections
          </p>
        )}
      </div>
      <Button onClick={handleLooseComplete} disabled={blocks.length === 0}>
        Complete Loose Connection
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Loose component allows blocks to form loose connections. Blocks
        can be easily added or removed without affecting others.
      </p>
    </div>
  );
};
