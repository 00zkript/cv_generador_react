import { SkillBase } from "@/types/Skill";
import Input from "@/components/Input";
// import Textarea from "@/components/Textarea";

interface FormSkillProps{
    skill: SkillBase;
    changeSkill: (skill : SkillBase) => void;
}

export default function FormSkill({ skill, changeSkill }: FormSkillProps) {

    const handleInput = (e : React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        changeSkill({
            ...skill,
            [name]: value
        });
    }

    return (
        <div className="">
            <Input 
                label="Nombre" 
                placeholder="Nombre" 
                name="name" 
                value={skill.name} 
                onChange={ handleInput }  
            />
            {/* <Input 
                label="Tiempo" 
                placeholder="Tiempo" 
                name="time_level" 
                value={skill.time_level} 
                onChange={ handleInput }  
            />
            <div className='col-span-2'>
                <Input 
                    label='Descripción' 
                    placeholder='Descripción' 
                    name="description" 
                    value={skill.description} 
                    onChange={handleInput} 
                />
            </div> */}
        </div>
    )
}
