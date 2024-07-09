import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoDBProps {
  onDBOperation: (operation: string, data: any) => void;
}

export const LegoDB: React.FC<LegoDBProps> = ({ onDBOperation }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [operation, setOperation] = useState<string>('insert');
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

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

  const handleOperation = () => {
    let data;
    try {
      data =
        operation === 'insert' || operation === 'update'
          ? JSON.parse(value)
          : key;
    } catch (error) {
      console.error('Invalid JSON data:', error);
      alert('Please enter valid JSON data for insert or update operations');
      return;
    }
    onDBOperation(operation, { key, value: data });
    setBlocks([]);
    setKey('');
    setValue('');
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego DB</h2>
      <label htmlFor="db-operation" className="block mb-2">
        Select Operation:
      </label>
      <select
        id="db-operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="insert">Insert</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
        <option value="get">Get</option>
      </select>
      <Input
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="mb-2"
      />
      {(operation === 'insert' || operation === 'update') && (
        <Textarea
          placeholder="Value (JSON)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mb-2"
          rows={4}
        />
      )}
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
            Drag and drop Lego blocks here to add to the DB operation
          </p>
        )}
      </div>
      <Button
        onClick={handleOperation}
        disabled={
          !key || (operation !== 'delete' && operation !== 'get' && !value)
        }
      >
        Execute DB Operation
      </Button>
    </div>
  );
};
