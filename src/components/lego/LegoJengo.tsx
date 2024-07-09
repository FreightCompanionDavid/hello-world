import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoJengoProps {
  onJengoComplete: (blocks: LegoBlockItem[], structure: string) => void;
}

export const LegoJengo: React.FC<LegoJengoProps> = ({ onJengoComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [structure, setStructure] = useState<string>('');

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

  const handleJengoComplete = useCallback(() => {
    onJengoComplete(blocks, structure);
    setBlocks([]);
    setStructure('');
  }, [blocks, structure, onJengoComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Jengo</h2>
      <Textarea
        placeholder="Describe your Jengo structure..."
        value={structure}
        onChange={(e) => setStructure(e.target.value)}
        className="mb-4"
        rows={4}
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-green-100' : ''
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
            Drag and drop Lego blocks here to build your Jengo structure
          </p>
        )}
      </div>
      <Button
        onClick={handleJengoComplete}
        disabled={blocks.length === 0 || !structure}
      >
        Complete Jengo Structure
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Jengo component allows you to build structures using Lego
        blocks. Describe your structure and add blocks to create your Jengo
        masterpiece.
      </p>
    </div>
  );
};
