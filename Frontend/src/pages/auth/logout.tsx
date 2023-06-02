import { useEffect } from "react";

export const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role_id");
    window.location.reload();
    window.location.href = '/';

  }, []);

  return null;
};
