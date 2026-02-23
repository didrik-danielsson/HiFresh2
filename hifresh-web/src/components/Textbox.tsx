import './textBox.css'


interface TextboxProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputText: string;
    className?: string;
    type?: string;
}

export function Textbox({ value, onChange, inputText, className, type = "text" }: TextboxProps) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={inputText}
            className={className}
        />
    );
}