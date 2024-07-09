import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LegoBlock } from './LegoBlock';
import { LegoContainer } from './LegoContainer';
import { ComponentTemplate, LegoBlockItem } from './types';
import { LegoXML } from './LegoXML';
import { LegoUpsert } from './LegoUpsert';
import { LegoTrigger } from './LegoTrigger';
import { LegoToGo } from './LegoToGo';
import { LegoTango } from './LegoTango';
import { LegoTag } from './LegoTag';
import { LegoSwap } from './LegoSwap';
import { LegoSwagger } from './LegoSwagger';
import { LegoStubHub } from './LegoStubHub';
import { LegoStub } from './LegoStub';
import { LegoSplitter } from './LegoSplitter';
import { LegoSpam } from './LegoSpam';
import { LegoShapeDecider } from './LegoShapeDecider';
import { LegoShape } from './LegoShape';
import { LegoSample } from './LegoSample';
import { LegoPlaydough } from './LegoPlaydough';
import { LegoPipeline } from './LegoPipeline';
import { LegoNotification } from './LegoNotification';
import { LegoMat } from './LegoMat';
import { LegoLust } from './LegoLust';
import { LegoLove } from './LegoLove';
import { LegoLoose } from './LegoLoose';
import { LegoLoop } from './LegoLoop';
import { LegoLog } from './LegoLog';
import { LegoLock } from './LegoLock';
import { LegoLevy } from './LegoLevy';
import { LegoJengo } from './LegoJengo';
import { LegoJam } from './LegoJam';
import { LegoIndecision } from './LegoIndecision';
import { LegoHook } from './LegoHook';
import { LegoGlow } from './LegoGlow';
import { LegoFuego } from './LegoFuego';
import { LegoFlow } from './LegoFlow';
import { LegoEgo } from './LegoEgo';
import { LegoEDI } from './LegoEDI';
import { LegoDependenyt } from './LegoDependenyt';
import { LegoDB } from './LegoDB';
import { LegoCRM } from './LegoCRM';
import { LegoClient } from './LegoClient';
import { LegoChain } from './LegoChain';
import { LegoBreaks } from './LegoBreaks';
import { LegoBraino } from './LegoBraino';
import { LegoBox } from './LegoBox';
import { LegoBook } from './LegoBook';
import { LegoBender } from './LegoBender';
import { LegoBake } from './LegoBake';
import { LegoArbitrary } from './LegoArbitrary';
import { LegoAlign } from './LegoAlign';
import { LegoAIRolePlay } from './LegoAIRolePlay';
import { useLegoAI, LegoAIContextType } from './LegoAIContext';
import { LegoAI } from './LegoAI';
import { Lego2Line } from './Lego2Line';
import { LegoBlamo } from './LegoBlamo';

interface LegoBuilderProps {
  apiEndpoint: string;
  apiKey: string;
  components: ComponentTemplate[];
  onDrop: (item: LegoBlockItem) => void;
}

interface Block {
  id: string;
  type: string;
  content: string;
}

