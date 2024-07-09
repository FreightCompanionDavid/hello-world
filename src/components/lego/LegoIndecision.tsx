import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoIndecisionProps {
  onDecisionMade: (decision: LegoBlockItem) => void;
}

export const LegoIndecision: React.FC<LegoIndecisionProps> = ({
  onDecisionMade,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<LegoBlockItem | null>(
    null,
  );

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

  const handleMakeDecision = () => {
    if (blocks.length > 0) {
      const randomIndex = Math.floor(Math.random() * blocks.length);
      const decision = blocks[randomIndex];
      setSelectedBlock(decision);
      onDecisionMade(decision);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Indecision</h2>
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
            Drag and drop Lego blocks here to add options
          </p>
        )}
      </div>
      <Button onClick={handleMakeDecision} disabled={blocks.length === 0}>
        Make a Decision
      </Button>
      {selectedBlock && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <h3 className="text-lg font-semibold mb-2">Decision Made:</h3>
          <p>{`${selectedBlock.type} Block (ID: ${selectedBlock.id})`}</p>
        </div>
      )}
    </div>
  );
};
