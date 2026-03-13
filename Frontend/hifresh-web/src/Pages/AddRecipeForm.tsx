import { useNavigate } from "react-router-dom";
import { recipeService } from "../API/recipeService.ts";
import Form from "../components/Form.tsx"
import {FormProvider} from "../context/FormContext.tsx";

export function AddRecipeForm() {
    const navigate = useNavigate();

    const handleSubmit = async (data: any) => {
        try {
            await recipeService.createRecipe({

                title: data.baseName,
                description: data.baseDescription,
                ingredients: data.ingredients,
                instructions: data.instructions,
                portions: data.basePortions,
                time: data.baseTime,
                category: data.baseCategory,

            });

            alert("Receptet sparat!");
            navigate("/Recept");

        } catch (err) {
            console.error("Något gick fel när receptet skulle sparas:", err);
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