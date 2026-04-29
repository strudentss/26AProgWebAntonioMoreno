import { JSDOM } from "jsdom";
// Paso 5 — Cargar el DOM desde TypeScript
const html = await Bun.file("index.html").text();
const dom = new JSDOM(html);
const document = dom.window.document;
//Mejora para limpiar el documento
document.body.innerHTML = "";
console.log(document.body.innerHTML == "" ? "Empty HTML found" : "HTML found");
const titulo = document.createElement("h1");
titulo.textContent = "Manipulación del DOM con Bun y TypeScript";
document.body.appendChild(titulo);
const parrafo = document.createElement("p");
parrafo.textContent = "Este documento demuestra cómo crear y modificar elementos del DOM usando Bun y TypeScript.";
document.body.appendChild(parrafo);
// Paso 8 — Crear una lista
const lista = document.createElement("ul");
const elementos = ["Crear elementos", "Modificar contenido", "Guardar cambios"];
for (const texto of elementos) {
    const li = document.createElement("li");
    li.textContent = texto;
    lista.appendChild(li);
}
document.body.appendChild(lista);
// Paso 9 — Crear un botón
const boton = document.createElement("button");
boton.textContent = "Haz clic aquí";
boton.onclick = () => alert("¡Botón presionado!");
document.body.appendChild(boton);
// Paso 10 — Guardar los cambios
await Bun.write("index.html", dom.serialize());
//# sourceMappingURL=dom.js.map