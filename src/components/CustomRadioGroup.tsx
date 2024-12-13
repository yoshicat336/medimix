import React from 'react';

interface CustomRadioGroupProps {
  options: { value: string; label: string }[];
  name: string;
  onChange?: (value: string) => void;
}

const CustomRadioGroup = ({ options, name, onChange }: CustomRadioGroupProps) => {
  return (
    <div className="radiogroup">
      {options.map((option) => (
        <div key={option.value} className="wrapper">
          <input
            value={option.value}
            id={option.value}
            name={name}
            type="radio"
            className="state"
            onChange={(e) => onChange?.(e.target.value)}
          />
          <label htmlFor={option.value} className="label">
            <div className="indicator"></div>
            <span className="text">{option.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default CustomRadioGroup;