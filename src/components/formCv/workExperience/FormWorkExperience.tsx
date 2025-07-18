import Input from '@/components/Input';
import { WorkExperienceBase } from '@/types/WorkExperience';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';

interface FormWorkExperienceProps {
    workExperience: WorkExperienceBase;
    updateWorkExperience: (workExperience: WorkExperienceBase) => void;
}

export default function FormWorkExperience({
    workExperience,
    updateWorkExperience,
}: FormWorkExperienceProps) {
    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        updateWorkExperience({ ...workExperience, [name]: value });
    };

    const handleInputCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        updateWorkExperience({ ...workExperience, [name]: checked });
    };

    return (
        <div className="grid grid-cols-3 gap-4">
            <Input
                label="Empresa"
                placeholder="Empresa"
                name="company"
                value={workExperience.company}
                onChange={handleInput}
            />
            <Input
                label="Cargo"
                placeholder="Cargo"
                name="position"
                value={workExperience.position}
                onChange={handleInput}
            />
            <Input
                label="Ciudad"
                placeholder="Ciudad"
                name="city"
                value={workExperience.city}
                onChange={handleInput}
            />
            <Input
                label="País"
                placeholder="País"
                name="country"
                value={workExperience.country}
                onChange={handleInput}
            />
            <Input
                type="date"
                label="Fecha desde"
                name="start_date"
                value={workExperience.start_date}
                onChange={handleInput}
            />
            <Input
                type="date"
                label="Fecha hasta"
                name="end_date"
                value={workExperience.end_date}
                onChange={handleInput}
                disabled={workExperience.current}
            />

            <div>
                <input
                    type="checkbox"
                    name="current"
                    value="1"
                    checked={workExperience.current}
                    onChange={handleInputCheckbox}
                />
                <label> ¿Actualmente?</label>
            </div>

            <div className="col-span-3 relative">
                <label className="form-label">Descripción</label>
                <div className="editor-wrapper prose max-w-none dark:prose-invert">
                    <SimpleEditor
                        content={workExperience.description}
                        setContent={(value) =>
                            updateWorkExperience({
                                ...workExperience,
                                description: value,
                            })
                        }
                    />
                </div>
            </div>
            <div className="col-span-3 relative">
                <label className="form-label">Logros</label>
                <div className="editor-wrapper prose max-w-none dark:prose-invert">
                    <SimpleEditor
                        content={workExperience.achievements}
                        setContent={(value) =>
                            updateWorkExperience({
                                ...workExperience,
                                achievements: value,
                            })
                        }
                    />
                </div>
            </div>

            {/* <div className="col-span-3">
                <AchievementsList
                    achievements={workExperience.achievements}
                    addAchievement={addAchievement}
                    updateAchievementDescription={updateAchievementDescription}
                    removeAchievement={removeAchievement}
                />
            </div> */}
        </div>
    );
}
