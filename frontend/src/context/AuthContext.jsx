
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import api from "../utils/axiosInstance";


const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {

    try {
      const res = await api.get("/auth/me");
      console.log(res.data.user)

      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);

      setUser(res.data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      console.log(res,res.data.user)

      setUser(res.data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Register failed",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        api,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);