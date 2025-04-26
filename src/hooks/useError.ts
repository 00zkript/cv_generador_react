import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function useErrors() {
    const [errors, setErrors] = useState<string[]>([]);
    
    const handleErrorsRequest = (error: unknown) => {
        if (!(error instanceof AxiosError)) {
            console.error("Error inesperado:", error);
            toast.error("Ha ocurrido un error inesperado.");
            return;
        }

        const errorDetail = error.response?.data?.detail;
        if (!Array.isArray(errorDetail)) {
            toast.error("Error desconocido en el servidor.");
            return;
        }

        // Extraemos los mensajes de error
        const formattedErrors = errorDetail.map((err) => {
            const fieldPath = err.loc.join(" > ");
            // const fieldPath = err.loc[1];
            return `${fieldPath}: ${err.msg}`;
        });
        
        setErrors(formattedErrors);

        setTimeout(() => {
            setErrors([]);
        }, 1000 * 10);

        toast.error("Errores en el formulario, revisa los campos.");
    }

    const clearErrors = () => {
        setErrors([]);  
    }

    return {
        errors,
        setErrors,
        clearErrors,
        handleErrorsRequest,
    }
}

export default useErrors;