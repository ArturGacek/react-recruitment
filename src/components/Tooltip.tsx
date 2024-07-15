import React from 'react';

interface TooltipProps {
  value: number;
  min: number;
  max: number;
  isVisible: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ value, min, max, isVisible }) => {
  const leftPosition = ((value - min) / (max - min)) * 96 + 2;

  return (
    <div
      className={`tooltip absolute w-9 h-6 top-8 bg-background-white text-primary border border-border-color p-1 rounded text-xs font-medium whitespace-nowrap transform -translate-x-1/2 transition-opacity duration-200 pointer-events-none text-center ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${leftPosition}%`,
      }}
    >
      {value}
    </div>
  );
};

export default Tooltip;
