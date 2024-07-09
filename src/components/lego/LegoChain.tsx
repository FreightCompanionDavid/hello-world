import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoChainProps {
  onChainCreated: (chain: LegoBlockItem[]) => void;
}

export const LegoChain: React.FC<LegoChainProps> = ({ onChainCreated }) => {
  const [chain, setChain] = useState<LegoBlockItem[]>([]);
  const dropRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setChain((prevChain) => [...prevChain, item]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(dropRef);

  const handleCreateChain = () => {
    onChainCreated(chain);
    setChain([]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Chain</h2>
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
        }`}
      >
        {chain.map((block, index) => (
          <LegoBlock
            key={`${block.id}-${index}`}
            id={block.id}
            type={block.type}
            content={`${block.type} Block ${index + 1}`}
            onBlockCreated={() => {}}
          />
        ))}
        {chain.length === 0 && (
          <p className="text-gray-400">
            Drag and drop Lego blocks here to create a chain
          </p>
        )}
      </div>
      <Button onClick={handleCreateChain} disabled={chain.length === 0}>
        Create Chain
      </Button>
    </div>
  );
};
