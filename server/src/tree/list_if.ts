import { Enviroment } from '../enviroment/enviroment';
import { Else } from './else';
import { Expression } from './expression';
import { If } from './if';
import { Instruccion } from './instruccion';

export class ListIf implements Instruccion {
  public listIf: Instruccion[];
  public condiciones: boolean[];
  private line: number;
  private column: number;

  constructor(line: number, column: number, listIf: Instruccion[]) {
    this.listIf = listIf;
    this.line = line;
    this.column = column;
    this.condiciones = [];
  }
  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
  execute(env: Enviroment) {
    for (let i = 0; i < this.listIf.length; i++) {
      let ifVariable: Instruccion = this.listIf[i];
      if (ifVariable instanceof If) {
        this.condiciones.push(ifVariable.condition.execute(env).value);
      }
    }
    let trigger: boolean = true;
    for (let i = 0; i < this.listIf.length; i++) {
      if (this.listIf[i] instanceof If) {
        this.listIf[i].execute(env);
      } else if (this.listIf[i] instanceof Else) {
        for (let j = 0; j < this.condiciones.length; j++) {
          console.log('estas son las condiciones');
          console.log(this.condiciones[j]);
          if (this.condiciones[j]) {
            trigger = false;
          }
        }
        if (trigger) {
          this.listIf[i].execute(env);
        }
      }
    }
  }
}
