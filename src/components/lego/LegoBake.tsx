import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoBakeProps {
  onBakeComplete: (bakeResult: BakeResult) => void;
}

interface BakeResult {
  id: string;
  blocks: LegoBlockItem[];
  recipe: string;
  bakeTime: number;
  temperature: number;
}

export const LegoBake: React.FC<LegoBakeProps> = ({ onBakeComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [recipe, setRecipe] = useState<string>('');
  const [bakeTime, setBakeTime] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(0);

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

  const handleBake = () => {
    const bakeResult: BakeResult = {
      id: Date.now().toString(), // Generate a unique ID
      blocks: [...blocks], // Create a new array to ensure immutability
      recipe,
      bakeTime,
      temperature,
    };
    onBakeComplete(bakeResult);

    // Reset the form
    setBlocks([]);
    setRecipe('');
    setBakeTime(0);
    setTemperature(0);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Mudbrick Bake</h2>
      <Textarea
        placeholder="Enter your mudbrick recipe..."
        value={recipe}
        onChange={(e) => setRecipe(e.target.value)}
        className="mb-4"
      />
      <div className="flex space-x-4 mb-4">
        <Input
          type="number"
          placeholder="Bake Time (hours)"
          value={bakeTime}
          onChange={(e) => setBakeTime(Number(e.target.value))}
          className="w-1/2"
        />
        <Input
          type="number"
          placeholder="Temperature (°C)"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
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
            Drag and drop Lego blocks here to add ingredients for your mudbrick
          </p>
        )}
      </div>
      <Button
        onClick={handleBake}
        disabled={
          !recipe || bakeTime <= 0 || temperature <= 0 || blocks.length === 0
        }
      >
        Bake Mudbrick
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        This Lego Mudbrick Bake component creates immutable connectors. Once
        baked, the mudbrick and its properties cannot be changed.
      </p>
    </div>
  );
};
