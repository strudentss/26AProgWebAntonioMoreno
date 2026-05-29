import type { Equipment } from "../domain/Equipment";
import { EquipmentRepository } from "../infrastructure/EquipmentRepository";

export class EquipmentService {
    private repository: EquipmentRepository;

    constructor() {
        this.repository = new EquipmentRepository();
    }

    async listarEquipment(): Promise<Equipment[]> {
        return await this.repository.obtenerTodos();
    }

    async buscarEquipment(id: number): Promise<Equipment | null> {
        return await this.repository.obtenerPorId(id);
    }

    async crearEquipment(data: Equipment): Promise<Equipment> {
        if (!data.nombre || !data.tipo || !data.estado) {
            throw new Error("Nombre, tipo y estado son obligatorios");
        }
        return await this.repository.crear(data);
    }

    async actualizarEquipment(id: number, data: Equipment): Promise<Equipment | null> {
        if (!data.nombre || !data.tipo || !data.estado) {
            throw new Error("Nombre, tipo y estado son obligatorios");
        }
        return await this.repository.actualizar(id, data);
    }

    async eliminarEquipment(id: number): Promise<boolean> {
        return await this.repository.eliminar(id);
    }
}
