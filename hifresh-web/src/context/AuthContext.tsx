// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from 'react';
import { UserService } from "../API/LoginService";

// Detta är "ritningen" för vad som ska finnas tillgängligt överallt
interface AuthContextType {
    isLoggedIn: boolean;
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        UserService.checkAuth().then(name => {
            if (name) {
                setIsLoggedIn(true);
                setUser(name);
            }
        });
    }, []);

    // Denna funktion anropas från LoginPage
    const login = (username: string) => {
        setIsLoggedIn(true);
        setUser(username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Det är denna funktion du försöker importera!
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
    return context;
};