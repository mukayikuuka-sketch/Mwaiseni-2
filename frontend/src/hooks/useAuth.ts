import { useState, useEffect } from "react";
import type { User } from "../types";
import { authAPI } from "../api/auth";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const userData = await authAPI.getCurrentUser();
            setUser(userData);
        } catch (error) {
            console.error("Auth check failed:", error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const result = await authAPI.login({ email, password });
            const userData = result.user || result.data?.user;
            
            if (userData && result.access_token) {
                localStorage.setItem("access_token", result.access_token);
                localStorage.setItem("refresh_token", result.refresh_token);
                setUser(userData);
                return { success: true, user: userData };
            }
            return { success: false, error: "Invalid response" };
        } catch (error: any) {
            return { success: false, error: error.message || "Login failed" };
        }
    };

    const register = async (userData: any) => {
        try {
            const result = await authAPI.register(userData);
            const newUser = result.user || result.data?.user;
            
            if (newUser && result.access_token) {
                localStorage.setItem("access_token", result.access_token);
                localStorage.setItem("refresh_token", result.refresh_token);
                setUser(newUser);
                return { success: true, user: newUser };
            }
            return { success: false, error: "Invalid response" };
        } catch (error: any) {
            return { success: false, error: error.message || "Registration failed" };
        }
    };

    const logout = () => {
        authAPI.logout();
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
    };

    const refreshAccessToken = async () => {
        try {
            const result = await authAPI.refreshToken();
            const newToken = result.access || result.access_token;
            if (newToken) {
                localStorage.setItem("access_token", newToken);
                return true;
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
        }
        return false;
    };

    return {
        user,
        loading,
        login,
        register,
        logout,
        refreshAccessToken,
        checkAuth
    };
};
