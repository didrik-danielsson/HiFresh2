import './button.css';


export function Button(props: {text?: string; color?: string; func?: Function; msg?: string; className?: string;}){


    return (
        <button className={props.className}>
            <p>{props.text}</p>
        </button>
    )
}