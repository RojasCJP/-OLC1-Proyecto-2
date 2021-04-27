"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const sym_1 = require("../enviroment/sym");
class Print {
    constructor(content, line, column) {
        this.content = null;
        this.content = content;
        this.line = line;
        this.column = column;
    }
    execute(env) {
        var _a;
        if (this.content != null) {
            this.content.paramsResult = this.executeParams(this.content, env);
            let print = JSON.stringify(this.content.execute(env).value);
            (_a = env.getGlobal()) === null || _a === void 0 ? void 0 : _a.printList.push(print + '\n');
        }
        return null;
    }
    executeParams(expression, env) {
        let paramsResult = null;
        if (expression != null &&
            expression != undefined &&
            expression.parameters != null &&
            expression.parameters != undefined) {
            paramsResult = [];
            for (let i = 0; i < expression.parameters.length; i++) {
                let exp = expression.parameters[i];
                exp.paramsResult = this.executeParams(expression, env);
                let result = expression.execute(env);
                if (result instanceof sym_1.Sym) {
                    const s = result;
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
exports.Print = Print;
