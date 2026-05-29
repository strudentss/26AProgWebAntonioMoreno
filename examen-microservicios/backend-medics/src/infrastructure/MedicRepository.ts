import { pool } from "./db";
import type { Medic } from "../domain/Medic";

export class MedicRepository {
    async obtenerTodos(): Promise<Medic[]> {
        const result = await pool.query(
            "SELECT id, nombre, especialidad, correo, fecha_registro FROM medicos ORDER BY id ASC"
        );
        return result.rows;
    }

    async obtenerPorId(id: number): Promise<Medic | null> {
        const result = await pool.query(
            "SELECT id, nombre, especialidad, correo, fecha_registro FROM medicos WHERE id = $1",
            [id]
        );
        return result.rows[0] ?? null;
    }

    async crear(medic: Medic): Promise<Medic> {
        const result = await pool.query(
            "INSERT INTO medicos (nombre, especialidad, correo) VALUES ($1, $2, $3) RETURNING id, nombre, especialidad, correo, fecha_registro",
            [medic.nombre, medic.especialidad, medic.correo]
        );
        return result.rows[0];
    }

    async actualizar(id: number, medic: Medic): Promise<Medic | null> {
        const result = await pool.query(
            "UPDATE medicos SET nombre = $1, especialidad = $2, correo = $3 WHERE id = $4 RETURNING id, nombre, especialidad, correo, fecha_registro",
            [medic.nombre, medic.especialidad, medic.correo, id]
        );
        return result.rows[0] ?? null;
    }

    async eliminar(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM medicos WHERE id = $1", [id]);
        return result.rowCount > 0;
    }
}
