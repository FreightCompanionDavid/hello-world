'use client';

import { Button } from '@/components/ui/button';
import { ComponentTemplate } from '@/lib/componentTemplates';
import React, { useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { LegoAI } from './LegoAI';
import { useLegoAI } from './LegoAIContext';
import { LegoCarousel } from './LegoCarousel';
import { LegoBlockItem } from './types';

export interface LegoBinProps {
  onBinUpdate: (blocks: LegoBlockItem[]) => void;
  renderBlock: (block: LegoBlockItem) => React.ReactElement;
}

export const LegoBin: React.FC<LegoBinProps> = ({
  onBinUpdate,
  renderBlock,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [components, setComponents] = useState<ComponentTemplate[]>([]);

  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      const newBlock = { ...item, id: `${item.id}-${Date.now()}` };
      setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
      onBinUpdate([...blocks, newBlock]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  // Use the drop function to set up the ref
  drop(dropRef);

  const { state, dispatch } = useLegoAI();

  const handleClearBin = () => {
    setBlocks([]);
    onBinUpdate([]);
    dispatch({ type: 'SET_AI_PROMPT', payload: '' });
    dispatch({ type: 'SET_AI_RESPONSE', payload: '' });
  };

  const handleConvertToComponents = () => {
    const newComponents: ComponentTemplate[] = blocks.map((block) => ({
      id: `component-${block.id}`,
      name: `${block.type} Component`,
      type: block.type,
      category: 'Custom',
      template: `<${block.type} id="${block.id}" />`,
    }));
    setComponents(newComponents);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Bin</h2>
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
        }`}
      >
        {blocks.map((block) => renderBlock(block))}
        {blocks.length === 0 && (
          <p className="text-gray-400">
            Drag and drop Lego blocks here to store them
          </p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button onClick={handleClearBin}>Clear Bin</Button>
        <Button onClick={handleConvertToComponents}>
          Convert to Components
        </Button>
      </div>
      {components.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Component Carousel</h3>
          <LegoCarousel components={components} />
        </div>
      )}
      <LegoAI
        apiEndpoint="https://api.example.com/ai"
        apiKey="your-api-key-here"
      />
    </div>
  );
};
