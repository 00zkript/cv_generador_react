import { z } from 'zod';
import BaseSchema from './Base';

export const LanguageBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    cv_id: z.number().int().nullable(),
    name: z.string(),
    nivel: z.string(),
    description: z.string(),
});

export type LanguageBase = z.infer<typeof LanguageBaseSchema>;
