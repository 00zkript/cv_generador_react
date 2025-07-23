import { z } from 'zod';
import BaseSchema from './Base';
// import { AchievementBaseSchema } from './Achievement';

export const WorkExperienceBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    cv_id: z.number().int().nullable(),
    name: z.string(),
    company: z.string(),
    position: z.string(),
    start_date: z.string().date(),
    end_date: z.string().date(),
    current: z.boolean().default(false),
    city: z.string(),
    country: z.string(),
    description: z.string(),
    achievements: z.string(),
    // achievements: AchievementBaseSchema.array(),
});

export const WorkExperienceCreateSchema = BaseSchema.extend({});
export const WorkExperienceUpdateSchema = BaseSchema.extend({});

export type WorkExperienceBase = z.infer<typeof WorkExperienceBaseSchema>;
export type WorkExperienceCreate = z.infer<typeof WorkExperienceCreateSchema>;
export type WorkExperienceUpdate = z.infer<typeof WorkExperienceUpdateSchema>;