export const LegoBuilder: React.FC<LegoBuilderProps> = ({
  apiEndpoint,
  apiKey,
  components,
  onDrop,
}) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [apiSchema, setAPISchema] = useState<any>(null);
  const legoAIContext = useLegoAI() as LegoAIContextType;

  const fetchAPISchema = useCallback(async () => {
    try {
      const response = await fetch(`${apiEndpoint}/openapi.json`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const schema = await response.json();
      setAPISchema(schema);
    } catch (error) {
      console.error('Error fetching API schema:', error);
    }
  }, [apiEndpoint, apiKey]);

  useEffect(() => {
    fetchAPISchema();
  }, [fetchAPISchema]);

  const handleDrop = useCallback(
    (item: LegoBlockItem) => {
      const newBlock: Block = {
        id: `${item.type}-${Date.now()}`,
        type: item.type,
        content: `${item.type} Block`,
      };
      setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
      onDrop(item);
    },
    [onDrop],
  );

  const generateComponent = useCallback(() => {
    const componentCode = blocks
      .map((block) => {
        switch (block.type) {
          case 'APIConnector':
            return `
              <APIConnector
                endpoint="${apiEndpoint}"
                method="GET"
                apiKey="${apiKey}"
              >
                {(data, loading, error) => (
                  <div>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
                  </div>
                )}
              </APIConnector>
            `;
          case 'LegoXML':
            return `<LegoXML />`;
          case 'LegoUpsert':
            return `<LegoUpsert />`;
          case 'LegoTrigger':
            return `<LegoTrigger />`;
          // Add cases for all other Lego components
          default:
            return `<div>${block.content}</div>`;
        }
      })
      .join('\n');

    console.log('Generated Component:', componentCode);
    // Here you can add logic to save or use the generated component
  }, [blocks, apiEndpoint, apiKey]);

  const handleBlockCreated = useCallback(
    (blockId: string) => {
      console.log(`Block created: ${blockId}`);
      legoAIContext.dispatch({
        type: 'ADD_BLOCK',
        payload: { id: blockId, type: 'Block', content: 'Block' },
      });
    },
    [legoAIContext],
  );

  const handleUpsert = useCallback((data: any) => {
    console.log('Upsert data:', data);
    // Implement upsert logic here
  }, []);

  const renderAvailableBlocks = () => (
    <div style={{ width: '200px', marginRight: '16px' }}>
      <h3>Available Blocks</h3>
      <LegoBlock
        id="apiconnector"
        type="APIConnector"
        content="API Connector"
      />
      <LegoBlock id="input" type="Input" content="Input Field" />
      <LegoBlock id="button" type="Button" content="Button" />
      {/* Add all other Lego components here */}
      <LegoXML onXMLGenerated={() => {}} />
      <LegoUpsert onUpsert={handleUpsert} />
      <LegoTrigger onTriggerCreated={() => {}} />
      <LegoToGo onExport={() => {}} />
      <LegoTango onTangoComplete={() => {}} />
      <LegoTag onTagComplete={() => {}} />
      <LegoSwap blocks={[]} onSwap={() => {}} />
      <LegoSwagger swaggerUrl="" />
      <LegoStubHub />
      <LegoStub onStubCreated={() => {}} />
      <LegoSplitter onSplit={() => {}} />
      <LegoSpam onSpamGenerated={() => {}} />
      <LegoShapeDecider id="" type="" content="" />
      <LegoShape id="" type="" content="" shape="circle" />
      <LegoSample onSampleComplete={() => {}} />
      <LegoPlaydough onPlaydoughCreated={() => {}} />
      <LegoPipeline onPipelineComplete={() => {}} />
      <LegoNotification onNotificationCreated={() => {}} />
      <LegoMat onDrop={() => {}} />
      <LegoLust onLustComplete={() => {}} />
      <LegoLove onLoveComplete={() => {}} />
      <LegoLoose onLooseComplete={() => {}} />
      <LegoLoop onLoopComplete={() => {}} />
      <LegoLog onLogGenerated={() => {}} />
      <LegoLock onLockComplete={() => {}} />
      <LegoLevy onLevyComplete={() => {}} />
      <LegoJengo onJengoComplete={() => {}} />
      <LegoJam onJamComplete={() => {}} />
      <LegoIndecision onDecisionMade={() => {}} />
      <LegoHook onHookCreated={() => {}} />
      <LegoGlow onGlowComplete={() => {}} />
      <LegoFuego onFuegoComplete={() => {}} />
      <LegoFlow onFlowComplete={() => {}} />
      <LegoEgo onEgoCreated={() => {}} />
      <LegoEDI onEDIGenerated={() => {}} />
      <LegoDependenyt onDependencyCreated={() => {}} />
      <LegoDB onDBOperation={() => {}} />
      <LegoCRM onCRMComplete={() => {}} />
      <LegoClient onClientCreated={() => {}} />
      <LegoChain onChainCreated={() => {}} />
      <LegoBreaks />
      <LegoBraino onBrainoComplete={() => {}} />
      <LegoBox title="" />
      <LegoBook onBookComplete={() => {}} />
      <LegoBender onBend={() => {}} />
      <LegoBake onBakeComplete={() => {}} />
      <LegoArbitrary onArbitraryComplete={() => {}} />
      <LegoAlign block={{ alignment: 'left' }} onBlockChange={() => {}} />
      <LegoAIRolePlay onConnect={() => {}} />
      <LegoAI apiEndpoint="" apiKey="" />
      <Lego2Line onTwoLineComplete={() => {}} />
      <LegoBlamo onBlamoComplete={() => {}} />
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
            content={block.content}
            onBlockCreated={handleBlockCreated}
          />
        ))}
      </LegoContainer>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <h2>Lego API Builder</h2>
        <div style={{ display: 'flex' }}>
          {renderAvailableBlocks()}
          {renderBuildArea()}
        </div>
        <button onClick={generateComponent}>Generate Component</button>
      </div>
    </DndProvider>
  );
};
