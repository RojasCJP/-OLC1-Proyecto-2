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
    graphviz(req, res) {
        let graph;
        let root = GrammarController.instructionList;
        GrammarController.makeGraph(root, 0);
        graph = 'digraph G {';
        graph += '0 [label="padre"];';
        graph += GrammarController.graph;
        graph += '}';
        const fs = require('fs');
        fs.writeFile('../client/src/assets/arbol.dot', graph, () => { });
        const { exec } = require('child_process');
        exec('dot.exe -Tpng ../client/src/assets/arbol.dot -o ../client/src/assets/arbol12.png', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        res.json({ mensaje: graph });
    }
    static makeGraph(instructions, padre) {
        instructions.forEach((instruction) => {
            var _a, _b, _c;
            let valorNodo = GrammarController.contador + 1;
            if (instruction instanceof declaracion_1.Declaration) {
                let declaration = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="declaracion"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="' + declaration.id + '"];';
                if (((_a = declaration.value) === null || _a === void 0 ? void 0 : _a.val.value) != undefined) {
                    GrammarController.contador++;
                    GrammarController.graph +=
                        valorNodo + '->' + GrammarController.contador + ';';
                    GrammarController.graph +=
                        GrammarController.contador +
                            '[label="' +
                            ((_b = declaration.value) === null || _b === void 0 ? void 0 : _b.val.value) +
                            '"];';
                }
            }
            if (instruction instanceof asignacion_1.Asignation) {
                let asignation = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="asignacion"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="' + asignation.id + '"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador +
                        '[label="' +
                        ((_c = asignation.value) === null || _c === void 0 ? void 0 : _c.val.value) +
                        '"];';
            }
            if (instruction instanceof do_while_1.DoWhile) {
                let doWhile = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="do while"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador +
                        '[label="' +
                        doWhile.condition.val.value +
                        '"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="instrucciones"]';
                GrammarController.makeGraph(doWhile.instructionList, GrammarController.contador);
            }
            if (instruction instanceof else_1.Else) {
                let else_ = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="else"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="instrucciones"];';
                GrammarController.makeGraph(else_.instructionList, GrammarController.contador);
            }
            if (instruction instanceof expression_1.Expression) {
                let expression = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="expresion"];';
                if (expression.val.value == undefined) {
                    let contenido = [];
                    if (expression.leftExp != null)
                        contenido.push(expression.leftExp);
                    if (expression.rightExp != null)
                        contenido.push(expression.rightExp);
                    GrammarController.makeGraph(contenido, GrammarController.contador);
                }
                else {
                    GrammarController.contador++;
                    GrammarController.graph +=
                        valorNodo + '->' + GrammarController.contador + ';';
                    GrammarController.graph +=
                        GrammarController.contador +
                            '[label="' +
                            expression.val.value +
                            '"];';
                }
            }
            if (instruction instanceof function_call_1.FunctionCall) {
                let functionCall = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="' + functionCall.id + '"];';
                if (functionCall.parametersExpressions != null) {
                    GrammarController.contador++;
                    GrammarController.graph +=
                        valorNodo + '->' + GrammarController.contador + ';';
                    GrammarController.graph +=
                        GrammarController.contador + '[label="parametros"];';
                    GrammarController.makeGraph(functionCall.parametersExpressions, GrammarController.contador);
                }
            }
            if (instruction instanceof function_1.Function) {
                let function_ = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="' + function_.id + '"];';
                if (function_.parameters != null) {
                    GrammarController.contador++;
                    GrammarController.graph +=
                        valorNodo + '->' + GrammarController.contador + ';';
                    GrammarController.graph +=
                        GrammarController.contador + '[label="parametros"];';
                    GrammarController.makeGraph(function_.parameters, GrammarController.contador);
                }
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="instrucciones"];';
                GrammarController.makeGraph(function_.instructions, GrammarController.contador);
            }
            if (instruction instanceof if_1.If) {
                let if_ = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph += GrammarController.contador + '[label="if"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador +
                        '[label="' +
                        if_.condition.val.value +
                        '"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="instrucciones"]';
                GrammarController.makeGraph(if_.instructionList, GrammarController.contador);
            }
            if (instruction instanceof list_if_1.ListIf) {
                let listIf = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="lista de if"]';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="instrucciones"]';
                GrammarController.makeGraph(listIf.listIf, GrammarController.contador);
            }
            if (instruction instanceof print_1.Print) {
                let print_ = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="print"];';
                if (print_ != null && print_.content != null) {
                    if (print_.content.value != undefined) {
                        let contenidoValor;
                        if (print_.content.value[0] == '"') {
                            contenidoValor = print_.content.value.substring(1, print_.content.value.length - 1);
                        }
                        else {
                            contenidoValor = print_.content.value;
                        }
                        GrammarController.contador++;
                        GrammarController.graph +=
                            valorNodo + '->' + GrammarController.contador + ';';
                        GrammarController.graph +=
                            GrammarController.contador + '[label="' + contenidoValor + '"];';
                    }
                    else {
                        let contenido = [print_.content];
                        GrammarController.makeGraph(contenido, GrammarController.contador);
                    }
                }
            }
            if (instruction instanceof return_1.Return) {
                let retorno = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="return"];';
                if (retorno.expression.val.value != null) {
                    let contenidoValor;
                    if (retorno.expression.val.value[0] == '"') {
                        contenidoValor = retorno.expression.val.value.substring(1, retorno.expression.val.value.length - 1);
                    }
                    else {
                        contenidoValor = retorno.expression.val.value;
                    }
                    GrammarController.contador++;
                    GrammarController.graph +=
                        valorNodo + '->' + GrammarController.contador + ';';
                    GrammarController.graph +=
                        GrammarController.contador + '[label="' + contenidoValor + '"];';
                }
                else {
                    let contenido = [retorno.expression];
                    GrammarController.makeGraph(contenido, valorNodo);
                }
            }
            if (instruction instanceof while_1.While) {
                let while_ = instruction;
                GrammarController.contador++;
                GrammarController.graph +=
                    padre + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="while"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador +
                        '[label="' +
                        while_.condition.val.value +
                        '"];';
                GrammarController.contador++;
                GrammarController.graph +=
                    valorNodo + '->' + GrammarController.contador + ';';
                GrammarController.graph +=
                    GrammarController.contador + '[label="instrucciones"];';
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
GrammarController.graph = '';
GrammarController.instructionList = [];
exports.grammarController = new GrammarController();
