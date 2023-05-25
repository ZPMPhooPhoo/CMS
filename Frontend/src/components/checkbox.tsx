import React, { useState } from "react";

interface CheckboxProps {
    className:string;
  label: string;
  name:string
  checked:boolean;
  onChange: (checked: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({label,checked,name,className, onChange }) => {
  // const [checked, setChecked] = useState<boolean>(false);
  const handleChange = () => {
    const newChecked = !checked;
    onChange(newChecked);
  };
  // const handleChange = () => {
  //   const newChecked = !checked;
  //   setChecked(newChecked);
  //   onChange(newChecked);
  // };

  return (
    <div>
      <label>
        <input type="checkbox" name={name} checked={checked} onChange={handleChange} />
        {label}
      </label>
    </div>
  );
};

// export default Checkbox;
