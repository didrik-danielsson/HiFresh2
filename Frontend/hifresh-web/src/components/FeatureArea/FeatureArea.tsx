import './featurearea.css';
import type {Recipe} from '../../types'
import {backgroundColor} from "../colors.ts";
import {RecipeCard} from "../RecipeCard.tsx";

interface FeatureAreaProps {
    recipes: Recipe[];
}

function ShowAllRecipes({recipes}: FeatureAreaProps) {
    return (
        <div style={{backgroundColor:`${backgroundColor}`}} className={"featureAreaRoot"}>
            <ShowRecipes recipes={recipes}/>
        </div> );
}

function ShowRecipes({ recipes }: {recipes: Recipe[]}) {
    return (

        <div className={"recipeList"} >
            {recipes.map(r => (
                <RecipeCard key={r.id} recipe={r}/>
            ))}
        </div>
    );
}

export default ShowAllRecipes