interface Medic {
    id: number;
    nombre: string;
    especialidad: string;
    correo: string;
    fecha_registro?: string;
}

const API_URL = "http://localhost:3001/medics";

const formMedic = document.getElementById("formMedic") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputEspecialidad = document.getElementById("especialidad") as HTMLInputElement;
const inputCorreo = document.getElementById("correo") as HTMLInputElement;
const tablaMedics = document.getElementById("tablaMedics") as HTMLTableSectionElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

async function cargarMedics(): Promise<void> {
    try {
        const respuesta = await fetch(API_URL);
        const medics: Medic[] = await respuesta.json();

        tablaMedics.innerHTML = "";

        medics.forEach((medic) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
        <td>${medic.id}</td>
        <td>${medic.nombre}</td>
        <td>${medic.especialidad}</td>
        <td>${medic.correo}</td>
        <td>
          <button class="btn-eliminar" data-id="${medic.id}">
            🗑️ Eliminar
          </button>
        </td>
      `;

            tablaMedics.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudieron cargar los médicos ❌");
    }
}

async function crearMedic(nombre: string, especialidad: string, correo: string): Promise<void> {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, especialidad, correo }),
        });

        if (!respuesta.ok) throw new Error("Error al guardar médico");

        mostrarMensaje("Médico registrado correctamente ✅");
        formMedic.reset();
        await cargarMedics();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo registrar el médico ❌");
    }
}

async function eliminarMedic(id: number): Promise<void> {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!respuesta.ok) throw new Error("Error al eliminar médico");

        mostrarMensaje("Médico eliminado correctamente 🗑️");
        await cargarMedics();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo eliminar el médico ❌");
    }
}

function mostrarMensaje(texto: string): void {
    mensaje.textContent = texto;
    setTimeout(() => (mensaje.textContent = ""), 3000);
}

formMedic.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const especialidad = inputEspecialidad.value.trim();
    const correo = inputCorreo.value.trim();

    if (!nombre || !especialidad || !correo) {
        mostrarMensaje("Todos los campos son obligatorios ⚠️");
        return;
    }

    await crearMedic(nombre, especialidad, correo);
});

tablaMedics.addEventListener("click", async (event) => {
    const elemento = event.target as HTMLElement;

    if (elemento.classList.contains("btn-eliminar")) {
        const id = Number(elemento.dataset.id);
        if (confirm("¿Seguro que quieres eliminar este médico?")) {
            await eliminarMedic(id);
        }
    }
});

cargarMedics();
export { };
