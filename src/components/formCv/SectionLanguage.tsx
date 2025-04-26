import { LanguageBase } from "@/types/Laguage";
import Section from "../Section";
import Input from "../Input";
import Acordeon from "../Acordeon";
import NoRecords from "../NoRecords";
import { Button } from "../ui/button";
import { Trash2 } from 'lucide-react';



interface FormLanguageProps {
    language: LanguageBase;
    changeLanguage: (Language: LanguageBase) => void;
}

function FormLanguage({ language, changeLanguage: setLanguage }: FormLanguageProps) {

    const handleInput = (e :React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLanguage({
            ...language, 
            [name]: value
        });
    }

    return (
        <div className='grid grid-cols-2 gap-4'>
            <Input
                label="Name" 
                placeholder="Name" 
                name="name"
                value={language.name}
                onChange={ handleInput }

            />
            <Input 
                label="Nivel" 
                placeholder="Nivel" 
                name="nivel"
                value={language.nivel}
                onChange={ handleInput }
            />
        </div>
    );
}



interface SectionLanguageProps {
    cvId: number | null,
    languages: LanguageBase[];
    setLanguages: React.Dispatch<React.SetStateAction<LanguageBase[]>>;
}

export default function SectionLanguage({ cvId, languages: languages, setLanguages: setLanguages } : SectionLanguageProps) {
    
    
    const addLanguage = () => {
        const newLanguage: LanguageBase = {
            id: null,
            cv_id: cvId,
            name: '',
            nivel: '',
            description: '',
            status: true,
        }

        setLanguages([
            ...languages, 
            newLanguage
        ]);
    }

    const removeLanguage = (index : number) => {
        setLanguages(prev => prev.filter((_, i) => i !== index));
    }

    const updateLanguage = (index : number, newLanguage : LanguageBase) => {
        setLanguages(prev => prev.map((language, i) => i === index ? newLanguage : language));
    }

    return (
        <Section title="Idiomas" addItemFunc={ addLanguage }>
            {
                languages.length > 0
                ? languages.map((language, index) => (
                    <Acordeon 
                        key={index}
                        title={`Idioma ${language.name}`}
                        footer={ 
                            <Button size={'sm'} variant={'destructive'} onClick={ () => removeLanguage(index) } >
                                <Trash2 />
                                Eliminar
                            </Button>
                        } 
                        >
                        <FormLanguage 
                            language={language}
                            changeLanguage={ newLanguage => updateLanguage(index, newLanguage) }
                        />
                    </Acordeon>
                ))
                : <NoRecords text="No hay idiomas" />
            }           
        </Section>
    )
}