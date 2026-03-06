import {Textbox} from "./Textbox.tsx";
import useFormContext from "../Hooks/useFormContext.tsx";
import {DropdownLabel} from "./DropDownLabel.tsx";
import './basics.css';
import {TextArea} from "./TextArea.tsx";

function Basics () {

    const { data, handleChange } = useFormContext()

    const timeOptions: string[] = ['15', '30','45', '60+']
    const portOptions: number[] = [2, 4, 8]

    const content = (
        <>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Textbox name="baseName" value={data.baseName} inputText={"Namn"} id={"baseName"} className={"newRecipeInput"} onChange={handleChange}/>
               <div>
                <TextArea type="textarea" name="baseDescription" value={data.baseDescription} inputText={"Beskrivning"}
                         className={"descriptionForm"} onChange={handleChange} maxLength={140}
                         />
                   <div className={"char-counter"}>
                <h2>{data.baseDescription.length}/140</h2>
                   </div>
               </div>
            </div>
            <Textbox inputText={"Kategori"} className={"newRecipeInput"}/>
            <div className={"labels"}>
                <DropdownLabel
                    label="Tid"
                    name="baseTime"
                    value={data.baseTime}
                    values={timeOptions}
                    onChange={handleChange}
                className={"dropdown-select"}/>
                <DropdownLabel
                    label="Portioner"
                    name="basePortions"
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