import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoEgoProps {
  onEgoCreated: (egoConfig: EgoConfig) => void;
}

interface EgoConfig {
  name: string;
  traits: string[];
  blocks: LegoBlockItem[];
}

export const LegoEgo: React.FC<LegoEgoProps> = ({ onEgoCreated }) => {
  const [name, setName] = useState<string>('');
  const [traits, setTraits] = useState<string[]>([]);
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);

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

  const handleAddTrait = (trait: string) => {
    setTraits((prevTraits) => [...prevTraits, trait]);
  };

  const handleCreateEgo = () => {
    const egoConfig: EgoConfig = {
      name,
      traits,
      blocks,
    };
    onEgoCreated(egoConfig);
    // Reset the form
    setName('');
    setTraits([]);
    setBlocks([]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Lego Ego Builder</h2>
      <Input
        placeholder="Ego Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4"
      />
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Traits</h3>
        {traits.map((trait, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            {trait}
          </div>
        ))}
        <Input
          placeholder="Add a trait"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTrait(e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
        }`}
      >
        <h3 className="text-lg font-medium mb-2">Ego Blocks</h3>
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
            Drag and drop Lego blocks here to build your ego
          </p>
        )}
      </div>
      <Button onClick={handleCreateEgo} disabled={!name || traits.length === 0}>
        Create Ego
      </Button>
    </div>
  );
};
