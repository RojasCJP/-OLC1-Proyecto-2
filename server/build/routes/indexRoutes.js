"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //url PORT/
        this.router.get('/', (req, res) => {
            indexController_1.indexController.index(req, res);
        });
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
