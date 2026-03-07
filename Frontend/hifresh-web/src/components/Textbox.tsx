import './textBox.css'
import './TextArea.css'


interface TextboxProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputText: string;
    className?: string;
    type?: string;
    id?: string
    name?: string
    checked?: boolean
    pattern?: string
    disabled?: boolean
    maxLength?: number;
}

export function Textbox({ value, onChange, inputText, className, type, id, name, checked, pattern, disabled, maxLength}: TextboxProps) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={inputText}
            className={className}
            id={id}
            name={name}
            checked={checked}
            pattern={pattern}
            disabled={disabled}
            maxLength={maxLength}
        />

    );

}


