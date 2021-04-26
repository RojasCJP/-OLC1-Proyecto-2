"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const sym_1 = require("../enviroment/sym");
class Return {
    constructor(expression, line, column) {
        this.expression = expression;
        this.line = line;
        this.column = column;
    }
    execute(env) {
        if (this.expression != null && this.expression != undefined) {
            this.expression.paramsResult = this.executeParams(this.expression, env);
            let result = this.expression.execute(env);
            if (result instanceof sym_1.Sym) {
                let sym = result;
                sym.breturn = true;
                return sym;
            }
            return result;
        }
        return 'return';
    }
    executeParams(expression, env) {
        let paramsResult = null;
        if (expression != null &&
            expression.parameters != null &&
            expression != undefined &&
            expression.parameters != undefined) {
            paramsResult = [];
            for (let i = 0; i < expression.parameters.length; i++) {
                let exp = expression.parameters[i];
                exp.paramsResult = this.executeParams(exp, env);
                let result = exp.execute(env);
                if (result instanceof sym_1.Sym) {
                    const sym = result;
                    if (paramsResult.length < expression.parameters.length)
                        paramsResult.splice(i, 0, sym);
                    else
                        paramsResult[i] = sym;
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
exports.Return = Return;
