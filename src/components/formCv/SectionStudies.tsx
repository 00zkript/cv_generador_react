import { StudyBase } from "@/types/Study";
import Section from "../Section";
import NoRecords from "../NoRecords";
import Input from "../Input";
import Acordeon from "../Acordeon";
import { Button } from "../ui/button";
import { Trash2 } from 'lucide-react';
import Textarea from "../Textarea";


interface FormStudyProps {
    study: StudyBase;
    setStudy: (study: StudyBase) => void;
}

function FormStudy({ study, setStudy }: FormStudyProps) {

    const handleInput = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStudy({
            ...study,
            [name]: value
        });
    }

    const handleInputCheckbox = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setStudy({ ...study, [name] : checked });
    }


    return (
        <div className="grid grid-cols-3 gap-4">
            <Input 
                label="Centro estudios" 
                placeholder="Centro estudios"  
                name="center_study"
                value={study.center_study}
                onChange={handleInput}
            />
            <Input 
                label="Titulo" 
                placeholder="Titulo"  
                name="title"
                value={study.title}
                onChange={handleInput}
            />
            <Input 
                label="Ciudad" 
                placeholder="Ciudad"  
                name="city"
                value={study.city}
                onChange={handleInput}
            />
            <Input 
                label="País" 
                placeholder="País"  
                name="country"
                value={study.country}
                onChange={handleInput}
            />
            <Input 
                type="date"
                label="Fecha desde" 
                placeholder="Fecha desde"  
                name="start_date"
                value={study.start_date}
                onChange={handleInput}
            />
            <Input 
                type="date"
                label="Fecha hasta" 
                placeholder="Fecha hasta"  
                name="end_date"
                value={study.end_date}
                onChange={handleInput}
            />
            <div>
                <input 
                    type="checkbox" 
                    name="current"
                    value="1"
                    checked={study.current}
                    onChange={handleInputCheckbox}
                />
                <label> ¿Actualmente?</label> 
            </div>

            <div className="col-span-3">
                <Textarea
                    label="Descripción" 
                    placeholder="Descripción"  
                    name="description"
                    value={study.description}
                    onChange={handleInput}
                />
            </div>
        </div>
    )
}

interface SectionStudyProps{
    cvId: number | null,
    studies: StudyBase[];   
    setStudies: React.Dispatch<React.SetStateAction<StudyBase[]>>;
}

export default function SectionStudy({ cvId, studies, setStudies: setStudies } : SectionStudyProps) {

    const addItem = () => {
        const newStudy: StudyBase = {
            id: null,
            cv_id: cvId,
            center_study: '',
            title: '',
            start_date: '',
            end_date: '',
            description: '',
            status: true,
            city: "",
            country: "",
            current: false,
        };
        setStudies([...studies, newStudy]);
    }
    const removeItem = (index: number) => {
        setStudies(prev => prev.filter((_, i) => i !== index));
    }

    const updateItem = (index: number, newStudy: StudyBase) => {
        setStudies(prev => prev.map((study, i) => i === index ? newStudy : study));
    }

    return (
        <Section title="Estudios" className="mb-2" addItemFunc={addItem}>
            {
                studies.length > 0
                ? studies.map((study, index) => (
                    <Acordeon 
                        key={index}
                        title={`Estudio #${index + 1}`}
                        footer={ 
                            <Button variant={'destructive'} onClick={ () => removeItem(index) } >
                                <Trash2 />
                                Eliminar
                            </Button>
                        }
                        >
                        <FormStudy
                            study={study}
                            setStudy={ newStudy => updateItem(index, newStudy) }
                        />
                    </Acordeon>
                ))
                : (<NoRecords text="estudios registradas" />)

            }
            
        </Section>
    )
}