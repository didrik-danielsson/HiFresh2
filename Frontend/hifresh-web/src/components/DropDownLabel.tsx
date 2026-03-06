import './DropDownLabel.css'

interface DropdownLabelProps {
    label?: string;
    name?: string;
    values: (string | number)[];
    onChange?: (e: any) => void;
    id?: string;
    className?: string
}
 export function DropdownLabel({ label, name, values, id, onChange, className }: DropdownLabelProps) {
     return (
    <div>
         <label>{label}</label>
     <select id={id} name={name} onChange={onChange} className={className}>
         {values.map((optionNum) => (
         <option key={optionNum} value={optionNum}>
             {optionNum}
         </option>
             ))}
     </select>
    </div>
 )
 }

