import type { Recipe } from "../types";
import {useState, useEffect} from "react";
import {recipeService} from "../API/recipeService.ts";
import {useParams} from "react-router-dom";
import './pages.css'



export function ThisRecipePage() {

return (

    <ThisRecipe/>
)
}

function ThisRecipe () {

    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState< Recipe | null>(null);



    useEffect(() => {
        if (id) {

            recipeService.getRecipeByID(id).then(data => setRecipe(data))
                .catch(err => console.error(err))
        }
    }, [id]);

    if (!recipe) return <p>Laddar receptet...</p>

    return (
        <div className="oneRecipePage">
            <header className="recipe-header">
                <h1>{recipe.name}</h1>
            </header>

            <div className="recipe-grid">
                {/* Sektion för ingredienser */}
                <section className="ingredients-section">
                    <h2>Ingredienser</h2>
                    <ul>
                        {Object.entries(recipe.ingredients).map(([name, detail]) => (
                            <li key={name}>
                                <strong>{detail.amount} {detail.unit}</strong> {name}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Sektion för beskrivning/instruktioner */}
                <section className="description-section">
                    <h2>Gör så här</h2>
                    <ol>
                        {recipe.description.map((step, index) => (
                            <li key={index} className="step-item">
                                {step}
                            </li>
                        ))}
                    </ol>
                </section>
            </div>
        </div>
    );
}