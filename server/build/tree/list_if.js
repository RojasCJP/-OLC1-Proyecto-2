"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListIf = void 0;
const else_1 = require("./else");
const if_1 = require("./if");
class ListIf {
    constructor(line, column, listIf) {
        this.listIf = listIf;
        this.line = line;
        this.column = column;
        this.condiciones = [];
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
    execute(env) {
        for (let i = 0; i < this.listIf.length; i++) {
            let ifVariable = this.listIf[i];
            if (ifVariable instanceof if_1.If) {
                this.condiciones.push(ifVariable.condition.execute(env).value);
            }
        }
        let trigger = true;
        for (let i = 0; i < this.listIf.length; i++) {
            if (this.listIf[i] instanceof if_1.If) {
                this.listIf[i].execute(env);
            }
            else if (this.listIf[i] instanceof else_1.Else) {
                for (let j = 0; j < this.condiciones.length; j++) {
                    console.log('estas son las condiciones');
                    console.log(this.condiciones[j]);
                    if (this.condiciones[j]) {
                        trigger = false;
                    }
                }
                if (trigger) {
                    this.listIf[i].execute(env);
                }
            }
        }
    }
}
exports.ListIf = ListIf;
