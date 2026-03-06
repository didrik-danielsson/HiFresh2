import {Outlet} from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import HeroArea from "./components/HeroArea/HeroArea.tsx";
import { useAuth} from "./context/AuthContext.tsx";
import './Layout.css'


export function Layout(){

    const { isLoggedIn, user } = useAuth();

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