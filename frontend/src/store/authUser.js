import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,

    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("http://localhost:5020/api/v1/auth/authCheck", { withCredentials: true });
            set({ user: response.data.user, isCheckingAuth: false });
        } catch (error) {
            set({ isCheckingAuth: false, user: null });
        }
    },

    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post("http://localhost:5020/api/v1/auth/signup", credentials, { withCredentials: true });
            set({ user: response.data.user, isSigningUp: false });
            toast.success("An account was created successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ isSigningUp: false, user: null });
        }
    },
    

    login: async () => {
    
    },

    logout: async () => {
        set({ isLoggingOut: true });
        try {
          await axios.post("http://localhost:5020/api/v1/auth/logout");
          document.cookie =
            "jwt-netflix=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          set({ user: null, isLoggingOut: false });
          toast.success("Logged out successfully");
        } catch (error) {
          set({ isLoggingOut: false });
          toast.error(error.response.data.message || "Logout failed");
        }
    },
}));
