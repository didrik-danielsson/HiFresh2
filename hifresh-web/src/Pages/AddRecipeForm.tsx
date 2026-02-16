import {Textbox} from "../components/Textbox.tsx";

export function AddRecipeForm() {
    return (
        <>
        <h1>Here you can add a recipe</h1>
        <Textbox inputText={"Namnet på receptet"}/>
    </>
    )
}