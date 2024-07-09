import { APILegoAdapter } from '@/components/APILegoAdapter';
import React from 'react';
import {
  LegoAIProvider,
  LegoBin,
  LegoBlock,
  LegoBox,
  LegoBreaks,
  LegoCarousel,
  LegoMat,
  LegoSearch,
  LegoShapeDecider,
  LegoSwagger,
  LegoToGo,
} from '../../components/lego';

type LegoBinProps = {
  onBinUpdate: (blocks: any[]) => void;
  renderBlock: (block: any) => React.ReactElement;
};

type ExtendedLegoBinProps = LegoBinProps & {
  renderBlock: (block: any) => React.ReactElement;
};

export default function LegolandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LegoAIProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-md overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Lego Components</h2>
            <LegoBlock
              id="basic-block"
              type="Basic"
              content="Basic Block"
              onBlockCreated={() => {}}
            />
            <LegoShapeDecider
              id="shape-decider"
              type="Shape"
              content="Shape Decider"
            />
            <LegoBreaks />
            <LegoBox title="Sample Box" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">LegoLand API Builder</h1>
            <LegoMat onDrop={() => {}}>{children}</LegoMat>
          </div>
        </div>
        {/* Center Sidebar */}
        <div className="w-80 bg-white shadow-md overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Lego Search Results</h2>
            <LegoSearch
              onSearch={(query: string, blocks: any[]) => {
                // Here you would typically filter blocks based on the query
                // For this example, we'll just pass all blocks to the carousel
                return (
                  <LegoCarousel
                    components={blocks.map((block) => ({
                      id: block.id,
                      name: block.type,
                      type: block.type,
                      content: block.content,
                      category: 'default', // Add a default category
                      template: block.content, // Use content as template
                    }))}
                  />
                );
              }}
            />
            <LegoBin
              onBinUpdate={(blocks: any[]) => (
                <LegoCarousel
                  components={blocks.map((block) => ({
                    id: block.id,
                    name: block.type,
                    type: block.type,
                    content: block.content,
                    category: 'default',
                    template: block.content,
                  }))}
                />
              )}
              renderBlock={(block: any) => <div>{block.content}</div>}
            />{' '}
            as ExtendedLegoBinProps
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white shadow-md overflow-y-auto">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">API Tools</h2>
            <LegoSwagger swaggerUrl="https://api.example.com/swagger.json" />
            <APILegoAdapter
              swaggerUrl="https://api.example.com/swagger.json"
              onBlockCreated={() => {}}
            />
            <LegoSearch onSearch={() => {}} />
            <LegoToGo onExport={() => {}} />
            <LegoBin
              onBinUpdate={() => {}}
              renderBlock={(block: any) => <div>{block.content}</div>}
            />
          </div>
        </div>
      </div>
    </LegoAIProvider>
  );
}
