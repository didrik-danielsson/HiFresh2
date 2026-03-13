import type {Ingredient, IngredientAmount, Recipe} from '../types';

const API_BASE_URL: string = import.meta.env.VITE_RECIPES_API_BASE_URL;

export const recipeService = {

    getAllRecipes: async (): Promise<Recipe[]> => {

        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Kunde inte hämta data: ${response.status}`);
        }

        return await response.json();
    },

    getRecipeByID: async (id: string): Promise<Recipe> => {

        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Kunde inte hitta receptet med id ${id}: ${response.status}`);
        }
        return await response.json();
    },

    async createRecipe(recipeData: {
        title: string;
        description: string;
        ingredients: Record<Ingredient, IngredientAmount>
        instructions: string;
        portions: number;
        time: string;
        category: string;
    }) {

        const response = await fetch(API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Kunde inte spara receptet");
        }

        return response.json();
    },
};