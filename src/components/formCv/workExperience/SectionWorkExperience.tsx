import { WorkExperienceBase } from "@/types/WorkExperience";
import Section from "../../Section";
import NoRecords from "../../NoRecords";
import React from "react";
import FormWorkExperience from "./FormWorkExperience";
import Acordeon from "@/components/Acordeon";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';



interface WorkExperienceProps {
    cvId: number | null,
    worksExperience: WorkExperienceBase[];
    setWorkExperience: React.Dispatch<React.SetStateAction<WorkExperienceBase[]>>;
}

function SectionWorkExperience({ cvId, worksExperience, setWorkExperience }: WorkExperienceProps ) {

    const addItem = () => {
        const newWorkExperience: WorkExperienceBase = {
            id: null,
            cv_id: cvId,
            name: '',
            company: '',
            position: '',
            start_date: '',
            end_date: '',
            description: '',
            current: false,
            city: "",
            country: "",
            achievements: [],
            status: true,
        };
        setWorkExperience(prev => [...prev, newWorkExperience]);
    }

    const updateItem = (index: number, item: Partial<WorkExperienceBase>) => {
        setWorkExperience(prev => prev.map((w, i) => i === index ? { ...w, ...item } : w));
    }

    const removeItem = (index: number) => {
        setWorkExperience(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <Section title="Experiencia laboral" className="mb-2" addItemFunc={addItem} >
            {
                worksExperience.length > 0 
                ? worksExperience
                    .map((item, index) => (
                        <Acordeon
                            key={index} 
                            title={`EXP ${item.company || 'nuevo'}`}
                            footer={
                                <Button variant={'destructive'} onClick={ () => removeItem(index) } >
                                    <Trash2 />
                                    Eliminar
                                </Button>
                            }
                            >
                            <FormWorkExperience
                                workExperience={item}  
                                updateWorkExperience={ newWorkExperience => updateItem(index, newWorkExperience) }
                            />
                        </Acordeon>
                    ))
                : <NoRecords text="Experiencias laborales registradas"  />
            }
        </Section>
    )
}

export default SectionWorkExperience;