import type { Medic } from "../domain/Medic";
import { MedicRepository } from "../infrastructure/MedicRepository";

export class MedicService {
    private repository: MedicRepository;

    constructor() {
        this.repository = new MedicRepository();
    }

    async listarMedics(): Promise<Medic[]> {
        return await this.repository.obtenerTodos();
    }

    async buscarMedic(id: number): Promise<Medic | null> {
        return await this.repository.obtenerPorId(id);
    }

    async crearMedic(data: Medic): Promise<Medic> {
        if (!data.nombre || !data.especialidad || !data.correo) {
            throw new Error("Nombre, especialidad y correo son obligatorios");
        }
        return await this.repository.crear(data);
    }

    async actualizarMedic(id: number, data: Medic): Promise<Medic | null> {
        if (!data.nombre || !data.especialidad || !data.correo) {
            throw new Error("Nombre, especialidad y correo son obligatorios");
        }
        return await this.repository.actualizar(id, data);
    }

    async eliminarMedic(id: number): Promise<boolean> {
        return await this.repository.eliminar(id);
    }
}
