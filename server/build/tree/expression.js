"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression_type = exports.Expression = void 0;
const sym_1 = require("../enviroment/sym");
class Expression {
    constructor() {
        this.parameters = [];
        this.arraySizes = [];
        this.paramsResult = [];
        this.symResult = [];
        this.type = Expression_type.NULO;
        this.leftExp = new Expression();
        this.rightExp = new Expression();
        this.val = new sym_1.Sym();
        this.line = 0;
        this.column = 0;
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
    execute(env) {
        throw new Error('Method not implemented.');
    }
}
exports.Expression = Expression;
var Expression_type;
(function (Expression_type) {
    Expression_type[Expression_type["SUMA"] = 0] = "SUMA";
    Expression_type[Expression_type["RESTA"] = 1] = "RESTA";
    Expression_type[Expression_type["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Expression_type[Expression_type["DIVISION"] = 3] = "DIVISION";
    Expression_type[Expression_type["MAYOR"] = 4] = "MAYOR";
    Expression_type[Expression_type["MENOR"] = 5] = "MENOR";
    Expression_type[Expression_type["MAYORIGUAL"] = 6] = "MAYORIGUAL";
    Expression_type[Expression_type["MENORIGUAL"] = 7] = "MENORIGUAL";
    Expression_type[Expression_type["IGUALIGUAL"] = 8] = "IGUALIGUAL";
    Expression_type[Expression_type["DIFERENTE"] = 9] = "DIFERENTE";
    Expression_type[Expression_type["NOT"] = 10] = "NOT";
    Expression_type[Expression_type["OR"] = 11] = "OR";
    Expression_type[Expression_type["AND"] = 12] = "AND";
    Expression_type[Expression_type["ENTERO"] = 13] = "ENTERO";
    Expression_type[Expression_type["DECIMAL"] = 14] = "DECIMAL";
    Expression_type[Expression_type["CADENA"] = 15] = "CADENA";
    Expression_type[Expression_type["CHAR"] = 16] = "CHAR";
    Expression_type[Expression_type["BOOLEAN"] = 17] = "BOOLEAN";
    Expression_type[Expression_type["IDENTIFICADOR"] = 18] = "IDENTIFICADOR";
    Expression_type[Expression_type["FUNCION"] = 19] = "FUNCION";
    Expression_type[Expression_type["NULO"] = 20] = "NULO";
})(Expression_type = exports.Expression_type || (exports.Expression_type = {}));
