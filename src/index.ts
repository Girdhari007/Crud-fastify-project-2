// src/index.ts
import Fastify from "fastify";
import dotenv from "dotenv";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

import employeeRoutes from "./routes/employee";

dotenv.config();

const app = Fastify({ logger: true });

// ✅ Register Swagger (OpenAPI)
app.register(swagger, {
    openapi: {
        info: {
            title: "Fastify Employees API",
            description: "CRUD API for Employees using Fastify and MySQL",
            version: "1.0.0",
        },
    },
});

// ✅ Swagger UI (visual docs)
app.register(swaggerUI, {
    routePrefix: "/docs",       // UI available at /docs
    uiConfig: {
        docExpansion: "list",
        deepLinking: true,
    },
});

// ✅ Add your employee routes
app.register(employeeRoutes, { prefix: "/employees" });

// ✅ OpenAPI JSON endpoint
app.get("/documentation/json", async () => app.swagger());

const start = async () => {
    try {
        await app.listen({ port: Number(process.env.PORT) || 3000 });
        console.log("Server running at http://localhost:3000");
        console.log("Swagger UI --> http://localhost:3000/docs");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
