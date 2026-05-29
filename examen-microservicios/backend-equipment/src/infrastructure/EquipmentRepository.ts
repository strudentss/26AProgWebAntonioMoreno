import { pool } from "./db";
import type { Equipment } from "../domain/Equipment";

export class EquipmentRepository {
    async obtenerTodos(): Promise<Equipment[]> {
        const result = await pool.query(
            "SELECT id, nombre, tipo, estado, fecha_registro FROM equipment ORDER BY id ASC"
        );
        return result.rows;
    }

    async obtenerPorId(id: number): Promise<Equipment | null> {
        const result = await pool.query(
            "SELECT id, nombre, tipo, estado, fecha_registro FROM equipment WHERE id = $1",
            [id]
        );
        return result.rows[0] ?? null;
    }

    async crear(equipment: Equipment): Promise<Equipment> {
        const result = await pool.query(
            "INSERT INTO equipment (nombre, tipo, estado) VALUES ($1, $2, $3) RETURNING id, nombre, tipo, estado, fecha_registro",
            [equipment.nombre, equipment.tipo, equipment.estado]
        );
        return result.rows[0];
    }

    async actualizar(id: number, equipment: Equipment): Promise<Equipment | null> {
        const result = await pool.query(
            "UPDATE equipment SET nombre = $1, tipo = $2, estado = $3 WHERE id = $4 RETURNING id, nombre, tipo, estado, fecha_registro",
            [equipment.nombre, equipment.tipo, equipment.estado, id]
        );
        return result.rows[0] ?? null;
    }

    async eliminar(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM equipment WHERE id = $1", [id]);
        return result.rowCount > 0;
    }
}
