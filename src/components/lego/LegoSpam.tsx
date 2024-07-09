import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoSpamProps {
  onSpamGenerated: (spamConfig: SpamConfig) => void;
}

interface SpamConfig {
  blocks: LegoBlockItem[];
  repetitions: number;
  interval: number;
}

export const LegoSpam: React.FC<LegoSpamProps> = ({ onSpamGenerated }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [repetitions, setRepetitions] = useState<number>(1);
  const [interval, setInterval] = useState<number>(1000);

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

  const handleGenerateSpam = () => {
    const spamConfig: SpamConfig = {
      blocks,
      repetitions,
      interval,
    };
    onSpamGenerated(spamConfig);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Spam Generator</h2>
      <div className="flex space-x-4 mb-4">
        <Input
          type="number"
          placeholder="Repetitions"
          value={repetitions}
          onChange={(e) => setRepetitions(Number(e.target.value))}
          className="w-1/2"
        />
        <Input
          type="number"
          placeholder="Interval (ms)"
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="w-1/2"
        />
      </div>
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
            Drag and drop Lego blocks here to create spam content
          </p>
        )}
      </div>
      <Button
        onClick={handleGenerateSpam}
        disabled={blocks.length === 0 || repetitions <= 0 || interval <= 0}
      >
        Generate Spam
      </Button>
    </div>
  );
};
