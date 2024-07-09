import React, { createContext, useContext, ReactNode, useReducer } from 'react';

interface State {
  aiPrompt: string;
  aiResponse: string;
}

const initialState: State = {
  aiPrompt: '',
  aiResponse: '',
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string },
): State => {
  switch (action.type) {
    case 'SET_AI_PROMPT':
      return { ...state, aiPrompt: action.payload };
    case 'SET_AI_RESPONSE':
      return { ...state, aiResponse: action.payload };
    default:
      return state;
  }
};

interface LegoAIProviderProps {
  children: React.ReactNode;
}

const LegoAIContext = createContext<State | null>(null);

export const useLegoAI = () => useContext(LegoAIContext);

export const LegoAIProvider: React.FC<LegoAIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LegoAIContext.Provider value={state}>{children}</LegoAIContext.Provider>
  );
};
