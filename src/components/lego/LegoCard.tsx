import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LegoBlockItem } from './types';

interface LegoCardProps {
  block: LegoBlockItem;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const LegoCard: React.FC<LegoCardProps> = ({
  block,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{block.type}</CardTitle>
        <CardDescription>ID: {block.id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{block.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {onEdit && (
          <Button variant="outline" onClick={onEdit}>
            Edit
          </Button>
        )}
        {onDelete && (
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
