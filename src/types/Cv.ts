import { z } from 'zod';

export const CvJobKeywordSchema = z.object({
    id: z.number(),
    cv_id: z.number(),
    keyword: z.string(),
    weight: z.number(),
    position: z.number(),
});

export const CvVersionSchema = z.object({
    id: z.number(),
    cv_id: z.number(),
    version_number: z.number(),
    prompt_used: z.string().nullable(),
    content_json: z.record(z.unknown()).nullable(),
    ats_score: z.number().nullable(),
    position: z.number(),
    created_at: z.string(),
});

export const CvSchema = z.object({
    id: z.number(),
    user_id: z.number(),
    title: z.string().nullable(),
    target_role: z.string().nullable(),
    target_company: z.string().nullable(),
    job_description: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    job_keywords: z.array(CvJobKeywordSchema).optional(),
    versions: z.array(CvVersionSchema).optional(),
});

export type CvJobKeyword = z.infer<typeof CvJobKeywordSchema>;
export type CvVersion = z.infer<typeof CvVersionSchema>;
export type Cv = z.infer<typeof CvSchema>;

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

export const CvBaseSchema = z.object({
    id: z.number().int().nullable(),
    name: z.string(),
    subject: z.string(),
    version: z.string(),
    resume: z.string(),
    language: z.string().default('esp'),
    technical_contributions_projects: z.string().optional(),
});

export const CvItemSchema = CvBaseSchema.extend({
    id: z.number().int(),
    created_at: z.string(),
    updated_at: z.string(),
    contact: z.any().optional(),
});

export type CvBase = z.infer<typeof CvBaseSchema>;
export type CvItem = z.infer<typeof CvItemSchema>;
