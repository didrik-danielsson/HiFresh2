import useFormContext from "../Hooks/useFormContext.tsx";
import {TextArea} from "./TextArea.tsx";

const Ingredients = () => {

    const { data, handleChange } = useFormContext()

    const content = (
       <>
           <TextArea name="instructions" value={data.ingredients} inputText={"Skriv in ingredienser här!"} className={"descriptionForm"}
           onChange={handleChange}/>
       </>
    )

    return content
}

export default Ingredients