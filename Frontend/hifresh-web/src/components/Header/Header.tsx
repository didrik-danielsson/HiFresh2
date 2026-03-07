import './header.css';
import { useState } from 'react';
import { faUtensils, faUser } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {mainColor} from "../colors.ts";
import {backgroundColor} from "../colors.ts";
import { Navbar } from '../Navbar.tsx'
import { Link} from "react-router-dom";
import { useAuth} from "../../context/AuthContext.tsx";
import { Button } from "../button.tsx";



function Header() {
    const { isLoggedIn } = useAuth();
    return (
        <div style={{backgroundColor:`${mainColor}`}} className={"headerAreaRoot"}>
            <Logo />
            {isLoggedIn ? <div className={"mainMenuAndUserIcon"}>
                <Menu/>
                <UserIcon/>
            </div> :
                <div className={"mainMenuAndLoginButton"}>
                <Menu/>
                <LoginButton />
            </div>
            }
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

function UserIcon() {
    const { logout } = useAuth(); // Lägg den HÄR också
    const [isClicked, setIsClicked] = useState(false);

    return (
        <div className="singleMenuItem dropdown">
            <FontAwesomeIcon
                onClick={() => setIsClicked(!isClicked)}
                style={{
                    backgroundColor: isClicked ? 'white' : mainColor,
                    color: isClicked ? mainColor : 'white',
                    padding: '10px',
                    borderRadius: '50%',
                    cursor: 'pointer'
                }}
                className="userIcon"
                icon={faUser}
            />

            {/* Visa menyn bara om isClicked är sant */}
            {isClicked && (
                <div className="dropdownContent" style={{ display: 'list-item' }}>
                    <Button
                        onClick={logout}
                        className="logout-button"
                        text="Logga ut"
                    />
                </div>
            )}
        </div>
    );
}

function Menu(){

    return (
        <Navbar/>
    );
}

export default Header;
