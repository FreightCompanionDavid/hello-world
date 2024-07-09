import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoJamProps {
  onJamComplete: (
    blocks: LegoBlockItem[],
    jamName: string,
    jamDuration: number,
  ) => void;
}

export const LegoJam: React.FC<LegoJamProps> = ({ onJamComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [jamName, setJamName] = useState<string>('');
  const [jamDuration, setJamDuration] = useState<number>(0);

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

  const handleJam = () => {
    onJamComplete(blocks, jamName, jamDuration);
    setBlocks([]);
    setJamName('');
    setJamDuration(0);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Jam</h2>
      <Input
        placeholder="Jam Name"
        value={jamName}
        onChange={(e) => setJamName(e.target.value)}
        className="mb-4"
      />
      <Input
        type="number"
        placeholder="Jam Duration (minutes)"
        value={jamDuration}
        onChange={(e) => setJamDuration(Number(e.target.value))}
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
            Drag and drop Lego blocks here to create a jam session
          </p>
        )}
      </div>
      <Button
        onClick={handleJam}
        disabled={blocks.length === 0 || !jamName || jamDuration <= 0}
      >
        Start Jam Session
      </Button>
    </div>
  );
};
