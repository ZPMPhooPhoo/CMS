import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../components/button.component";
import { Input } from "../../components/input.component";
import { Link } from "react-router-dom";


export const CategoryCreateContent: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCategoryCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors({});
    setLoading(true);

    // Perform validation
    let validationErrors: any = {};
    if (category.trim() === "") {
      validationErrors.name = "Category is required *";
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");

  axios
    .post("http://127.0.0.1:8000/api/categories", {
      category
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      navigate("/category-list");
    })
    .catch((error) => {
      console.log(error.response.data);
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <div className="register add-middle">
        <div className="main_client_create">
          <h1>ADD A CATEGORY</h1>
          <div className="form-wrap">
            <form onSubmit={handleCategoryCreate}>
              <div className="client_phoneNO">
                <div className="client_phone_parent">
                  <Input
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    type="text"
                    value={category}
                    placeholder="Enter Category"
                  />
                  <p className="error-message">{errors.category && errors.category }</p>
                </div>
                
              </div>
              <div className="allbtn">
                <Button type="submit" className="button" text={isLoading ? "Loading..." : "ADD"}
                disabled={isLoading} />
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