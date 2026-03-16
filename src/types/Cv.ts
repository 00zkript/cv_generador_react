export interface CvJobKeyword {
    id?: number;
    keyword: string;
    weight?: number;
}

export interface CvVersion {
    id: number;
    cv_id: number;
    version_number: number;
    prompt_used: string | null;
    content_json: CvContentData | null;
    ats_score: number | null;
    position: number;
    created_at: string;
}

export interface Cv {
    id: number;
    user_id: number;
    title: string | null;
    target_role: string | null;
    target_company: string | null;
    job_description: string | null;
    created_at: string;
    updated_at: string;
    job_keywords?: CvJobKeyword[];
    versions?: CvVersion[];
}

export interface PaginatedCvs {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    total_pages: number;
    from: number;
    to: number;
    data: Cv[];
}

export interface ExperienceHighlight {
    company: string;
    role: string;
    period: string;
    highlights: string[];
}

export interface EducationHighlight {
    institution: string;
    degree: string;
    field_of_study?: string;
    period: string;
}

export interface CvContentData {
    summary: string;
    keywords: string[];
    skills: string[];
    experience_highlights: ExperienceHighlight[];
    education_highlights: EducationHighlight[];
    ats_optimized_content?: Record<string, unknown>;
}

export interface CreateCvData {
    title?: string;
    target_role?: string;
    target_company?: string;
    job_description?: string;
    version?: {
        content?: string;
        generated_with?: string;
        ats_score?: number;
    };
}

export interface UpdateCvData {
    title?: string;
    target_role?: string;
    target_company?: string;
    job_description?: string;
}

export interface GenerateCvData {
    title?: string;
    target_role: string;
    target_company: string;
    job_description: string;
}

export interface GenerateCvResponse {
    cv_id: number;
    version_id: number;
    target_role: string;
    target_company: string;
    generated_data: CvContentData;
    created_at: string;
}

export const CvBaseSchema = {
    id: null,
    name: '',
    subject: '',
    version: '',
    resume: '',
    language: 'esp',
    technical_contributions_projects: '',
};

export type CvBase = typeof CvBaseSchema;
