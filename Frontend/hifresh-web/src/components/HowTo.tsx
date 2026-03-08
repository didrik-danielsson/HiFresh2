
import useFormContext from "../Hooks/useFormContext.tsx";
import {TextArea} from "./TextArea.tsx";


const HowTo = () => {

    const {data, handleChange} = useFormContext()

    const content = (
        <>
            <TextArea name="instructions" value={data.instructions} inputText={"Skriv instruktionerna här!"} className={"descriptionForm"}
                      onChange={handleChange}/>
        </>
    )

    return content

}

export default HowTo