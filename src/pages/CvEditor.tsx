import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import cvService, { Cv, CvContentData, CreateCvData } from '@/services/cvService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EducationForm, { getEmptyEducation } from '@/components/EducationForm';
import { EducationItem } from '@/types/forms';
import { Loader2, Sparkles, Save, FileText, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

interface ExperienceItem {
    company: string;
    role: string;
    period: string;
    highlights: string[];
}

export default function CvEditor() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const isNew = !id || id === 'nuevo';

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [cv, setCv] = useState<Cv | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        target_role: '',
        target_company: '',
        job_description: '',
        summary: '',
        skills: '',
        keywords: '',
        experiences: [] as ExperienceItem[],
        education: [] as EducationItem[],
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (!isNew) {
            loadCv();
        }
    }, [isAuthenticated, navigate, isNew, id]);

    const loadCv = async () => {
        if (!id) return;
        setLoading(true);
        try {
            const data = await cvService.show(Number(id));
            setCv(data);
            
            const latestVersion = data.versions?.[0];
            const content = latestVersion?.content_json;

            setFormData({
                title: data.title || '',
                target_role: data.target_role || '',
                target_company: data.target_company || '',
                job_description: data.job_description || '',
                summary: content?.summary || '',
                skills: content?.skills?.join(', ') || '',
                keywords: content?.keywords?.join(', ') || '',
                experiences: content?.experience_highlights?.map(exp => ({
                    company: exp.company,
                    role: exp.role,
                    period: exp.period,
                    highlights: exp.highlights || [],
                })) || [],
                education: content?.education_highlights?.map(edu => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    field_of_study: edu.field_of_study || '',
                    location: edu.location || '',
                    start_date: edu.start_date || '',
                    end_date: edu.end_date || '',
                    current: edu.current || false,
                })) || [],
            });
        } catch (error) {
            console.error('Error loading CV:', error);
            toast.error('Error al cargar el CV');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addExperience = () => {
        setFormData(prev => ({
            ...prev,
            experiences: [...prev.experiences, { company: '', role: '', period: '', highlights: [] }]
        }));
    };

    const updateExperience = (index: number, field: keyof ExperienceItem, value: string | string[]) => {
        setFormData(prev => {
            const experiences = [...prev.experiences];
            experiences[index] = { ...experiences[index], [field]: value };
            return { ...prev, experiences };
        });
    };

    const removeExperience = (index: number) => {
        setFormData(prev => ({
            ...prev,
            experiences: prev.experiences.filter((_, i) => i !== index)
        }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, getEmptyEducation()]
        }));
    };

    const updateEducation = (index: number, field: keyof EducationItem, value: string | boolean) => {
        setFormData(prev => {
            const education = [...prev.education];
            education[index] = { ...education[index], [field]: value };
            return { ...prev, education };
        });
    };

    const removeEducation = (index: number) => {
        setFormData(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const buildContentJson = (): CvContentData => {
        const skills = formData.skills.split(',').map(s => s.trim()).filter(Boolean);
        const keywords = formData.keywords.split(',').map(k => k.trim()).filter(Boolean);
        
        return {
            summary: formData.summary,
            keywords,
            skills,
            experience_highlights: formData.experiences.map(exp => ({
                ...exp,
                highlights: exp.highlights || []
            })),
            education_highlights: formData.education.map(edu => ({
                ...edu,
                degree: edu.degree || '',
                field_of_study: edu.field_of_study || undefined,
            })),
            ats_optimized_content: {},
        };
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const content = buildContentJson();
            
            if (isNew) {
                const cvData: CreateCvData = {
                    title: formData.title || 'Nuevo CV',
                    target_role: formData.target_role,
                    target_company: formData.target_company,
                    job_description: formData.job_description,
                    version: {
                        content: JSON.stringify(content),
                        generated_with: 'manual',
                    },
                };

                const result = await cvService.store(cvData);
                toast.success('CV creado exitosamente');
                navigate(`/cv/editar/${result.id}`, { replace: true });
            } else if (cv) {
                await cvService.update(cv.id, {
                    title: formData.title,
                    target_role: formData.target_role,
                    target_company: formData.target_company,
                    job_description: formData.job_description,
                });
                await cvService.addVersion(cv.id, content);
                toast.success('CV guardado exitosamente');
            }
        } catch (error) {
            console.error('Error saving CV:', error);
            toast.error('Error al guardar el CV');
        } finally {
            setSaving(false);
        }
    };

    const handleGenerateWithAI = async () => {
        if (!formData.target_role || !formData.target_company || !formData.job_description) {
            toast.error('Por favor completa: Puesto, Empresa y Descripción del trabajo');
            return;
        }

        setLoading(true);
        try {
            const result = await cvService.generate({
                title: formData.title,
                target_role: formData.target_role,
                target_company: formData.target_company,
                job_description: formData.job_description,
            });

            const content = result.generated_data;
            setFormData(prev => ({
                ...prev,
                summary: content.summary || '',
                skills: content.skills?.join(', ') || '',
                keywords: content.keywords?.join(', ') || '',
                experiences: content.experience_highlights || [],
                education: content.education_highlights?.map(edu => ({
                    institution: edu.institution,
                    degree: edu.degree,
                    field_of_study: edu.field_of_study || '',
                    location: edu.location || '',
                    start_date: edu.start_date || '',
                    end_date: edu.end_date || '',
                    current: edu.current || false,
                })) || [],
            }));

            toast.success('CV generado con IA');
            
            const cvId = isNew ? result.cv_id : cv?.id;
            if (cvId) {
                navigate(`/cv/editar/${cvId}`, { replace: true });
            }
        } catch (error: unknown) {
            const err = error as { response?: { data?: { message?: string } } };
            toast.error(err.response?.data?.message || 'Error al generar con IA');
        } finally {
            setLoading(false);
        }
    };

    const handleViewPdf = async () => {
        if (!cv?.id) {
            toast.error('Primero guarda el CV para ver el PDF');
            return;
        }

        setPdfLoading(true);
        try {
            const url = cvService.pdf(cv.id);
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Error al generar el PDF');
        } finally {
            setPdfLoading(false);
        }
    };

    if (loading && !isNew) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => navigate('/cvs')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
                <h1 className="text-2xl font-bold">
                    {isNew ? 'Crear Nuevo CV' : 'Editar CV'}
                </h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleViewPdf} disabled={pdfLoading || !cv?.id}>
                        {pdfLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                        Ver PDF
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {isNew ? 'Crear' : 'Guardar'}
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información Básica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Título del CV</label>
                            <Input
                                placeholder="Ej: CV Desarrollador Full Stack"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Puesto Objetivo</label>
                            <Input
                                placeholder="Ej: Full Stack Developer"
                                value={formData.target_role}
                                onChange={(e) => handleChange('target_role', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Empresa Objetivo</label>
                            <Input
                                placeholder="Ej: Google, TechCorp"
                                value={formData.target_company}
                                onChange={(e) => handleChange('target_company', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Descripción del Puesto / Oferta Laboral</label>
                            <textarea
                                className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Pega aquí la descripción completa de la oferta laboral..."
                                value={formData.job_description}
                                onChange={(e) => handleChange('job_description', e.target.value)}
                            />
                        </div>
                    </div>

                    <Button 
                        onClick={handleGenerateWithAI} 
                        disabled={loading || !formData.target_role || !formData.target_company}
                        className="w-full"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Generar con IA
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Perfil Profesional</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Resumen / Objetivo</label>
                        <textarea
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                            placeholder="Breve descripción de tu perfil profesional..."
                            value={formData.summary}
                            onChange={(e) => handleChange('summary', e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Habilidades (separadas por coma)</label>
                            <Input
                                placeholder="JavaScript, React, Node.js, TypeScript"
                                value={formData.skills}
                                onChange={(e) => handleChange('skills', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Palabras Clave</label>
                            <Input
                                placeholder="Desarrollador Web, Frontend, Backend"
                                value={formData.keywords}
                                onChange={(e) => handleChange('keywords', e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Experiencia Laboral</CardTitle>
                    <Button variant="outline" size="sm" onClick={addExperience}>
                        <Plus className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {formData.experiences.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No hay experiencia agregada</p>
                    ) : (
                        formData.experiences.map((exp, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input
                                        placeholder="Empresa"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Puesto"
                                        value={exp.role}
                                        onChange={(e) => updateExperience(index, 'role', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Periodo (ej: 2020 - Actual)"
                                        value={exp.period}
                                        onChange={(e) => updateExperience(index, 'period', e.target.value)}
                                        className="md:col-span-2"
                                    />
                                </div>
                                <textarea
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm"
                                    placeholder="Logros o responsabilidades (uno por línea)..."
                                    value={exp.highlights?.join('\n') || ''}
                                    onChange={(e) => updateExperience(index, 'highlights', e.target.value.split('\n').filter(Boolean))}
                                />
                                <div className="flex justify-end">
                                    <Button variant="ghost" size="sm" onClick={() => removeExperience(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive mr-1" /> Eliminar
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Educación</CardTitle>
                </CardHeader>
                <CardContent>
                    <EducationForm
                        education={formData.education}
                        onAdd={addEducation}
                        onRemove={removeEducation}
                        onUpdate={updateEducation}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-between pb-8">
                <Button variant="ghost" onClick={() => navigate('/cvs')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Mis CVs
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleViewPdf} disabled={pdfLoading || !cv?.id}>
                        {pdfLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                        Ver PDF
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {isNew ? 'Crear' : 'Guardar'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
