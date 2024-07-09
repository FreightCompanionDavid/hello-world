import { ReactNode } from 'react';

export interface LegoBlockItem {
  name: ReactNode;
  id: string;
  type: string;
  content: string;
}

export interface ComponentTemplate {
  id: string;
  name: string;
  type: string;
  category: string;
  template: string;
}
export interface LegoBlock {
  id: string;
  type: string;
  content: string;
}

export interface APILegoAdapterProps {
  swaggerUrl: string;
  onBlockCreated: (block: LegoBlockItem) => void;
}

export interface LegoToGoProps {
  onExport: (blocks: LegoBlock[]) => void;
}
export interface LegoBlockProps {
  id: string;
  type: string;
  content: string;
  onBlockCreated: () => void;
}
