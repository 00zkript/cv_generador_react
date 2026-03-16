import api from '@/plugins/axios';

const URL_API = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000';
const URL = URL_API + '/users';

export interface ProfileData {
    headline?: string;
    about?: string;
    phone?: string;
    location?: string;
    linkedin_url?: string;
    github_url?: string;
    portfolio_url?: string;
}

export interface SkillData {
    id?: number;
    name: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    years_experience?: number;
    category?: 'programming_language' | 'framework' | 'tool' | 'soft_skill' | 'database' | 'devops' | 'other';
}

export interface ExperienceData {
    id?: number;
    company: string;
    role: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
}

export interface EducationData {
    id?: number;
    institution: string;
    degree?: string;
    field_of_study?: string;
    start_date?: string;
    end_date?: string;
}

export interface ProjectData {
    id?: number;
    title: string;
    description?: string;
    project_url?: string;
    github_url?: string;
    start_date?: string;
    end_date?: string;
}

export interface UserData {
    id: number;
    email: string;
    name: string | null;
    created_at: string;
    updated_at: string;
    profile?: ProfileData & { id: number; user_id: number };
    skills?: (SkillData & { id: number; user_id: number; position: number })[];
    experiences?: (ExperienceData & { id: number; user_id: number; position: number })[];
    education?: (EducationData & { id: number; user_id: number; position: number })[];
    projects?: (ProjectData & { id: number; user_id: number; position: number })[];
    cvs?: unknown[];
}

async function getMe(): Promise<UserData> {
    const response = await api.get(`${URL}/me`);
    return response.data;
}

async function saveUserData(data: {
    profile?: ProfileData;
    skills?: SkillData[];
    experiences?: ExperienceData[];
    education?: EducationData[];
    projects?: ProjectData[];
}): Promise<UserData> {
    const response = await api.post(`${URL}/data`, data);
    return response.data;
}

async function updateProfile(data: ProfileData): Promise<ProfileData> {
    const response = await api.put(`${URL}/profile`, data);
    return response.data;
}

async function addSkill(data: SkillData): Promise<SkillData> {
    const response = await api.post(`${URL}/skills`, data);
    return response.data;
}

async function updateSkill(id: number, data: SkillData): Promise<SkillData> {
    const response = await api.put(`${URL}/skills/${id}`, data);
    return response.data;
}

async function deleteSkill(id: number): Promise<void> {
    await api.delete(`${URL}/skills/${id}`);
}

async function addExperience(data: ExperienceData): Promise<ExperienceData> {
    const response = await api.post(`${URL}/experiences`, data);
    return response.data;
}

async function updateExperience(id: number, data: ExperienceData): Promise<ExperienceData> {
    const response = await api.put(`${URL}/experiences/${id}`, data);
    return response.data;
}

async function deleteExperience(id: number): Promise<void> {
    await api.delete(`${URL}/experiences/${id}`);
}

async function addEducation(data: EducationData): Promise<EducationData> {
    const response = await api.post(`${URL}/education`, data);
    return response.data;
}

async function updateEducation(id: number, data: EducationData): Promise<EducationData> {
    const response = await api.put(`${URL}/education/${id}`, data);
    return response.data;
}

async function deleteEducation(id: number): Promise<void> {
    await api.delete(`${URL}/education/${id}`);
}

async function addProject(data: ProjectData): Promise<ProjectData> {
    const response = await api.post(`${URL}/projects`, data);
    return response.data;
}

async function updateProject(id: number, data: ProjectData): Promise<ProjectData> {
    const response = await api.put(`${URL}/projects/${id}`, data);
    return response.data;
}

async function deleteProject(id: number): Promise<void> {
    await api.delete(`${URL}/projects/${id}`);
}

export default {
    getMe,
    saveUserData,
    updateProfile,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addProject,
    updateProject,
    deleteProject,
};
