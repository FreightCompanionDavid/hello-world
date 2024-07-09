import { Dispatch } from 'react';

export interface LegoAIContextType {
  blocks: { id: string; type: string; content: string }[];
  setBlocks: Dispatch<
    React.SetStateAction<{ id: string; type: string; content: string }[]>
  >;
  aiPrompt: string;
  setAiPrompt: Dispatch<React.SetStateAction<string>>;
  aiResponse: string;
  setAiResponse: Dispatch<React.SetStateAction<string>>;
  dispatch: Dispatch<{ type: string; payload: any }>;
}
