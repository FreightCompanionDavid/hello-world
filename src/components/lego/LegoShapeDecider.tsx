import React from 'react';
import { LegoShape } from './LegoShape';

interface LegoShapeDeciderProps {
  id: string;
  type: string;
  content: string;
}

export const LegoShapeDecider: React.FC<LegoShapeDeciderProps> = ({
  id,
  type,
  content,
}) => {
  const decideShape = (): 'rectangle' | 'circle' | 'triangle' => {
    // Simple logic to determine shape based on API endpoint compatibility
    if (type === 'API_ENDPOINT') {
      const method = content.split(' ')[0].toLowerCase();
      switch (method) {
        case 'get':
          return 'circle'; // GET requests are circles
        case 'post':
          return 'triangle'; // POST requests are triangles
        default:
          return 'rectangle'; // Other methods are rectangles
      }
    }
    return 'rectangle'; // Default shape for non-API endpoints
  };

  const shape = decideShape();

  return <LegoShape id={id} type={type} content={content} shape={shape} />;
};
