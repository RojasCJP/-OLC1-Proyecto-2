"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrammarController = exports.grammarController = void 0;
class GrammarController {
    constructor() { }
    levantado(req, res) {
        res.json({ response: 'grammar levantado correctamente' });
    }
    lector(req, res) {
        var parser = require('./grammar');
        parser.parse(req.body.codigo);
        console.log(GrammarController.consola);
        // todo aqui tengo que cambiar codigo por consola en el json
        res.json({ codigo: GrammarController.consola });
        GrammarController.consola = '';
    }
}
exports.GrammarController = GrammarController;
GrammarController.consola = '';
exports.grammarController = new GrammarController();
