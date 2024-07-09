'use client';

import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPI } from 'openapi-types';
import React, { useEffect, useState } from 'react';
import { LegoBlock } from './LegoBlock';

interface LegoSwaggerProps {
  swaggerUrl: string;
}

export const LegoSwagger: React.FC<LegoSwaggerProps> = ({ swaggerUrl }) => {
  const [apiSpec, setApiSpec] = useState<OpenAPI.Document | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSwaggerSpec = async () => {
      try {
        const parsedSpec = await SwaggerParser.parse(swaggerUrl);
        setApiSpec(parsedSpec);
      } catch (err) {
        setError('Failed to parse Swagger specification');
        console.error(err);
      }
    };

    fetchSwaggerSpec();
  }, [swaggerUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!apiSpec) {
    return <div>Loading Swagger specification...</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">API Endpoints</h2>
      {Object.entries(apiSpec.paths || {}).map(([path, pathItem]) => (
        <div key={path} className="mb-4">
          <h3 className="text-lg font-medium">{path}</h3>
          {Object.entries(pathItem || {}).map(([method, operation]) => (
            <LegoBlock
              key={`${path}-${method}`}
              id={`${path}-${method}`}
              type="API_ENDPOINT"
              content={`${method.toUpperCase()} ${path}`}
              onBlockCreated={() => {}} // Added this line
            />
          ))}
        </div>
      ))}
    </div>
  );
};
