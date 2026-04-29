/**
 * Crea un elemento <textarea> con atributos específicos.
 */
export declare function createTextarea(rows: number, cols: number, placeholder: string): HTMLTextAreaElement;
/**
 * Crea un elemento <form> con atributos action y method.
 */
export declare function createForm(action: string, method: "get" | "post"): HTMLFormElement;
/**
 * Crea un elemento <tr> con clase específica.
 */
export declare function createTableRow(className: string): HTMLTableRowElement;
/**
 * Crea un elemento <td> con atributo colspan.
 */
export declare function createTableData(content: string, colspan: number): HTMLTableCellElement;
/**
 * Crea un elemento <th> con atributo scope.
 */
export declare function createTableHeader(content: string, scope: "col" | "row"): HTMLTableCellElement;
//# sourceMappingURL=elements.d.ts.map