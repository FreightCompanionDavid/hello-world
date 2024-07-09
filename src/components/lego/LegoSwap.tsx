import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';

interface LegoSwapProps {
  blocks: LegoBlockItem[];
  onSwap: (sourceIndex: number, targetIndex: number) => void;
}

export const LegoSwap: React.FC<LegoSwapProps> = ({ blocks, onSwap }) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDrop = (targetIndex: number) => {
    if (dragIndex !== null && dragIndex !== targetIndex) {
      onSwap(dragIndex, targetIndex);
    }
    setDragIndex(null);
  };

  return (
    <div className="lego-swap">
      {blocks.map((block, index) => (
        <SwappableBlock
          key={block.id}
          block={block}
          index={index}
          onDragStart={() => setDragIndex(index)}
          onDrop={() => handleDrop(index)}
        />
      ))}
    </div>
  );
};

interface SwappableBlockProps {
  block: LegoBlockItem;
  index: number;
  onDragStart: () => void;
  onDrop: () => void;
}

const SwappableBlock: React.FC<SwappableBlockProps> = ({
  block,
  index,
  onDragStart,
  onDrop,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SWAPPABLE_BLOCK',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDragStart();
      }
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'SWAPPABLE_BLOCK',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={(node) => {
        drag(node);
        drop(node);
      }}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: isOver ? '#e6f7ff' : 'transparent',
      }}
    >
      <LegoBlock
        id={block.id}
        type={block.type}
        content={`${block.type} Block ${index + 1}`}
        onBlockCreated={() => {}}
      />
    </div>
  );
};
