import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      role_id: number;
      permission_id: number;
    };
  }
export const RoleEditContent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [rolePermissions, setRolePermissions] = useState<number[]>([]);
  const [errors, setErrors] = useState<any>({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { roleId } = useParams();
useEffect(() => {
    
    axios
      .get(`http://127.0.0.1:8000/api/roles/${roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Update the state variables with the retrieved data
        
        // console.log(response.data.name);
         const { name } = response.data.data.role;
         setName(name);
        //console.log(name);
        
        const extractedPermissions = response.data.data.permissions;
        setPermissions(extractedPermissions);
        console.log(extractedPermissions);

        const rolePermissionsData = response.data.data.rolePermissions;
        setRolePermissions(rolePermissionsData);
        console.log(rolePermissionsData);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [roleId, token]);


  const handlePermissionChange = (permissionId: number) => {
    setRolePermissions((prevPermissions) => {
      if (prevPermissions.includes(permissionId)) {
        // Permission is currently selected, remove it from the list
        return prevPermissions.filter((id) => id !== permissionId);
      } else {
        // Permission is not selected, add it to the list
        return [...prevPermissions, permissionId];
      }
    });
  };

  const handleClientUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let validationErrors: any = {};
    if (name.trim() === "") {
      validationErrors.name = "Name is required *";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .patch(
        `http://127.0.0.1:8000/api/roles/${roleId}`,
        {
          name,
          permissions: rolePermissions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/role-list");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>EDIT ROLE</h1>
          <div className="form-wrap">
            <form onSubmit={handleClientUpdate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    id="client_name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Enter Role Name"
                  />
                  <p className="error-message">{errors.name && errors.name }</p>
                </div>
                
              </div>
              

            <div className="client_phoneNO">
                <div className="client_phone_parent"  style={{ height: "100px", overflowY: "scroll"  , display: 'flex', alignItems: 'center' , flexDirection: 'row'}}>
                <label> Please select assigned developers. </label>
 
                  {
                  

                  permissions.map((item: Permission) => {
                    const isChecked = rolePermissions.includes(item.id);
                  
                    return (
                      <div key={item.id} style={{ padding: "15px" }}>
                        <input
                          type="checkbox"
                          name="permissions"
                          id={item.name}
                          checked={isChecked}
                          onChange={() => handlePermissionChange(item.id)}
                        />
                        <label htmlFor={item.name}>{item.name}</label>
                      </div>
                    );
                  })
                  
                  }

                  <p className="error-message">{errors.address && errors.address }</p>
                </div>
                
              </div>
              <Button type="submit" className="button" text="Update" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
