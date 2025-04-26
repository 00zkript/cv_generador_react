import { z } from "zod";
import BaseSchema from "./Base";


export const SkillBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    cv_id: z.number().int().nullable(),
    name: z.string(),
    time_level: z.string(),
    description: z.string(),
});


export const SkillCreateSchema = BaseSchema.extend({});

export const SkillUpdateSchema = BaseSchema.extend({});


export type SkillBase = z.infer<typeof SkillBaseSchema>;
export type SkillCreate = z.infer<typeof SkillCreateSchema>;
export type SkillUpdate = z.infer<typeof SkillUpdateSchema>;

