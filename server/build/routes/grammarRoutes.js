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
        this.router.post('/analizar', grammarController_1.grammarController.lector);
        this.router.get('/errores', grammarController_1.grammarController.errores);
        this.router.get('/sym', grammarController_1.grammarController.symbolos);
    }
}
const grammarRoutes = new GrammarRoutes();
exports.default = grammarRoutes.router;
