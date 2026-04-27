import { JSDOM } from "jsdom";

/**
 * Crea un elemento <textarea> con atributos específicos.
 */
export function createTextarea(
    rows: number,
    cols: number,
    placeholder: string
): HTMLTextAreaElement {
    const dom = new JSDOM();
    const textarea: HTMLTextAreaElement = dom.window.document.createElement("textarea");
    textarea.rows = rows;
    textarea.cols = cols;
    textarea.placeholder = placeholder;
    return textarea;
}

/**
 * Crea un elemento <form> con atributos action y method.
 */
export function createForm(
    action: string,
    method: "get" | "post"
): HTMLFormElement {
    const dom = new JSDOM();
    const form: HTMLFormElement = dom.window.document.createElement("form");
    form.action = action;
    form.method = method;
    return form;
}

/**
 * Crea un elemento <tr> con clase específica.
 */
export function createTableRow(className: string): HTMLTableRowElement {
    const dom = new JSDOM();
    const tr: HTMLTableRowElement = dom.window.document.createElement("tr");
    tr.className = className;
    return tr;
}

/**
 * Crea un elemento <td> con atributo colspan.
 */
export function createTableData(
    content: string,
    colspan: number
): HTMLTableCellElement {
    const dom = new JSDOM();
    const td: HTMLTableCellElement = dom.window.document.createElement("td");
    td.colSpan = colspan;
    td.textContent = content;
    return td;
}

/**
 * Crea un elemento <th> con atributo scope.
 */
export function createTableHeader(
    content: string,
    scope: "col" | "row"
): HTMLTableCellElement {
    const dom = new JSDOM();
    const th: HTMLTableCellElement = dom.window.document.createElement("th");
    th.scope = scope;
    th.textContent = content;
    return th;
}
