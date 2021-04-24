import { Instruccion } from '../tree/instruccion';
import { Sym } from './sym';

export class Enviroment {
  public table: Map<string, Sym>;
  public printList: string[];
  public previous: Enviroment | null;
  public instructionList: Instruccion[] = [];

  constructor(previous: Enviroment | null) {
    this.table = new Map<string, Sym>();
    this.printList = [];
    if (previous instanceof Enviroment) {
      this.previous = previous;
    } else {
      this.previous = null;
    }
  }

  public getGlobal(): Enviroment | null {
    //el retorno lleva null para que se pueda mandar eso
    let env: Enviroment;
    for (env = this; env != null; env = env.previous) {
      if (env.previous == null) return env;
    }
    return null;
  }

  public insert(name: string, sym: Sym, line: number, column: number): boolean {
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
        //este unefined se pone unicamente para que typescript no lo detecte como un error, al igual que el retorno
        let sym: Sym | undefined = env.table.get(name);
        return sym;
      }
    }
    return undefined;
  }

  public updateValue(
    name: string,
    sym: Sym,
    line: number,
    column: number
  ): void {
    name = name.toLowerCase();
    let env: Enviroment | null;
    for (env = this; env != null; env = env.previous) {
      if (env.table.has(name)) {
        env.table.delete(name);
        env.table.set(name, sym);
      }
    }
  }

  public setPrevious(previeus: Enviroment) {
    this.previous = previeus;
  }

  public getPrevious(): Enviroment | null {
    return this.previous;
  }
}
