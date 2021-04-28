"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarController = exports.grammarController = void 0;
const enviroment_1 = require("../enviroment/enviroment");
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
        console.log(global);
        console.log(GrammarController.consola);
        console.log(JSON.stringify(root));
        // todo con esta linea tengo que hacer el reporte ast
        //todo todavia tengo que hacer el reporte de errores
        res.json({ codigo: GrammarController.consola });
        GrammarController.consola = '';
    }
    errores(req, res) {
        res.json(GrammarController.errores);
    }
    symbolos(req, res) {
        res.json(GrammarController.symbolos);
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
