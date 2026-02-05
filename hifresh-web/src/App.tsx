import { useEffect, useState } from 'react';
import { recipeService } from './API/recipeService';
import type {Recipe} from './types';

function App() {
    // State: här sparar vi recepten när de väl har hämtats
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    // State: för att visa en laddnings-snurra eller text
    const [loading, setLoading] = useState<boolean>(true);
    // State: om något går fel (t.ex. servern är nere)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Denna kod körs EN gång när komponenten startar
        recipeService.getAllRecipes()
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []); // Den tomma arrayen [] betyder "kör bara vid start"

    if (loading) return <p>Hämtar recept...</p>;
    if (error) return <p style={{ color: 'red' }}>Fel: {error}</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>HiFresh Recept</h1>

            <div className="recipe-list">
                {recipes.map(recipe => (
                    <div key={recipe.id} style={cardStyle}>
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description[0]?.substring(0, 50)}...</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Enkel styling direkt i JS för att testa
const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9'
};

export default App;