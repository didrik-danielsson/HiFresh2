import {Link} from "react-router-dom";
import {Button} from "./button.tsx";
import './navbar.css'
import {DropdownMenu} from "./DropDownMenu.tsx";

export function Navbar(){

    const recipeMenu = {title: "Recept", items: ["Lägg till recept", "Ändra recept",  "Ta bort recept"]}
    const menuMenu = {title: "Menyer", items: ["Veckomeny", "Festmenyer"]}
    const ingredientsMenu = {title: "Ingredienser", items: ["Visa alla", "Kategorier"]}

    return (
    <nav className={"navBar"} >
        <Link to={"/"}>
            <Button text={"Startsidan"} className={"menuButton"}></Button>
        </Link>
            <DropdownMenu title={recipeMenu.title} items={recipeMenu.items}/>
        <Link to={"Menu"}>
        </Link>
            <DropdownMenu title={menuMenu.title} items={menuMenu.items}></DropdownMenu>
        <Link to={"/Menu"}>
        </Link>
            <DropdownMenu title={ingredientsMenu.title} items={ingredientsMenu.items}></DropdownMenu>
    </nav>
    )
}

