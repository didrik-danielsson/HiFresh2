import { createContext, useState } from "react";
import type {ChangeEvent, ReactNode} from "react";
import type { IngredientAmount} from "../types";


interface FormContextType {
    title: { [key: number]: string };
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    data: RecipeData;
    setData: React.Dispatch<React.SetStateAction<RecipeData>>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    canSubmit: boolean;
    disablePrev: boolean;
    disableNext: boolean;
    submitHide: string | boolean;
    prevHide: string | boolean;
    nextHide: string | boolean;
}

interface RecipeData {
    baseName: string;
    baseTime: string;
    basePortions: number;
    baseCategory: string;
    baseDescription: string;
    ingredients: Record<string, IngredientAmount>;
    instructions: string;
}


export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode })=> {

    const [page, setPage] = useState(0)

    const title = {
        0: 'Start',
        1: 'Ingredienser',
        2: 'Instruktioner'
    }
    const [data, setData] = useState<RecipeData>({
        baseName: "",
        baseTime: "",
        basePortions: 2,
        baseCategory: "",
        baseDescription: "",
        ingredients: {},
        instructions: ""

    })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const type = e.target.type
        const name = e.target.name

        const value = type == "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
        console.log(data)
    }

    const {
        baseName,
        ingredients,
        baseDescription,
        instructions,
        basePortions,
        baseTime,
        baseCategory,
        ...requiredInputs
    } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean)
        && page === Object.keys(title).length - 1

    const canNextPage1 = data.baseName.length > 0 && data.baseDescription.length > 0;
    const canNextPage2 = Object.keys(data.ingredients).length > 0; // Kolla om det finns ingredienser
    const canNextPage3 = data.instructions.trim().length > 10; // Kräver lite instruktioner

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)
        || (page === 2 && !canNextPage3)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length -1 &&
        "remove-button"

    const submitHide = page !== Object.keys(title).length -1 &&
        "remove-button"


    return (
        <FormContext.Provider value={{
            title, page, setPage,
            data, setData, handleChange,
            disablePrev,disableNext,prevHide
            , nextHide, submitHide, canSubmit
        }}>
            {children}
        </FormContext.Provider>
    )

}


export default FormContext