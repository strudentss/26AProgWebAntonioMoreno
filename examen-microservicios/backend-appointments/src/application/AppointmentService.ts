import { AppointmentRepository } from "../infrastructure/AppointmentRepository";
import type { Appointment } from "../domain/Appointment";

export class AppointmentService {
    private repo = new AppointmentRepository();

    listarAppointments() {
        return this.repo.obtenerTodos();
    }

    buscarAppointment(id: number) {
        return this.repo.obtenerPorId(id);
    }

    crearAppointment(data: Appointment) {
        if (!data.nombre_paciente || !data.nombre_medico || !data.fecha_cita) {
            throw new Error("Paciente, médico y fecha son obligatorios");
        }
        return this.repo.crear(data);
    }

    actualizarAppointment(id: number, data: Appointment) {
        return this.repo.actualizar(id, data);
    }

    eliminarAppointment(id: number) {
        return this.repo.eliminar(id);
    }
}
