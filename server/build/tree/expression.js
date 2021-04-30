"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression_type = exports.Expression = void 0;
const sym_1 = require("../enviroment/sym");
const function_call_1 = require("./function_call");
class Expression {
    constructor(type, line, column, leftExpression, rightExpression, value, parameters) {
        this.parameters = [];
        this.arraySizes = [];
        this.paramsResult = null;
        this.symResult = [];
        this.type = Expression_type.NULO;
        this.leftExp = null;
        this.rightExp = null;
        this.val = new sym_1.Sym();
        this.line = 0;
        this.column = 0;
        this.type = type;
        this.line = line;
        this.column = column;
        if (leftExpression != null && rightExpression != null) {
            this.leftExp = leftExpression;
            this.rightExp = rightExpression;
        }
        if (value) {
            this.value = value;
            switch (this.type) {
                case Expression_type.ENTERO:
                    this.val = new sym_1.Sym(sym_1.EnumType.int, value);
                    break;
                case Expression_type.DECIMAL:
                    this.val = new sym_1.Sym(sym_1.EnumType.double, value);
                    break;
                case Expression_type.BOOLEAN:
                    this.val = new sym_1.Sym(sym_1.EnumType.boolean, value);
                    break;
                case Expression_type.CHAR:
                    this.val = new sym_1.Sym(sym_1.EnumType.char, value);
                    break;
                case Expression_type.CADENA:
                    this.val = new sym_1.Sym(sym_1.EnumType.string, value);
                    break;
                case Expression_type.IDENTIFICADOR:
                    this.val = new sym_1.Sym(sym_1.EnumType.void, value);
            }
        }
        else {
            this.val = new sym_1.Sym();
        }
        if (parameters) {
            this.parameters = parameters;
        }
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
    execute(env) {
        let leftResult = new sym_1.Sym(sym_1.EnumType.void, 'null');
        let rightResult = new sym_1.Sym(sym_1.EnumType.void, 'null');
        if (this.leftExp != null) {
            this.leftExp.paramsResult = this.executeParams(this.leftExp, env);
            leftResult = this.leftExp.execute(env);
        }
        if (this.rightExp != null) {
            this.rightExp.paramsResult = this.executeParams(this.rightExp, env);
            rightResult = this.rightExp.execute(env);
        }
        if (this.type == Expression_type.NULO)
            return null;
        else
            switch (this.type) {
                case Expression_type.SUMA:
                    return this.Suma(env, leftResult, rightResult);
                case Expression_type.RESTA:
                    return this.Resta(env, leftResult, rightResult);
                case Expression_type.MULTIPLICACION:
                    return this.Multiplicacion(env, leftResult, rightResult);
                case Expression_type.DIVISION:
                    return this.Division(env, leftResult, rightResult);
                case Expression_type.POTENCIA:
                    return this.Potencia(env, leftResult, rightResult);
                case Expression_type.MODULO:
                    return this.Modulo(env, leftResult, rightResult);
                case Expression_type.MAYOR:
                    return this.Mayor(env, leftResult, rightResult);
                case Expression_type.MENOR:
                    return this.Menor(env, leftResult, rightResult);
                case Expression_type.MAYORIGUAL:
                    return this.MayorIgual(env, leftResult, rightResult);
                case Expression_type.MENORIGUAL:
                    return this.MenorIgual(env, leftResult, rightResult);
                case Expression_type.IGUALIGUAL:
                    return this.IgualIgual(env, leftResult, rightResult);
                case Expression_type.DIFERENTE:
                    return this.Diferente(env, leftResult, rightResult);
                case Expression_type.NOT:
                    return this.Not(env, leftResult, rightResult);
                case Expression_type.OR:
                    return this.Or(env, leftResult, rightResult);
                case Expression_type.AND:
                    return this.And(env, leftResult, rightResult);
                case Expression_type.ENTERO:
                    if (!(this.val.value instanceof Number)) {
                        this.val.value = Number(this.val.value);
                    }
                    return this.val;
                case Expression_type.DECIMAL:
                    if (!(this.val.value instanceof Number)) {
                        this.val.value = Number(this.val.value);
                    }
                    return this.val;
                case Expression_type.CADENA:
                    if (this.val.value[0] == '"') {
                        this.val.value = this.val.value.substring(1, this.val.value.length - 1);
                    }
                    return this.val;
                case Expression_type.CHAR:
                    this.val.value = this.val.value.substring(1, this.val.value.length - 1);
                    return this.val;
                case Expression_type.BOOLEAN:
                    if (!(this.val.value instanceof Boolean)) {
                        this.val.value = JSON.parse(this.val.value);
                    }
                    return this.val;
                case Expression_type.IDENTIFICADOR:
                    return this.Identificador(env);
                case Expression_type.FUNCION:
                    return this.functionVoidCall(env);
                default:
                    return null;
            }
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
    functionVoidCall(env) {
        let call = new function_call_1.FunctionCall(this.value, this.parameters, this.line, this.column);
        call.paramsResult = this.paramsResult;
        return call.execute(env);
    }
    Identificador(env) {
        let sym;
        if (this.type == Expression_type.IDENTIFICADOR) {
            sym = env.search(this.value, 0, 0);
        }
        else {
            sym = env.search(this.val.value, 0, 0);
        }
        if (sym != undefined && sym != null) {
            this.val = new sym_1.Sym(sym.type, sym.value);
            return new sym_1.Sym(sym.type, sym.value);
        }
        return new sym_1.Sym(sym_1.EnumType.error, '@error');
    }
    Suma(env, leftResult, rightResult) {
        let result = leftResult.value + rightResult.value;
        this.val = new sym_1.Sym(leftResult.type, result);
        return new sym_1.Sym(leftResult.type, result);
    }
    Resta(env, leftResult, rightResult) {
        let result = leftResult.value - rightResult.value;
        this.val = new sym_1.Sym(leftResult.type, result);
        return new sym_1.Sym(leftResult.type, result);
    }
    Multiplicacion(env, leftResult, rightResult) {
        let result = leftResult.value * rightResult.value;
        this.val = new sym_1.Sym(leftResult.type, result);
        return new sym_1.Sym(leftResult.type, result);
    }
    Division(env, leftResult, rightResult) {
        let result = leftResult.value / rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.double, result);
        return new sym_1.Sym(sym_1.EnumType.double, result);
    }
    Potencia(env, leftResult, rightResult) {
        let result = Math.pow(leftResult.value, rightResult.value);
        this.val = new sym_1.Sym(leftResult.type, result);
        return new sym_1.Sym(leftResult.type, result);
    }
    Modulo(env, leftResult, rightResult) {
        let result = leftResult.value % rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.int, result);
        return new sym_1.Sym(sym_1.EnumType.int, result);
    }
    Mayor(env, leftResult, rightResult) {
        let result = leftResult.value > rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
        return new sym_1.Sym(sym_1.EnumType.boolean, result);
    }
    Menor(env, leftResult, rightResult) {
        let result = leftResult.value < rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
        return new sym_1.Sym(sym_1.EnumType.boolean, result);
    }
    MayorIgual(env, leftResult, rightResult) {
        let result = leftResult.value >= rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
        return new sym_1.Sym(sym_1.EnumType.boolean, result);
    }
    MenorIgual(env, leftResult, rightResult) {
        let result = leftResult.value <= rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
        return new sym_1.Sym(sym_1.EnumType.boolean, result);
    }
    IgualIgual(env, leftResult, rightResult) {
        let result = leftResult.value == rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
        return new sym_1.Sym(sym_1.EnumType.boolean, result);
    }
    Diferente(env, leftResult, rightResult) {
        let result = leftResult.value != rightResult.value;
        this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
        return new sym_1.Sym(sym_1.EnumType.boolean, result);
    }
    And(env, leftResult, rightResult) {
        let result;
        if (leftResult.type == sym_1.EnumType.boolean &&
            rightResult.type == sym_1.EnumType.boolean) {
            result = leftResult.value && rightResult.value;
            this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
            return new sym_1.Sym(sym_1.EnumType.boolean, result);
        }
        return new sym_1.Sym(sym_1.EnumType.error, 'error');
    }
    Or(env, leftResult, rightResult) {
        let result;
        if (leftResult.type == sym_1.EnumType.boolean &&
            rightResult.type == sym_1.EnumType.boolean) {
            result = leftResult.value || rightResult.value;
            this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
            return new sym_1.Sym(sym_1.EnumType.boolean, result);
        }
        return new sym_1.Sym(sym_1.EnumType.error, 'error');
    }
    Not(env, leftResult, rightResult) {
        let result;
        if (leftResult.type == rightResult.type) {
            if (leftResult.type == sym_1.EnumType.boolean) {
                result = !leftResult.value;
                this.val = new sym_1.Sym(sym_1.EnumType.boolean, result);
                return new sym_1.Sym(sym_1.EnumType.boolean, result);
            }
        }
        return new sym_1.Sym(sym_1.EnumType.boolean, 'error');
    }
}
exports.Expression = Expression;
var Expression_type;
(function (Expression_type) {
    Expression_type[Expression_type["SUMA"] = 0] = "SUMA";
    Expression_type[Expression_type["RESTA"] = 1] = "RESTA";
    Expression_type[Expression_type["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Expression_type[Expression_type["DIVISION"] = 3] = "DIVISION";
    Expression_type[Expression_type["POTENCIA"] = 4] = "POTENCIA";
    Expression_type[Expression_type["MODULO"] = 5] = "MODULO";
    Expression_type[Expression_type["MAYOR"] = 6] = "MAYOR";
    Expression_type[Expression_type["MENOR"] = 7] = "MENOR";
    Expression_type[Expression_type["MAYORIGUAL"] = 8] = "MAYORIGUAL";
    Expression_type[Expression_type["MENORIGUAL"] = 9] = "MENORIGUAL";
    Expression_type[Expression_type["IGUALIGUAL"] = 10] = "IGUALIGUAL";
    Expression_type[Expression_type["DIFERENTE"] = 11] = "DIFERENTE";
    Expression_type[Expression_type["NOT"] = 12] = "NOT";
    Expression_type[Expression_type["OR"] = 13] = "OR";
    Expression_type[Expression_type["AND"] = 14] = "AND";
    Expression_type[Expression_type["ENTERO"] = 15] = "ENTERO";
    Expression_type[Expression_type["DECIMAL"] = 16] = "DECIMAL";
    Expression_type[Expression_type["CADENA"] = 17] = "CADENA";
    Expression_type[Expression_type["CHAR"] = 18] = "CHAR";
    Expression_type[Expression_type["BOOLEAN"] = 19] = "BOOLEAN";
    Expression_type[Expression_type["IDENTIFICADOR"] = 20] = "IDENTIFICADOR";
    Expression_type[Expression_type["FUNCION"] = 21] = "FUNCION";
    Expression_type[Expression_type["NULO"] = 22] = "NULO";
})(Expression_type = exports.Expression_type || (exports.Expression_type = {}));
