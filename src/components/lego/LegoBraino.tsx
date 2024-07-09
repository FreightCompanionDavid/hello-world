import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoBrainoProps {
  onBrainoComplete: (
    blocks: LegoBlockItem[],
    prompt: string,
    response: string,
  ) => void;
}

export const LegoBraino: React.FC<LegoBrainoProps> = ({ onBrainoComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<string>('');

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

  const handleBrainoComplete = useCallback(async () => {
    // Simulate AI response generation
    const simulatedResponse = `AI response to: ${prompt}\nUsing blocks: ${blocks
      .map((b) => b.type)
      .join(', ')}`;
    setResponse(simulatedResponse);

    onBrainoComplete(blocks, prompt, simulatedResponse);
    setBlocks([]);
    setPrompt('');
  }, [blocks, prompt, onBrainoComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Braino</h2>
      <Textarea
        placeholder="Enter your prompt for the AI..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="mb-4"
        rows={4}
      />
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-yellow-100' : ''
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
            Drag and drop Lego blocks here to add context to your prompt
          </p>
        )}
      </div>
      <Button
        onClick={handleBrainoComplete}
        disabled={blocks.length === 0 || !prompt}
      >
        Generate AI Response
      </Button>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <p className="whitespace-pre-wrap">{response}</p>
        </div>
      )}
      <p className="mt-4 text-sm text-gray-600">
        The Lego Braino component simulates an AI that generates responses based
        on your prompt and the Lego blocks you provide as context.
      </p>
    </div>
  );
};
