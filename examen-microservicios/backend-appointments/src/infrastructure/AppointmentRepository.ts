import { pool } from "./db";
import type { Appointment } from "../domain/Appointment";

export class AppointmentRepository {
    async obtenerTodos(): Promise<Appointment[]> {
        const result = await pool.query(
            "SELECT id, nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado, fecha_creacion FROM citas ORDER BY id ASC"
        );
        return result.rows;
    }

    async obtenerPorId(id: number): Promise<Appointment | null> {
        const result = await pool.query(
            "SELECT id, nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado, fecha_creacion FROM citas WHERE id = $1",
            [id]
        );
        return result.rows[0] ?? null;
    }

    async crear(cita: Appointment): Promise<Appointment> {
        const result = await pool.query(
            "INSERT INTO citas (nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado, fecha_creacion",
            [cita.nombre_paciente, cita.nombre_medico, cita.fecha_cita, cita.motivo, cita.material_usado]
        );
        return result.rows[0];
    }

    async actualizar(id: number, cita: Appointment): Promise<Appointment | null> {
        const result = await pool.query(
            "UPDATE citas SET nombre_paciente = $1, nombre_medico = $2, fecha_cita = $3, motivo = $4, material_usado = $5 WHERE id = $6 RETURNING id, nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado, fecha_creacion",
            [cita.nombre_paciente, cita.nombre_medico, cita.fecha_cita, cita.motivo, cita.material_usado, id]
        );
        return result.rows[0] ?? null;
    }

    async eliminar(id: number): Promise<boolean> {
        const result = await pool.query("DELETE FROM citas WHERE id = $1", [id]);
        return result.rowCount > 0;
    }
}
