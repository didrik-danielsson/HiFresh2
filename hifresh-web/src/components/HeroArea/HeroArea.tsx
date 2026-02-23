import './heroarea.css';
import {mainColor} from '../colors.ts'
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {Textbox} from "../Textbox.tsx";


function HeroArea() {
    return (
        <div style={{backgroundColor:`${mainColor}`, color: "white"}}
            className={"heroAreaRoot"}><SearchIcon />
        </div> );
}



function SearchIcon() {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className={"searchContainer"}>
            <Textbox inputText={"Sök efter recept"} className={"searchInput"}/>
            <FontAwesomeIcon
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{backgroundColor:`${isHovered ? mainColor : 'white'}`,
                    border: '1px black',
                    color: `${isHovered ? 'white' : mainColor}`}}
                className="searchButton" icon={faSearch}/>
        </div>
    )
}

export default HeroArea;