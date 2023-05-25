import React, { useState } from "react";
import importImg from '../../image/logo.png';
import { Button } from "../../components/button.component";
import { Checkbox } from "../../components/checkbox.component";
import { Input } from "../../components/input.component";
import { Label } from "../../components/label.component";
import { List } from "../../components/list.component";



export const RoleForm: React.FC = () => {
  const [rowname, setrowName] = useState<string>("");
  const [checkbox, setCheckbox] = useState<{ id: number; label: string; checked: boolean }[]>([
    { id: 1, label: "Checkbox 1", checked: false },
    { id: 2, label: "Checkbox 2", checked: false },
    { id: 3, label: "Checkbox 3", checked: false },
  ]);

  const handleCreaterow = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCheckbox = (index: number) => {
    setCheckbox(prevCheckboxes => {
      const updatedCheckboxes = [...prevCheckboxes];
      updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
      return updatedCheckboxes;
    });
  };

  return (
    <div className="register">
      <div className="registerBox">
        <div className="registerHeader">
          <img src={importImg} alt="logo" className="resize" />
        </div>

        <Label htmlFor="name" text="Role Name" />
        <Input
          onChange={(e) => setrowName(e.target.value)}
          type="text"
          value={rowname}
          name="name"
          placeholder="Enter Role Name" id={""}        />

        <div className="permissionlist">
          <ul className="ul_perlist">
            <div className="permission_star">
              Permission <span className="text-danger">*</span>
            </div>
            <br />
            {checkbox.map((checkbox, index) => (
              <div className="main_ulist" key={checkbox.id}>
                <Checkbox
                  className="checkbox_ulist"
                  // checked={checkbox.checked}
                  name={`checkbox-${checkbox.id}`}
                  // label="checkbox"
                  onChange={() => handleCheckbox(index)}
                />
                <List name={checkbox.label} />
              </div>
            ))}
          </ul>
        </div>

        <Button type="submit" text="Create" onClick={handleCreaterow} className="button" />
      </div>
    </div>
  );
};

