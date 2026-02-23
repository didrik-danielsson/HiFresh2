
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
import {ThisRecipePage} from "./Pages/ThisRecipePage.tsx";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import type {ReactNode} from "react";

function App() {

return (

        <div className={"App"}>
        <Router>
                <Routes>
                    <Route element={<Layout/>}>
                        {/*Public routes*/}
                        <Route path="/" element={<HomePage />}/>
                        <Route path={"/Login"} element={<LoginPage />}/>

                        {/*Protected routes*/}
                        <Route path="/lägg till recept" element={
                            <ProtectedRoute><AddRecipeForm/></ProtectedRoute>}/>
                        <Route path={"/Recept"} element={
                            <ProtectedRoute> <AllRecipesPage/> </ProtectedRoute>}/>
                        <Route path={"/Recept/:id"} element={
                            <ProtectedRoute> <ThisRecipePage /> </ProtectedRoute>}/>
                        <Route path="/Menyer" element={
                            <ProtectedRoute> <MenuPage/> </ProtectedRoute>}/>
                        <Route path="/Remove" element={
                            <ProtectedRoute> <RemoveRecipe/> </ProtectedRoute> }/>
                        <Route path={"/Ingredienser"} element={
                            <ProtectedRoute> <IngredientsPage/> </ProtectedRoute>}/>
                    </Route>
                </Routes>
        </Router>
        </div>

    )
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        // Om användaren inte är inloggad, skicka dem till Login-sidan
        return <Navigate to="/Login" replace />;
    }

    // Om de är inloggade, visa sidan som vanligt
    return children;
}

export default App;