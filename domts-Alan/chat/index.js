// index.ts
import { CreateWebWorkerMLCEngine } from "https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@0.2.46/+esm";
// Funciones para crear elementos
function createMain() {
    const main = document.createElement("main");
    main.style.width = "400px";
    main.style.maxWidth = "100%";
    main.style.height = "70vh";
    main.style.background = "#fff";
    main.style.border = "1px solid #ccc";
    main.style.borderRadius = "4px";
    main.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    main.style.padding = "8px";
    main.style.marginBottom = "16px";
    main.style.overflowY = "auto";
    main.style.scrollBehavior = "smooth";
    return main;
}
function createUL() {
    const ul = document.createElement("ul");
    ul.style.display = "flex";
    ul.style.flexDirection = "column";
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    return ul;
}
function createForm() {
    const form = document.createElement("form");
    form.style.display = "flex";
    return form;
}
function createInput() {
    const input = document.createElement("input");
    input.placeholder = "Escribe tu mensaje aquí...";
    input.style.borderRadius = "999999px";
    input.style.flexGrow = "1";
    input.style.border = "1px solid #ccc";
    input.style.padding = "8px";
    input.style.marginRight = "8px";
    return input;
}
function createButton() {
    const button = document.createElement("button");
    button.textContent = "Enviar";
    button.disabled = true;
    button.style.background = "#09f";
    button.style.color = "white";
    button.style.borderRadius = "6px";
    button.style.cursor = "pointer";
    button.style.padding = "8px";
    return button;
}
function createSmall() {
    const small = document.createElement("small");
    small.textContent = " ";
    small.style.fontSize = "10px";
    small.style.color = "#555";
    return small;
}
function createMessage(text, sender) {
    const li = document.createElement("li");
    li.classList.add("message", sender);
    const span = document.createElement("span");
    span.textContent = sender === "bot" ? "GPT" : "Tú";
    const p = document.createElement("p");
    p.textContent = text;
    li.appendChild(span);
    li.appendChild(p);
    return li;
}
// Construcción dinámica del DOM
const main = createMain();
const ul = createUL();
main.appendChild(ul);
const form = createForm();
const input = createInput();
const button = createButton();
form.appendChild(input);
form.appendChild(button);
const info = createSmall();
document.body.appendChild(main);
document.body.appendChild(form);
document.body.appendChild(info);
// Lógica del chat
let messages = [];
let end = false;
const SELECTED_MODEL = "Llama-3-8B-Instruct-q4f32_1-MLC-1k";
const engine = await CreateWebWorkerMLCEngine(new Worker("./worker.js", { type: "module" }), SELECTED_MODEL, {
    initProgressCallback: (progressInfo) => {
        info.textContent = progressInfo.text;
        if (progressInfo.progress === 1 && !end) {
            end = true;
            button.removeAttribute("disabled");
            ul.appendChild(createMessage("¡Hola! Soy un ChatGPT que se ejecuta completamente en tu navegador. ¿En qué puedo ayudarte hoy?", "bot"));
            input.focus();
        }
    }
});
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const messageText = input.value.trim();
    if (messageText !== "") {
        input.value = "";
        ul.appendChild(createMessage(messageText, "user"));
        button.setAttribute("disabled", "");
    }
    const userMessage = { role: "user", content: messageText };
    messages.push(userMessage);
    const chunks = await engine.chat.completions.create({
        messages,
        stream: true
    });
    let reply = "";
    const botMessage = createMessage("", "bot");
    ul.appendChild(botMessage);
    for await (const chunk of chunks) {
        const choice = chunk.choices[0];
        const content = choice?.delta?.content ?? "";
        reply += content;
        botMessage.querySelector("p").textContent = reply;
    }
    button.removeAttribute("disabled");
    messages.push({ role: "assistant", content: reply });
    main.scrollTop = main.scrollHeight;
});
//# sourceMappingURL=index.js.map