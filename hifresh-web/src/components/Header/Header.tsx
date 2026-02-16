import './header.css';
import { useState } from 'react';
import {faUtensils} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {mainColor} from "../colors.ts";
import {backgroundColor} from "../colors.ts";
import { Navbar } from '../Navbar.tsx'
import { Link} from "react-router-dom";


function Header() {
    return (
        <div style={{backgroundColor:`${mainColor}`}} className={"headerAreaRoot"}>
            <Logo />
            <div className={"mainMenuAndLoginButton"}>
                <Menu/>
                <LoginButton />
            </div>
        </div> );
}

function Logo(){

    return <div className={"logoRootContainer"}>
        <Link to={"/"}>
    <FontAwesomeIcon style={{color: `${backgroundColor}`}} className={"logo"} icon={faUtensils} />
        </Link>
            <div style={{color: `${backgroundColor}`}} className="websiteName">Receptboken</div>

    </div>
}

function LoginButton() {

    const [isHovered, setIsHovered] = useState(false);

    return (<div className={"loginRootContainer"}>
            <Link to={"/Login"}>
            <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style=
                    {{backgroundColor:`${isHovered ? 'white' : mainColor}`,
                    border: '1px solid white',
                    color: `${isHovered ? mainColor : 'white'}`
            }}
                  className={"loginButton"}>Login</button>
            </Link>
    </div>
    );
}

function Menu(){

    return (
        <Navbar/>
    );
}

export default Header;
