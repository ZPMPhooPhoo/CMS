import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryDelete = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const deleteCategory = async () => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        }), navigate("/services");
      } catch (error) {
        console.log(error);
      }
    };

    deleteCategory();
  }, [categoryId, token]);

  return <></>;
};

export default CategoryDelete;