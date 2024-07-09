import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface LegoBookProps {
  onBookComplete: (
    blocks: LegoBlockItem[],
    title: string,
    content: string,
  ) => void;
}

export const LegoBook: React.FC<LegoBookProps> = ({ onBookComplete }) => {
  const [blocks, setBlocks] = useState<LegoBlockItem[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

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

  const handleBookComplete = useCallback(() => {
    onBookComplete(blocks, title, content);
    setBlocks([]);
    setTitle('');
    setContent('');
  }, [blocks, title, content, onBookComplete]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Book Creator</h2>
      <Input
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <Textarea
        placeholder="Book Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4"
        rows={6}
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
            Drag and drop Lego blocks here to add chapters to your book
          </p>
        )}
      </div>
      <Button
        onClick={handleBookComplete}
        disabled={blocks.length === 0 || !title || !content}
      >
        Complete Book
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        The Lego Book component allows you to create a book by combining Lego
        blocks as chapters. Add a title, content, and drag blocks to represent
        different parts of your book.
      </p>
    </div>
  );
};
