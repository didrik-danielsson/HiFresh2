import useFormContext from "../Hooks/useFormContext.tsx";
import Basics from "./Basics.tsx";
import Ingredients from "./Ingredients.tsx";
import HowTo from "./HowTo.tsx";


const FormInputs = () => {

        const { page } = useFormContext()

    const display = {

            0: <Basics />,
            1: <Ingredients/>,
            2: <HowTo/>
    }

    const content = (
        <div className={"addRecipeFormRoot"}>
            {display[page]}
        </div>
    )

    return content
}
export default FormInputs