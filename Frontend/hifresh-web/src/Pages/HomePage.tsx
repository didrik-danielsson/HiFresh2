// HomePage.tsx
import { useAuth } from "../context/AuthContext";

export function HomePage() {

    const { isLoggedIn, user } = useAuth();

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 100, gap: 30}}>
            {isLoggedIn ? (
                <>
                    <h1>Välkommen tillbaka, {user}!</h1>
                    <h2>Kul att se dig igen. Vad vill du laga idag?</h2>
                </>
            ) : (
                <>
                    <h1>Välkommen till Receptboken!</h1>
                    <h2>Vänligen logga in för att komma åt sidan</h2>
                </>
            )}
        </div>
    );
}