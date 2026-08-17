import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../store/slices/authSlice";
import { logoutUser } from "../service/authService";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout API Error:", error);
    } finally {
      // Clear authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear Redux authentication state
      dispatch(logout());

      // Go to login
      navigate("/login", { replace: true });
    }
  };

  return handleLogout;
};