import React, { useState } from 'react';

interface SelectBoxProps {
  options: string[];
  name:string;
  onChange: (selectedOption: string, selectedIndex: number) => void;
}

export const SelectBox: React.FC<SelectBoxProps> = ({name, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = event.target.selectedIndex;
    const option = options[index];
    setSelectedOption(option);
    setSelectedIndex(index);
    onChange(option, index);
  };

  return (
    <select name={name} className="selectbox" value={selectedOption} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};