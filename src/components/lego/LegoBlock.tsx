'use client';

import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';

interface LegoBlockProps {
  id: string;
  type: string;
  content: string;
  onBlockCreated?: (id: string, type: string, content: string) => void;
}

export const LegoBlock: React.FC<LegoBlockProps> = ({
  id,
  type,
  content,
  onBlockCreated,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LEGO_BLOCK',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    if (onBlockCreated) {
      onBlockCreated(id, type, content);
    }
  }, [id, type, content, onBlockCreated]);

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        margin: '4px',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      {content}
    </div>
  );
};
