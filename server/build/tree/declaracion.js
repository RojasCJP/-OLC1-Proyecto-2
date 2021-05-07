"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const sym_1 = require("../enviroment/sym");
class Declaration {
    constructor(id, type, value, line, column) {
        this.symResult = [];
        this.id = id;
        this.value = value;
        this.type = type;
        this.line = line;
        this.column = column;
    }
    execute(env) {
        if (this.value != null || this.value != undefined) {
            this.value.paramsResult = this.executeParams(this.value, env);
            let valueResult = this.value.execute(env);
            if (valueResult.type == this.type) {
                let sym = new sym_1.Sym(valueResult.type, valueResult.value, this.id);
                let insert = env.insert(this.id, sym, this.line, this.column);
                if (insert)
                    console.log('se agrego de manera correcta');
            }
        }
        else {
            let sym;
            switch (this.type) {
                case sym_1.EnumType.int:
                    let int = 0;
                    sym = new sym_1.Sym(this.type, int);
                    break;
                case sym_1.EnumType.boolean:
                    let bool = false;
                    sym = new sym_1.Sym(this.type, bool);
                    break;
                case sym_1.EnumType.char:
                    let char = '';
                    sym = new sym_1.Sym(this.type, char);
                    break;
                case sym_1.EnumType.double:
                    let double = 0;
                    sym = new sym_1.Sym(this.type, double);
                    break;
                case sym_1.EnumType.string:
                    let str = '';
                    sym = new sym_1.Sym(this.type, str);
                    break;
                default:
                    sym = new sym_1.Sym(this.type, null);
                    break;
            }
            let insert = env.insert(this.id, sym, this.line, this.column);
            if (insert)
                console.log('se agrego de manera correcta');
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
    setExpression(e) {
        this.value = e;
    }
}
exports.Declaration = Declaration;
