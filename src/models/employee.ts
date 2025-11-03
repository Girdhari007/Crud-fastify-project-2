import { pool } from "../config/db";

export interface Employee {
    employeeID?: number;
    first_name: string;
    last_name: string;
    email: string;
    job_title: string;
    salary: number;
    created_at?: Date;
    updated_at?: Date;
}

export class EmployeeModel {
   async initialize() {
        const sql = `
      CREATE TABLE IF NOT EXISTS employees (
        employeeID INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        job_title VARCHAR(100) NOT NULL,
        salary DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
        await pool.execute(sql);
    }

    async create(emp: Employee) {
        const sql = `
      INSERT INTO employees (first_name, last_name, email, job_title, salary)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;

        const [result]: any = await pool.execute(sql, [
            emp.employeeID,
            emp.first_name,
            emp.last_name,
            emp.email,
            emp.job_title,
            emp.salary,
        ]);

        return { employeeID: result.insertId, ...emp };
    }

    async findAll() {
        const [rows]: any = await pool.execute(`SELECT * FROM employees`);
        return rows;
    }

    async findById(id: number) {
        const [rows]: any = await pool.execute(
            `SELECT * FROM employees WHERE employeeID = ?`,
            [id]
        );
        return rows[0] || null;
    }

    async update(id: number, emp: Employee) {
        const sql = `
      UPDATE employees 
      SET first_name = ?, last_name = ?, email = ?, job_title = ?, salary = ?, created_at = NOW(), updated_at = NOW()
      WHERE employeeID = ?
    `;

        await pool.execute(sql, [
            emp.first_name,
            emp.last_name,
            emp.email,
            emp.job_title,
            emp.salary,
            id,
        ]);

        return this.findById(id);
    }

    async patch(id: number, emp: Partial<Employee>) {
        const fields = Object.keys(emp)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(emp);
        values.push(id);

        await pool.execute(
            `UPDATE employees SET ${fields} WHERE employeeID = ?`,
            values
        );

        return this.findById(id);
    }

    async delete(id: number) {
        const [result]: any = await pool.execute(
            `DELETE FROM employees WHERE employeeID = ?`,
            [id]
        );

        return result.affectedRows > 0;
    }
}

export const employeeModel = new EmployeeModel();
