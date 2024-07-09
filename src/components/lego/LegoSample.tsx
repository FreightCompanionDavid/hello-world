import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoSampleProps {
  onSampleComplete: (
    blocks: LegoBlockItem[],
    sampleName: string,
    description: string,
  ) => void;
}

export const LegoSample: React.FC<LegoSampleProps> = ({ onSampleComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [sampleName, setSampleName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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

  const handleSampleComplete = useCallback(() => {
    onSampleComplete(blocks, sampleName, description);
    setBlocks([]);
    setSampleName('');
    setDescription('');
  }, [blocks, sampleName, description, onSampleComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Sample Creator</h2>
      <Input
        placeholder="Sample Name"
        value={sampleName}
        onChange={(e) => setSampleName(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Sample Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
        rows={3}
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
            Drag and drop Lego blocks here to create your sample
          </p>
        )}
      </div>
      <Button
        onClick={handleSampleComplete}
        disabled={blocks.length === 0 || !sampleName || !description}
      >
        Complete Sample
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Sample component allows you to create a sample using Lego
        blocks. Name your sample, describe it, and add blocks to define its
        structure.
      </p>
    </div>
  );
};
