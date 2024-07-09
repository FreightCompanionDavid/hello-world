import React from 'react';
import { cn } from '@/lib/utils';

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ className, width = 'auto', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-shrink-0', className)}
        style={{ width }}
        {...props}
      />
    );
  },
);

Column.displayName = 'Column';

export { Column };
