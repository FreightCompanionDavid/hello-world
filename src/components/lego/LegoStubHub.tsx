import React, { useState } from 'react';
import { LegoStub } from './LegoStub';
import { Button } from '@/components/ui/button';

interface StubConfig {
  endpoint: string;
  method: string;
  responseBody: string;
  statusCode: number;
}

export const LegoStubHub: React.FC = () => {
  const [stubs, setStubs] = useState<StubConfig[]>([]);

  const handleStubCreated = (stubConfig: StubConfig) => {
    setStubs((prevStubs) => [...prevStubs, stubConfig]);
  };

  const handleClearStubs = () => {
    setStubs([]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Lego Stub Hub</h2>
      <LegoStub onStubCreated={handleStubCreated} />
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Created Stubs</h3>
        {stubs.length === 0 ? (
          <p className="text-gray-500">No stubs created yet.</p>
        ) : (
          <ul className="space-y-4">
            {stubs.map((stub, index) => (
              <li key={index} className="border p-4 rounded-md">
                <p>
                  <strong>Endpoint:</strong> {stub.endpoint}
                </p>
                <p>
                  <strong>Method:</strong> {stub.method}
                </p>
                <p>
                  <strong>Status Code:</strong> {stub.statusCode}
                </p>
                <p>
                  <strong>Response Body:</strong>
                </p>
                <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
                  {stub.responseBody}
                </pre>
              </li>
            ))}
          </ul>
        )}
        {stubs.length > 0 && (
          <Button onClick={handleClearStubs} className="mt-4">
            Clear All Stubs
          </Button>
        )}
      </div>
    </div>
  );
};
