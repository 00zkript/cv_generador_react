import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import cvService, { GenerateCvData } from '@/services/cvService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

export default function CreateCv() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<GenerateCvData>({
        title: '',
        target_role: '',
        target_company: '',
        job_description: '',
    });

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    const handleChange = (field: keyof GenerateCvData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateWithAI = async () => {
        if (!formData.target_role || !formData.target_company || !formData.job_description) {
            toast.error('Por favor completa los campos: Puesto, Empresa y Descripción del trabajo');
            return;
        }

        setLoading(true);
        try {
            const result = await cvService.generate(formData);
            toast.success('CV generado exitosamente con IA');
            navigate(`/cv/editar/${result.cv_id}`);
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            const message = err.response?.data?.message || 'Error al generar el CV con IA';
            
            if (message.includes('perfil') || message.includes('suficientes datos')) {
                toast.error(message + ' Completa tu perfil primero.');
            } else {
                toast.error(message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEmpty = async () => {
        setLoading(true);
        try {
            const result = await cvService.store({
                cv: {
                    title: formData.title || `${formData.target_role} - ${formData.target_company}`,
                    target_role: formData.target_role,
                    target_company: formData.target_company,
                    job_description: formData.job_description,
                },
            });
            toast.success('CV creado exitosamente');
            navigate(`/cv/editar/${result.id}`);
        } catch (error) {
            console.error('Error creating CV:', error);
            toast.error('Error al crear el CV');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Crear Nuevo CV</h1>
                <p className="text-muted-foreground mt-1">
                    Genera un CV optimizado para el puesto que buscas usando IA
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información del CV</CardTitle>
                    <CardDescription>
                        Ingresa los datos del puesto al que aspiras
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Título (opcional)</label>
                        <Input
                            placeholder="Ej: CV Software Engineer"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">
                            Un nombre para identificar tu CV
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Puesto objetivo *</label>
                        <Input
                            placeholder="Ej: Full Stack Developer"
                            value={formData.target_role}
                            onChange={(e) => handleChange('target_role', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Empresa objetivo *</label>
                        <Input
                            placeholder="Ej: Google, TechCorp Inc."
                            value={formData.target_company}
                            onChange={(e) => handleChange('target_company', e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Descripción del trabajo *</label>
                        <textarea
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Pega aquí la descripción del puesto o las habilidades requeridas..."
                            value={formData.job_description}
                            onChange={(e) => handleChange('job_description', e.target.value)}
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            La IA usará esta información para optimizar tu CV
                        </p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleGenerateWithAI}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Generar CV con IA
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            O
                        </span>
                    </div>
                </div>

                <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={handleCreateEmpty}
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <FileText className="mr-2 h-4 w-4" />
                    )}
                    Crear CV en blanco
                </Button>
            </div>

            <Card className="bg-muted/50">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-medium">¿Cómo funciona?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Al generar con IA, nuestro sistema analizará la descripción del trabajo y 
                                creará un CV optimizado basándose en tu perfil, habilidades y experiencia 
                                previamente registrados.
                            </p>
                            <Button variant="link" className="px-0 h-auto" onClick={() => navigate('/mi-perfil')}>
                                Completa tu perfil primero →
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
