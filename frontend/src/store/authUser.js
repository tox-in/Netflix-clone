import axios from 'axios';
import toast from 'react-hot-toast';
import { create, get } from 'zustand';


export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,

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
            // No need to set Authorization header, cookies are handled automatically
            set({ user: response.data.user, isSigningUp: false });
            toast.success("An account was created successfully");
            await get().authCheck(); // Refresh user state after signup
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            set({ isSigningUp: false, user: null });
        }
    },
    

    login: async () => {
        // Implement login functionality here if needed
    },

    logout: async () => {
        // Implement logout functionality here if needed
        // Clear the JWT cookie
        document.cookie = 'jwt-netflix=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        set({ user: null });
    },
}));
