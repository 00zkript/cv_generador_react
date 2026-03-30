import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import userService, { ProfileData, SkillData, ExperienceData, EducationData, ProjectData } from '@/services/userService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EducationForm, { getEmptyEducation } from '@/components/EducationForm';
import SkillsForm, { getEmptySkill } from '@/components/SkillsForm';
import ExperienceForm, { getEmptyExperience } from '@/components/ExperienceForm';
import ProjectForm, { getEmptyProject } from '@/components/ProjectForm';
import { EducationItem, SkillItem, ExperienceItem, ProjectItem } from '@/types/forms';
import { Save, Loader2, User, Briefcase, GraduationCap, Code, FolderKanban } from 'lucide-react';
import { toast } from 'react-toastify';

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
        setSkills([...skills, getEmptySkill()]);
    };

    const updateSkill = (index: number, field: keyof SkillItem, value: string | number | undefined) => {
        setSkills(prev => {
            const newSkills = [...prev];
            newSkills[index] = { ...newSkills[index], [field]: value };
            return newSkills;
        });
    };

    const removeSkill = (index: number) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const addExperience = () => {
        setExperiences([...experiences, getEmptyExperience()]);
    };

    const updateExperience = (index: number, field: keyof ExperienceItem, value: string | boolean | undefined) => {
        setExperiences(prev => {
            const newExperiences = [...prev];
            newExperiences[index] = { ...newExperiences[index], [field]: value };
            return newExperiences;
        });
    };

    const removeExperience = (index: number) => {
        setExperiences(experiences.filter((_, i) => i !== index));
    };

    const addEducation = () => {
        setEducation([...education, getEmptyEducation()]);
    };

    const updateEducation = (index: number, field: keyof EducationItem, value: string | boolean) => {
        setEducation(prev => {
            const newEducation = [...prev];
            newEducation[index] = { ...newEducation[index], [field]: value };
            return newEducation;
        });
    };

    const removeEducation = (index: number) => {
        setEducation(education.filter((_, i) => i !== index));
    };

    const addProject = () => {
        setProjects([...projects, getEmptyProject()]);
    };

    const updateProject = (index: number, field: keyof ProjectItem, value: string) => {
        setProjects(prev => {
            const newProjects = [...prev];
            newProjects[index] = { ...newProjects[index], [field]: value };
            return newProjects;
        });
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
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Habilidades
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SkillsForm
                        skills={skills}
                        onAdd={addSkill}
                        onRemove={removeSkill}
                        onUpdate={updateSkill}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5" />
                        Experiencia Laboral
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ExperienceForm
                        experiences={experiences}
                        onAdd={addExperience}
                        onRemove={removeExperience}
                        onUpdate={updateExperience}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Educación
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <EducationForm
                        education={education}
                        onAdd={addEducation}
                        onRemove={removeEducation}
                        onUpdate={updateEducation}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FolderKanban className="h-5 w-5" />
                        Proyectos
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ProjectForm
                        projects={projects}
                        onAdd={addProject}
                        onRemove={removeProject}
                        onUpdate={updateProject}
                    />
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
