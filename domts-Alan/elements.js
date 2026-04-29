import { JSDOM } from "jsdom";
/**
 * Crea un elemento <textarea> con atributos específicos.
 */
export function createTextarea(rows, cols, placeholder) {
    const dom = new JSDOM();
    const textarea = dom.window.document.createElement("textarea");
    textarea.rows = rows;
    textarea.cols = cols;
    textarea.placeholder = placeholder;
    return textarea;
}
/**
 * Crea un elemento <form> con atributos action y method.
 */
export function createForm(action, method) {
    const dom = new JSDOM();
    const form = dom.window.document.createElement("form");
    form.action = action;
    form.method = method;
    return form;
}
/**
 * Crea un elemento <tr> con clase específica.
 */
export function createTableRow(className) {
    const dom = new JSDOM();
    const tr = dom.window.document.createElement("tr");
    tr.className = className;
    return tr;
}
/**
 * Crea un elemento <td> con atributo colspan.
 */
export function createTableData(content, colspan) {
    const dom = new JSDOM();
    const td = dom.window.document.createElement("td");
    td.colSpan = colspan;
    td.textContent = content;
    return td;
}
/**
 * Crea un elemento <th> con atributo scope.
 */
export function createTableHeader(content, scope) {
    const dom = new JSDOM();
    const th = dom.window.document.createElement("th");
    th.scope = scope;
    th.textContent = content;
    return th;
}
//# sourceMappingURL=elements.js.map