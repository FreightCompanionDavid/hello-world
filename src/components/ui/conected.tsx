'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Block = { id: string; type: string; content: string };

type LegoAIState = {
  blocks: Block[];
  aiPrompt: string;
  aiResponse: string;
};

type LegoAIAction =
  | { type: 'ADD_BLOCK'; payload: Block }
  | { type: 'REMOVE_BLOCK'; payload: { id: string } }
  | { type: 'SET_AI_PROMPT'; payload: string }
  | { type: 'SET_AI_RESPONSE'; payload: string };

export type LegoAIContextType = {
  state: LegoAIState;
  dispatch: React.Dispatch<LegoAIAction>;
};

const initialState: LegoAIState = {
  blocks: [],
  aiPrompt: '',
  aiResponse: '',
};

const legoAIReducer = (
  state: LegoAIState,
  action: LegoAIAction,
): LegoAIState => {
  switch (action.type) {
    case 'ADD_BLOCK':
      return { ...state, blocks: [...state.blocks, action.payload] };
    case 'REMOVE_BLOCK':
      return {
        ...state,
        blocks: state.blocks.filter((block) => block.id !== action.payload.id),
      };
    case 'SET_AI_PROMPT':
      return { ...state, aiPrompt: action.payload };
    case 'SET_AI_RESPONSE':
      return { ...state, aiResponse: action.payload };
    default:
      return state;
  }
};

const LegoAIContext = createContext<LegoAIContextType | undefined>(undefined);

export const useLegoAI = () => {
  const context = useContext(LegoAIContext);
  if (!context) {
    throw new Error('useLegoAI must be used within a LegoAIProvider');
  }
  return context;
};

interface LegoAIProviderProps {
  children: ReactNode;
}

export const LegoAIProvider: React.FC<LegoAIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(legoAIReducer, initialState);

  return (
    <LegoAIContext.Provider value={{ state, dispatch }}>
      {children}
    </LegoAIContext.Provider>
  );
};
