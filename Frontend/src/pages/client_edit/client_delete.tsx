import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";

const ClientDelete = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const deleteCustomer = async () => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }),navigate("/client-lists");
        // Handle successful deletion, e.g., update state or fetch updated data
      } catch (error) {
        console.log(error);
        // Handle the error, e.g., show an error message
      }
    };

    deleteCustomer();
  }, [customerId, token]);

  return <></>; // Empty fragment, as this component doesn't render anything
};

export default ClientDelete;