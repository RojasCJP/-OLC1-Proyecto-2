"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const parametersIns_1 = require("./parametersIns");
const sym_1 = require("../enviroment/sym");
class Function {
    constructor(id, type, instructions, parameters, line, column) {
        this.id = id;
        this.type = type;
        this.instructions = instructions;
        this.parameters = parameters;
        this.line = line;
        this.column = column;
    }
    execute(env) {
        let parametersIns = new parametersIns_1.ParametersIns(this.instructions, this.parameters);
        let sym = new sym_1.Sym(this.type, parametersIns);
        if (this.parameters == null)
            this.parameters = [];
        let insert = env.insert(this.id + '%%', sym, this.line, this.column);
        if (insert) {
            console.log('se inserto correctamente');
        }
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
}
exports.Function = Function;
