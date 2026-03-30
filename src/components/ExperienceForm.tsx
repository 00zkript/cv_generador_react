import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { ExperienceItem, getEmptyExperience } from '@/types/forms';

type ExperienceField = keyof ExperienceItem;

interface ExperienceFormProps {
    experiences: ExperienceItem[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: ExperienceField, value: string | boolean | undefined) => void;
}

export default function ExperienceForm({ experiences, onAdd, onRemove, onUpdate }: ExperienceFormProps) {
    return (
        <div className="space-y-4">
            {experiences.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No hay experiencia laboral agregada</p>
            ) : (
                experiences.map((exp, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs text-muted-foreground">Empresa</Label>
                                <Input
                                    placeholder="Nombre de la empresa"
                                    value={exp.company || ''}
                                    onChange={(e) => onUpdate(index, 'company', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Puesto</Label>
                                <Input
                                    placeholder="Puesto o cargo"
                                    value={exp.role || ''}
                                    onChange={(e) => onUpdate(index, 'role', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Fecha de inicio</Label>
                                <Input
                                    type="date"
                                    value={exp.start_date || ''}
                                    onChange={(e) => onUpdate(index, 'start_date', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">Fecha de culminación</Label>
                                <Input
                                    type="date"
                                    disabled={exp.is_current}
                                    value={exp.end_date || ''}
                                    onChange={(e) => onUpdate(index, 'end_date', e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Descripción</Label>
                            <textarea
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Describe tus responsabilidades y logros..."
                                value={exp.description || ''}
                                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id={`current-exp-${index}`}
                                    checked={!!exp.is_current}
                                    onChange={(e) => {
                                        onUpdate(index, 'is_current', e.target.checked);
                                        if (e.target.checked) {
                                            onUpdate(index, 'end_date', undefined);
                                        }
                                    }}
                                    className="w-4 h-4"
                                />
                                <Label htmlFor={`current-exp-${index}`} className="text-sm cursor-pointer">Trabajo actual</Label>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
                                <Trash2 className="h-4 w-4 text-destructive mr-1" /> Eliminar
                            </Button>
                        </div>
                    </div>
                ))
            )}
            <Button variant="outline" onClick={onAdd}>
                <Plus className="h-4 w-4 mr-1" /> Agregar experiencia
            </Button>
        </div>
    );
}

export { getEmptyExperience };
