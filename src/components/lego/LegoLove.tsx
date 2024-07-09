import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoLoveProps {
  onLoveComplete: (blocks: LegoBlockItem[], affection: number) => void;
}

export const LegoLove: React.FC<LegoLoveProps> = ({ onLoveComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [affection, setAffection] = useState<number>(50);
  const [lovedBlocks, setLovedBlocks] = useState<LegoBlockItem[]>([]);

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

  const handleLoveComplete = useCallback(() => {
    if (blocks.length < 2) return;

    const newLovedBlocks = blocks.map((block) => ({
      ...block,
      love: affection,
    }));

    setLovedBlocks(newLovedBlocks);
    onLoveComplete(newLovedBlocks, affection);
    setBlocks([]);
    setAffection(50);
  }, [blocks, affection, onLoveComplete]);

  const removeBlock = useCallback((id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Love</h2>
      <Input
        type="range"
        min="1"
        max="100"
        value={affection}
        onChange={(e) => setAffection(Number(e.target.value))}
        className="mb-4"
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-red-100' : ''
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
            Drag and drop Lego blocks here to create loving connections
          </p>
        )}
      </div>
      <Button onClick={handleLoveComplete} disabled={blocks.length < 2}>
        Complete Loving Connection
      </Button>
      {lovedBlocks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Loved Blocks:</h3>
          {lovedBlocks.map((block, index) => (
            <div key={`loved-${block.id}-${index}`} className="mb-2">
              {block.type} Block (Love: {affection})
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">
        The Lego Love component allows blocks to form loving connections. Adjust
        the affection slider to determine the strength of their love for each
        other.
      </p>
    </div>
  );
};
