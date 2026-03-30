import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { ProjectItem, getEmptyProject } from '@/types/forms';

type ProjectField = keyof ProjectItem;

interface ProjectFormProps {
    projects: ProjectItem[];
    onAdd: () => void;
    onRemove: (index: number) => void;
    onUpdate: (index: number, field: ProjectField, value: string) => void;
}

export default function ProjectForm({ projects, onAdd, onRemove, onUpdate }: ProjectFormProps) {
    return (
        <div className="space-y-4">
            {projects.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No hay proyectos agregados</p>
            ) : (
                projects.map((proj, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <Label className="text-xs text-muted-foreground">Título del proyecto</Label>
                                <Input
                                    placeholder="Nombre del proyecto"
                                    value={proj.title || ''}
                                    onChange={(e) => onUpdate(index, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <Label className="text-xs text-muted-foreground">URL del proyecto</Label>
                                <Input
                                    placeholder="https://mi-proyecto.com"
                                    value={proj.project_url || ''}
                                    onChange={(e) => onUpdate(index, 'project_url', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <Label className="text-xs text-muted-foreground">GitHub URL</Label>
                                <Input
                                    placeholder="https://github.com/usuario/proyecto"
                                    value={proj.github_url || ''}
                                    onChange={(e) => onUpdate(index, 'github_url', e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label className="text-xs text-muted-foreground">Descripción</Label>
                            <textarea
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Describe el proyecto, tecnologías usadas y funcionalidades..."
                                value={proj.description || ''}
                                onChange={(e) => onUpdate(index, 'description', e.target.value)}
                            />
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
                <Plus className="h-4 w-4 mr-1" /> Agregar proyecto
            </Button>
        </div>
    );
}

export { getEmptyProject };
