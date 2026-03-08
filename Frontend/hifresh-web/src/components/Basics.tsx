import {Textbox} from "./Textbox.tsx";
import useFormContext from "../Hooks/useFormContext.tsx";
import {DropdownLabel} from "./DropDownLabel.tsx";
import './basics.css';
import {TextArea} from "./TextArea.tsx";
import { faClock, faBowlFood } from '@fortawesome/free-solid-svg-icons';

function Basics () {

    const { data, handleChange } = useFormContext()

    const timeOptions: string[] = ['15', '30','45', '60+']
    const portOptions: number[] = [2, 4, 8]

    const content = (
        <>
            <div className={"name-description"}>
            <Textbox name="baseName" value={data.baseName} inputText={"Namn"} id={"baseName"} className={"formInput"} onChange={handleChange}/>
               <div>
                <TextArea type="textarea" name="baseDescription" value={data.baseDescription} inputText={"Beskrivning"}
                         className={"descriptionForm"} onChange={handleChange} maxLength={140}
                         />
                   <div className={"char-counter"}>
                <h2>{data.baseDescription.length}/140</h2>
                   </div>
               </div>
                <Textbox inputText={"Kategori"} className={"formInput"} name="baseCategory"
                         value={data.baseCategory} onChange={handleChange}/>
            </div>

            <div className={"labels"}>
                <DropdownLabel
                    label="Tid"
                    icon={faClock}
                    name="baseTime"
                    value={data.baseTime}
                    values={timeOptions}
                    onChange={handleChange}
                className={"dropdown-select"}/>
                <DropdownLabel
                    label="Portioner"
                    name="basePortions"
                    icon={faBowlFood}
                    values={portOptions}
                    value={data.basePortions}
                    onChange={handleChange}
                    className={"dropdown-select"}/>
            </div>

        </>
    )
    return (
        content

)
}

export default Basics