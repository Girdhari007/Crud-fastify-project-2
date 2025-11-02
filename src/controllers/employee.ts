import { FastifyRequest, FastifyReply } from "fastify";
import { employeeService } from "../services/employee";
import { Employee } from "../models/employee";
import { success, error as errResponse } from "../utils/response";

export class EmployeeController {

    // Create a new employee
    async create(req: FastifyRequest<{ Body: Employee }>, reply: FastifyReply) {
        try {
            const created = await employeeService.createEmployee(req.body as Employee);
            return reply.code(201).send(success("Employee created", created));
        } catch (err: any) {
            return reply.code(500).send(errResponse("Internal Server Error", err?.message || err));
        }
    }

    // Get all employees
    async getAll(req: FastifyRequest, reply: FastifyReply) {
        try {
            const employees = await employeeService.getEmployees();
            return reply.send(success("Employees retrieved", employees));
        } catch (err: any) {
            return reply.code(500).send(errResponse("Internal Server Error", err?.message || err));
        }
    }

    // Get an employee by ID
    async getOne(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return reply.code(400).send(errResponse("Invalid id parameter"));
            const emp = await employeeService.getEmployee(id);
            if (!emp) return reply.code(404).send(errResponse("Employee not found"));

            return reply.send(success("Employee retrieved", emp));
        } catch (err: any) {
            return reply.code(500).send(errResponse("Internal Server Error", err?.message || err));
        }
    }

    // Update an employee
    async update(
        req: FastifyRequest<{ Params: { id: string }; Body: Employee }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return reply.code(400).send(errResponse("Invalid id parameter"));

            const updated = await employeeService.updateEmployee(id, req.body as Employee);
            if (!updated) return reply.code(404).send(errResponse("Employee not found"));

            return reply.send(success("Employee updated", updated));
        } catch (err: any) {
            return reply.code(500).send(errResponse("Internal Server Error", err?.message || err));
        }
    }

    // Partially update an employee
    async patch(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return reply.code(400).send(errResponse("Invalid id parameter"));

            const updated = await employeeService.patchEmployee(id, req.body as Partial<Employee>);
            if (!updated) return reply.code(404).send(errResponse("Employee not found"));

            return reply.send(success("Employee patched", updated));
        } catch (err: any) {
            return reply.code(500).send(errResponse("Internal Server Error", err?.message || err));
        }
    }

    // Delete an employee
    async delete(
        req: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) return reply.code(400).send(errResponse("Invalid id parameter"));
            const deleted = await employeeService.deleteEmployee(id);
            if (!deleted) return reply.code(404).send(errResponse("Employee not found"));

            return reply.send(success("Employee deleted", { success: deleted }));
        } catch (err: any) {
            return reply.code(500).send(errResponse("Internal Server Error", err?.message || err));
        }
    }
}

export const employeeController = new EmployeeController();
