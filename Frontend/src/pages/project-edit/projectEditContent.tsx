import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { Input } from "../../components/input.component";
import { Checkbox } from "../../components/checkbox";
import { Button } from "../../components/button.component";


interface Categories {
    id: number;
    category: string;
  }

  interface Developer {
    id: number;
    name: string;
    isChecked: boolean;
  }


export const ProjectEditContent: React.FC = () => {


     // const [isCheckeddev ,setIsCheckeddev] =useState<any>();
    const [title ,setTitle] =useState<string>("");
    const [description ,setDescription] =useState<string>("");
    const [status,setStatus] =useState<any>();
    const [category_id, setCategory_id] = useState<number | undefined>(undefined);
    const [isChecked ,setIsChecked] =useState<boolean>(false);
    const [devCheck ,setDevCheck] =useState<boolean>(true);
    const [maintenance_active, setMaintenance] = useState<boolean>();
    const [developers,setDevelopers] =useState<Developer[]>([]);
    const [categories ,setCategories] = useState<Categories[]>([]);
    // const [maintainprj,setMaintainprj]=useState<any>();
    const [prjCate,setPrjCate] =useState<any>();
    const status_options = ['Complete' , 'Progress' , 'Cancel'];
    const token =localStorage.getItem("token");
    const [projectData ,setProjectData] =useState<any>();
    const [category, setCategory] = useState<number | undefined>(undefined);
    const [devPrj ,setDevPrj]  =useState<any>();
     const {id} = useParams();
     const [error,setErrors]=useState<any>();
     const idprj = {id};
          let num_id = 0;
          if(id != null){
            num_id = parseInt(id);
          }else{
            num_id = 0;
          }
     const [users, setUsers] = useState<number[]>([num_id]);
    // console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse,categoriesResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/projects/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://127.0.0.1:8000/api/categories", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        const projects = (projectResponse.data.data);
        console.log(projectResponse.data.data);
        const categorydata = categoriesResponse.data.data;
        const mappedOptions: Categories[] = categorydata.map((item: any) => ({
          id: item.id,
          category: item.category,
        }));

        setTitle(projects.title);
        // console.log(projects.title);
        setDescription(projects.description);
        setStatus(projects.status);
        setCategories(mappedOptions);
        // setMaintainprj(projects.maintenance_active);
        setIsChecked(projects.maintenance_active ==1 ? true: false);
       

        const prjCategory = mappedOptions.find((option) => option.id == projects.category_id);
        if (prjCategory) {
          setPrjCate(prjCategory.category);
        }      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, token]);

  // console.log(isChecked);
  // console.log(prjCate);
  // console.log(maintainprj);
  

  useEffect(() => {
    const fetchDevelopersData = async () => {
        try {
          const [developerresponse ,devprjresponse] = await Promise.all([
            axios.get(`http://127.0.0.1:8000/api/developers`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get(`http://127.0.0.1:8000/api/developerproject/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
          setDevelopers(developerresponse.data.data);
          setDevPrj(devprjresponse.data.data);
          const mappedDev: Developer[] = developerresponse.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
          console.log(mappedDev);
          const mappedDevwithprj: Developer[] = devprjresponse.data.data.map((item: any) => ({
                      id: item.role_id,
                      name: item.name,
                    }));
                    console.log(mappedDevwithprj);

                    // const devWithPrj = mappedDevwithprj.filter((item: any) =>
                    // mappedDev.some((data: any) => data.name === item.name)
                  // );
                  
                  
                  
          // console.log(devWithPrj);

        } catch (error: any) {
          console.log(error.message + " Error");
        }
      };
      fetchDevelopersData();
  }, [token]);


  const handleDevChange = (userId: number) => {
    const is_devchecked = users.includes(userId);
  
    if (is_devchecked) {
      // User is already in the array, remove it
      const updatedUsers = users.filter((user) => user !== userId);
      setUsers(updatedUsers);
    } else {
      // User is not in the array, add it
      const updatedUsers = [...users, userId];
      setUsers(updatedUsers);
    }
  };

  const handleProjectUpdate = (e: React.FormEvent) => {
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
        if (!status) {
          validationErrors.status = "Status is required *";
        }
        if(!category_id){
          validationErrors.category = "Category is required *";
        }
        
        
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
        
        const token = localStorage.getItem("token");

        axios.post(`http://127.0.0.1:8000/api/projects/${id}`, {
            title,
            description,
            status,
            category_id,
            maintenance_active,
            users,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })  .then((response) => {
          console.log(response.data);
          navigate(`/client-project-lists?id=${id}`);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
  };
  
  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A PROJECT</h1>
          <div className="form-wrap">
            <form onSubmit={handleProjectUpdate} >
             <div className="box">
             <div className="left">
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) =>setTitle(e.target.value)}
                    name="title"
                    type="text"
                    value={title}
                    placeholder="Enter Title"
                  />
                  {/* <p className="error-message">{errors.title && errors.title }</p> */}
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) =>setDescription(e.target.value)}
                    name="description"
                    type="text"
                    value={description}
                    placeholder="Enter Description" 
                  />
                   {/* <p className="error-message">{errors.description && errors.description }</p> */}
                </div>
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <select name="status" id="" className="selectbox"
                  onChange={(event)=>{
                    setStatus(status_options[event.target.selectedIndex-1]);
                  }}
                  >
                    <option value="__default"> {status}</option>
                    {status_options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {/* <p className="error-message">{errors.status && errors.status }</p> */}
                </div>
                
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <select name="catogory_id" id="" className="selectbox"
                  onChange={(event)=>{
                    // setCategory(categories_options[event.target.selectedIndex-1].id);
                    // if(!categories_options[event.target.selectedIndex-1]){
                    //   setCategory(categories_options[event.target.selectedIndex-1].id);
                    // }else{
                    //   setCategory(undefined);
                    // }
                    if(categories[event.target.selectedIndex]){
                      setCategory(categories[event.target.selectedIndex-1].id);
                      // console.log(categories_options[event.target.selectedIndex-1].id)
                    }else{
                      setCategory(undefined);
                      // console.log("Undefined")
                    }
                    
                  }}
                  >
                    <option value="__default">{prjCate}</option>
                    {categories.map((option, index) => (
                      <option key={index} value={option.category}>
                        {option.category}
                      </option> 
                     ))}
                  </select>
                   {/* <p className="error-message">{errors.category && errors.category }</p> */}
                </div>
               
              </div>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                <Checkbox
                  checked={isChecked}
                  label="Under Maintenance?"
                  className="maintenence"
                  name="maintenance_active"
                  onChange={(checked: boolean) => {
                    setIsChecked(!isChecked);
                    setMaintenance(isChecked);
                    }}
                />

                </div>
                
              </div>
              </div>
              <div className="right">
              <div className="client_phoneNO">
                <div className="client_phone_parent"  style={{ height: "100px", overflowY: "scroll"  , display: 'flex', alignItems: 'center' , flexDirection: 'row'}}>
                <label> Please select assigned developers. </label>
                  
                {
                  developers.map((item: any) => {
                    // const [isCheckeddev ,setIsCheckeddev] =useState<any>();
                    const matchedProject = devPrj.find((data: any) => data.name === item.name);
                    const isChecked = matchedProject ? true : false;

                    return (
                      <div key={item.id} style={{ padding: "15px" }}>
                        <input
                          checked={isChecked}
                          type="checkbox"
                          name="users"
                          id={item.name}
                          onChange={()=>handleDevChange(item.id)}
                          // onChange={(checked: boolean) => handleDevChange{isChecked}}
                        />
                        <label htmlFor={item.name}>{item.name}</label>
                      </div>
                    );
                  })
                }

               

                  {/* <p className="error-message">{errors.address && errors.address }</p> */}
                </div>
                
              </div>
              </div>
             </div>
              <div className="allbtn">
                  <Button type="submit" className="button" text="ADD" />
                  {/* <Link to={`/client-project-lists?id=${id}`}>
                    <Button type="button" className="button" text="BACK" />
                  </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )};
