import { manejarRutasMedics } from "./interfaces/medicRoutes";

const PORT = Number(process.env.PORT) || 3001;

Bun.serve({
    port: PORT,

    async fetch(req) {
        const url = new URL(req.url);

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

        if (url.pathname === "/") {
            return new Response(
                JSON.stringify({
                    mensaje: "Backend de medics funcionando correctamente",
                    servicio: "backend-medics",
                    entidad: "medics",
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

        return await manejarRutasMedics(req);
    },
});

console.log(`Backend de medics corriendo en http://localhost:${PORT}`);
