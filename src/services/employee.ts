import { employeeModel, Employee } from "../models/employee";

export class EmployeeService {
    async createEmployee(data: Employee) {
        return await employeeModel.create(data);
    }

    async getEmployees() {
        return await employeeModel.findAll();
    }

    async getEmployee(id: number) {
        return await employeeModel.findById(id);
    }

    async updateEmployee(id: number, data: Employee) {
        return await employeeModel.update(id, data);
    }

    async patchEmployee(id: number, data: Partial<Employee>) {
        return await employeeModel.patch(id, data);
    }

    async deleteEmployee(id: number) {
        return await employeeModel.delete(id);
    }
}

export const employeeService = new EmployeeService();
