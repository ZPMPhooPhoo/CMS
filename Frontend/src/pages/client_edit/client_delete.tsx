import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const ClientDelete = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [errMsg, setErrMsg] = useState<string>('');
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
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          const apiErrorMessage = error.response.data.message;
          setErrMsg(apiErrorMessage);
        } else {
          setErrMsg('An error has occurred during the API request.');
        }
      }
    };

    deleteCustomer();
  }, [customerId, token]);
  return (
    <>
    </>
  );
};