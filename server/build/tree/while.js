"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const enviroment_1 = require("../enviroment/enviroment");
const sym_1 = require("../enviroment/sym");
const expression_1 = require("./expression");
const function_call_1 = require("./function_call");
class While {
    constructor(condition, instructionList, line, column) {
        this.condition = condition;
        this.instructionList = instructionList;
        this.line = line;
        this.column = column;
    }
    execute(env) {
        this.condition.paramsResult = this.executeParamsExpression(this.condition, env);
        let conditionValue = this.condition.execute(env);
        while (conditionValue.type == sym_1.EnumType.boolean && conditionValue.value) {
            conditionValue = this.condition.execute(env);
            let localEnviroment = new enviroment_1.Enviroment(env);
            if (this.instructionList != null && this.instructionList != undefined) {
                this.instructionList.forEach((instruction) => {
                    if (instruction instanceof function_call_1.FunctionCall) {
                        let call = instruction;
                        call.paramsResult = this.executeParamsParams(call.parametersExpressions, localEnviroment);
                        instruction = call;
                    }
                    else if (instruction instanceof expression_1.Expression) {
                        let expression = instruction;
                        expression.paramsResult = this.executeParamsExpression(expression, localEnviroment);
                        instruction = expression;
                    }
                    let instruccion = instruction.execute(localEnviroment);
                    if (instruccion != null &&
                        instruccion != undefined &&
                        instruction instanceof sym_1.Sym) {
                        let sym = instruccion;
                        if (sym.breturn)
                            return instruccion;
                    }
                });
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
                let result = exp.execute(env);
                if (result instanceof sym_1.Sym) {
                    let sym = result;
                    if (params.length < parameters.length)
                        params.splice(i, 0, sym);
                    else
                        params[i] = sym;
                }
            }
        }
        return params;
    }
    executeParamsExpression(exp, env) {
        let paramsResutl = null;
        if (exp != null &&
            exp != undefined &&
            exp.parameters != null &&
            exp.parameters != undefined) {
            paramsResutl = [];
            for (let i = 0; i < exp.parameters.length; i++) {
                let expression = exp.parameters[i];
                expression.paramsResult = this.executeParamsExpression(expression, env);
                let result = exp.execute(env);
                if (result instanceof sym_1.Sym) {
                    const sym = result;
                    if (paramsResutl.length < exp.parameters.length)
                        paramsResutl.splice(i, 0, sym);
                    else
                        paramsResutl[i] = sym;
                }
            }
        }
        return paramsResutl;
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
}
exports.While = While;
