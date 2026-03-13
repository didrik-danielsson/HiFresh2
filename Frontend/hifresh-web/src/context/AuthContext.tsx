// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';
import { UserService } from "../API/LoginService";
import { toast } from "react-hot-toast";


interface AuthContextType {
    isLoggedIn: boolean;
    user: string | null;
    login: (username: string, password: string) => Promise<LoginResponse>;
    logout: () => void;
    loading: boolean;
}
interface LoginResponse {
    success: boolean;
    message?: string;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticatedUser = await UserService.checkAuth()
                if (authenticatedUser) {
                    setIsLoggedIn(true);
                    setUser(authenticatedUser);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuthentication();
    }, []);

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

        <AuthContext.Provider value={{ isLoggedIn, user, login, logout: handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
    return context;
};