import { useState } from "react";
import { ContactBase } from "@/types/Contact";
import useForm from "@/hooks/useForm";
import { StudyBase } from "@/types/Study";
import { LanguageBase } from "@/types/Laguage";
import { CvBase } from "@/types/Cv";
import { SkillBase } from "@/types/Skill";
import { WorkExperienceBase } from "@/types/WorkExperience";



function useFormCv(){

    const { 
        values: cv, 
        handleValues: handleCv,
        setValues: setCv
    } = useForm<CvBase>({ 
        id: null,
        name: '',
        subject: '',
        version: '',
        resume: '',
        language: '',
    });


    const { 
        values: contact, 
        handleValues: handleContact,
        setValues: setContact 
    } = useForm<ContactBase>({
        id: null,
        cv_id: null,
        name: "",
        last_name: "",
        phone: "",
        email: "",
        linkedin: "",
        github: "",
        portafolio: "",
        city: "",
        country: "",
    })

    const [skills, setSkills] = useState<SkillBase[]>([]);
    const [worksExperiences, setWorksExperiences] = useState<WorkExperienceBase[]>([]);
    const [studies, setStudies] = useState<StudyBase[]>([]);
    const [languages, setLanguages] = useState<LanguageBase[]>([]);


    const resetForm = () => {
        setCv({
            id: null,
            name: '',
            subject: '',
            version: '',
            resume: '',
            language: '',
        });
        setContact({
            id: null,
            cv_id: null,
            name: "",
            last_name: "",
            phone: "",
            email: "",
            linkedin: "",
            github: "",
            portafolio: "",
            city: "",
            country: "",
        });
        setSkills([]);
        setWorksExperiences([]);
        setStudies([]);
        setLanguages([]);
    }


    return {
        resetForm,
        cv,
        handleCv,
        setCv,
        contact,
        handleContact,
        setContact,
        skills,
        setSkills,
        worksExperiences,
        setWorksExperiences,
        studies,
        setStudies,
        languages,
        setLanguages
    }
}

export default useFormCv;