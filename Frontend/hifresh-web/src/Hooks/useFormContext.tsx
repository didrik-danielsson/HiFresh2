import { useContext } from "react";
import FormContext from "../context/FormContext.tsx";


const UseFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within FormProvider");
    }
    return context;
}

export default UseFormContext