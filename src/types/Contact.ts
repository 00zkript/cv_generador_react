import { z } from "zod";
import BaseSchema from "./Base";


export const ContactBaseSchema = BaseSchema.extend({
    id: z.number().int().nullable(),
    cv_id: z.number().int().nullable(),
    name: z.string(),
    last_name: z.string(),
    phone: z.string(),
    email: z.string().email(),
    // linkedin: z.string().url(),
    // github: z.string().url(),
    // portafolio: z.string().url(),
    linkedin: z.string(),
    github: z.string(),
    portafolio: z.string(),
    city: z.string(),
    country: z.string(),
});

export const ContactListSchema = ContactBaseSchema.extend({});

// export const ContactCreateSchema = ContactSchema.omit({ id: true }); // omit the id field
// export const ContactCreateSchema = ContactSchema.pick({ name: true }); // only name field

export type ContactBase = z.infer<typeof ContactBaseSchema>;
export type ContactList = z.infer<typeof ContactListSchema>;



// export interface Contact {
//     nombres: string;
//     apellidos: string;
//     numero: string,
//     linkedin: string,
//     correo: string,
// }