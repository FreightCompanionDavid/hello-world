'use client';

import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPI } from 'openapi-types';
import React, { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LegoAIContextType, useLegoAI } from './lego/LegoAIContext';
import { LegoBlock } from './lego/LegoBlock';
import { LegoContainer } from './lego/LegoContainer';
import { LegoBlockItem } from './lego/types';

interface APILegoAdapterProps {
  swaggerUrl: string;
  onBlockCreated: (block: LegoBlockItem) => void;
}

export const APILegoAdapter: React.FC<APILegoAdapterProps> = ({
  swaggerUrl,
  onBlockCreated,
}) => {
  const [apiSpec, setApiSpec] = useState<OpenAPI.Document | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const legoAIContext = useLegoAI() as LegoAIContextType;

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

  const handleDrop = useCallback(
    (item: LegoBlockItem) => {
      setBlocks((prevBlocks) => [...prevBlocks, item]);
      onBlockCreated(item);
    },
    [onBlockCreated],
  );

  const handleBlockCreated = useCallback(
    (blockId: string, blockType: string, blockContent: string) => {
      console.log(`Block created: ${blockId}`);
      legoAIContext.dispatch({
        type: 'ADD_BLOCK',
        payload: {
          id: blockId,
          type: blockType,
          content: blockContent,
        },
      });
    },
    [legoAIContext],
  );

  const renderAvailableBlocks = () => (
    <div style={{ width: '200px', marginRight: '16px' }}>
      <h3>Available API Endpoints</h3>
      {apiSpec &&
        Object.entries(apiSpec.paths || {}).map(([path, pathItem]) => (
          <div key={path}>
            {Object.entries(pathItem || {}).map(([method, operation]) => (
              <LegoBlock
                key={`${path}-${method}`}
                id={`${path}-${method}`}
                type="API_ENDPOINT"
                content={`${method.toUpperCase()} ${path}`}
                onBlockCreated={(id) =>
                  handleBlockCreated(
                    id,
                    'API_ENDPOINT',
                    `${method.toUpperCase()} ${path}`,
                  )
                }
              />
            ))}
          </div>
        ))}
    </div>
  );

  const renderBuildArea = () => (
    <div style={{ flex: 1 }}>
      <h3>Build Area</h3>
      <LegoContainer onDrop={handleDrop}>
        {blocks.map((block) => (
          <LegoBlock
            key={block.id}
            id={block.id}
            type={block.type}
            content={`${block.type} Block`}
            onBlockCreated={handleBlockCreated}
          />
        ))}
      </LegoContainer>
    </div>
  );

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!apiSpec) {
    return <div>Loading API specification...</div>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="api-lego-adapter">
        <h2 className="text-xl font-semibold mb-4">API Lego Adapter</h2>
        <div style={{ display: 'flex' }}>
          {renderAvailableBlocks()}
          {renderBuildArea()}
        </div>
      </div>
    </DndProvider>
  );
};
