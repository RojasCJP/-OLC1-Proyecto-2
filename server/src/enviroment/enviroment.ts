import { Instruccion } from '../tree/instruccion';
import { Sym } from './sym';
import { GrammarController } from '../controllers/grammarController';

export class Enviroment {
  public table: Map<string, Sym>;
  public printList: string[];
  public previous: Enviroment | null;
  public instructionList: Instruccion[] = [];

  constructor(previous: Enviroment | null) {
    this.table = new Map<string, Sym>();
    this.printList = [];
    this.previous = previous;
  }

  public getGlobal(): Enviroment | null {
    let env: Enviroment;
    for (env = this; env != null; env = env.previous) {
      if (env.previous == null) return env;
    }
    return null;
  }

  public insert(name: string, sym: Sym, line: number, column: number): boolean {
    let symbolo: any = { name: name, sym: sym, linea: line, columna: column };
    GrammarController.symbolos.push(symbolo);
    //todo con esta linea tengo que hacer el reporte de variables
    name = name.toLowerCase();
    if (this.table.has(name)) return false;
    this.table.set(name, sym);
    return true;
  }

  public search(name: string, line: number, column: number): Sym | undefined {
    name = name.toLowerCase();
    let env: Enviroment | null;
    for (env = this; env != null; env = env.previous) {
      if (env.table.has(name)) {
        let sym: Sym | undefined = env.table.get(name);
        return sym;
      }
    }
    return undefined;
  }

  public updateValue(
    name: string,
    sym: Sym | null,
    line: number,
    column: number
  ): boolean {
    name = name.toLowerCase();
    let env: Enviroment | null;
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

  public setPrevious(previeus: Enviroment) {
    this.previous = previeus;
  }

  public getPrevious(): Enviroment | null {
    return this.previous;
  }
}
