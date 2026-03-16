import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import userService, { ProfileData, SkillData, ExperienceData, EducationData, ProjectData } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Save, Loader2, User, Briefcase, GraduationCap, Code, FolderKanban } from 'lucide-react';
import { toast } from 'react-toastify';

const SKILL_LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
];

const SKILL_CATEGORIES = [
    { value: 'programming_language', label: 'Programming Language' },
    { value: 'framework', label: 'Framework' },
    { value: 'tool', label: 'Tool' },
    { value: 'soft_skill', label: 'Soft Skill' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
    { value: 'other', label: 'Other' },
];

export default function MyProfile() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profile, setProfile] = useState<ProfileData>({
        headline: '',
        about: '',
        phone: '',
        location: '',
        linkedin_url: '',
        github_url: '',
        portfolio_url: '',
    });

    const [skills, setSkills] = useState<SkillData[]>([]);
    const [experiences, setExperiences] = useState<ExperienceData[]>([]);
    const [education, setEducation] = useState<EducationData[]>([]);
    const [projects, setProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        loadUserData();
    }, [isAuthenticated, navigate]);

    const loadUserData = async () => {
        try {
        const data = await userService.getMe();
        setProfile({
                headline: data.profile?.headline || '',
                about: data.profile?.about || '',
                phone: data.profile?.phone || '',
                location: data.profile?.location || '',
                linkedin_url: data.profile?.linkedin_url || '',
                github_url: data.profile?.github_url || '',
                portfolio_url: data.profile?.portfolio_url || '',
            });
            setSkills(data.skills?.map(s => ({
                id: s.id,
                name: s.name,
                level: s.level,
                years_experience: s.years_experience,
                category: s.category,
            })) || []);
            setExperiences(data.experiences?.map(e => ({
                id: e.id,
                company: e.company,
                role: e.role,
                start_date: e.start_date,
                end_date: e.end_date,
                is_current: e.is_current,
                description: e.description,
            })) || []);
            setEducation(data.education?.map(e => ({
                id: e.id,
                institution: e.institution,
                degree: e.degree,
                field_of_study: e.field_of_study,
                start_date: e.start_date,
                end_date: e.end_date,
            })) || []);
            setProjects(data.projects?.map(p => ({
                id: p.id,
                title: p.title,
                description: p.description,
                project_url: p.project_url,
                github_url: p.github_url,
                start_date: p.start_date,
                end_date: p.end_date,
            })) || []);
        } catch (error) {
            console.error('Error loading user data:', error);
            toast.error('Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await userService.saveUserData({
                profile,
                skills,
                experiences,
                education,
                projects,
            });
            toast.success('Datos guardados correctamente');
        } catch (error) {
            console.error('Error saving user data:', error);
            toast.error('Error al guardar los datos');
        } finally {
            setSaving(false);
        }
    };

    const addSkill = () => {
        setSkills([...skills, { name: '', level: 'intermediate' }]);
    };

    const updateSkill = (index: number, data: SkillData) => {
        const newSkills = [...skills];
        newSkills[index] = data;
        setSkills(newSkills);
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const addExperience = () => {
        setExperiences([...experiences, { company: '', role: '', is_current: false }]);
    };

    const updateExperience = (index: number, data: ExperienceData) => {
        const newExperiences = [...experiences];
        newExperiences[index] = data;
        setExperiences(newExperiences);
    };

    const removeExperience = (index: number) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    const addEducation = () => {
        setEducation([...education, { institution: '', degree: '' }]);
    };

    const updateEducation = (index: number, data: EducationData) => {
        const newEducation = [...education];
        newEducation[index] = data;
        setEducation(newEducation);
    };

    const removeEducation = (index: number) => {
        setEducation(education.filter((_, i) => i !== index));
    };

    const addProject = () => {
        setProjects([...projects, { title: '', description: '' }]);
    };

    const updateProject = (index: number, data: ProjectData) => {
        const newProjects = [...projects];
        newProjects[index] = data;
        setProjects(newProjects);
    };

    const removeProject = (index: number) => {
        setProjects(projects.filter((_, i) => i !== index));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Mi Perfil</h1>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Guardar Todo
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Información Personal
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Headline</label>
                            <Input
                                placeholder="Ej: Senior Full Stack Developer"
                                value={profile.headline}
                                onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Teléfono</label>
                            <Input
                                placeholder="+1234567890"
                                value={profile.phone}
                                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Ubicación</label>
                            <Input
                                placeholder="Ciudad, País"
                                value={profile.location}
                                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium">Sobre mí</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                placeholder="Cuéntanos sobre ti..."
                                value={profile.about}
                                onChange={(e) => setProfile({ ...profile, about: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">LinkedIn URL</label>
                            <Input
                                placeholder="https://linkedin.com/in/..."
                                value={profile.linkedin_url}
                                onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">GitHub URL</label>
                            <Input
                                placeholder="https://github.com/..."
                                value={profile.github_url}
                                onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Portfolio URL</label>
                            <Input
                                placeholder="https://miportafolio.com"
                                value={profile.portfolio_url}
                                onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Habilidades
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={addSkill}>
                        <Plus className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {skills.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No hay habilidades agregadas</p>
                    ) : (
                        skills.map((skill, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <Input
                                    placeholder="Nombre de habilidad"
                                    className="flex-1"
                                    value={skill.name}
                                    onChange={(e) => updateSkill(index, { ...skill, name: e.target.value })}
                                />
                                <select
                                    className="flex h-9 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={skill.level}
                                    onChange={(e) => updateSkill(index, { ...skill, level: e.target.value as SkillData['level'] })}
                                >
                                    {SKILL_LEVELS.map(level => (
                                        <option key={level.value} value={level.value}>{level.label}</option>
                                    ))}
                                </select>
                                <select
                                    className="flex h-9 w-[140px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                                    value={skill.category}
                                    onChange={(e) => updateSkill(index, { ...skill, category: e.target.value as SkillData['category'] })}
                                >
                                    {SKILL_CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                                <Button variant="ghost" size="icon" onClick={() => removeSkill(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Experiencia Laboral
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={addExperience}>
                        <Plus className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {experiences.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No hay experiencia laboral agregada</p>
                    ) : (
                        experiences.map((exp, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input
                                        placeholder="Empresa"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, { ...exp, company: e.target.value })}
                                    />
                                    <Input
                                        placeholder="Puesto"
                                        value={exp.role}
                                        onChange={(e) => updateExperience(index, { ...exp, role: e.target.value })}
                                    />
                                    <Input
                                        type="date"
                                        value={exp.start_date}
                                        onChange={(e) => updateExperience(index, { ...exp, start_date: e.target.value })}
                                    />
                                    <div className="flex gap-2">
                                        <Input
                                            type="date"
                                            value={exp.end_date}
                                            disabled={exp.is_current}
                                            onChange={(e) => updateExperience(index, { ...exp, end_date: e.target.value })}
                                        />
                                        <label className="flex items-center gap-1 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={exp.is_current}
                                                onChange={(e) => updateExperience(index, { ...exp, is_current: e.target.checked, end_date: e.target.checked ? undefined : exp.end_date })}
                                            />
                                            Actual
                                        </label>
                                    </div>
                                </div>
                                <textarea
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground"
                                    placeholder="Descripción del puesto..."
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, { ...exp, description: e.target.value })}
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
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Educación
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={addEducation}>
                        <Plus className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {education.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No hay educación agregada</p>
                    ) : (
                        education.map((edu, index) => (
                            <div key={index} className="flex gap-2 items-start">
                                <Input
                                    placeholder="Institución"
                                    className="flex-1"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(index, { ...edu, institution: e.target.value })}
                                />
                                <Input
                                    placeholder="Grado"
                                    className="flex-1"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(index, { ...edu, degree: e.target.value })}
                                />
                                <Input
                                    placeholder="Campo de estudio"
                                    className="flex-1"
                                    value={edu.field_of_study}
                                    onChange={(e) => updateEducation(index, { ...edu, field_of_study: e.target.value })}
                                />
                                <Button variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <FolderKanban className="h-5 w-5" />
                        Proyectos
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={addProject}>
                        <Plus className="h-4 w-4 mr-1" /> Agregar
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {projects.length === 0 ? (
                        <p className="text-muted-foreground text-center py-4">No hay proyectos agregados</p>
                    ) : (
                        projects.map((proj, index) => (
                            <div key={index} className="p-4 border rounded-lg space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <Input
                                        placeholder="Título del proyecto"
                                        value={proj.title}
                                        onChange={(e) => updateProject(index, { ...proj, title: e.target.value })}
                                    />
                                    <Input
                                        placeholder="URL del proyecto"
                                        value={proj.project_url}
                                        onChange={(e) => updateProject(index, { ...proj, project_url: e.target.value })}
                                    />
                                    <Input
                                        placeholder="GitHub URL"
                                        value={proj.github_url}
                                        onChange={(e) => updateProject(index, { ...proj, github_url: e.target.value })}
                                    />
                                </div>
                                <textarea
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground"
                                    placeholder="Descripción del proyecto..."
                                    value={proj.description}
                                    onChange={(e) => updateProject(index, { ...proj, description: e.target.value })}
                                />
                                <div className="flex justify-end">
                                    <Button variant="ghost" size="sm" onClick={() => removeProject(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive mr-1" /> Eliminar
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            <div className="flex justify-end pb-8">
                <Button onClick={handleSave} disabled={saving} size="lg">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Guardar Todo
                </Button>
            </div>
        </div>
    );
}
