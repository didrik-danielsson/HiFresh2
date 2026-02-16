import { useEffect, useState } from 'react';
import { recipeService } from '../API/recipeService';
import type {Recipe} from '../types';
import StartArea from "../components/FeatureArea/FeatureArea.tsx";


export function AllRecipesPage() {

    return (
        <AllRecipe/>
    )
}



function AllRecipe() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

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
        <StartArea recipes={recipes}/>

    );
}

