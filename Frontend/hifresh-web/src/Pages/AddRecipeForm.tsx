import { useState } from 'react';
import type { FormEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { recipeService } from "../API/recipeService.ts";
import { Textbox } from "../components/Textbox.tsx";
import { Button } from "../components/button.tsx";
import Form from "../components/Form.tsx"
import {FormProvider} from "../context/FormContext.tsx";

export function AddRecipeForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await recipeService.createRecipe({
                title,
                description,
                ingredients,
                instructions
            });

            alert("Receptet sparat!");
            navigate("/Recept");

        } catch (err) {
            setError("Något gick fel när receptet skulle sparas.");
        }
    };

    return (
        <div className="addRecipeRoot">
            <h1>Skapa nytt recept</h1>
            <FormProvider>
            <Form onSubmit={handleSubmit} className={"addRecipeFormRoot"}/>
            </FormProvider>
        </div>
    );
}