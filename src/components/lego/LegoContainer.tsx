import React from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';

interface LegoContainerProps {
  onDrop: (item: LegoBlockItem) => void;
  children: React.ReactNode;
}

export const LegoContainer: React.FC<LegoContainerProps> = ({
  onDrop,
  children,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      className={`lego-container ${isOver ? 'lego-container--over' : ''}`}
      ref={drop as unknown as React.LegacyRef<HTMLDivElement>}
      style={{
        minHeight: '200px',
        padding: '16px',
        backgroundColor: isOver ? '#e6f7ff' : '#f9f9f9',
        border: '2px dashed #ccc',
        borderRadius: '8px',
      }}
    >
      {children}
    </div>
  );
};
