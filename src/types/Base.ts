import { z } from "zod";

// Esquema reutilizable para timestamps
const BaseSchema = z.object({
    status: z.boolean().default(true).optional(),
    // created_at: z.preprocess(
    //     (val) => (typeof val === "string" ? new Date(val) : val),
    //     z.date()
    // ).nullish(),
    // updated_at: z.preprocess(
    //     (val) => (typeof val === "string" ? new Date(val) : val),
    //     z.date()
    // ).nullish()
    created_at: z.string().datetime({ local: true }).nullish(),
    updated_at: z.string().datetime({ local: true }).nullish(),
});

export default BaseSchema;
