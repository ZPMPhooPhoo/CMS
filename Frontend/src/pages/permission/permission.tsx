import React, { useState } from "react";
import importImg from '../../image/logo.png';
import { Button  } from '../../components/button.component';
import { Input } from '../../components/input.component';
import { Label } from '../../components/label.component';
import { List } from "../../components/list.component";

export const PermissionForm: React.FC  = () => {
  const [permissionname, setpermissionName] = useState<string>("");

  const handleCreaterow = (e: React.FormEvent) => {
    e.preventDefault();
  }
    return (
    <div className="register">
        <div className="registerBox">
            <div className="registerHeader">
                <img src={importImg} alt="logo" className="resize" />
            </div>
            
            <Label htmlFor="permissionname" text="Permission Name" />
            <Input onChange={(e) => setpermissionName(e.target.value)} type="text" value={permissionname} name="permissionname" placeholder="Enter Permission Name" id={""} />

            <Button type="submit" text="Create" onClick={handleCreaterow} className="button"/>

            <div className="permissionlist">
                <ol className="ul_perlist">
                    <List name="hello"/>
                    <List name="hello"/>
                    <List name="hello"/>
                </ol>
            </div>
        </div>
    </div>
    )
}
