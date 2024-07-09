import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoSplitterProps {
  onSplit: (leftBlocks: LegoBlockItem[], rightBlocks: LegoBlockItem[]) => void;
}

export const LegoSplitter: React.FC<LegoSplitterProps> = ({ onSplit }) => {
  const [leftBlocks, setLeftBlocks] = useState<LegoBlockItem[]>([]);
  const [rightBlocks, setRightBlocks] = useState<LegoBlockItem[]>([]);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [{ isOverLeft }, dropLeft] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setLeftBlocks((prevBlocks) => [...prevBlocks, item]);
    },
    collect: (monitor) => ({
      isOverLeft: !!monitor.isOver(),
    }),
  }));

  const [{ isOverRight }, dropRight] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setRightBlocks((prevBlocks) => [...prevBlocks, item]);
    },
    collect: (monitor) => ({
      isOverRight: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (leftRef.current) {
      dropLeft(leftRef.current);
    }
  }, [dropLeft]);

  useEffect(() => {
    if (rightRef.current) {
      dropRight(rightRef.current);
    }
  }, [dropRight]);

  const handleSplit = () => {
    onSplit(leftBlocks, rightBlocks);
    setLeftBlocks([]);
    setRightBlocks([]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Splitter</h2>
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
      <Button onClick={handleSplit} className="mt-4">
        Split Blocks
      </Button>
    </div>
  );
};
