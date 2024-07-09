import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoCRMProps {
  onCRMComplete: (
    blocks: LegoBlockItem[],
    customerName: string,
    customerDetails: string,
    interaction: string,
  ) => void;
}

export const LegoCRM: React.FC<LegoCRMProps> = ({ onCRMComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerDetails, setCustomerDetails] = useState<string>('');
  const [interaction, setInteraction] = useState<string>('');

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

  drop(dropRef);

  const handleCRMComplete = useCallback(() => {
    onCRMComplete(blocks, customerName, customerDetails, interaction);
    setBlocks([]);
    setCustomerName('');
    setCustomerDetails('');
    setInteraction('');
  }, [blocks, customerName, customerDetails, interaction, onCRMComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego CRM</h2>
      <Input
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Customer Details"
        value={customerDetails}
        onChange={(e) => setCustomerDetails(e.target.value)}
        className="mb-4"
        rows={3}
      />
      <Textarea
        placeholder="Interaction Notes"
        value={interaction}
        onChange={(e) => setInteraction(e.target.value)}
        className="mb-4"
        rows={3}
      />
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
            Drag and drop Lego blocks here to add CRM functionalities
          </p>
        )}
      </div>
      <Button
        onClick={handleCRMComplete}
        disabled={blocks.length === 0 || !customerName || !interaction}
      >
        Complete CRM Entry
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego CRM component allows you to manage customer relationships. Add
        customer information, interaction notes, and use Lego blocks to build
        custom CRM functionalities.
      </p>
    </div>
  );
};
