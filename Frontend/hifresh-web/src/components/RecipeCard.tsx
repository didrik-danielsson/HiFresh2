import { mainColor} from "./colors.ts";
import { Link} from "react-router-dom";
import type {Recipe} from "../types";
import "./FeatureArea/featurearea.css"

export function RecipeCard({ recipe }: {recipe: Recipe;}) {
    return (

        <Link to={`/Recept/${recipe.id}`}>
      <div
          style={{backgroundColor:`${mainColor}`}} className={'cardStyle'}>
            <h3>{recipe.name}</h3>
      </div>
        </Link>
    )
}