import { z } from "zod";
import BaseSchema from "./Base";


export const AchievementBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    work_experience_id: z.number().int().nullable(),
    description: z.string(),
});


export const AchievementCreateSchema = BaseSchema.extend({});
export const AchievementUpdateSchema = BaseSchema.extend({});


export type AchievementBase = z.infer<typeof AchievementBaseSchema>;
export type AchievementCreate = z.infer<typeof AchievementCreateSchema>;
export type AchievementUpdate = z.infer<typeof AchievementUpdateSchema>;

