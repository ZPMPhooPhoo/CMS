import React, { useState } from "react";

interface CheckboxProps {
    className:string;
//   label: string;
  name:string
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({name,className, onChange }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange(newChecked);
  };

  return (
    <div>
      <label>
        <input type="checkbox"name={name} className={className} checked={checked} onChange={handleChange} />
      </label>
    </div>
  );
};

// export default Checkbox;
