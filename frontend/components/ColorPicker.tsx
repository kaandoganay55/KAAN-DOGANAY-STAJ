import React from 'react';
import { GoldColor } from '../types';

interface ColorPickerProps {
  selectedColor: GoldColor;
  onColorChange: (color: GoldColor) => void;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  className = '',
}) => {
  const colors: { value: GoldColor; label: string; bgClass: string }[] = [
    { value: 'yellow', label: 'Yellow Gold', bgClass: 'bg-[#F6ECA9]' },
    { value: 'rose', label: 'Rose Gold', bgClass: 'bg-[#E1A69F]' },
    { value: 'white', label: 'White Gold', bgClass: 'bg-[#D9D9D9]' },
  ];

  return (
    <div className={`flex gap-1.5 ${className}`}>
      {colors.map(({ value, label, bgClass }) => (
        <button
          key={value}
          onClick={() => onColorChange(value)}
          className={`
            w-4 h-4 rounded-full ${bgClass}
            border transition-all
            ${selectedColor === value ? 'border-gray-400 ring-1 ring-gray-400' : 'border-gray-200'}
          `}
          title={label}
          aria-label={label}
          aria-pressed={selectedColor === value}
        />
      ))}
    </div>
  );
};

export default ColorPicker; 