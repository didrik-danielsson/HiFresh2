
export interface IngredientAmount {
    amount: number;
    unit: string;
}

export interface Recipe {
    id: number;
    name: string;
    description: string;
    instructions: string;
    time: string;
    category: string;
    ingredients: Record<string, IngredientAmount>;
}

export interface Ingredient {
    name: string
}