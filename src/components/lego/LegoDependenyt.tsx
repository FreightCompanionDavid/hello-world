import React, { useState, useRef, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { LegoBlock } from './LegoBlock';
import { LegoBlockItem } from './types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LegoDependenytProps {
  onDependencyCreated: (
    dependency: LegoBlockItem,
    dependents: LegoBlockItem[],
  ) => void;
}

export const LegoDependenyt: React.FC<LegoDependenytProps> = ({
  onDependencyCreated,
}) => {
  const [dependency, setDependency] = useState<LegoBlockItem | null>(null);
  const [dependents, setDependents] = useState<LegoBlockItem[]>([]);

  const dropRefDependency = useRef<HTMLDivElement>(null);
  const dropRefDependents = useRef<HTMLDivElement>(null);

  const [{ isOverDependency }, dropDependency] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setDependency(item);
    },
    collect: (monitor) => ({
      isOverDependency: !!monitor.isOver(),
    }),
  }));

  const [{ isOverDependents }, dropDependents] = useDrop(() => ({
    accept: 'LEGO_BLOCK',
    drop: (item: LegoBlockItem) => {
      setDependents((prevDependents) => [...prevDependents, item]);
    },
    collect: (monitor) => ({
      isOverDependents: !!monitor.isOver(),
    }),
  }));

  dropDependency(dropRefDependency);
  dropDependents(dropRefDependents);

  const handleCreateDependency = useCallback(() => {
    if (dependency && dependents.length > 0) {
      onDependencyCreated(dependency, dependents);
      setDependency(null);
      setDependents([]);
    }
  }, [dependency, dependents, onDependencyCreated]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lego Dependenyt</h2>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Dependency</h3>
        <div
          ref={dropRefDependency}
          className={`min-h-[100px] border-dashed border-2 p-4 ${
            isOverDependency ? 'bg-blue-100' : ''
          }`}
        >
          {dependency ? (
            <LegoBlock
              id={dependency.id}
              type={dependency.type}
              content={`${dependency.type} Block (Dependency)`}
              onBlockCreated={() => {}}
            />
          ) : (
            <p className="text-gray-400">
              Drag and drop a Lego block here to set as dependency
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Dependents</h3>
        <div
          ref={dropRefDependents}
          className={`min-h-[200px] border-dashed border-2 p-4 ${
            isOverDependents ? 'bg-yellow-100' : ''
          }`}
        >
          {dependents.map((block, index) => (
            <LegoBlock
              key={`${block.id}-${index}`}
              id={block.id}
              type={block.type}
              content={`${block.type} Block ${index + 1} (Dependent)`}
              onBlockCreated={() => {}}
            />
          ))}
          {dependents.length === 0 && (
            <p className="text-gray-400">
              Drag and drop Lego blocks here to add dependents
            </p>
          )}
        </div>
      </div>
      <Button
        onClick={handleCreateDependency}
        disabled={!dependency || dependents.length === 0}
      >
        Create Dependency
      </Button>
    </div>
  );
};
