import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role_id");
    window.location.reload();
    window.location.href = '/';

  }, []);

  return null;
};
