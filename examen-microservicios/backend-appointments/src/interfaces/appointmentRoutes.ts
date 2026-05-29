import { AppointmentService } from "../application/AppointmentService";

const appointmentService = new AppointmentService();

export async function manejarRutasAppointments(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const metodo = req.method;
    const partes = url.pathname.split("/").filter(Boolean);

    if (partes[0] !== "appointments") {
        return respuestaJSON({ mensaje: "Ruta no encontrada" }, 404);
    }

    try {
        if (metodo === "GET" && partes.length === 1) {
            const citas = await appointmentService.listarAppointments();
            return respuestaJSON(citas);
        }

        if (metodo === "GET" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const cita = await appointmentService.buscarAppointment(id);
            if (!cita) return respuestaJSON({ mensaje: "Cita no encontrada" }, 404);

            return respuestaJSON(cita);
        }

        if (metodo === "POST" && partes.length === 1) {
            const body = await req.json();
            const nuevaCita = await appointmentService.crearAppointment(body);
            return respuestaJSON(nuevaCita, 201);
        }

        if (metodo === "PUT" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const body = await req.json();
            const citaActualizada = await appointmentService.actualizarAppointment(id, body);
            if (!citaActualizada) return respuestaJSON({ mensaje: "Cita no encontrada" }, 404);

            return respuestaJSON(citaActualizada);
        }

        if (metodo === "DELETE" && partes.length === 2) {
            const id = Number(partes[1]);
            if (Number.isNaN(id)) return respuestaJSON({ mensaje: "ID inválido" }, 400);

            const eliminado = await appointmentService.eliminarAppointment(id);
            if (!eliminado) return respuestaJSON({ mensaje: "Cita no encontrada" }, 404);

            return respuestaJSON({ mensaje: "Cita eliminada correctamente" });
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
