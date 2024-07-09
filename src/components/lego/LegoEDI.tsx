import React, { useState, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoEDIProps {
  onEDIGenerated: (edi: string) => void;
}

export const LegoEDI: React.FC<LegoEDIProps> = ({ onEDIGenerated }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [ediOutput, setEDIOutput] = useState<string>('');
  const [segmentSeparator, setSegmentSeparator] = useState<string>('~');
  const [elementSeparator, setElementSeparator] = useState<string>('*');

  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setBlocks((prevBlocks) => [...prevBlocks, item]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Connect the drop ref
  drop(dropRef);

  const generateEDI = () => {
    const edi = blocks
      .map((block) => {
        // This is a simplified EDI generation. In a real scenario, you'd need more complex logic.
        return `${block.type}${elementSeparator}${block.id}`;
      })
      .join(segmentSeparator);

    setEDIOutput(edi);
    onEDIGenerated(edi);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego EDI Generator</h2>
      <div className="flex space-x-4 mb-4">
        <Input
          placeholder="Segment Separator"
          value={segmentSeparator}
          onChange={(e) => setSegmentSeparator(e.target.value)}
          className="w-1/2"
        />
        <Input
          placeholder="Element Separator"
          value={elementSeparator}
          onChange={(e) => setElementSeparator(e.target.value)}
          className="w-1/2"
        />
      </div>
      <div
        ref={dropRef}
        className={`min-h-[200px] border-dashed border-2 p-4 mb-4 ${
          isOver ? 'bg-blue-100' : ''
        }`}
      >
        {blocks.map((block, index) => (
          <LegoBlock
            key={`${block.id}-${index}`}
            id={block.id}
            type={block.type}
            content={`${block.type} Block ${index + 1}`}
            onBlockCreated={() => {}}
          />
        ))}
        {blocks.length === 0 && (
          <p className="text-gray-400">
            Drag and drop Lego blocks here to create EDI segments
          </p>
        )}
      </div>
      <Button onClick={generateEDI} disabled={blocks.length === 0}>
        Generate EDI
      </Button>
      {ediOutput && (
        <Textarea
          className="mt-4"
          value={ediOutput}
          readOnly
          rows={10}
          placeholder="Generated EDI will appear here"
        />
      )}
    </div>
  );
};
