import './button.css';

interface ButtonProps {
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean
}

export function Button({ text, className, type, onClick, disabled }: ButtonProps) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}