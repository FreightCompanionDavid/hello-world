import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoArbitraryProps {
  onArbitraryComplete: (blocks: LegoBlockItem[], arbitraryData: string) => void;
}

export const LegoArbitrary: React.FC<LegoArbitraryProps> = ({
  onArbitraryComplete,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [arbitraryData, setArbitraryData] = useState<string>('');

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

  const handleArbitraryComplete = useCallback(() => {
    onArbitraryComplete(blocks, arbitraryData);
    setBlocks([]);
    setArbitraryData('');
  }, [blocks, arbitraryData, onArbitraryComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Arbitrary</h2>
      <Textarea
        placeholder="Enter arbitrary data..."
        value={arbitraryData}
        onChange={(e) => setArbitraryData(e.target.value)}
        className="mb-4"
        rows={4}
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-purple-100' : ''
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
            Drag and drop Lego blocks here to add arbitrary connections
          </p>
        )}
      </div>
      <Button
        onClick={handleArbitraryComplete}
        disabled={blocks.length === 0 || !arbitraryData.trim()}
      >
        Complete Arbitrary Connection
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Arbitrary component allows you to create connections between
        blocks with any arbitrary data you provide.
      </p>
    </div>
  );
};
