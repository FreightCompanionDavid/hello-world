import React, { useState, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoFlowProps {
  onFlowComplete: (blocks: LegoBlockItem[]) => void;
}

export const LegoFlow: React.FC<LegoFlowProps> = ({ onFlowComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);

  const handleDrop = useCallback((item: LegoBlockItem) => {
    setBlocks((prevBlocks) => [...prevBlocks, item]);
  }, []);

  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'LEGO_BLOCK',
      drop: (item: LegoBlockItem) => handleDrop(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [handleDrop],
  );

  // Attach the drop ref to our ref
  drop(dropRef);

  const handleFlowComplete = () => {
    onFlowComplete(blocks);
    setBlocks([]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Flow</h2>
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
            Drag and drop Lego blocks here to create a flow
          </p>
        )}
      </div>
      <Button onClick={handleFlowComplete} disabled={blocks.length === 0}>
        Complete Flow
      </Button>
    </div>
  );
};
