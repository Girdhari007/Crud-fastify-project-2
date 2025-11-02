import { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { EmployeeSchemas } from "../schemas/employee";
import { employeeController } from "../controllers/employee";

export default async function employeeRoutes(fastify: FastifyInstance) {
    const app = fastify;

    // ✅ CREATE EMPLOYEE
    app.post("/employees", {
        schema: {
            body: zodToJsonSchema(EmployeeSchemas.create),
            response: {
                201: zodToJsonSchema(
                    z.object({
                        status: z.literal("success"),
                        message: z.string(),
                        data: EmployeeSchemas.response,
                    })
                ),
            },
        },
        handler: employeeController.create,
    });

    // ✅ GET ALL EMPLOYEES
    app.get("/employees", {
        schema: {
            response: {
                200: zodToJsonSchema(
                    z.object({
                        status: z.literal("success"),
                        message: z.string(),
                        data: z.array(EmployeeSchemas.response),
                    })
                ),
            },
        },
        handler: employeeController.getAll,
    });

    // ✅ GET EMPLOYEE BY ID
    app.get("/employees/:id", {
        schema: {
            params: zodToJsonSchema(EmployeeSchemas.params),
            response: {
                200: zodToJsonSchema(
                    z.object({
                        status: z.literal("success"),
                        message: z.string(),
                        data: EmployeeSchemas.response,
                    })
                ),
            },
        },
        handler: employeeController.getOne,
    });

    // ✅ UPDATE EMPLOYEE (PUT)
    app.put("/employees/:id", {
        schema: {
            params: zodToJsonSchema(EmployeeSchemas.params),
            body: zodToJsonSchema(EmployeeSchemas.update),
            response: {
                200: zodToJsonSchema(
                    z.object({
                        status: z.literal("success"),
                        message: z.string(),
                        data: EmployeeSchemas.response,
                    })
                ),
            },
        },
        handler: employeeController.update,
    });

    // ✅ PATCH EMPLOYEE
    app.patch("/employees/:id", {
        schema: {
            params: zodToJsonSchema(EmployeeSchemas.params),
            body: zodToJsonSchema(EmployeeSchemas.patch),
            response: {
                200: zodToJsonSchema(
                    z.object({
                        status: z.literal("success"),
                        message: z.string(),
                        data: EmployeeSchemas.response,
                    })
                ),
            },
        },
        handler: employeeController.patch,
    });

    // ✅ DELETE EMPLOYEE
    app.delete("/employees/:id", {
        schema: {
            params: zodToJsonSchema(EmployeeSchemas.params),
            response: {
                200: zodToJsonSchema(
                    z.object({
                        status: z.literal("success"),
                        message: z.string(),
                        data: z.object({ success: z.boolean() }),
                    })
                ),
            },
        },
        handler: employeeController.delete,
    });
}
