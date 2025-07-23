import cvService from '@/services/cvService';
import { CvBaseSchema } from '@/types/Cv';
import { SkillBaseSchema } from '@/types/Skill';
import {
    WorkExperienceBase,
    WorkExperienceBaseSchema,
} from '@/types/WorkExperience';
import useFormCv from '@/hooks/useFormCv';
import { StudyBase, StudyBaseSchema } from '@/types/Study';
import { LanguageBaseSchema } from '@/types/Laguage';
import { toast } from 'react-toastify';
import { ZodSchema } from 'zod';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { ContactBaseSchema } from '@/types/Contact';
import useErrors from './useError';
import { format } from '@formkit/tempo';

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
                name: data.name,
                subject: data.subject,
                version: data.version,
                resume: data.resume,
                status: data.status,
                language: data.language,
            });

            useFormInstance.setContact({
                id: data.contact.id,
                cv_id: data.contact.cv_id,
                name: data.contact.name,
                last_name: data.contact.last_name,
                phone: data.contact.phone,
                email: data.contact.email,
                linkedin: data.contact.linkedin,
                github: data.contact.github,
                portafolio: data.contact.portafolio,
                status: true,
                city: data.contact.city,
                country: data.contact.country,
            });

            useFormInstance.setSkills(data.skills);
            useFormInstance.setWorksExperiences(
                data.works_experiences.map((work: WorkExperienceBase) => ({
                    ...work,
                    start_date: work.start_date
                        ? format(work.start_date, 'YYYY-MM-DD')
                        : null,
                    end_date: work.end_date
                        ? format(work.end_date, 'YYYY-MM-DD')
                        : null,
                }))
            );
            useFormInstance.setStudies(
                data.studies.map((study: StudyBase) => ({
                    ...study,
                    start_date: study.start_date
                        ? format(study.start_date, 'YYYY-MM-DD')
                        : null,
                    end_date: study.end_date
                        ? format(study.end_date, 'YYYY-MM-DD')
                        : null,
                }))
            );
            useFormInstance.setLanguages(data.languages);
        } catch (error) {
            console.error(error);
        }
    };

    const makeRequest = () => {
        const errors: string[] = [];

        // Función auxiliar para validar y formatear errores
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
                // errors.push(`${fieldName} tiene errores:\n${uniqueMessages}`);
                errors.concat(uniqueMessages);
            }
        };

        // Validaciones
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
        // console.log('Imprimiendo Cv...');
        // console.log(id);
        // http://localhost:8000/cvs/1/pdf
        const a = document.createElement('a');
        a.href = cvService.pdf(id);
        a.target = '_blank';
        a.click();
    };

    useEffect(() => {
        getCv();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
