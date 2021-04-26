import { Enviroment } from '../enviroment/enviroment';
import { Instruccion } from './instruccion';

export class ListIf implements Instruccion {
  public listIf: Instruccion[];
  private line: number;
  private column: number;

  constructor(line: number, column: number, listIf: Instruccion[]) {
    this.listIf = listIf;
    this.line = line;
    this.column = column;
  }
  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
  execute(env: Enviroment) {
    for (let i = 0; i < this.listIf.length; i++) {
      this.listIf[i].execute(env);
    }
  }
}
