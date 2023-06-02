import { useEffect } from "react";
<<<<<<< HEAD
import axios from "axios";

=======
>>>>>>> 4d6eac444645a90ec635f86d171e27625f352265

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


