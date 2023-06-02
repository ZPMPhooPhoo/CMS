import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDelete = () => {
  const { userId } = useParams<{ userId: string }>();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const deleteUser = async () => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

        }), navigate("/users");
      } catch (error) {
        console.log(error);
      }
    };

    deleteUser();
  }, [userId, token]);

  return <></>;
};

export default UserDelete;