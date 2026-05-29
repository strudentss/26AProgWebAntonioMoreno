import { EquipmentService } from "../application/EquipmentService";

const equipmentService = new EquipmentService();

export async function manejarRutasEquipment(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const metodo = req.method;
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "equipment") {
        return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
    }

    try {
        if (metodo === "GET" && partes.length === 1) {
            const equipment = await equipmentService.listarEquipment();
            return respuestaJSON(equipment);
        }

        if (metodo === "GET" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const equipo = await equipmentService.buscarEquipment(id);
            if (!equipo) return respuestaJSON({ mensaje: "Equipo no encontrado" }, 404);

            return respuestaJSON(equipo);
        }

        if (metodo === "POST" && partes.length === 1) {
            const body = await req.json();
            const nuevoEquipo = await equipmentService.crearEquipment(body);
            return respuestaJSON(nuevoEquipo, 201);
        }

        if (metodo === "PUT" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const body = await req.json();
            const equipoActualizado = await equipmentService.actualizarEquipment(id, body);
            if (!equipoActualizado) return respuestaJSON({ mensaje: "Equipo no encontrado" }, 404);

            return respuestaJSON(equipoActualizado);
        }

        if (metodo === "DELETE" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const eliminado = await equipmentService.eliminarEquipment(id);
            if (!eliminado) return respuestaJSON({ mensaje: "Equipo no encontrado" }, 404);

            return respuestaJSON({ mensaje: "Equipo eliminado correctamente" });
        }

        return respuestaJSON({ mensaje: "Método no permitido" }, 405);
    } catch (error) {
        const mensaje = error instanceof Error ? error.message : "Error interno del servidor";
        return respuestaJSON({ error: mensaje }, 500);
    }
}

export function respuestaJSON(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
