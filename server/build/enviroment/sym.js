"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumType = exports.Sym = void 0;
class Sym {
    constructor(type, value) {
        if (type != undefined && value != undefined) {
            this.type = type;
            this.value = value;
        }
        this.breturn = false;
    }
    toString() {
        if (this.value != null || this.value != undefined) {
            return JSON.stringify(this.value);
        }
        if (this.value == null)
            return 'null';
        return 'undefined';
    }
}
exports.Sym = Sym;
var EnumType;
(function (EnumType) {
    EnumType[EnumType["int"] = 0] = "int";
    EnumType[EnumType["double"] = 1] = "double";
    EnumType[EnumType["boolean"] = 2] = "boolean";
    EnumType[EnumType["string"] = 3] = "string";
    EnumType[EnumType["char"] = 4] = "char";
    EnumType[EnumType["void"] = 5] = "void";
    EnumType[EnumType["error"] = 6] = "error";
})(EnumType = exports.EnumType || (exports.EnumType = {}));
