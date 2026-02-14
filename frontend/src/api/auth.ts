// Auth API functions with proper types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    role: "guest" | "partner" | "admin";
}

export interface User {
    id: number;
    email: string;
    name: string;
    role: "guest" | "partner" | "admin";
}

export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token: string;
    data?: {
        user: User;
        access_token: string;
        refresh_token: string;
    };
}

export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await fetch("/api/auth/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        return data;
    },
    
    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await fetch("/api/auth/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        return data;
    },
    
    logout: async (): Promise<void> => {
        await fetch("/api/auth/logout/", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
    },
    
    getCurrentUser: async (): Promise<User> => {
        const response = await fetch("/api/auth/user/", {
            method: "GET",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access_token")}`
            }
        });
        const data = await response.json();
        return data.user || data;
    },
    
    refreshToken: async (): Promise<{ access: string; access_token?: string }> => {
        const refresh = localStorage.getItem("refresh_token");
        const response = await fetch("/api/auth/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh })
        });
        const data = await response.json();
        return data;
    }
};
