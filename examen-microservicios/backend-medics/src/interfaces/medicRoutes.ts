import { MedicService } from "../application/MedicService";

const medicService = new MedicService();

export async function manejarRutasMedics(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const metodo = req.method;
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "medics") {
        return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
    }

    try {
        if (metodo === "GET" && partes.length === 1) {
            const medics = await medicService.listarMedics();
            return respuestaJSON(medics);
        }

        if (metodo === "GET" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const medic = await medicService.buscarMedic(id);
            if (!medic) return respuestaJSON({ mensaje: "Medic no encontrado" }, 404);

            return respuestaJSON(medic);
        }

        if (metodo === "POST" && partes.length === 1) {
            const body = await req.json();
            const nuevoMedic = await medicService.crearMedic(body);
            return respuestaJSON(nuevoMedic, 201);
        }

        if (metodo === "PUT" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const body = await req.json();
            const medicActualizado = await medicService.actualizarMedic(id, body);
            if (!medicActualizado) return respuestaJSON({ mensaje: "Medic no encontrado" }, 404);

            return respuestaJSON(medicActualizado);
        }

        if (metodo === "DELETE" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const eliminado = await medicService.eliminarMedic(id);
            if (!eliminado) return respuestaJSON({ mensaje: "Medic no encontrado" }, 404);

            return respuestaJSON({ mensaje: "Medic eliminado correctamente" });
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
