export interface Appointment {
    id?: number;
    nombre_paciente: string;
    nombre_medico: string;
    fecha_cita: Date;
    motivo?: string;
    material_usado?: string;
    fecha_creacion?: Date;
}
