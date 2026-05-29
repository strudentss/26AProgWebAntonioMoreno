interface Equipment {
    id: number;
    nombre: string;
    tipo: string;
    estado: string;
    fecha_registro?: string;
}

const API_URL = "http://localhost:3003/equipment";

const formEquipment = document.getElementById("formEquipment") as HTMLFormElement;
const inputNombre = document.getElementById("nombre") as HTMLInputElement;
const inputTipo = document.getElementById("tipo") as HTMLInputElement;
const inputEstado = document.getElementById("estado") as HTMLInputElement;
const tablaEquipment = document.getElementById("tablaEquipment") as HTMLTableSectionElement;
const mensaje = document.getElementById("mensaje") as HTMLParagraphElement;

async function cargarEquipment(): Promise<void> {
    try {
        const respuesta = await fetch(API_URL);
        const equipment: Equipment[] = await respuesta.json();

        tablaEquipment.innerHTML = "";

        equipment.forEach((equipo) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
        <td>${equipo.id}</td>
        <td>${equipo.nombre}</td>
        <td>${equipo.tipo}</td>
        <td>${equipo.estado}</td>
        <td>
          <button class="btn-eliminar" data-id="${equipo.id}">
            🗑️ Eliminar
          </button>
        </td>
      `;

            tablaEquipment.appendChild(fila);
        });
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudieron cargar los equipos ❌");
    }
}

async function crearEquipment(nombre: string, tipo: string, estado: string): Promise<void> {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, tipo, estado }),
        });

        if (!respuesta.ok) throw new Error("Error al guardar equipo");

        mostrarMensaje("Equipo registrado correctamente ✅");
        formEquipment.reset();
        await cargarEquipment();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo registrar el equipo ❌");
    }
}

async function eliminarEquipment(id: number): Promise<void> {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

        if (!respuesta.ok) throw new Error("Error al eliminar equipo");

        mostrarMensaje("Equipo eliminado correctamente 🗑️");
        await cargarEquipment();
    } catch (error) {
        console.error(error);
        mostrarMensaje("No se pudo eliminar el equipo ❌");
    }
}

function mostrarMensaje(texto: string): void {
    mensaje.textContent = texto;
    setTimeout(() => (mensaje.textContent = ""), 3000);
}

formEquipment.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = inputNombre.value.trim();
    const tipo = inputTipo.value.trim();
    const estado = inputEstado.value.trim();

    if (!nombre || !tipo || !estado) {
        mostrarMensaje("Todos los campos son obligatorios ⚠️");
        return;
    }

    await crearEquipment(nombre, tipo, estado);
});

tablaEquipment.addEventListener("click", async (event) => {
    const elemento = event.target as HTMLElement;

    if (elemento.classList.contains("btn-eliminar")) {
        const id = Number(elemento.dataset.id);
        if (confirm("¿Seguro que quieres eliminar este equipo?")) {
            await eliminarEquipment(id);
        }
    }
});

cargarEquipment();
export { };
