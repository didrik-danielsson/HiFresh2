import './TextArea.css'
interface TextAreaProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputText: string;
    className?: string;
    type?: string;
    id?: string
    name?: string
    checked?: string
    pattern?: string
    disabled?: string
    maxLength?: number;
}

export function TextArea({ value, onChange, inputText, className, type, id, name, checked, pattern, disabled, maxLength}: TextAreaProps) {
    return (
        <textarea
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