import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import importImg from '../../image/logo.png';
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { Label } from "../../components/label.component";
import { SelectBox } from "../../components/selectbox.component";


export const CreateProject: React.FC  = () => {
  const [name, setName] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [confirm_password, setConfirmPassword] = useState<string>("");
  const [role_id, setRoleId] = useState<number>();
  const [dev_id,setDevId]=useState<number>();

  // const options = [
  //   { id: '1', name: 'Super Admin' },
  //   { id: '2', name: 'Admin' },
  //   { id: '3', name: 'Manager' },
  // ];
  const options = ['selectrole','game', 'website', 'blarggfgveef','dgrgr'];

  const handleSelectChange = (selectedOption: string, selectedIndex: number) => {
    console.log('Selected option:', selectedOption);
    console.log('Selected index:', selectedIndex);
    setRoleId(selectedIndex + 1);
  };

  const developerlist =['Select Developer','Mi YE' ,'KO KYAWT' ,'Ko ZIN' ,'A SAI'];
  const handleSelectChangedev =(selecteddev: string ,selecteddevIndex:number)=>{
    setDevId(selecteddevIndex +1);
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
  }
return (

  <div className="register">
      <div className="registerBox">
          <div className="registerHeader">
              <img src={importImg} alt="logo" className="resize" />
          </div>
          
          <Label htmlFor="project_name" text="Project_Name:" />
          <Input onChange={(e) => setName(e.target.value)} type="text" value={name} name="project_naem" placeholder="Project Name" id={""} />
          <Label htmlFor="prj_des" text="Project description:" />
          <Input onChange={(e) => setdescription(e.target.value)} name="description" type="text" value={description} placeholder="description" id={""} />
          
          <Label htmlFor="role" text="Role:" />
          <SelectBox name="categories" options={options} onChange={handleSelectChange} />
          <Label htmlFor="developer" text="Add developer" />
          <SelectBox name="developer_id" options={developerlist} onChange={handleSelectChangedev} />

          <Button type="submit" className="button" onClick={handleSignup} text="Register" />
      </div>
  </div>
)
}
