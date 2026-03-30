export interface EducationItem {
    institution: string;
    degree?: string;
    field_of_study?: string;
    location?: string;
    start_date?: string;
    end_date?: string;
    current?: boolean;
}

export interface SkillItem {
    name: string;
    level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    years_experience?: number;
    category?: 'programming_language' | 'framework' | 'tool' | 'soft_skill' | 'database' | 'devops' | 'other';
}

export interface ExperienceItem {
    company: string;
    role: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
    description?: string;
}

export interface ProjectItem {
    title: string;
    description?: string;
    project_url?: string;
    github_url?: string;
}

export const SKILL_LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' },
] as const;

export const SKILL_CATEGORIES = [
    { value: 'programming_language', label: 'Programming Language' },
    { value: 'framework', label: 'Framework' },
    { value: 'tool', label: 'Tool' },
    { value: 'soft_skill', label: 'Soft Skill' },
    { value: 'database', label: 'Database' },
    { value: 'devops', label: 'DevOps' },
    { value: 'other', label: 'Other' },
] as const;

export function getEmptyEducation(): EducationItem {
    return {
        institution: '',
        degree: '',
        field_of_study: '',
        location: '',
        start_date: '',
        end_date: '',
        current: false,
    };
}

export function getEmptySkill(): SkillItem {
    return {
        name: '',
        level: 'intermediate',
        years_experience: undefined,
        category: undefined,
    };
}

export function getEmptyExperience(): ExperienceItem {
    return {
        company: '',
        role: '',
        start_date: '',
        end_date: '',
        is_current: false,
        description: '',
    };
}

export function getEmptyProject(): ProjectItem {
    return {
        title: '',
        description: '',
        project_url: '',
        github_url: '',
    };
}
