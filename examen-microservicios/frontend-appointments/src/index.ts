interface Appointment {
    id: number;
    nombre_paciente: string;
    nombre_medico: string;
    fecha_cita: string;
    motivo?: string;
    material_usado?: string;
    fecha_creacion?: string;
}

const API_URL = "http://localhost:3005/appointments";

const formAppointment = document.getElementById("formAppointment") as HTMLFormElement | null;
const inputPaciente = document.getElementById("nombre_paciente") as HTMLInputElement | null;
const inputMedico = document.getElementById("nombre_medico") as HTMLInputElement | null;
const inputFecha = document.getElementById("fecha_cita") as HTMLInputElement | null;
const inputMotivo = document.getElementById("motivo") as HTMLInputElement | null;
const inputMaterial = document.getElementById("material_usado") as HTMLInputElement | null;
const tablaAppointments = document.getElementById("tablaAppointments") as HTMLTableSectionElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;
const botonActualizar = document.getElementById("btnActualizar") as HTMLButtonElement;

async function cargarAppointments(): Promise<void> {
    try {
        const respuesta = await fetch(API_URL);
        const citas: Appointment[] = await respuesta.json();

        tablaAppointments.innerHTML = "";

        citas.forEach((cita) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
        <td>${cita.id}</td>
        <td>${cita.nombre_paciente}</td>
        <td>${cita.nombre_medico}</td>
        <td>${cita.fecha_cita ? new Date(cita.fecha_cita).toLocaleString() : ""}</td>
        <td>${cita.motivo ?? ""}</td>
        <td>${cita.material_usado ?? ""}</td>
        <td>${cita.fecha_creacion ? new Date(cita.fecha_creacion).toLocaleString() : ""}</td>
        <td>
          <button class="btn-eliminar" data-id="${cita.id}">
            🗑️ Eliminar
          </button>
        </td>
      `;

            tablaAppointments.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudieron cargar las citas ❌");
    }
}

async function crearAppointment(
    nombre_paciente: string,
    nombre_medico: string,
    fecha_cita: string,
    motivo?: string,
    material_usado?: string
): Promise<void> {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado }),
        });

        if (!respuesta.ok) throw new Error("Error al guardar cita");

        mostrarMensaje("Cita registrada correctamente ✅");
        formAppointment?.reset();
        await cargarAppointments();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo registrar la cita ❌");
    }
}

async function eliminarAppointment(id: number): Promise<void> {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!respuesta.ok) throw new Error("Error al eliminar cita");

        mostrarMensaje("Cita eliminada correctamente 🗑️");
        await cargarAppointments();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo eliminar la cita ❌");
    }
}

function mostrarMensaje(texto: string): void {
    mensaje.textContent = texto;
    setTimeout(() => (mensaje.textContent = ""), 3000);
}

// ✅ Enganchar botón de actualizar
botonActualizar.addEventListener("click", cargarAppointments);

// ✅ Enganchar formulario si existe
if (formAppointment) {
    formAppointment.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre_paciente = inputPaciente?.value.trim() || "";
        const nombre_medico = inputMedico?.value.trim() || "";
        const fecha_cita = inputFecha?.value.trim() || "";
        const motivo = inputMotivo?.value.trim() || "";
        const material_usado = inputMaterial?.value.trim() || "";

        if (!nombre_paciente || !nombre_medico || !fecha_cita) {
            mostrarMensaje("Paciente, médico y fecha son obligatorios ⚠️");
            return;
        }

        await crearAppointment(nombre_paciente, nombre_medico, fecha_cita, motivo, material_usado);
    });
}

// ✅ Enganchar tabla para eliminar
tablaAppointments.addEventListener("click", async (event) => {
    const elemento = event.target as HTMLElement;

    if (elemento.classList.contains("btn-eliminar")) {
        const id = Number(elemento.dataset.id);
        if (confirm("¿Seguro que quieres eliminar esta cita?")) {
            await eliminarAppointment(id);
        }
    }
});

// Cargar citas al inicio
cargarAppointments();

export { };
