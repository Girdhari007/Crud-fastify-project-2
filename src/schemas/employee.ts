import { z } from "zod";

// Create and Update schemas
const create = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    email: z.string().email(),
    job_title: z.string().min(1),
    salary: z.number().min(0),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

const update = create;

const patch = create.partial();

const params = z.object({
    id: z.string().regex(/^\d+$/, "ID must be a number"),
});

// Response schema
const response = z.object({
    employeeID: z.number().positive(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    job_title: z.string(),
    salary: z.number(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export const EmployeeSchemas = {
    create,
    update,
    patch,
    params,
    response,
};
