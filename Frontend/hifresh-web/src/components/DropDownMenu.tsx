import {useState} from "react";
import {Button} from "./button.tsx";
import {mainColor} from "./colors.ts";
import {Link} from "react-router-dom";

interface DropDownMenuProps {
    title: string;
    items?: string[];
}

export function DropdownMenu({title, items}: DropDownMenuProps) {

    const [isHovered, setIsHovered] = useState(false);

    return (

        <div className="singleMenuItem dropdown">
            <Link to={title}>
            <Button text={title}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    style=
                        {{backgroundColor:`${isHovered ? 'white' : mainColor}`,
                            border: '1px solid white',
                            color: `${isHovered ? mainColor : 'white'}`
                        }}
                    className="menuButton" />
            </Link>
            <div className="dropdownContent">
                {items.map((item, i) => (
                    <Link key={i} to={`/${item.toLowerCase()}`}>{item}</Link>
                ))}
            </div>
        </div>

    );
}

