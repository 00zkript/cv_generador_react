import cvService from "@/services/cvService";
import { CvBaseSchema } from "@/types/Cv";
import { SkillBaseSchema } from "@/types/Skill";
import { WorkExperienceBaseSchema } from "@/types/WorkExperience";
import useFormCv from "@/hooks/useFormCv";
import { StudyBaseSchema } from "@/types/Study";
import { LanguageBaseSchema } from "@/types/Laguage";
import { toast } from "react-toastify";
import { ZodSchema } from "zod";
import { ContactBaseSchema } from "@/types/Contact";
import useErrors from "./useError";
import { useNavigate } from "react-router";

function useFormCreate() {
    const navigation = useNavigate();
    const useFormInstance = useFormCv();
    const { errors: errorsValidations, setErrors, handleErrorsRequest, } = useErrors();

    const handleClearForm = () => {
        useFormInstance.resetForm();
    }

    const makeRequest = () => {
        const errors: string[] = [];
    
            // Función auxiliar para validar y formatear errores
        const validateField = <T,>(schema: ZodSchema<T>, value: T, fieldName: string) => {
            const result = schema.safeParse(value);
            if (!result.success) {
                const errorsFound = result.error.errors;
                const messages = errorsFound.map((err) => fieldName+' : '+err.path.join(' > ')+ ' - ' + err.message);
                const uniqueMessages = [...new Set( messages ) ];
                // errors.push(`${fieldName} tiene errores:\n${uniqueMessages}`);
                errors.concat(uniqueMessages);
            }
        };
    
    
        // Validaciones
        validateField(CvBaseSchema, useFormInstance.cv, "CV");
        validateField(ContactBaseSchema, useFormInstance.contact, "Contacto");
        validateField(SkillBaseSchema.array(), useFormInstance.skills, "Habilidades");
        validateField(WorkExperienceBaseSchema.array(), useFormInstance.worksExperiences, "Experiencia laboral");
        validateField(StudyBaseSchema.array(), useFormInstance.studies, "Estudios");
        validateField(LanguageBaseSchema.array(), useFormInstance.languages, "Idiomas");

        if (errors.length > 0) {
            return { success: false, errors };
        }
    
        return {
            success: true,
            data: {
                cv: useFormInstance.cv,
                contact: useFormInstance.contact,
                skills: useFormInstance.skills,
                works_experiences: [...useFormInstance.worksExperiences],
                studies: useFormInstance.studies,
                languages: useFormInstance.languages,
            },
        };
    };
    
    const handleSaveForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { success, data, errors } = makeRequest();

        if (!success) {
            setErrors(errors || []);
            return;
        }

        try {
            await cvService.store(data);
            toast.success("Formulario enviado con éxito");

            navigation("/");

        } catch (error) {
            handleErrorsRequest(error);
        }
    }; 


    return {
        useFormInstance,
        errorsValidations,
        handleClearForm,
        makeRequest,
        handleSaveForm,
    }

}

export default useFormCreate;