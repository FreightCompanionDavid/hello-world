import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoFuegoProps {
  onFuegoComplete: (
    blocks: LegoBlockItem[],
    intensity: number,
    duration: number,
  ) => void;
}

export const LegoFuego: React.FC<LegoFuegoProps> = ({ onFuegoComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [intensity, setIntensity] = useState<number>(50);
  const [duration, setDuration] = useState<number>(5);

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

  const handleFuegoComplete = useCallback(() => {
    onFuegoComplete(blocks, intensity, duration);
    setBlocks([]);
    setIntensity(50);
    setDuration(5);
  }, [blocks, intensity, duration, onFuegoComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Fuego</h2>
      <div className="mb-4">
        <label
          htmlFor="intensity"
          className="block text-sm font-medium text-gray-700"
        >
          Fire Intensity: {intensity}
        </label>
        <Input
          id="intensity"
          type="range"
          min="1"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Burn Duration (seconds): {duration}
        </label>
        <Input
          id="duration"
          type="number"
          min="1"
          max="60"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-orange-100' : ''
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
            Drag and drop Lego blocks here to add fuel to the fire
          </p>
        )}
      </div>
      <Button onClick={handleFuegoComplete} disabled={blocks.length === 0}>
        Ignite Fuego
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Fuego component simulates a fire. Adjust the intensity and
        duration, then add Lego blocks as fuel to create a virtual blaze.
      </p>
    </div>
  );
};
