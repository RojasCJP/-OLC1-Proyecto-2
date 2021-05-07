"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarController = exports.grammarController = void 0;
const enviroment_1 = require("../enviroment/enviroment");
const asignacion_1 = require("../tree/asignacion");
const declaracion_1 = require("../tree/declaracion");
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
        root.forEach((instruccion) => {
            var _a;
            if (instruccion instanceof declaracion_1.Declaration) {
                let declaration = instruccion;
                console.log(declaration.id);
                console.log((_a = declaration.value) === null || _a === void 0 ? void 0 : _a.val.value);
            }
            if (instruccion instanceof asignacion_1.Asignation) {
                let asignation = instruccion;
                console.log(asignation.id);
                console.log(asignation.value.val.value);
            }
        });
        res.json(GrammarController.instructionList);
    }
    static executeAST(root, global) {
        if (root != null && root != undefined) {
            root.forEach((ins) => {
                ins.execute(global);
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
GrammarController.instructionList = [];
exports.grammarController = new GrammarController();
