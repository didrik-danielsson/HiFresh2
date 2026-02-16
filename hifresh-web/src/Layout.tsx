import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import './Layout.css'
import HeroArea from "./components/HeroArea/HeroArea.tsx";

export function Layout(){
    return (

    <div className={"layout-container"}>
        <Header/>
        <HeroArea/>
        <main className={"content-area"}>
            <Outlet/>
        </main>
    </div>
    )
}