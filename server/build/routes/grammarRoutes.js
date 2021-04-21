"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grammarController_1 = require("../controllers/grammarController");
class GrammarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //url PORT/grammar/
        this.router.get('/', grammarController_1.grammarController.levantado);
        //todo aqui tengo que mandar de req el codigo y de res tengo que mandar lo de consola
        this.router.post('/analizar', grammarController_1.grammarController.lector);
    }
}
const grammarRoutes = new GrammarRoutes();
exports.default = grammarRoutes.router;
