import { z } from "zod";
import { ContactBaseSchema } from "./Contact";
import BaseSchema from "./Base";


export const CvBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    name: z.string(),
    subject: z.string(),
    version: z.string(),
    resume: z.string(),
    language: z.string().default('esp'),
});

export const CvListSchema = CvBaseSchema.required({
    created_at: true,
    updated_at: true,
}).extend({
    id: z.number().int(),
    contact: ContactBaseSchema.partial().optional(),
});


export type CvBase = z.infer<typeof CvBaseSchema>;
export type CvList = z.infer<typeof CvListSchema>;

// export interface Cv {
//     id: number;
//     name: string;
//     last_name: string;
//     proposite: string;
//     version: string;
//     updated_at: string
// }


