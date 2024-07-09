'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ComponentTemplate } from '@/lib/componentTemplates';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LegoCarouselProps {
  components: ComponentTemplate[];
}

export const LegoCarousel: React.FC<LegoCarouselProps> = ({ components }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === components.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? components.length - 1 : prevIndex - 1,
    );
  };

  if (components.length === 0) {
    return <div>No components to display</div>;
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            {components[currentIndex].name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {components[currentIndex].type}
          </p>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <code>{components[currentIndex].template}</code>
          </pre>
        </CardContent>
      </Card>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
