import { createContext, useState, useEffect, ReactNode } from "react";
import type {ChangeEvent} from "react";


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
    ingredients: string;
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
        basePortions: 0,
        baseCategory: "",
        baseDescription: "",
        ingredients: "",
        instructions: ""

    })

    const handleChange = e => {
        const type = e.target.type
        const name = e.target.name

        const value = type == "checkbox"
            ? e.target.checked
            : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const {
        baseName,
        ingredients,
        baseDescription,
        instructions,
        ...requiredInputs
    } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean)
        && page === Object.keys(title).length - 1

    const canNextPage1 = Object.keys(data)
        .filter(key => key.startsWith('Base') && key !== 'baseName')
        .map(key => data[key]).every(Boolean)

    const canNextPage2 = Object.keys(data)
        .filter(key => key.startsWith('Ing') && key !== 'Ingredients')
        .map(key => data[key]).every(Boolean)

    const canNextPage3 = Object.keys(data)
        .filter(key => key.startsWith('Ins') && key !== 'Instructions')
        .map(key => data[key]).every(Boolean)

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
            , nextHide, submitHide
        }}>
            {children}
        </FormContext.Provider>
    )

}


export default FormContext