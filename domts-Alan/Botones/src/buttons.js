function makeButton(el, label, type) {
    el.textContent = label;
    el.className = "fake-button";
    el.addEventListener("click", () => console.log(`Botón ${type} presionado`));
    return el;
}
export function createDivButton(text) {
    return makeButton(document.createElement("div"), text, "DIV");
}
export function createSpanButton(text) {
    return makeButton(document.createElement("span"), text, "SPAN");
}
export function createImageButton(src) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Botón Imagen";
    img.className = "fake-button";
    img.addEventListener("click", () => console.log("Botón IMG presionado"));
    return img;
}
export function createParagraphButton(text) {
    return makeButton(document.createElement("p"), text, "P");
}
export function createLinkButton(text) {
    const a = document.createElement("a");
    a.href = "#";
    return makeButton(a, text, "A");
}
export function createArticleButton(text) {
    return makeButton(document.createElement("article"), text, "ARTICLE");
}
export function createHeaderButton(text) {
    return makeButton(document.createElement("h2"), text, "HEADER");
}
export function createListButton(text) {
    return makeButton(document.createElement("li"), text, "LI");
}
export function createSectionButton(text) {
    return makeButton(document.createElement("section"), text, "SECTION");
}
//# sourceMappingURL=buttons.js.map