import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoTangoProps {
  onTangoComplete: (blocks: LegoBlockItem[]) => void;
}

export const LegoTango: React.FC<LegoTangoProps> = ({ onTangoComplete }) => {
  const [leftBlocks, setLeftBlocks] = useState<LegoBlockItem[]>([]);
  const [rightBlocks, setRightBlocks] = useState<LegoBlockItem[]>([]);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [{ isOverLeft }, dropLeft] = useDrop(
    () => ({
      accept: 'LEGO_BLOCK',
      drop: (item: LegoBlockItem) => {
        setLeftBlocks((prevBlocks) => [...prevBlocks, item]);
      },
      collect: (monitor) => ({
        isOverLeft: !!monitor.isOver(),
      }),
    }),
    [],
  );

  const [{ isOverRight }, dropRight] = useDrop(
    () => ({
      accept: 'LEGO_BLOCK',
      drop: (item: LegoBlockItem) => {
        setRightBlocks((prevBlocks) => [...prevBlocks, item]);
      },
      collect: (monitor) => ({
        isOverRight: !!monitor.isOver(),
      }),
    }),
    [],
  );

  const handleTango = () => {
    const tangoedBlocks = leftBlocks.flatMap((leftBlock, index) => {
      const rightBlock = rightBlocks[index];
      return rightBlock ? [leftBlock, rightBlock] : [leftBlock];
    });

    onTangoComplete(tangoedBlocks);
    setLeftBlocks([]);
    setRightBlocks([]);
  };

  dropLeft(leftRef);
  dropRight(rightRef);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Tango</h2>
      <div className="flex space-x-4">
        <div
          ref={leftRef}
          className={`flex-1 min-h-[200px] border-dashed border-2 p-4 ${
            isOverLeft ? 'bg-blue-100' : ''
          }`}
        >
          <h3 className="text-lg font-medium mb-2">Left Side</h3>
          {leftBlocks.map((block, index) => (
            <LegoBlock
              key={`${block.id}-${index}`}
              id={block.id}
              type={block.type}
              content={`${block.type} Block ${index + 1}`}
              onBlockCreated={() => {}}
            />
          ))}
          {leftBlocks.length === 0 && (
            <p className="text-gray-400">Drag and drop Lego blocks here</p>
          )}
        </div>
        <div
          ref={rightRef}
          className={`flex-1 min-h-[200px] border-dashed border-2 p-4 ${
            isOverRight ? 'bg-blue-100' : ''
          }`}
        >
          <h3 className="text-lg font-medium mb-2">Right Side</h3>
          {rightBlocks.map((block, index) => (
            <LegoBlock
              key={`${block.id}-${index}`}
              id={block.id}
              type={block.type}
              content={`${block.type} Block ${index + 1}`}
              onBlockCreated={() => {}}
            />
          ))}
          {rightBlocks.length === 0 && (
            <p className="text-gray-400">Drag and drop Lego blocks here</p>
          )}
        </div>
      </div>
      <Button onClick={handleTango} className="mt-4">
        Tango Blocks
      </Button>
    </div>
  );
};
