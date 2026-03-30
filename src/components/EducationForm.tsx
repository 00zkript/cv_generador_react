import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { EducationItem, getEmptyEducation } from '@/types/forms';

type EducationField = keyof EducationItem;

interface EducationFormProps {
    education: EducationItem[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: EducationField, value: string | boolean) => void;
}

export default function EducationForm({ education, onAdd, onRemove, onUpdate }: EducationFormProps) {
    return (
        <div className="space-y-4">
            {education.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No hay educación agregada</p>
            ) : (
                education.map((edu, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs text-muted-foreground">Institución</Label>
                                <Input
                                    placeholder="Universidad, Instituto, etc."
                                    value={edu.institution || ''}
                                    onChange={(e) => onUpdate(index, 'institution', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Nivel de estudios</Label>
                                <Input
                                    placeholder="Bachiller, Licenciatura, Maestría, Doctorado"
                                    value={edu.degree || ''}
                                    onChange={(e) => onUpdate(index, 'degree', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Carrera / Campo</Label>
                                <Input
                                    placeholder="Ingeniería, Administración, etc."
                                    value={edu.field_of_study || ''}
                                    onChange={(e) => onUpdate(index, 'field_of_study', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Ubicación</Label>
                                <Input
                                    placeholder="Lima, Perú"
                                    value={edu.location || ''}
                                    onChange={(e) => onUpdate(index, 'location', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Fecha de inicio</Label>
                                <Input
                                    type="date"
                                    value={edu.start_date || ''}
                                    onChange={(e) => onUpdate(index, 'start_date', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Fecha de culminación</Label>
                                <Input
                                    type="date"
                                    disabled={edu.current}
                                    value={edu.end_date || ''}
                                    onChange={(e) => onUpdate(index, 'end_date', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <Label htmlFor={`current-edu-${index}`} className="text-sm cursor-pointer flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={`current-edu-${index}`}
                                        checked={!!edu.current}
                                        onChange={(e) => {
                                            onUpdate(index, 'current', e.target.checked);
                                            if (e.target.checked) {
                                                onUpdate(index, 'end_date', '');
                                            }
                                        }}
                                        className="w-4 h-4"
                                    />

                                    Estudios actuales
                                </Label>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive mr-1" /> Eliminar
                            </Button>
                        </div>
                    </div>
                ))
            )}
            <Button variant="outline" onClick={onAdd}>
                <Plus className="h-4 w-4 mr-1" /> Agregar educación
            </Button>
        </div>
    );
}

export { getEmptyEducation };
