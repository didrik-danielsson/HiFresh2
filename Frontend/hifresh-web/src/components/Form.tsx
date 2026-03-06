import useFormContext from "../Hooks/useFormContext.tsx";
import FormInputs from "./FormInputs.tsx"
import {Button} from "./button.tsx";

const Form = () => {

    const {
        page,
        setPage,
        data,
        setData,
        title,
        canSubmit,
        handleChange,
        disablePrev,
        disableNext,
        submitHide,
        prevHide,
        nextHide
    } = useFormContext()

    const handlePrev = () => setPage(prev => prev - 1)
    const handleNext = () => setPage(prev => prev + 1)

    const handleSubmit = e => {
        e.preventDefault()
        console.log(JSON.stringify(data))
    }

    const content = (

        <form onSubmit={handleSubmit} className={"addRecipeFormRoot"} >
            <header>
                <h2>{title[page]}</h2>
            </header>
            <FormInputs/>
            <div className={"button-container"}>
                <Button type="button" text={'Prev'} className={`menuButton ${prevHide}`} onClick={handlePrev} disable={disablePrev}/>
                <Button type="button" text={'Next'} className={`menuButton ${nextHide}`} onClick={handleNext} disabled={disableNext}/>
                <Button type="submit" text={'Submit'} className={`submitButton ${submitHide}`} disabled={!canSubmit}/>
            </div>
        </form>

    )
    return content

}
export default Form