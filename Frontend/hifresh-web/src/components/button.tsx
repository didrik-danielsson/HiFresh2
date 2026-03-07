import './button.css';

interface ButtonProps {
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    style?: React.CSSProperties;
}

export function Button({ text, className, type, onClick, disabled, onMouseEnter, onMouseLeave, style }: ButtonProps) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={style}
        >
            {text}
        </button>
    );
}