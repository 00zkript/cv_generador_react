import { z } from 'zod';
import BaseSchema from './Base';

export const StudyBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    cv_id: z.number().int().nullable(),
    center_study: z.string(),
    title: z.string(),
    start_date: z.string().date(),
    end_date: z.string().date(),
    description: z.string(),
    city: z.string(),
    country: z.string(),
    current: z.boolean().default(false),
});

export type StudyBase = z.infer<typeof StudyBaseSchema>;
