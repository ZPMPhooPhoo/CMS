import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

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
          
        }),navigate("/services");
        // Handle successful deletion, e.g., update state or fetch updated data
      } catch (error) {
        console.log(error);
        // Handle the error, e.g., show an error message
      }
    };

    deleteCategory();
  }, [categoryId, token]);

  return <></>; // Empty fragment, as this component doesn't render anything
};

export default CategoryDelete;