import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Lego2LineProps {
  onTwoLineComplete: (
    blocks: LegoBlockItem[],
    line1: string,
    line2: string,
  ) => void;
}

export const Lego2Line: React.FC<Lego2LineProps> = ({ onTwoLineComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [line1, setLine1] = useState<string>('');
  const [line2, setLine2] = useState<string>('');

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

  const handleTwoLineComplete = useCallback(() => {
    onTwoLineComplete(blocks, line1, line2);
    setBlocks([]);
    setLine1('');
    setLine2('');
  }, [blocks, line1, line2, onTwoLineComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego 2 Line Creator</h2>
      <Input
        placeholder="First Line"
        value={line1}
        onChange={(e) => setLine1(e.target.value)}
        className="mb-4"
      />
      <Input
        placeholder="Second Line"
        value={line2}
        onChange={(e) => setLine2(e.target.value)}
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
            Drag and drop Lego blocks here to create your two-line composition
          </p>
        )}
      </div>
      <Button
        onClick={handleTwoLineComplete}
        disabled={blocks.length === 0 || !line1 || !line2}
      >
        Complete Two-Line Composition
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego 2 Line component allows you to create a two-line composition
        using Lego blocks. Enter your two lines and add blocks to enhance your
        creation.
      </p>
    </div>
  );
};
