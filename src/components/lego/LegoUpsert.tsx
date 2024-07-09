import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoUpsertProps {
  onUpsert: (id: string, data: any) => void;
}

export const LegoUpsert: React.FC<LegoUpsertProps> = ({ onUpsert }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<string>('');

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

  const handleUpsert = () => {
    try {
      const parsedData = JSON.parse(data);
      onUpsert(id, parsedData);
      setBlocks([]);
      setId('');
      setData('');
    } catch (error) {
      console.error('Invalid JSON data:', error);
      alert('Please enter valid JSON data');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Upsert</h2>
      <Input
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="mb-4"
      />
      <textarea
        placeholder="Data (JSON)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        rows={4}
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
            Drag and drop Lego blocks here to add to the upsert operation
          </p>
        )}
      </div>
      <Button onClick={handleUpsert} disabled={!id || !data}>
        Upsert
      </Button>
    </div>
  );
};
