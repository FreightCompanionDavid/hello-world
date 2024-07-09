'use client';
import { Button } from '@/components/ui/button';
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useLegoAI } from './LegoAIContext';
import { LegoBlock as LegoBlockComponent } from './LegoBlock';

// Define the LegoBlock type
type LegoBlock = {
  id: string;
  type: string;
  content: string;
};

// Define the LegoState type
type LegoState = {
  blocks: LegoBlock[];
  aiPrompt: string;
  aiResponse: string;
};

// Update the LegoAction type
type LegoAction =
  | { type: 'ADD_BLOCK'; payload: LegoBlock }
  | { type: 'REMOVE_BLOCK'; payload: string }
  | { type: 'SET_AI_PROMPT'; payload: string }
  | { type: 'SET_AI_RESPONSE'; payload: string };

// Update the legoReducer function
function legoReducer(state: LegoState, action: LegoAction): LegoState {
  switch (action.type) {
    case 'ADD_BLOCK':
      return { ...state, blocks: [...state.blocks, action.payload] };
    case 'REMOVE_BLOCK':
      return {
        ...state,
        blocks: state.blocks.filter((block) => block.id !== action.payload),
      };
    case 'SET_AI_PROMPT':
      return { ...state, aiPrompt: action.payload };
    case 'SET_AI_RESPONSE':
      return { ...state, aiResponse: action.payload };
    default:
      return state;
  }
}

export const LegoBreaks: React.FC = () => {
  const { state, dispatch } = useLegoAI();
  const dropRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: { id: string; type: string; content: string }) => {
      dispatch({ type: 'ADD_BLOCK', payload: item });
    },
  }));

  // Use useEffect to apply the drop ref
  React.useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  const handleBreak = () => {
    const brokenBlocks = state.blocks.flatMap((block) => {
      const parts = block.content.split(/\s+/);
      return parts.map((part, index) => ({
        id: `${block.id}-${index}`,
        type: block.type,
        content: part,
      }));
    });

    // Dispatch ADD_BLOCK for each broken block
    brokenBlocks.forEach((block) => {
      dispatch({ type: 'ADD_BLOCK', payload: block });
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Breaking Combo</h2>
      <div
        ref={dropRef}
        className="min-h-[200px] border-dashed border-2 p-4 mb-4"
      >
        {state.blocks && state.blocks.length > 0 ? (
          state.blocks.map((block) => (
            <LegoBlockComponent
              key={block.id}
              id={block.id}
              type={block.type}
              content={block.content}
            />
          ))
        ) : (
          <p className="text-gray-400">Drag and drop Lego blocks here</p>
        )}
      </div>
      <Button onClick={handleBreak} className="mb-4">
        Break Blocks
      </Button>
    </div>
  );
};
