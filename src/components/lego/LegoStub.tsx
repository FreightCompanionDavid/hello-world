import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoStubProps {
  onStubCreated: (stubConfig: StubConfig) => void;
}

interface StubConfig {
  endpoint: string;
  method: string;
  responseBody: string;
  statusCode: number;
}

export const LegoStub: React.FC<LegoStubProps> = ({ onStubCreated }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [endpoint, setEndpoint] = useState<string>('');
  const [method, setMethod] = useState<string>('GET');
  const [responseBody, setResponseBody] = useState<string>('');
  const [statusCode, setStatusCode] = useState<number>(200);

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

  const handleCreateStub = () => {
    const stubConfig: StubConfig = {
      endpoint,
      method,
      responseBody,
      statusCode,
    };
    onStubCreated(stubConfig);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Stub Creator</h2>
      <Input
        placeholder="Endpoint (e.g. /api/users)"
        value={endpoint}
        onChange={(e) => setEndpoint(e.target.value)}
        className="mb-2"
      />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="mb-2 p-2 border rounded"
        aria-label="Select HTTP method"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <Input
        type="number"
        placeholder="Status Code"
        value={statusCode}
        onChange={(e) => setStatusCode(Number(e.target.value))}
        className="mb-2"
      />
      <textarea
        placeholder="Response Body (JSON)"
        value={responseBody}
        onChange={(e) => setResponseBody(e.target.value)}
        className="w-full p-2 border rounded mb-2"
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
            Drag and drop Lego blocks here to add to the stub
          </p>
        )}
      </div>
      <Button onClick={handleCreateStub}>Create Stub</Button>
    </div>
  );
};
