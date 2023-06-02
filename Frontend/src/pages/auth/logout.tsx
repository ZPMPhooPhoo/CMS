import { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/logout", {
        method: 'POST',
      });
      if (response) {
        clearLocalStorage();

        window.location.href = "/login"
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  }
  return null
}


