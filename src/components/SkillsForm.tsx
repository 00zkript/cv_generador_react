import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { SkillItem, getEmptySkill, SKILL_LEVELS, SKILL_CATEGORIES } from '@/types/forms';

type SkillField = keyof SkillItem;

interface SkillsFormProps {
    skills: SkillItem[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: SkillField, value: string | number | undefined) => void;
}

export default function SkillsForm({ skills, onAdd, onRemove, onUpdate }: SkillsFormProps) {
    return (
        <div className="space-y-4">
            {skills.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No hay habilidades agregadas</p>
            ) : (
                skills.map((skill, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div>
                                <Label className="text-xs text-muted-foreground">Habilidad</Label>
                                <Input
                                    placeholder="JavaScript, React, Python..."
                                    value={skill.name || ''}
                                    onChange={(e) => onUpdate(index, 'name', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Años de experiencia</Label>
                                <Input
                                    type="number"
                                    placeholder="Años"
                                    min={0}
                                    max={50}
                                    value={skill.years_experience ?? ''}
                                    onChange={(e) => onUpdate(index, 'years_experience', e.target.value ? parseInt(e.target.value) : undefined)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Nivel</Label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={skill.level || ''}
                                    onChange={(e) => onUpdate(index, 'level', e.target.value as SkillItem['level'])}
                                >
                                    <option value="">Seleccionar</option>
                                    {SKILL_LEVELS.map(level => (
                                        <option key={level.value} value={level.value}>{level.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Categoría</Label>
                                <select
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={skill.category || ''}
                                    onChange={(e) => onUpdate(index, 'category', e.target.value as SkillItem['category'])}
                                >
                                    <option value="">Seleccionar</option>
                                    {SKILL_CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive mr-1" /> Eliminar
                            </Button>
                        </div>
                    </div>
                ))
            )}
            <Button variant="outline" onClick={onAdd}>
                <Plus className="h-4 w-4 mr-1" /> Agregar habilidad
            </Button>
        </div>
    );
}

export { getEmptySkill };
