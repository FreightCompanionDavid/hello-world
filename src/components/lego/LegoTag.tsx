import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoTagProps {
  onTagComplete: (blocks: LegoBlockItem[], tag: string) => void;
}

export const LegoTag: React.FC<LegoTagProps> = ({ onTagComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [tag, setTag] = useState<string>('');

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

  const handleTagComplete = useCallback(() => {
    if (blocks.length === 0 || !tag.trim()) return;

    onTagComplete(blocks, tag);
    setBlocks([]);
    setTag('');
  }, [blocks, tag, onTagComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Tag</h2>
      <Input
        placeholder="Enter tag"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="mb-4"
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
            Drag and drop Lego blocks here to tag them
          </p>
        )}
      </div>
      <Button
        onClick={handleTagComplete}
        disabled={blocks.length === 0 || !tag.trim()}
      >
        Apply Tag
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Tag component allows you to apply a tag to a group of Lego
        blocks. This can be useful for categorizing or organizing your Lego
        creations.
      </p>
    </div>
  );
};
