import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoBlamoProps {
  onBlamoComplete: (
    blocks: LegoBlockItem[],
    blamoPower: number,
    blamoEffect: string,
  ) => void;
}

export const LegoBlamo: React.FC<LegoBlamoProps> = ({ onBlamoComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [blamoPower, setBlamoPower] = useState<number>(50);
  const [blamoEffect, setBlamoEffect] = useState<string>('');

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

  const handleBlamoComplete = useCallback(() => {
    onBlamoComplete(blocks, blamoPower, blamoEffect);
    setBlocks([]);
    setBlamoPower(50);
    setBlamoEffect('');
  }, [blocks, blamoPower, blamoEffect, onBlamoComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Blamo</h2>
      <div className="mb-4">
        <label
          htmlFor="blamoPower"
          className="block text-sm font-medium text-gray-700"
        >
          Blamo Power: {blamoPower}
        </label>
        <Input
          id="blamoPower"
          type="range"
          min="1"
          max="100"
          value={blamoPower}
          onChange={(e) => setBlamoPower(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <Textarea
        placeholder="Describe the Blamo effect..."
        value={blamoEffect}
        onChange={(e) => setBlamoEffect(e.target.value)}
        className="mb-4"
        rows={3}
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-red-100' : ''
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
            Drag and drop Lego blocks here to add to the Blamo effect
          </p>
        )}
      </div>
      <Button
        onClick={handleBlamoComplete}
        disabled={blocks.length === 0 || !blamoEffect}
      >
        Activate Blamo!
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Blamo component creates explosive effects with Lego blocks.
        Adjust the Blamo power, describe the effect, and add blocks to create
        your Blamo masterpiece.
      </p>
    </div>
  );
};
