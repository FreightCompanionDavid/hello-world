import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoTriggerProps {
  onTriggerCreated: (triggerConfig: TriggerConfig) => void;
}

interface TriggerConfig {
  event: string;
  condition: string;
  action: string;
  blocks: LegoBlockItem[];
}

export const LegoTrigger: React.FC<LegoTriggerProps> = ({
  onTriggerCreated,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [event, setEvent] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [action, setAction] = useState<string>('');

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

  const handleCreateTrigger = useCallback(() => {
    const triggerConfig: TriggerConfig = {
      event,
      condition,
      action,
      blocks,
    };
    onTriggerCreated(triggerConfig);
    setBlocks([]);
    setEvent('');
    setCondition('');
    setAction('');
  }, [event, condition, action, blocks, onTriggerCreated]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Trigger Creator</h2>
      <Input
        placeholder="Event (e.g. 'button_click', 'data_received')"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Condition (e.g. 'data.value > 10')"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        className="mb-2"
        rows={2}
      />
      <Textarea
        placeholder="Action (e.g. 'sendNotification()', 'updateDatabase()')"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="mb-2"
        rows={2}
      />
      <div
        ref={dropRef}
        className={`min-h-[100px] border-dashed border-2 p-4 mb-4 ${
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
            Drag and drop Lego blocks here to add to the trigger
          </p>
        )}
      </div>
      <Button
        onClick={handleCreateTrigger}
        disabled={!event || !condition || !action}
      >
        Create Trigger
      </Button>
    </div>
  );
};
