import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoNotificationProps {
  onNotificationCreated: (notification: {
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }) => void;
}

export const LegoNotification: React.FC<LegoNotificationProps> = ({
  onNotificationCreated,
}) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>(
    'info',
  );

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

  const handleCreateNotification = useCallback(() => {
    onNotificationCreated({ title, message, type });
    setBlocks([]);
    setTitle('');
    setMessage('');
    setType('info');
  }, [title, message, type, onNotificationCreated]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Notification Creator</h2>
      <Input
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <Textarea
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="mb-2"
        rows={3}
      />
      <label htmlFor="notificationType" className="sr-only">
        Notification Type
      </label>
      <select
        id="notificationType"
        value={type}
        onChange={(e) =>
          setType(e.target.value as 'info' | 'success' | 'warning' | 'error')
        }
        className="mb-2 p-2 border rounded w-full"
      >
        <option value="info">Info</option>
        <option value="success">Success</option>
        <option value="warning">Warning</option>
        <option value="error">Error</option>
      </select>
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
            Drag and drop Lego blocks here to add context to your notification
          </p>
        )}
      </div>
      <Button onClick={handleCreateNotification} disabled={!title || !message}>
        Create Notification
      </Button>
    </div>
  );
};
