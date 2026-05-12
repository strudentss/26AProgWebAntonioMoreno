// Selecciona el contenedor principal
const app = document.getElementById("App");
// Verifica que exista el elemento antes de usarlo
if (app) {
    // Inyecta contenido HTML dinámicamente
    app.innerHTML = `
    <h2>Contenido generado dinámicamente</h2>
    <p>Este texto fue insertado desde TypeScript usando manipulación del DOM.</p>
  `;
}
else {
    console.error("No se encontró el elemento #App");
}
// Función para crear un botón con evento personalizado
function createButtonEvP(text, id, className, options) {
    const buttonHi = document.createElement("button");
    buttonHi.textContent = text;
    buttonHi.id = id;
    buttonHi.className = className;
    buttonHi.addEventListener(options.event, options.handler);
    return buttonHi;
}
//Verificación
let button3 = createButtonEvP("console", "03", "clb", {
    event: "click",
    handler: () => {
        console.log("evento ejecutado");
    },
});
// Agregar el botón al cuerpo del documento
document.body.appendChild(button3);
// Función para inyectar HTML dinámicamente en el contenedor #App
function injectHTML(content) {
    const app = document.getElementById("App");
    if (app) {
        app.innerHTML = content;
    }
    else {
        console.error("No se encontró el elemento #App");
    }
}
// Ejemplo de uso:
injectHTML(`
  <h2>Inyección dinámica de HTML</h2>
  <p>Este contenido fue insertado desde TypeScript sin recargar la página.</p>
`);
// Crear un botón que cambie el contenido al hacer clic
const changeBtn = document.createElement("button");
changeBtn.textContent = "Cambiar contenido";
changeBtn.addEventListener("click", () => {
    injectHTML(`
    <h2>Contenido cambiado dinámicamente</h2>
    <p>Este texto aparece al dar clic en el botón.</p>
  `);
});
// Agregar el botón al cuerpo del documento
document.body.appendChild(changeBtn);
// Mostrar contenido inicial
injectHTML(`
  <h2>Contenido inicial</h2>
  <p>Este texto se muestra al cargar la página.</p>
`);
// 🔄 Reemplazo de la función anterior
function createInjectorButton(text, html, parent) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => {
        const appDiv = document.getElementById("App");
        if (appDiv) {
            appDiv.innerHTML = html;
        }
        else {
            console.error("No se encontró el elemento #App");
        }
    });
    // Si se pasa un elemento padre, agregar el botón dentro de él
    if (parent) {
        parent.appendChild(button);
    }
    else {
        document.body.appendChild(button);
    }
    return button;
}
// 🔹 Simulación de navegación SPA
createInjectorButton("Inyectar HTML", "<p style='background-color: yellow; padding: 20px;'>¡HTML inyectado!</p>");
createInjectorButton("Página Azul", "<p style='background-color: blue; color: white; padding: 20px;'>Contenido Azul</p>");
createInjectorButton("Página Roja", "<div style='background-color: red; color: white; padding: 20px;'>Contenido Rojo</div>");
// Ejemplo de uso:
createInjectorButton("Inyectar contenido", `
  <h2>Contenido inyectado dinámicamente</h2>
  <p>Este texto aparece al presionar el botón generado por createInjectorButton().</p>
  `);
// 🔹 Paso 8.2 — Cadena de componentes reutilizables
// Botón 2: crea dinámicamente el botón 1 dentro de #App
const button2 = createInjectorButton("2 Inyectar HTML", "<div style='background-color: #FF0000; padding: 20px;'>Este div tiene un fondo rojo.</div>");
// Al hacer clic en el botón 2, además de inyectar su contenido,
// creará el botón 1 dentro del contenedor #App
button2.addEventListener("click", () => {
    const appDiv = document.getElementById("App");
    if (appDiv) {
        // Crear el botón 1 dentro de #App
        const button1 = createInjectorButton("Inyectar HTML", "<p><strong>¡HTML inyectado!</strong></p>", appDiv);
        appDiv.appendChild(button1);
    }
});
// 🔹 Paso 8.6 — Experimentos obligatorios
const appDiv = document.getElementById("App");
// --------------------
// Experimento 1: Agregar múltiples componentes dentro de #App
// --------------------
if (appDiv) {
    // Crear dos botones y agregarlos dentro de #App
    const b = createInjectorButton("Botón A", "<p>Componente A dentro de #App</p>");
    const button1 = createInjectorButton("Botón B", "<p>Componente B dentro de #App</p>");
    // Agregar ambos dentro de #App
    appDiv.appendChild(b);
    appDiv.appendChild(button1);
}
// --------------------
// Experimento 2: Evitar duplicación
// --------------------
if (appDiv) {
    // Limpiar el contenido antes de agregar nuevos componentes
    appDiv.innerHTML = "";
    const b = createInjectorButton("Botón A (sin duplicar)", "<p>Contenido único dentro de #App</p>");
    appDiv.appendChild(b);
}
// --------------------
// Experimento 3: Cadena de 3 botones dinámicos
// --------------------
if (appDiv) {
    // Botón C crea el B dentro de #App
    const buttonC = createInjectorButton("Botón C", "<div style='background-color: lightblue; padding: 10px;'>Componente C</div>");
    buttonC.addEventListener("click", () => {
        const buttonB = createInjectorButton("Botón B", "<div style='background-color: lightgreen; padding: 10px;'>Componente B</div>", appDiv);
        buttonB.addEventListener("click", () => {
            const buttonA = createInjectorButton("Botón A", "<div style='background-color: lightcoral; padding: 10px;'>Componente A</div>", appDiv);
            appDiv.appendChild(buttonA);
        });
        appDiv.appendChild(buttonB);
    });
    document.body.appendChild(buttonC);
}
export {};
//# sourceMappingURL=Hi.js.map