import React from 'react';
import { LegoBlock } from '../lego/LegoBlock';
import { LegoContainer } from '../lego/LegoContainer';
import { LegoMat } from '../lego/LegoMat';
import { LegoToGo } from '../lego/LegoToGo';
import { LegoSearch } from '../lego/LegoSearch';
import { LegoTag } from '../lego/LegoTag';
import { LegoTango } from '../lego/LegoTango';
import { LegoXML } from '../lego/LegoXML';
import { LegoBin } from '../lego/LegoBin';
import { LegoCard } from '../lego/LegoCard';
import { LegoCarousel } from '../lego/LegoCarousel';
import { LegoSwagger } from '../lego/LegoSwagger';
import { LegoShapeDecider } from '../lego/LegoShapeDecider';
import { LegoBreaks } from '../lego/LegoBreaks';
import { LegoBox } from '../lego/LegoBox';
import { APILegoAdapter } from '../APILegoAdapter';
import { APIComponentBuilder } from '../APIComponentBuilder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { LegoBlockItem } from '../lego/types';

export const RenderAll: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Lego Components</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <LegoBlock
            id="block1"
            type="Basic"
            content="Basic Block"
            onBlockCreated={() => {}}
          />
          <LegoContainer onDrop={() => {}}>
            <p>Drag blocks here</p>
          </LegoContainer>
          <LegoMat onDrop={() => {}} />
          <LegoToGo onExport={() => {}} />
          <LegoSearch onSearch={() => {}} />
          <LegoTag onTagComplete={() => {}} />
          <LegoTango onTangoComplete={() => {}} />
          <LegoXML onXMLGenerated={() => {}} />
          <LegoBin
            onBinUpdate={() => {}}
            renderBlock={(block: LegoBlockItem) => <div>{block.content}</div>}
          />
          <LegoCard
            block={{
              id: 'card1',
              type: 'Card',
              content: 'Card Content',
              name: 'Card 1',
            }}
          />
          <LegoCarousel components={[]} />
          <LegoSwagger swaggerUrl="https://api.example.com/swagger.json" />
          <LegoShapeDecider id="shape1" type="Shape" content="Shape Content" />
          <LegoBreaks />
          <LegoBox title="Sample Box" />
          <APILegoAdapter swaggerUrl="" onBlockCreated={() => {}} />
          <APIComponentBuilder
            apiEndpoint=""
            apiKey=""
            onComponentCreated={() => {}}
          />
        </div>
      </div>
    </DndProvider>
  );
};
