import {useState} from "react";

export function Textbox(props: {inputText: string}) {

    const [text, setText] = useState("")

        return (
    <>
    <input placeholder={props.inputText} className={"searchInput"}  onChange={(e) => setText(e.target.value)}></input>
        <p>{text}</p>
    </>
        )
}