'use client';

import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';

interface LegoMatProps {
  onDrop: (item: LegoBlockItem) => void;
  children?: React.ReactNode;
}

export const LegoMat: React.FC<LegoMatProps> = ({ onDrop, children }) => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`lego-mat ${isOver ? 'lego-mat--over' : ''}`}
      style={{
        minHeight: '400px',
        padding: '24px',
        backgroundColor: isOver ? '#e6f7ff' : '#f0f0f0',
        border: '3px solid #1890ff',
        borderRadius: '12px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        alignContent: 'flex-start',
      }}
    >
      {children}
      {React.Children.count(children) === 0 && (
        <div
          className="lego-mat__placeholder"
          style={{ color: '#bfbfbf', fontSize: '18px' }}
        >
          Drag and drop Lego blocks here to build your component
        </div>
      )}
    </div>
  );
};
