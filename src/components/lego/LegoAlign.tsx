import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { FC, useState } from 'react';
import { LegoBlock } from './LegoBlock';

interface LegoBlockProps {
  alignment: string;
  // ... other properties
}

interface LegoAlignProps {
  block: LegoBlockProps;
  onBlockChange: (block: LegoBlockProps) => void;
}

const LegoAlign: FC<LegoAlignProps> = ({ block, onBlockChange }) => {
  const [alignment, setAlignment] = useState(block.alignment);

  const handleAlignmentChange = (value: string) => {
    setAlignment(value);
    onBlockChange({ ...block, alignment: value });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Alignment:</span>
      <div className="mb-4">
        <Select value={alignment} onValueChange={handleAlignmentChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="justify">Justify</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { LegoAlign };
