import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

        }), navigate("/client-lists");
      } catch (error) {
        console.log(error);
      }
    };

    deleteCustomer();
  }, [customerId, token]);

  return <></>;
};

export default ClientDelete;