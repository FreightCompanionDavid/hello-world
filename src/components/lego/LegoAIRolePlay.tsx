import React, { useState } from 'react';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface LegoAIRolePlayProps {
  onConnect: (connection: {
    x: LegoBlockItem;
    y: LegoBlockItem;
    relation: string;
    description: string;
  }) => void;
}

export const LegoAIRolePlay: React.FC<LegoAIRolePlayProps> = ({
  onConnect,
}) => {
  const [xBlock, setXBlock] = useState<LegoBlockItem | null>(null);
  const [yBlock, setYBlock] = useState<LegoBlockItem | null>(null);
  const [relation, setRelation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleDrop = (item: LegoBlockItem, target: 'x' | 'y') => {
    if (target === 'x') {
      setXBlock(item);
    } else {
      setYBlock(item);
    }
  };

  const handleConnect = () => {
    if (xBlock && yBlock && relation) {
      onConnect({ x: xBlock, y: yBlock, relation, description });
      setXBlock(null);
      setYBlock(null);
      setRelation('');
      setDescription('');
    }
  };

  const relationOptions = [
    'Depends on',
    'Extends',
    'Implements',
    'Communicates with',
    'Transforms',
    'Other',
  ];

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Lego AI Role Play Connector
      </h2>
      <div className="flex space-x-4 mb-4">
        <div
          className="flex-1 min-h-[100px] border-dashed border-2 p-2"
          onDrop={(e) => {
            e.preventDefault();
            const item = JSON.parse(e.dataTransfer.getData('application/json'));
            handleDrop(item, 'x');
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3 className="text-lg font-medium mb-2">X Block</h3>
          {xBlock ? (
            <div>{xBlock.type} Block</div>
          ) : (
            <p className="text-gray-400">Drag and drop X block here</p>
          )}
        </div>
        <div
          className="flex-1 min-h-[100px] border-dashed border-2 p-2"
          onDrop={(e) => {
            e.preventDefault();
            const item = JSON.parse(e.dataTransfer.getData('application/json'));
            handleDrop(item, 'y');
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3 className="text-lg font-medium mb-2">Y Block</h3>
          {yBlock ? (
            <div>{yBlock.type} Block</div>
          ) : (
            <p className="text-gray-400">Drag and drop Y block here</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <Select value={relation} onValueChange={(value) => setRelation(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Relation" />
          </SelectTrigger>
          <SelectContent>
            {relationOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Describe the relationship (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full"
        />
      </div>
      <Button
        onClick={handleConnect}
        disabled={!xBlock || !yBlock || !relation}
      >
        Connect X and Y
      </Button>
      <p className="mt-4 text-sm text-gray-600">
        This AI Role Play Connector allows you to define relationships between
        Lego blocks, simulating various architectural and design patterns in
        your application.
      </p>
    </div>
  );
};
