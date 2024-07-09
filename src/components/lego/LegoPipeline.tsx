import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoPipelineProps {
  onPipelineComplete: (
    blocks: LegoBlockItem[],
    pipelineName: string,
    description: string,
  ) => void;
}

export const LegoPipeline: React.FC<LegoPipelineProps> = ({
  onPipelineComplete,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [pipelineName, setPipelineName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

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

  const handlePipelineComplete = useCallback(() => {
    onPipelineComplete(blocks, pipelineName, description);
    setBlocks([]);
    setPipelineName('');
    setDescription('');
  }, [blocks, pipelineName, description, onPipelineComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Pipeline Creator</h2>
      <Input
        placeholder="Pipeline Name"
        value={pipelineName}
        onChange={(e) => setPipelineName(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Pipeline Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4"
        rows={3}
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
            Drag and drop Lego blocks here to create your pipeline
          </p>
        )}
      </div>
      <Button
        onClick={handlePipelineComplete}
        disabled={blocks.length === 0 || !pipelineName}
      >
        Complete Pipeline
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Pipeline component allows you to create a sequence of
        operations using different Lego blocks. Name your pipeline, describe its
        purpose, and add blocks to define the steps in your process.
      </p>
    </div>
  );
};
