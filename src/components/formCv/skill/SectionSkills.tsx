// import Section from "@/components/Section";
import NoRecords from "@/components/NoRecords";
import { SkillBase } from "@/types/Skill";
import FormSkill from "./FormSkill";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2 } from 'lucide-react';
import Acordeon from "@/components/Acordeon";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import { useState } from "react";



interface SectionSkillProps{
    cvId: number | null,
    skills: SkillBase[];
    setSkills: React.Dispatch<React.SetStateAction<SkillBase[]>>;
} 

export default function SectionSkills({ cvId, skills, setSkills }: SectionSkillProps  ) {

    const addItem = () => {
        const newSkill: SkillBase = {
            id: null,
            cv_id: cvId,
            name: '',
            time_level: '',
            description: '',
            status: true,
        };
        
        setSkills([...skills, newSkill ])
    }

    const updateItem = (index: number, newSkill : SkillBase) => {
        setSkills( prev => prev.map( (skill, i) => i === index ? newSkill : skill));
    }

    const removeItem = (index: number) => {
        setSkills( prev => prev.filter( ( _, i) => i !== index));
    }

    const [text, setText] = useState<string>('');

    const extraerText = () => {
        if (text === '') return;
        const textArray = text.split('\n');
        const newSkills = textArray.map( (name) => ({ id: null, cv_id: cvId, name, time_level: '', description: '', status: true }));
        setSkills(newSkills);
        setText('');
    }

    return (
        <Acordeon title="Habilidades"  >
            <>
                <div className="mb-4 relative">
                    <Textarea
                        label=""
                        placeholder="Extraer texto de habilidades"
                        name="text"
                        value={text}
                        onChange={ e => setText(e.target.value) }
                    />
                    <Button variant={'outline'} className="my-2 inserted"  onClick={extraerText}>Extraer</Button>
                </div>
                <hr />

                <div className="grid grid-cols-3 gap-4">
                    { skills.length > 0 
                        ? skills.map( (skill, index) => (
                                <div className="" key={index}>
                                    <Textarea 
                                        label="Nombre" 
                                        placeholder="Nombre" 
                                        name="name" 
                                        value={skill.name} 
                                        onChange={ e => updateItem(index, { ...skill, name: e.target.value}) } 
                                        maxLength={250}
                                    />

                                    <Button variant={'destructive'} className="my-2" size="sm" onClick={ () => removeItem(index) } >
                                        <Trash2 />
                                        Eliminar
                                    </Button>

                                </div>
                        ))
                        : (
                            <div className="col-span-3">
                                <NoRecords text="habilidades registradas" />
                            </div>
                        )
                    }
                </div>

                <div className="flex justify-center p-2">
                    <Button variant={'ghost'} onClick={addItem}>
                        <CirclePlus />
                        Agregar
                    </Button>
                </div>
            </>
        </Acordeon>
    )

}
