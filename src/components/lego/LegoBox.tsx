'use client';

import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { useLegoAI } from './LegoAIContext';

interface LegoBoxProps {
  title: string;
}

export const LegoBox: React.FC<LegoBoxProps> = ({ title }) => {
  const { state, dispatch } = useLegoAI();
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: { id: string; type: string; content: string }) => {
      dispatch({ type: 'ADD_BLOCK', payload: item });
    },
  }));

  drop(dropRef);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div
        ref={dropRef}
        className="min-h-[200px] border-dashed border-2 p-4 mb-4"
      >
        {state.blocks.map(
          (block: { id: string; type: string; content: string }) => (
            <LegoBlock
              key={block.id}
              id={block.id}
              type={block.type}
              content={block.content}
            />
          ),
        )}
        {state.blocks.length === 0 && (
          <p className="text-gray-400">Drag and drop Lego blocks here</p>
        )}
      </div>
    </div>
  );
};
