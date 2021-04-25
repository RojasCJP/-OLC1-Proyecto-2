"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignation = void 0;
const sym_1 = require("../enviroment/sym");
const expression_1 = require("./expression");
class Asignation {
    constructor(id, value, line, column) {
        this.id = id;
        this.value = value;
        switch (value.type) {
            case expression_1.Expression_type.ENTERO:
                this.type = sym_1.EnumType.int;
                break;
            case expression_1.Expression_type.DECIMAL:
                this.type = sym_1.EnumType.double;
                break;
            case expression_1.Expression_type.CADENA:
                this.type = sym_1.EnumType.string;
                break;
            case expression_1.Expression_type.CHAR:
                this.type = sym_1.EnumType.char;
                break;
            case expression_1.Expression_type.BOOLEAN:
                this.type = sym_1.EnumType.boolean;
                break;
            default:
                this.type = sym_1.EnumType.void;
                break;
        }
        this.line = line;
        this.column = column;
    }
    execute(env) {
        if (this.value != null || this.value != undefined) {
            this.value.paramsResult = this.executeParams(this.value, env);
            let valueResult = this.value.execute(env);
            if (valueResult.type == this.type) {
                let sym = new sym_1.Sym(valueResult.type, valueResult.value);
                let variable = env.search(this.id, 0, 0);
                if ((variable === null || variable === void 0 ? void 0 : variable.type) == this.type) {
                    let insert = env.updateValue(this.id, sym, this.line, this.column);
                    if (insert)
                        console.log('se actualizo la variable adecuadamente');
                }
                else {
                    console.log('ocurrio un error al actualizar la variable');
                }
            }
        }
    }
    executeParams(expression, env) {
        let paramsResult = [];
        if (expression != null &&
            expression != undefined &&
            expression.parameters != null &&
            expression.parameters != undefined) {
            for (let i = 0; i < expression.parameters.length; i++) {
                let exp = expression.parameters[i];
                exp.paramsResult = this.executeParams(exp, env);
                let r = exp.execute(env);
                if (r instanceof sym_1.Sym) {
                    const s = r;
                    if (paramsResult.length < expression.parameters.length)
                        paramsResult.splice(i, 0, s);
                    else
                        paramsResult[i] = s;
                }
            }
        }
        return paramsResult;
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
}
exports.Asignation = Asignation;
