import './TextArea.css'
interface TextAreaProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    inputText: string;
    className?: string;
    type?: string;
    id?: string
    name?: string
    checked?: string
    pattern?: string
    disabled?: boolean
    maxLength?: number;
}

export function TextArea({ value, onChange, inputText, className, id, name, disabled, maxLength}: TextAreaProps) {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={inputText}
            className={className}
            id={id}
            name={name}
            disabled={disabled}
            maxLength={maxLength}
        />

    );

}