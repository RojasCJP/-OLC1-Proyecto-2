"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enviroment = void 0;
const grammarController_1 = require("../controllers/grammarController");
class Enviroment {
    constructor(previous) {
        this.instructionList = [];
        this.table = new Map();
        this.printList = [];
        this.previous = previous;
    }
    getGlobal() {
        let env;
        for (env = this; env != null; env = env.previous) {
            if (env.previous == null)
                return env;
        }
        return null;
    }
    insert(name, sym, line, column) {
        console.log(name, sym);
        let symbolo = { name: name, sym: sym, linea: line, columna: column };
        grammarController_1.GrammarController.symbolos.push(symbolo);
        //todo con esta linea tengo que hacer el reporte de variables
        name = name.toLowerCase();
        if (this.table.has(name))
            return false;
        this.table.set(name, sym);
        return true;
    }
    search(name, line, column) {
        name = name.toLowerCase();
        let env;
        for (env = this; env != null; env = env.previous) {
            if (env.table.has(name)) {
                let sym = env.table.get(name);
                return sym;
            }
        }
        return undefined;
    }
    updateValue(name, sym, line, column) {
        name = name.toLowerCase();
        let env;
        if (sym != null) {
            for (env = this; env != null; env = env.previous) {
                if (env.table.has(name)) {
                    env.table.set(name, sym);
                    return true;
                }
            }
        }
        return false;
    }
    setPrevious(previeus) {
        this.previous = previeus;
    }
    getPrevious() {
        return this.previous;
    }
}
exports.Enviroment = Enviroment;
