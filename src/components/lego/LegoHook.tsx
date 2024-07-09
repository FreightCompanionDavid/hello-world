import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoHookProps {
  onHookCreated: (hookConfig: HookConfig) => void;
}

interface HookConfig {
  name: string;
  dependencies: string[];
  logic: string;
}

export const LegoHook: React.FC<LegoHookProps> = ({ onHookCreated }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [name, setName] = useState<string>('');
  const [dependencies, setDependencies] = useState<string>('');
  const [logic, setLogic] = useState<string>('');

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

  const handleCreateHook = useCallback(() => {
    const hookConfig: HookConfig = {
      name,
      dependencies: dependencies.split(',').map((dep) => dep.trim()),
      logic,
    };
    onHookCreated(hookConfig);
    setBlocks([]);
    setName('');
    setDependencies('');
    setLogic('');
  }, [name, dependencies, logic, onHookCreated]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Hook Creator</h2>
      <Input
        placeholder="Hook name (e.g. useCustomHook)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Dependencies (comma-separated)"
        value={dependencies}
        onChange={(e) => setDependencies(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Hook logic"
        value={logic}
        onChange={(e) => setLogic(e.target.value)}
        className="mb-2"
        rows={4}
      />
      <div
        ref={dropRef}
        className={`min-h-[100px] border-dashed border-2 p-4 mb-4 ${
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
            Drag and drop Lego blocks here to add to the hook
          </p>
        )}
      </div>
      <Button onClick={handleCreateHook} disabled={!name || !logic}>
        Create Hook
      </Button>
    </div>
  );
};
