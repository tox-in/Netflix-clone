import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isLoggingOut: false,

    signup: async (credentials) => {
        set({ isSigningUp: true });
        
        try {
            const response = await axios.post("https://flexflix.onrender.com/api/v1/auth/signup", credentials, { withCredentials: true });
            set({ user: response.data.user, isSigningUp: false });
            toast.success("An account was created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
            set({ isSigningUp: false, user: null });
        }
    },
    

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await axios.post("https://flexflix.onrender.com/api/v1/auth/login", credentials, { withCredentials: true });
            console.log("response", response);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Logged In successfully");
        } catch (error) {
            console.error("Login error:", error.response);
            toast.error(error.response?.data?.message || "Login failed");
            set({ isLoggingIn: false, user: null });
            }
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
          await axios.post("https://flexflix.onrender.com/api/v1/auth/logout", {}, { withCredentials: true });
          console.log("logged out");
          set({ user: null, isLoggingOut: false });
          toast.success("Logged out successfully");
        } catch (error) {
          set({ isLoggingOut: false });
          toast.error(error.response?.data?.message || "Logout failed");
        }
     },
     


    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("https://flexflix.onrender.com/api/v1/auth/authCheck", { withCredentials: true });
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },
}));
