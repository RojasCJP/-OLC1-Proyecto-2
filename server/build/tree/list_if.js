"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIf = void 0;
class ListIf {
    constructor(line, column, listIf) {
        this.listIf = listIf;
        this.line = line;
        this.column = column;
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
    execute(env) {
        for (let i = 0; i < this.listIf.length; i++) {
            this.listIf[i].execute(env);
        }
    }
}
exports.ListIf = ListIf;
