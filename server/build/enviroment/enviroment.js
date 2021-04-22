"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enviroment = void 0;
class Enviroment {
    constructor() {
        this.table = new Map();
        this.printList = [];
        this.previous = new Enviroment();
    }
    getGlobal() {
        //el retorno lleva null para que se pueda mandar eso
        let env;
        for (env = this; env != null; env = env.previous) {
            if (env.previous == null)
                return env;
        }
        return null;
    }
    insert(name, sym, line, column) {
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
                //este unefined se pone unicamente para que typescript no lo detecte como un error, al igual que el retorno
                let sym = env.table.get(name);
                return sym;
            }
        }
        return undefined;
    }
    updateValue(name, sym, line, column) {
        name = name.toLowerCase();
        let env;
        for (env = this; env != null; env = env.previous) {
            if (env.table.has(name)) {
                env.table.delete(name);
                env.table.set(name, sym);
            }
        }
    }
    setPrevious(previeus) {
        this.previous = previeus;
    }
    getPrevious() {
        return this.previous;
    }
}
exports.Enviroment = Enviroment;
