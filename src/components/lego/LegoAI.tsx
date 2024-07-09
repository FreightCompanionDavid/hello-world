import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { APIConnector } from '../APIConnector';

interface LegoAIProps {
  apiEndpoint: string;
  apiKey: string;
}

export const LegoAI: React.FC<LegoAIProps> = ({ apiEndpoint, apiKey }) => {
  const [blocks, setBlocks] = useState<
    { id: string; type: string; content: string }[]
  >([]);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');

  const [, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: { id: string; type: string; content: string }) => {
      setBlocks((prevBlocks) => [...prevBlocks, item]);
    },
  }));

  const handleCombine = async () => {
    const blocksDescription = blocks.map((block) => block.content).join('\n');
    const fullPrompt = `Combine these API endpoints into a cohesive workflow:\n${blocksDescription}\n\nUser instructions: ${aiPrompt}`;

    try {
      const apiConnectorProps = {
        endpoint: apiEndpoint,
        method: 'POST',
        body: { prompt: fullPrompt },
        headers: { Authorization: `Bearer ${apiKey}` },
      };

      const response = await APIConnector({
        ...apiConnectorProps,
        apiKey,
        children: (data: any, loading: boolean, error: Error | null) => null,
      });

      if (
        response &&
        typeof response === 'object' &&
        'data' in response &&
        response.data &&
        typeof response.data === 'object' &&
        'result' in response.data
      ) {
        setAiResponse(response.data.result as string);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      setAiResponse('Error: Failed to get AI response. Please try again.');
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego AI Combiner</h2>
      <div
        ref={drop as unknown as React.RefObject<HTMLDivElement>}
        className="min-h-[200px] border-dashed border-2 p-4 mb-4"
      >
        {blocks.map((block) => (
          <LegoBlock
            key={block.id}
            id={block.id}
            type={block.type}
            content={block.content}
          />
        ))}
        {blocks.length === 0 && (
          <p className="text-gray-400">Drag and drop Lego blocks here</p>
        )}
      </div>
      <Textarea
        placeholder="Enter your instructions for combining the blocks..."
        value={aiPrompt}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setAiPrompt(e.target.value)
        }
        className="mb-4"
      />
      <Button onClick={handleCombine} className="mb-4">
        Combine with AI
      </Button>
      {aiResponse && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">AI Response:</h3>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">
            {aiResponse}
          </pre>
        </div>
      )}
    </div>
  );
};
