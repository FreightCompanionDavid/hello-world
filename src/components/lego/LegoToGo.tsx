'use client';

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoContainer } from './LegoContainer';
import { LegoBlockItem } from './types';

interface LegoToGoProps {
  onExport: (blocks: LegoBlock[]) => void;
}

interface LegoBlock {
  id: string;
  type: string;
  content: string;
}

export const LegoToGo: React.FC<LegoToGoProps> = ({ onExport }) => {
  const [blocks, setBlocks] = useState<LegoBlock[]>([]);

  const handleDrop = (item: LegoBlockItem) => {
    const newBlock: LegoBlock = {
      id: item.id,
      type: item.type,
      content: '', // Or determine this based on item properties
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const handleExport = () => {
    onExport(blocks);
  };

  const [{ isDragging }, dragRef] = useDrag<
    { blocks: LegoBlock[] },
    unknown,
    { isDragging: boolean }
  >(() => ({
    type: 'LEGO_TO_GO',
    item: { blocks },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef as unknown as React.RefObject<HTMLDivElement>}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="p-4 border rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Lego To Go</h2>
      <LegoContainer onDrop={handleDrop}>
        {blocks.map((block) => (
          <LegoBlock
            key={block.id}
            id={block.id}
            type={block.type}
            content={block.content}
            onBlockCreated={() => {}} // Added this line
          />
        ))}
      </LegoContainer>
      <Button onClick={handleExport} className="mt-4">
        Export Lego Blocks
      </Button>
    </div>
  );
};
