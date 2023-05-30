import React, { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";

export const CategoryEditContent: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { categoryId } = useParams();

  useEffect(() => {
    // Fetch customer data from the server using axios
    axios
      .get(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // Update the state variables with the retrieved data
        
        // console.log(response.data.name);
        const { category } = response.data.data;
        setCategory(category);
        console.log(category);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [categoryId, token]);

  const handleCategoryUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    let validationErrors: any = {};
    if (category.trim() === "") {
      validationErrors.name = "Category is required *";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .patch(
        `http://127.0.0.1:8000/api/categories/${categoryId}`,
        {
          category
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/category-list");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>EDIT CATEGORY</h1>
          <div className="form-wrap">
            <form onSubmit={handleCategoryUpdate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    type="text"
                    value={category}
                    placeholder="Enter Category Name"
                  />
                  <p className="error-message">{errors.category && errors.category }</p>
                </div>
              </div>
              <div className="allbtn">
                <Button type="submit" className="button" text="Update" />
                <Link to={`/category-list`}>
                  <Button type="button" className="button" text="BACK"
                  />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
