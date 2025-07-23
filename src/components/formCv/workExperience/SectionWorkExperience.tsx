import { WorkExperienceBase } from '@/types/WorkExperience';
import Section from '../../Section';
import NoRecords from '../../NoRecords';
import React from 'react';
import FormWorkExperience from './FormWorkExperience';
import Acordeon from '@/components/Acordeon';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export interface SectionWorkExperienceProps {
    cvId: number | null;
    worksExperience: WorkExperienceBase[];
    setWorkExperience: React.Dispatch<
        React.SetStateAction<WorkExperienceBase[]>
    >;
}

function SectionWorkExperience({
    cvId,
    worksExperience,
    setWorkExperience,
}: SectionWorkExperienceProps) {
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
            city: '',
            country: '',
            achievements: '',
            status: true,
        };
        setWorkExperience((prev) => [...prev, newWorkExperience]);
    };

    const updateItem = (index: number, item: Partial<WorkExperienceBase>) => {
        setWorkExperience((prev) =>
            prev.map((w, i) => (i === index ? { ...w, ...item } : w))
        );
    };

    const removeItem = (index: number) => {
        setWorkExperience((prev) => prev.filter((_, i) => i !== index));
    };

    let content: React.ReactNode = (
        <NoRecords text="Experiencias laborales registradas" />
    );

    if (worksExperience.length > 0) {
        content = worksExperience.map((item, index) => {
            const btnFooter = (
                <Button
                    variant={'destructive'}
                    onClick={() => removeItem(index)}
                >
                    <Trash2 />
                    Eliminar
                </Button>
            );

            const handleUpdate = (newWorkExperience: WorkExperienceBase) => {
                updateItem(index, newWorkExperience);
            };

            return (
                <Acordeon
                    key={item.id}
                    title={`EXP ${item.company || 'nuevo'}`}
                    footer={btnFooter}
                >
                    <FormWorkExperience
                        workExperience={item}
                        updateWorkExperience={handleUpdate}
                    />
                </Acordeon>
            );
        });
    }

    return (
        <Section
            title="Experiencia laboral"
            className="mb-2"
            addItemFunc={addItem}
        >
            {content}
        </Section>
    );
}

export default SectionWorkExperience;
