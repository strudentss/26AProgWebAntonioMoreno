import { manejarRutasAppointments } from "./interfaces/appointmentRoutes";

const PORT = Number(process.env.PORT) || 3005;

Bun.serve({
    port: PORT,

    async fetch(req) {
        const url = new URL(req.url);

        // Manejo de preflight CORS
        if (req.method === "OPTIONS") {
            return new Response(null, {
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        // Ruta raíz para verificar que el backend funciona
        if (url.pathname === "/") {
            return new Response(
                JSON.stringify({
                    mensaje: "Backend de appointments funcionando correctamente",
                    servicio: "backend-appointments",
                    entidad: "citas",
                    puerto: PORT,
                }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
        }

        // Delegar al manejador de rutas de citas
        return await manejarRutasAppointments(req);
    },
});

console.log(`Backend de appointments corriendo en http://localhost:${PORT}`);
