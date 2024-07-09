import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoLockProps {
  onLockComplete: (blocks: LegoBlockItem[], lockStrength: number) => void;
}

export const LegoLock: React.FC<LegoLockProps> = ({ onLockComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [lockStrength, setLockStrength] = useState<number>(50);
  const [lockedBlocks, setLockedBlocks] = useState<LegoBlockItem[]>([]);

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

  const handleLockComplete = useCallback(() => {
    if (blocks.length < 2) return;

    const newLockedBlocks = blocks.map((block) => ({
      ...block,
      lockStrength,
    }));

    setLockedBlocks(newLockedBlocks);
    onLockComplete(newLockedBlocks, lockStrength);
    setBlocks([]);
    setLockStrength(50);
  }, [blocks, lockStrength, onLockComplete]);

  const removeBlock = useCallback((id: string) => {
    setBlocks((prevBlocks) => prevBlocks.filter((block) => block.id !== id));
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Lock</h2>
      <Input
        type="range"
        min="1"
        max="100"
        value={lockStrength}
        onChange={(e) => setLockStrength(Number(e.target.value))}
        className="mb-4"
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
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
            Drag and drop Lego blocks here to create locked connections
          </p>
        )}
      </div>
      <Button onClick={handleLockComplete} disabled={blocks.length < 2}>
        Complete Lock
      </Button>
      {lockedBlocks.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Locked Blocks:</h3>
          {lockedBlocks.map((block, index) => (
            <div key={`locked-${block.id}-${index}`} className="mb-2">
              {block.type} Block (Lock Strength: {lockStrength})
            </div>
          ))}
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">
        The Lego Lock component allows blocks to form locked connections. Adjust
        the lock strength slider to determine how securely the blocks are locked
        together.
      </p>
    </div>
  );
};
