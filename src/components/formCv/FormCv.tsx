import Section from "@/components/Section";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import SectionSkills from "@/components/formCv/skill/SectionSkills";
import SectionWorkExperience from "@/components/formCv/workExperience/SectionWorkExperience";
import SectionStudy from "@/components/formCv/SectionStudies";
import SectionLanguage from "@/components/formCv/SectionLanguage";
import useFormCv from "@/hooks/useFormCv";
import { Button } from "../ui/button";
import { formatearBold, formatearList } from "@/lib/formatText";


type Props = ReturnType<typeof useFormCv> & {
    onSubmit: (e : React.FormEvent<HTMLFormElement>) => void;
    header?: React.ReactNode;
    children?: React.ReactNode;
    footer?: React.ReactNode;
}


export default function FormCv({
    onSubmit,
    header,
    children,
    footer,
    cv,
    setCv,
    handleCv,
    contact,
    handleContact,
    skills,
    setSkills,
    worksExperiences,
    setWorksExperiences,
    studies,
    setStudies,
    languages,
    setLanguages
}: Props) {

    const formatearCvResume = () => {
        const newText = formatearBold(cv.resume);
        const newText2 = formatearList(newText);
        setCv({ ...cv, resume: newText2 });
    }
    

    return (
        <form onSubmit={onSubmit}>
            {header}

            <Section title="Datos del CV" className="mb-2">
                <div className='grid grid-cols-3 gap-4'>
                    <Input 
                        label="Nombre" 
                        placeholder="Nombre" 
                        name="name"
                        value={cv.name} 
                        onChange={ handleCv } 
                    />
                    <Input 
                        label="Version" 
                        placeholder="Version" 
                        name="version"
                        value={cv.version} 
                        onChange={ handleCv } 
                    />
                    <div>
                        <label className="form-label" htmlFor="language">Idioma:</label>
                        <select className="form-control" name="language" id="language" title="Idioma" value={cv.language} onChange={ handleCv } >
                            <option value="" hidden >[---Seleccione---]</option>
                            <option value="esp">Español</option>
                            <option value="eng">Ingles</option>
                        </select>
                    </div>
                </div>
                <Textarea 
                    label="Propósito" 
                    placeholder='Propósito' 
                    name="subject"
                    value={cv.subject} 
                    onChange={ handleCv } 
                />

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <label className="form-label">Resumen</label>
                        <Button 
                            variant={'outline'} 
                            className="my-2" 
                            onClick={formatearCvResume}
                            size={'sm'}
                            >
                            Formatear
                        </Button>

                    </div>

                    <textarea 
                        placeholder='Escribe tu resumen ...' 
                        name="resume"
                        value={cv.resume} 
                        onChange={ handleCv } 
                        className="form-control"
                        rows={16}
                    />
                </div>
            </Section>


            <Section title="Datos de contacto" className="mb-2">
                <div className='grid grid-cols-2 gap-4'>
                    <Input 
                        label="Nombres" 
                        placeholder="Nombres" 
                        name="name"
                        value={contact.name} 
                        onChange={ handleContact } 
                    />
                    <Input 
                        label="Apellidos" 
                        placeholder="Apellidos" 
                        name="last_name"
                        value={contact.last_name} 
                        onChange={ handleContact }
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <Input 
                        label="Ciduad" 
                        placeholder="Ciduad" 
                        name="city"
                        value={contact.city} 
                        onChange={ handleContact } 
                    />
                    <Input 
                        label="País" 
                        placeholder="País" 
                        name="country"
                        value={contact.country} 
                        onChange={ handleContact }
                    />
                </div>

                <div className='grid grid-cols-3 gap-4'>
                    <Input 
                        label="Numero" 
                        placeholder="Numero"
                        name="phone"
                        value={contact.phone} 
                        onChange={ handleContact } 
                    />
                    <Input 
                        label="Linkedin" 
                        placeholder="Linkedin"
                        name="linkedin"
                        value={contact.linkedin} 
                        onChange={ handleContact } 
                    />
                    <Input 
                        label="Correo" 
                        placeholder="Correo"
                        type="mail" 
                        name="email"
                        value={contact.email} 
                        onChange={ handleContact } 
                    />
                </div>
            </Section>


            <SectionSkills 
                cvId={cv.id}
                skills={skills}
                setSkills={setSkills} 
            />

            <SectionWorkExperience 
                cvId={cv.id}
                worksExperience={worksExperiences}
                setWorkExperience={setWorksExperiences}
             />

            <SectionStudy
                cvId={cv.id}
                studies={studies}
                setStudies={setStudies}
            />

            <SectionLanguage
                cvId={cv.id}
                languages={languages}
                setLanguages={setLanguages}
            />

            {children}
            
            {footer}
        </form>
    );
}



