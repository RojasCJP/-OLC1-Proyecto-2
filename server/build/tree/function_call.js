"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCall = void 0;
const enviroment_1 = require("../enviroment/enviroment");
const sym_1 = require("../enviroment/sym");
const expression_1 = require("./expression");
class FunctionCall {
    constructor(id, parametersExpression, line, column) {
        this.paramsResult = [];
        this.id = id;
        this.parametersExpressions = parametersExpression;
        this.line = line;
        this.column = column;
        // trae una lista de expressiones y guarda en el val lo que metimos
    }
    execute(env) {
        let local = new enviroment_1.Enviroment(env);
        let fun = local.search(this.id + '%%', this.line, this.column);
        if (fun != undefined && fun != null) {
            let parameterIns = fun.value;
            if (parameterIns.parameters != null) {
                for (let i = 0; i < parameterIns.parameters.length; i++) {
                    if (this.parametersExpressions != null) {
                        parameterIns.parameters[i].value = this.parametersExpressions[i];
                    }
                }
            }
            let parameters = parameterIns.parameters;
            let instructions = parameterIns.instructions;
            if (parameters != null && parameters != undefined) {
                let index = 0;
                parameters.forEach((declaration) => {
                    let sym = null;
                    if (this.paramsResult != null)
                        sym = this.paramsResult[index++];
                    declaration.execute(local);
                    local.updateValue(declaration.id, sym, this.line, this.column);
                });
            }
            if (instructions != null && instructions != undefined) {
                for (let j = 0; j < instructions.length; j++) {
                    let instruction = instructions[j];
                    if (instruction instanceof FunctionCall) {
                        let call = instruction;
                        if (call.paramsResult != null) {
                            call.paramsResult = this.executeParamsParams(call.parametersExpressions, local);
                        }
                        instruction = call;
                    }
                    else if (instruction instanceof expression_1.Expression) {
                        let expression = instruction;
                        expression.paramsResult = this.executeParamsExpression(expression, local);
                        instruction = expression;
                    }
                    let result = instruction.execute(local);
                    if (result != null && result != undefined) {
                        if (result instanceof sym_1.Sym && !(instruction instanceof expression_1.Expression)) {
                            let sym = result;
                            if (sym.breturn)
                                return sym;
                        }
                    } // agregar validaciones, ahorita es solo de funciones, falta para metodos
                }
                return new sym_1.Sym(sym_1.EnumType.error, '@Error');
            }
        }
        return null;
    }
    executeParamsParams(parameters, env) {
        let params = [];
        if (parameters != null && parameters != undefined) {
            for (let i = 0; i < parameters.length; i++) {
                let exp = parameters[i];
                exp.paramsResult = this.executeParamsExpression(exp, env);
                let r = exp.execute(env);
                if (r instanceof sym_1.Sym) {
                    let s = r;
                    if (params.length < parameters.length)
                        params.splice(i, 0, s);
                    else
                        params[i] = s;
                }
            }
        }
        else
            return null;
        return params;
    }
    executeParamsExpression(expression, env) {
        let paramsResultt = null;
        if (expression != null &&
            expression.parameters != null &&
            expression != undefined &&
            expression.parameters != undefined) {
            paramsResultt = [];
            for (let i = 0; i < expression.parameters.length; i++) {
                let exp = expression.parameters[i];
                exp.paramsResult = this.executeParamsExpression(exp, env);
                let r = exp.execute(env);
                if (r instanceof sym_1.Sym) {
                    const s = r;
                    if (paramsResultt.length < expression.parameters.length)
                        paramsResultt.splice(i, 0, s);
                    else
                        paramsResultt[i] = s;
                }
            }
        }
        return paramsResultt;
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
}
exports.FunctionCall = FunctionCall;
