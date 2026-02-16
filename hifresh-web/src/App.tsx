
import './App.css';
import { HashRouter as Router, Routes, Route} from "react-router-dom";
import {HomePage} from "./Pages/HomePage.tsx";
import {AddRecipeForm} from "./Pages/AddRecipeForm.tsx";
import {MenuPage} from "./Pages/MenuPage.tsx";
import { RemoveRecipe } from "./Pages/RemoveRecipe.tsx";
import {Layout} from "./Layout.tsx";
import {AllRecipesPage} from "./Pages/AllRecipes.tsx";
import { LoginPage } from "./Pages/LoginPage.tsx"
import {IngredientsPage} from "./Pages/IngredientsPage.tsx";



function App() {

return (

        <div className={"App"}>

        <Router>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/lägg till recept" element={<AddRecipeForm/>}/>
                        <Route path={"/Recept"} element={<AllRecipesPage/>}/>
                        <Route path="/Menyer" element={<MenuPage/>}/>
                        <Route path="/Remove" element={<RemoveRecipe/>}/>
                        <Route path={"/Login"} element={<LoginPage/>}/>
                        <Route path={"/Ingredienser"} element={<IngredientsPage/>}/>
                    </Route>
                </Routes>
        </Router>
        </div>

    )
}



export default App;