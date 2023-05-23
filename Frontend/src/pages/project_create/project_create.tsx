import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input";
import { SelectBox } from "../../components/selectbox";
import { Checkbox } from "../../components/checkbox";

interface Category {
  id: number;
  category: string;
}


export const ProjectCreateContent: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [contact_person, setContactPerson] = useState<string>("");
  const [position, setClientPosition] = useState<string>("");
  const [role_id, setRoleId] = useState<number>(5);
  const [password, setPassword] = useState<string>("0000000000");
  const [errors, setErrors] = useState<any>({});

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [maintenance_active, setMaintenance] = useState<boolean>();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [categories_options, setCategoriesOptions] = useState<Category[]>([]);
  
  const [category_id, setCategory] = useState<number>();
  const [users, setUsers] = useState<[]>([]);
  


  const token = localStorage.getItem('token');
  const status_options = ['Complete' , 'Progress' , 'Cancel'];

  

  const navigate = useNavigate();
  
  useEffect(() => {
  
    if (token) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategoriesOptions(response.data.data);
    } catch (error: any) {
      console.log(error.message + "Error");
    }
  };

  // console.log(categories[0].category);

  const handleClientCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Perform validation
    let validationErrors: any = {};
    if (title.trim() === "") {
      validationErrors.title = "Title is required *";
    }
    if (description.trim() === "") {
      validationErrors.description = "Description is required *";
    }
    if (status.trim() === "") {
      validationErrors.status = "Status is required *";
    }
    if (contact_person.trim() === "") {
      validationErrors.contactPerson = "Customer position is required *";
    }
    if (position.trim() === "") {
      validationErrors.clientPosition = "Customer position is required *";
    }
    
    

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
      

   

  
  };
  const handleCategoryChange = (selectedCategory: string, selectedIndex: number) => {
    setCategory(categories_options[selectedIndex].id);
  };

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A PROJECT</h1>
          <div className="form-wrap">
            <form onSubmit={handleClientCreate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                    type="text"
                    value={title}
                    placeholder="Enter Title"
                  />
                  <p className="error-message">{errors.title && errors.title }</p>
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    type="text"
                    value={description}
                    placeholder="Enter Description"
                  />
                   <p className="error-message">{errors.description && errors.description }</p>
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <SelectBox  name="status" options={status_options} onChange={(selectedOption:string)=> setStatus(selectedOption) }  />
                  <p className="error-message">{errors.status && errors.status }</p>
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <SelectBox
                name="category_id"
                options= {categories_options.map((item) => item.category)}
                onChange={handleCategoryChange}
                />
                   <p className="error-message">{errors.contactPerson && errors.contactPerson }</p>
                </div>
               
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
 
                  <Checkbox label="Under Maintenance?" className="maintenence" name="maintenance_active" onChange={(checked: boolean) => setIsChecked(checked)} />

                  <p className="error-message">{errors.address && errors.address }</p>
                </div>
                
              </div>
              
              <Button type="submit" className="button" text="ADD" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
