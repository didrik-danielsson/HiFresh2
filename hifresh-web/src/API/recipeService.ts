import type {Recipe} from '../types';

const API_URL = "http://localhost:8080/api/recipes";

export const recipeService = {
    // Funktion för att hämta alla recept
    getAllRecipes: async (): Promise<Recipe[]> => {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        // Kontrollera om servern svarade med fel (t.ex. 404 eller 500)
        if (!response.ok) {
            throw new Error(`Kunde inte hämta data: ${response.status}`);
        }

        // Omvandla den råa texten från servern till en lista med Recept-objekt
        return await response.json();
    }
};