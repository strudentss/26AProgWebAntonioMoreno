import { homePage, aboutPage, contactPage } from "./pages.js";
const app = document.getElementById("App");
const homeBtn = document.getElementById("homeBtn");
const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
// Función para cambiar contenido dinámicamente
function render(page) {
    app.innerHTML = page;
}
// Eventos
homeBtn.addEventListener("click", () => render(homePage()));
aboutBtn.addEventListener("click", () => render(aboutPage()));
contactBtn.addEventListener("click", () => render(contactPage()));
// Página inicial
render(homePage());
//# sourceMappingURL=main.js.map