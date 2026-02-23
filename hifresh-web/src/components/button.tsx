import './button.css';

interface ButtonProps {
    text: string;
    className?: string;
    type?: "button" | "submit" | "reset"; // Definiera de giltiga typerna
    onClick?: () => void;
}

export function Button({ text, className, type = "button", onClick }: ButtonProps) {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
}