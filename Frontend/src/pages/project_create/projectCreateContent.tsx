import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { SelectBox } from "../../components/selectbox.component";
import { Checkbox } from "../../components/checkbox.component";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  category: string;
}
interface User {
  id: number;
  name: string;
  isChecked: boolean;
}


export const ProjectCreateContent: React.FC = () => {

  const location = useLocation();
  const searchID = new URLSearchParams(location.search);
  const id = searchID.get("id");
  let num_id = 0;
  if (id != null) {
    num_id = parseInt(id);
  } else {
    num_id = 0;
  }
  const [errors, setErrors] = useState<any>({});
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [maintenance_active, setMaintenance] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [categories_options, setCategoriesOptions] = useState<Category[]>([]);
  const [category_id, setCategory] = useState<number | undefined>(undefined);
  const [users, setUsers] = useState<number[]>([num_id]);
  const [users_option, setUserOption] = useState<User[]>([]);
  const token = localStorage.getItem('token');
  const status_options = ['Complete', 'Progress', 'Cancel'];



  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchCategoriesData();
    }
  }, []);

  const fetchCategoriesData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      const mappedOptions: Category[] = data.map((item: any) => ({
        id: item.id,
        category: item.category,
      }));

      setCategoriesOptions(mappedOptions);
    } catch (error: any) {
      console.log(error.message + " Error");
    }
  };

  useEffect(() => {
    if (token) {
      fetchDevelopersData();
    }
  }, []);

  const fetchDevelopersData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/developers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserOption(response.data.data);
    } catch (error: any) {
      console.log(error.message + " Error");
    }
  };

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


  const handleProjectCreate = (e: React.FormEvent) => {
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
    if (!category_id) {
      validationErrors.category = "Category is required *";
    }


    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");

    axios.post("http://127.0.0.1:8000/api/projects", {
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
    }).then((response) => {
      console.log(response.data);
      navigate(`/client-project-lists?id=${id}`);
    })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  // console.log(status)
  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A PROJECT</h1>
          <div className="form-wrap">
            <form onSubmit={handleProjectCreate}>
              <div className="box">
                <div className="left">
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <Input
                        onChange={(e) => setTitle(e.target.value)}
                        name="title"
                        type="text"
                        value={title}
                        placeholder="Enter Title"
                      />
                      <p className="error-message">{errors.title && errors.title}</p>
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
                      <p className="error-message">{errors.description && errors.description}</p>
                    </div>
                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <select name="status" id="" className="selectbox"
                        onChange={(event) => {
                          setStatus(status_options[event.target.selectedIndex - 1]);
                        }}
                      >
                        <option value="__default">Choose Status</option>
                        {status_options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <p className="error-message">{errors.status && errors.status}</p>
                    </div>

                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <select name="catogory_id" id="" className="selectbox"
                        onChange={(event) => {
                          if (categories_options[event.target.selectedIndex - 1]) {
                            setCategory(categories_options[event.target.selectedIndex - 1].id);
                          } else {
                            setCategory(undefined);
                          }

                        }}
                      >
                        <option value="__default">Choose Category</option>
                        {categories_options.map((option, index) => (
                          <option key={index} value={option.category}>
                            {option.category}
                          </option>
                        ))}
                      </select>
                      <p className="error-message">{errors.category && errors.category}</p>
                    </div>

                  </div>
                  <div className="client_phoneNO">
                    <div className="client_phone_parent">
                      <Checkbox label="Under Maintenance?" className="maintenence" name="maintenance_active" onChange={(checked: boolean) => {
                        setIsChecked(!isChecked);
                        setMaintenance(isChecked);
                      }} />
                    </div>

                  </div>
                </div>
                <div className="right">
                  <div className="client_phoneNO">
                    <div className="client_phone_parent" style={{ height: "100px", overflowY: "scroll", display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                      <label> Please select assigned developers. </label>

                      {
                        users_option.map((item: any) => {
                          return (
                            <div key={item.id} style={{ padding: "15px" }}>
                              <input type="checkbox" name="users" id={item.name} onChange={() => handleDevChange(item.id)} />
                              <label htmlFor={item.name}>{item.name}</label>
                            </div>
                          )
                        })
                      }

                      <p className="error-message">{errors.address && errors.address}</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className="allbtn">
                <Button type="submit" className="button" text="ADD" />
                <Link to={`/client-project-lists?id=${id}`}>
                  <Button type="button" className="button" text="BACK" />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
