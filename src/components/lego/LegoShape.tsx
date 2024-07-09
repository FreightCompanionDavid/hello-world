import React from 'react';
import { useDrag } from 'react-dnd';

interface LegoShapeProps {
  id: string;
  type: string;
  content: string;
  shape: 'rectangle' | 'circle' | 'triangle';
}

export const LegoShape: React.FC<LegoShapeProps> = ({
  id,
  type,
  content,
  shape,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'LEGO_SHAPE',
    item: { id, type, content, shape },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const getShapeStyle = () => {
    const baseStyle = {
      opacity: isDragging ? 0.5 : 1,
      cursor: 'move',
      padding: '8px',
      margin: '4px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100px',
      height: '100px',
    };

    switch (shape) {
      case 'circle':
        return { ...baseStyle, borderRadius: '50%' };
      case 'triangle':
        return {
          ...baseStyle,
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
        };
      default:
        return { ...baseStyle, borderRadius: '4px' };
    }
  };

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      style={getShapeStyle()}
    >
      {content}
    </div>
  );
};
