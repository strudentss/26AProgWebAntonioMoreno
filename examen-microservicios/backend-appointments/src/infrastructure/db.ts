import { Pool } from "pg";

export const pool = new Pool({
    host: process.env.DB_HOST || "postgres",   // nombre del servicio en docker-compose
    port: Number(process.env.DB_PORT) || 5432, // puerto interno de Postgres
    user: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "examen_microservicios",
});
