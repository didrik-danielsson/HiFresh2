import { useState } from 'react';
import type { FormEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { recipeService } from "../API/recipeService.ts"; // Importera din nya service
import { Textbox } from "../components/Textbox.tsx";
import { Button } from "../components/button.tsx";

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
            <form onSubmit={handleSubmit} className={"addRecipeFormRoot"}>
                <Textbox
                    inputText="Titel"
                    value={title}
                    className={"loginInput"}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Textbox
                    inputText="Beskrivning"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={"loginInput"}
                />

                <Textbox
                    inputText="Ingredienser"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className={"loginInput"}
                />

                <Textbox
                    inputText="Instruktioner"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className={"loginInput"}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button text="Spara recept" type="submit" className={"submitButton"} />
            </form>
        </div>
    );
}