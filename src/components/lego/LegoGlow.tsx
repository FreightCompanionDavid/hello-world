import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';

interface LegoGlowProps {
  onGlowComplete: (pairs: [LegoBlockItem, LegoBlockItem][]) => void;
}

export const LegoGlow: React.FC<LegoGlowProps> = ({ onGlowComplete }) => {
  const [leftBlocks, setLeftBlocks] = useState<LegoBlockItem[]>([]);
  const [rightBlocks, setRightBlocks] = useState<LegoBlockItem[]>([]);
  const [glowingPairs, setGlowingPairs] = useState<[number, number][]>([]);

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
    if (leftRef.current) dropLeft(leftRef.current);
    if (rightRef.current) dropRight(rightRef.current);
  }, [dropLeft, dropRight]);

  const handleBlockClick = (side: 'left' | 'right', index: number) => {
    setGlowingPairs((prevPairs) => {
      const existingPairIndex = prevPairs.findIndex(
        (pair) =>
          (side === 'left' && pair[0] === index) ||
          (side === 'right' && pair[1] === index),
      );

      if (existingPairIndex !== -1) {
        // Remove existing pair
        return prevPairs.filter((_, i) => i !== existingPairIndex);
      } else {
        // Add new pair
        const otherSideIndex =
          side === 'left' ? prevPairs.length : prevPairs.length - 1;
        return [
          ...prevPairs,
          side === 'left' ? [index, otherSideIndex] : [otherSideIndex, index],
        ];
      }
    });
  };

  const handleGlowComplete = () => {
    const pairs = glowingPairs.map(
      ([leftIndex, rightIndex]) =>
        [leftBlocks[leftIndex], rightBlocks[rightIndex]] as [
          LegoBlockItem,
          LegoBlockItem,
        ],
    );
    onGlowComplete(pairs);
    setLeftBlocks([]);
    setRightBlocks([]);
    setGlowingPairs([]);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Glow</h2>
      <div className="flex space-x-4">
        <div
          ref={leftRef}
          className={`flex-1 min-h-[200px] border-dashed border-2 p-4 ${
            isOverLeft ? 'bg-blue-100' : ''
          }`}
        >
          <h3 className="text-lg font-medium mb-2">Left Side</h3>
          {leftBlocks.map((block, index) => (
            <div
              key={`${block.id}-${index}`}
              onClick={() => handleBlockClick('left', index)}
              className={`cursor-pointer ${
                glowingPairs.some((pair) => pair[0] === index)
                  ? 'animate-pulse'
                  : ''
              }`}
            >
              <LegoBlock
                id={block.id}
                type={block.type}
                content={`${block.type} Block ${index + 1}`}
                onBlockCreated={() => {}}
              />
            </div>
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
            <div
              key={`${block.id}-${index}`}
              onClick={() => handleBlockClick('right', index)}
              className={`cursor-pointer ${
                glowingPairs.some((pair) => pair[1] === index)
                  ? 'animate-pulse'
                  : ''
              }`}
            >
              <LegoBlock
                id={block.id}
                type={block.type}
                content={`${block.type} Block ${index + 1}`}
                onBlockCreated={() => {}}
              />
            </div>
          ))}
          {rightBlocks.length === 0 && (
            <p className="text-gray-400">Drag and drop Lego blocks here</p>
          )}
        </div>
      </div>
      <Button
        onClick={handleGlowComplete}
        className="mt-4"
        disabled={glowingPairs.length === 0}
      >
        Complete Glow
      </Button>
    </div>
  );
};
