import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LegoBlock } from './LegoBlock';
import { LegoContainer } from './LegoContainer';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoClientProps {
  onClientCreated: (clientConfig: ClientConfig) => void;
}

interface ClientConfig {
  baseUrl: string;
  headers: { [key: string]: string };
  endpoints: Endpoint[];
}

interface Endpoint {
  path: string;
  method: string;
}

export const LegoClient: React.FC<LegoClientProps> = ({ onClientCreated }) => {
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [headers, setHeaders] = useState<{ [key: string]: string }>({});
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

  const handleDrop = useCallback((item: LegoBlockItem) => {
    if (item.type === 'API_ENDPOINT') {
      const [method, path] = item.id.split('-');
      setEndpoints((prevEndpoints) => [...prevEndpoints, { method, path }]);
    }
  }, []);

  const handleAddHeader = useCallback(() => {
    const key = prompt('Enter header key:');
    const value = prompt('Enter header value:');
    if (key && value) {
      setHeaders((prevHeaders) => ({ ...prevHeaders, [key]: value }));
    }
  }, []);

  const handleCreateClient = useCallback(() => {
    const clientConfig: ClientConfig = {
      baseUrl,
      headers,
      endpoints,
    };
    onClientCreated(clientConfig);
  }, [baseUrl, headers, endpoints, onClientCreated]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Lego Client Builder</h2>
        <Input
          placeholder="Base URL"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="mb-4"
        />
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Headers</h3>
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} className="mb-2">
              {key}: {value}
            </div>
          ))}
          <Button onClick={handleAddHeader}>Add Header</Button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Endpoints</h3>
          <LegoContainer onDrop={handleDrop}>
            {endpoints.map((endpoint, index) => (
              <LegoBlock
                key={index}
                id={`${endpoint.method}-${endpoint.path}`}
                type="API_ENDPOINT"
                content={`${endpoint.method} ${endpoint.path}`}
                onBlockCreated={() => {}}
              />
            ))}
          </LegoContainer>
        </div>
        <Button onClick={handleCreateClient}>Create Client</Button>
      </div>
    </DndProvider>
  );
};
