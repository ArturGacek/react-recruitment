import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';
import { useActionData } from 'react-router-dom';

interface SliderProps {
  min: number;
  max: number;
  label: string;
}

const Slider: React.FC<SliderProps> = ({ min, max, label }) => {
  const [value, setValue] = useState(min);
  const [isTooltipVisible, setTooltipVisibility] = useState(false);
  const actionData = useActionData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  useEffect(() => {
    if (actionData && actionData === 'Success') {
      setValue(min);
    }
  }, [actionData, min]);

  const handleMouseEnter = () => {
    setTooltipVisibility(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisibility(false);
  };

  return (
    <div className="mb-8">
      <label htmlFor="slider" className="block mb-4">
        {label}
      </label>
      <div className="relative w-full">
        <div className="relative w-full">
          <span className="absolute left-1 top-[-0.75rem] text-xs">{min}</span>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            className="slider w-full h-1 bg-primary-light rounded outline-none opacity-70 transition-opacity duration-200 cursor-pointer hover:opacity-100"
            name="age"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <span className="absolute right-0 top-[-0.75rem] text-xs">{max}</span>
          <Tooltip
            value={value}
            min={min}
            max={max}
            isVisible={isTooltipVisible}
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
