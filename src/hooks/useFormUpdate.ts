import cvService from '@/services/cvService';
import { CvBaseSchema } from '@/types/Cv';
import { SkillBaseSchema } from '@/types/Skill';
import {
    WorkExperienceBaseSchema,
} from '@/types/WorkExperience';
import useFormCv from '@/hooks/useFormCv';
import { StudyBaseSchema } from '@/types/Study';
import { LanguageBaseSchema } from '@/types/Laguage';
import { toast } from 'react-toastify';
import { ZodSchema } from 'zod';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { ContactBaseSchema } from '@/types/Contact';
import useErrors from './useError';

function useFormUpdate() {
    const { id } = useParams();

    const useFormInstance = useFormCv();
    const {
        errors: errorsValidations,
        setErrors,
        handleErrorsRequest,
    } = useErrors();

    const handleClearForm = () => {
        getCv();
    };

    const getCv = async () => {
        try {
            const data = await cvService.show(Number(id));

            useFormInstance.setCv({
                id: data.id,
                name: data.title || '',
                subject: data.target_role || '',
                version: String(data.versions?.length || 1),
                resume: data.job_description || '',
                language: 'esp',
            });

        } catch (error) {
            console.error(error);
        }
    };

    const makeRequest = () => {
        const errors: string[] = [];

        const validateField = <T>(
            schema: ZodSchema<T>,
            value: T,
            fieldName: string
        ) => {
            const result = schema.safeParse(value);
            if (!result.success) {
                const errorsFound = result.error.errors;
                const messages = errorsFound.map(
                    (err) =>
                        fieldName +
                        ' : ' +
                        err.path.join(' > ') +
                        ' - ' +
                        err.message
                );
                const uniqueMessages = [...new Set(messages)];
                errors.concat(uniqueMessages);
            }
        };

        validateField(CvBaseSchema, useFormInstance.cv, 'CV');
        validateField(ContactBaseSchema, useFormInstance.contact, 'Contacto');
        validateField(
            SkillBaseSchema.array(),
            useFormInstance.skills,
            'Habilidades'
        );
        validateField(
            WorkExperienceBaseSchema.array(),
            useFormInstance.worksExperiences,
            'Experiencia laboral'
        );
        validateField(
            StudyBaseSchema.array(),
            useFormInstance.studies,
            'Estudios'
        );
        validateField(
            LanguageBaseSchema.array(),
            useFormInstance.languages,
            'Idiomas'
        );

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
            await cvService.update(Number(id), data);
            toast.success('Formulario enviado con éxito');
        } catch (error) {
            handleErrorsRequest(error);
        }
    };

    const handlePdf = async (id: number) => {
        const a = document.createElement('a');
        a.href = cvService.pdf(id);
        a.target = '_blank';
        a.click();
    };

    useEffect(() => {
        getCv();
    }, []);

    return {
        id,
        useFormInstance,
        errorsValidations,
        handleClearForm,
        makeRequest,
        handleSaveForm,
        handlePdf,
    };
}

export default useFormUpdate;
