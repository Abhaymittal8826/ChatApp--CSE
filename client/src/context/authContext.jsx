import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// Backend base URL
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

// Create context
export const authContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [socket, setSocket] = useState(null);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) return;

      const { data } = await axios.get("/api/auth/check", {
        headers: {
          token: storedToken,
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
        axios.defaults.headers.common["token"] = storedToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Login / Signup function
  const login = async (state, credentials) => {
    try {
      const response = await axios.post(`/api/auth/${state}`, credentials);
      const data = response.data;

      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);

        axios.defaults.headers.common["token"] = data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    delete axios.defaults.headers.common["token"];
    delete axios.defaults.headers.common["Authorization"];
    if (socket) socket.disconnect();
    toast.success("Logged out successfully");
  };

  // Update profile
  const updateProfile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
      
      
  const connectSocket = (user) => {
    if (!user || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: { userId: user._id },
    });

    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  // Run checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Provide context
  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
