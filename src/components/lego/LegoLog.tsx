import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LegoLogProps {
  onLogGenerated: (log: string) => void;
}

export const LegoLog: React.FC<LegoLogProps> = ({ onLogGenerated }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [logOutput, setLogOutput] = useState<string>('');

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

  const generateLog = () => {
    const log = blocks
      .map(
        (block) =>
          `[${new Date().toISOString()}] ${block.type} Block (ID: ${
            block.id
          }) added`,
      )
      .join('\n');
    setLogOutput(log);
    onLogGenerated(log);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Log Generator</h2>
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
            Drag and drop Lego blocks here to add to the log
          </p>
        )}
      </div>
      <Button onClick={generateLog} disabled={blocks.length === 0}>
        Generate Log
      </Button>
      {logOutput && (
        <Textarea
          className="mt-4"
          value={logOutput}
          readOnly
          rows={10}
          placeholder="Generated log will appear here"
        />
      )}
    </div>
  );
};
