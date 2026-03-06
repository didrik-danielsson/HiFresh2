import { useEffect } from "react";
import type { ReactNode } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("Du måste vara inloggad för att se denna sida", {
                id: "auth-error", // Detta ID gör att det bara kan finnas EN sån här toast åt gången
                duration: 4000,
            });
            navigate("/", { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return <>{children}</>;
}