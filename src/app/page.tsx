'use client';

import { APIComponentBuilder } from '@/components/APIComponentBuilder';
import { LegoAIProvider } from '@/components/lego/LegoAIContext';
import { LegoBox } from '@/components/lego/LegoBox';
import { LegoBreaks } from '@/components/lego/LegoBreaks';
import { LegoContainer } from '@/components/lego/LegoContainer';
import { LegoMat } from '@/components/lego/LegoMat';
import { LegoShapeDecider } from '@/components/lego/LegoShapeDecider';
import { LegoSwagger } from '@/components/lego/LegoSwagger';
import { LegoCarousel } from '@/components/lego/LegoCarousel';
import * as shadcnComponents from '@/components/ui/shadcn';
import {
  ComponentTemplate,
  componentTemplates,
} from '@/lib/componentTemplates';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Add this near the top of your file or in a separate types file
type LegoBlockItem = {
  id: string;
  type: string;
};

const APILegoBuilder = () => {
  const [apiEndpoint, setApiEndpoint] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [components, setComponents] = useState<ComponentTemplate[]>([]);
  const [swaggerUrl, setSwaggerUrl] = useState<string>('');

  const handleComponentCreated = (component: ComponentTemplate) => {
    setComponents([...components, component]);
  };

  const handleDrop = (item: LegoBlockItem) => {
    const droppedComponent = componentTemplates.find(
      (c) => c.name === item.type,
    );
    if (droppedComponent) {
      setComponents([...components, droppedComponent]);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <LegoAIProvider>
        <div className="flex flex-col p-4 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">API Lego Builder</h1>
          <div className="mb-4">
            <shadcnComponents.Input
              placeholder="API Endpoint"
              value={apiEndpoint}
              onChange={(e) => setApiEndpoint(e.target.value)}
              className="mb-2"
            />
            <shadcnComponents.Input
              placeholder="API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mb-2"
            />
            <shadcnComponents.Input
              placeholder="Swagger URL"
              value={swaggerUrl}
              onChange={(e) => setSwaggerUrl(e.target.value)}
              className="mb-2"
            />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-4 mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2">
                API Component Builder
              </h2>
              <APIComponentBuilder
                apiEndpoint={apiEndpoint}
                apiKey={apiKey}
                onComponentCreated={handleComponentCreated}
              />
              {swaggerUrl && (
                <div className="mt-4">
                  <h2 className="text-xl font-semibold mb-2">
                    Swagger Endpoints
                  </h2>
                  <LegoSwagger swaggerUrl={swaggerUrl} />
                </div>
              )}
            </div>
            <div className="md:w-1/2">
              <h2 className="text-xl font-semibold mb-2">Lego Builder</h2>
              <LegoMat onDrop={handleDrop}>
                {components.map((component, index) => (
                  <LegoContainer key={index} onDrop={handleDrop}>
                    {/* Render your component here */}
                    <div>{component.name}</div>
                  </LegoContainer>
                ))}
              </LegoMat>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Lego AI Combiner</h2>
                <LegoBox title="Lego AI Combiner" />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Lego Breaks</h2>
                <LegoBreaks />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Lego Shapes</h2>
                <LegoShapeDecider
                  id="example-shape"
                  type="API_ENDPOINT"
                  content="GET /api/example"
                />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-2">Lego Carousel</h2>
                <LegoCarousel components={components} />
              </div>
            </div>
          </div>
        </div>
      </LegoAIProvider>
    </DndProvider>
  );
};

export default APILegoBuilder;
