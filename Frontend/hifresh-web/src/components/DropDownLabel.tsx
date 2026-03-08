import './DropDownLabel.css'
import type {IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface DropdownLabelProps {
    label?: string;
    value?: string | number;
    name?: string;
    values: (string | number)[];
    onChange?: (e: any) => void;
    id?: string;
    className?: string
    icon?: IconDefinition;
}
 export function DropdownLabel({ label, name, values, id, onChange, className, value, icon }: DropdownLabelProps) {
     return (
    <div>
         <label>
             <FontAwesomeIcon icon={icon} style={{ marginRight: '8px' }} />
             {label}</label>
     <select  id={id} name={name} value={value} onChange={onChange} className={className}>
         {values.map((optionNum) => (
         <option key={optionNum} value={optionNum}>
             {optionNum}
         </option>
             ))}
     </select>
    </div>
 )
 }

