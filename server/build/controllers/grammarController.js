"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarController = exports.grammarController = void 0;
const enviroment_1 = require("../enviroment/enviroment");
const asignacion_1 = require("../tree/asignacion");
const declaracion_1 = require("../tree/declaracion");
const do_while_1 = require("../tree/do_while");
const else_1 = require("../tree/else");
const expression_1 = require("../tree/expression");
const function_1 = require("../tree/function");
const function_call_1 = require("../tree/function_call");
const if_1 = require("../tree/if");
const list_if_1 = require("../tree/list_if");
const print_1 = require("../tree/print");
const return_1 = require("../tree/return");
const while_1 = require("../tree/while");
class GrammarController {
    constructor() { }
    levantado(req, res) {
        res.json({ response: 'grammar levantado correctamente' });
    }
    lector(req, res) {
        var parser = require('./grammar');
        parser.parse(req.body.codigo);
        let root = GrammarController.instructionList;
        let global = new enviroment_1.Enviroment(null);
        GrammarController.executeAST(root, global);
        // console.log(GrammarController.instructionList);
        // todo con esta linea tengo que hacer el reporte ast eso se hace con root
        for (let i = 0; i < GrammarController.errores.length; i++) {
            GrammarController.consola +=
                GrammarController.errores[i].mensaje +
                    ' se encuentra en la linea ' +
                    GrammarController.errores[i].linea +
                    ' y en la columna ' +
                    GrammarController.errores[i].columna +
                    '\n';
        }
        res.json({ codigo: GrammarController.consola });
        GrammarController.consola = '';
    }
    errores(req, res) {
        res.json(GrammarController.errores);
    }
    symbolos(req, res) {
        res.json(GrammarController.symbolos);
    }
    instructions(req, res) {
        let root = GrammarController.instructionList;
        GrammarController.makeGraph(root, 0);
        res.json(GrammarController.instructionList);
    }
    static makeGraph(instructions, padre) {
        instructions.forEach((instruction) => {
            var _a, _b, _c;
            let valorNodo = GrammarController.contador + 1;
            if (instruction instanceof declaracion_1.Declaration) {
                let declaration = instruction;
                GrammarController.contador++;
                console.log(padre + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="declaracion"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="' + declaration.id + '"];');
                if (((_a = declaration.value) === null || _a === void 0 ? void 0 : _a.val.value) != undefined) {
                    GrammarController.contador++;
                    console.log(valorNodo + '->' + GrammarController.contador + ';');
                    console.log(GrammarController.contador +
                        '[label="' +
                        ((_b = declaration.value) === null || _b === void 0 ? void 0 : _b.val.value) +
                        '"];');
                }
            }
            if (instruction instanceof asignacion_1.Asignation) {
                let asignation = instruction;
                GrammarController.contador++;
                console.log(padre + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="asignacion"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="' + asignation.id + '"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador +
                    '[label="' +
                    ((_c = asignation.value) === null || _c === void 0 ? void 0 : _c.val.value) +
                    '"];');
            }
            if (instruction instanceof do_while_1.DoWhile) {
                let doWhile = instruction;
                GrammarController.contador++;
                console.log(padre + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="do while"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador +
                    '[label="' +
                    doWhile.condition.val.value +
                    '"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="instrucciones"]');
                GrammarController.makeGraph(doWhile.instructionList, GrammarController.contador);
            }
            if (instruction instanceof else_1.Else) {
                let else_ = instruction;
                GrammarController.contador++;
                console.log(padre + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="else"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="instrucciones"]');
                GrammarController.makeGraph(else_.instructionList, GrammarController.contador);
            }
            if (instruction instanceof expression_1.Expression) {
                console.log('-----------------------expression-----------------------');
                let expression = instruction;
                if (expression.val.value == undefined) {
                    let contenido = [];
                    if (expression.leftExp != null)
                        contenido.push(expression.leftExp);
                    if (expression.rightExp != null)
                        contenido.push(expression.rightExp);
                    GrammarController.makeGraph(contenido, valorNodo);
                }
                else {
                    console.log(expression.val.value);
                }
            }
            if (instruction instanceof function_call_1.FunctionCall) {
                console.log('-----------------------functionCall-----------------------');
                let functionCall = instruction;
                if (functionCall.parametersExpressions != null) {
                    GrammarController.makeGraph(functionCall.parametersExpressions, valorNodo);
                }
            }
            if (instruction instanceof function_1.Function) {
                console.log('-----------------------function-----------------------');
                let function_ = instruction;
                console.log(function_.id);
                if (function_.parameters != null) {
                    GrammarController.makeGraph(function_.parameters, valorNodo);
                }
                GrammarController.makeGraph(function_.instructions, valorNodo);
            }
            if (instruction instanceof if_1.If) {
                let if_ = instruction;
                GrammarController.contador++;
                console.log(padre + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="if"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador +
                    '[label="' +
                    if_.condition.val.value +
                    '"];');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="instrucciones"]');
                GrammarController.makeGraph(if_.instructionList, GrammarController.contador);
            }
            if (instruction instanceof list_if_1.ListIf) {
                let listIf = instruction;
                GrammarController.contador++;
                console.log(padre + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="lista de if"]');
                GrammarController.contador++;
                console.log(valorNodo + '->' + GrammarController.contador + ';');
                console.log(GrammarController.contador + '[label="instrucciones"]');
                GrammarController.makeGraph(listIf.listIf, GrammarController.contador);
            }
            if (instruction instanceof print_1.Print) {
                console.log('-----------------------print-----------------------');
                let print_ = instruction;
                if (print_ != null && print_.content != null) {
                    if (print_.content.value != undefined) {
                        console.log(print_.content.value);
                    }
                    else {
                        let contenido = [print_.content];
                        GrammarController.makeGraph(contenido, valorNodo);
                    }
                }
            }
            if (instruction instanceof return_1.Return) {
                console.log('-----------------------return-----------------------');
                let retorno = instruction;
                if (retorno.expression.val.value != null) {
                    console.log(retorno.expression.val.value);
                }
                else {
                    let contenido = [retorno.expression];
                    GrammarController.makeGraph(contenido, valorNodo);
                }
            }
            if (instruction instanceof while_1.While) {
                console.log('-----------------------while-----------------------');
                let while_ = instruction;
                console.log(while_.condition.val.value);
                console.log(while_.condition.val.name);
                GrammarController.makeGraph(while_.instructionList, valorNodo);
            }
        });
    }
    static executeAST(root, global) {
        if (root != null && root != undefined) {
            root.forEach((ins) => {
                if (ins != ';' && ins != '}') {
                    ins.execute(global);
                }
            });
            for (let i = 0; i < global.printList.length; i++) {
                GrammarController.consola += global.printList[i];
            }
        }
    }
}
exports.GrammarController = GrammarController;
GrammarController.consola = '';
GrammarController.errores = [];
GrammarController.symbolos = [];
GrammarController.contador = 0;
GrammarController.instructionList = [];
exports.grammarController = new GrammarController();
