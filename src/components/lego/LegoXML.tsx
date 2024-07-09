import React, { useState } from 'react';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LegoXMLProps {
  onXMLGenerated: (xml: string) => void;
}

export const LegoXML: React.FC<LegoXMLProps> = ({ onXMLGenerated }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [xmlOutput, setXMLOutput] = useState<string>('');

  const handleDrop = (item: LegoBlockItem) => {
    setBlocks((prevBlocks) => [...prevBlocks, item]);
  };

  const generateXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<lego-structure>
  ${blocks
    .map((block) => `<block type="${block.type}" id="${block.id}" />`)
    .join('\n  ')}
</lego-structure>`;
    setXMLOutput(xml);
    onXMLGenerated(xml);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego XML Generator</h2>
      <div
        className="min-h-[200px] border-dashed border-2 p-4 mb-4"
        onDrop={(e) => {
          e.preventDefault();
          const item = JSON.parse(e.dataTransfer.getData('application/json'));
          handleDrop(item);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        {blocks.map((block, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            {block.type} Block (ID: {block.id})
          </div>
        ))}
        {blocks.length === 0 && (
          <p className="text-gray-400">Drag and drop Lego blocks here</p>
        )}
      </div>
      <Button onClick={generateXML} disabled={blocks.length === 0}>
        Generate XML
      </Button>
      {xmlOutput && (
        <Textarea className="mt-4" value={xmlOutput} readOnly rows={10} />
      )}
    </div>
  );
};
