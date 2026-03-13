import useFormContext from "../Hooks/useFormContext.tsx";
import FormInputs from "./FormInputs.tsx"
import {Button} from "./button.tsx";


interface FormProps {

    onSubmit: (data: any) => void;
    className?: string;
}

const Form = ({onSubmit, className}: FormProps) => {

    const {
        page,
        setPage,
        title,
        canSubmit,
        disablePrev,
        disableNext,
        submitHide,
        prevHide,
        nextHide,
        data
    } = useFormContext()

    const internalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onSubmit(data)
    }

    const handlePrev = () => setPage(prev => prev - 1)
    const handleNext = () => setPage(prev => prev + 1)

    const content = (

        <form onSubmit={internalSubmit} className={className} >
            <header>
                <h2>{title[page]}</h2>
            </header>
            <FormInputs/>
            <div className={"button-container"}>
                <Button type="button" text={'Prev'} className={`menuButton ${prevHide}`} onClick={handlePrev} disabled={disablePrev}/>
                <Button type="button" text={'Next'} className={`menuButton ${nextHide}`} onClick={handleNext} disabled={disableNext}/>
                <Button type="submit" text={'Submit'} className={`submitButton ${submitHide}`} disabled={!canSubmit}/>
            </div>
        </form>

    )
    return content

}
export default Form