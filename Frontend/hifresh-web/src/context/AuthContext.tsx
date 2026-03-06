// src/context/AuthContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';
import { UserService } from "../API/LoginService";
import { toast } from "react-hot-toast";


interface AuthContextType {
    isLoggedIn: boolean;
    user: string | null;
    login: (username: string, password: string) => Promise<LoginResponse>;
    logout: () => void;
}
interface LoginResponse {
    success: boolean;
    message?: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        try {
            const loggedInUser = await UserService.login(username, password);
            setIsLoggedIn(true);
            setUser(loggedInUser);
            return { success: true };
        } catch (err) {
            return { success: false, message: "Fel lösenord eller användarnamn" };
        }
    };

    const handleLogout = async () => {
        try {
            await UserService.logout();
            setIsLoggedIn(false);
            setUser(null);
            toast.success("Utloggad!");
        } catch (error) {
            console.error("Logout misslyckades", error);
            setIsLoggedIn(false);
        }
    };

    return (

        <AuthContext.Provider value={{ isLoggedIn, user, login, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
    return context;
};