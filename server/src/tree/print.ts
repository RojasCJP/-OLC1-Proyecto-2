import { Enviroment } from '../enviroment/enviroment';
import { Sym } from '../enviroment/sym';
import { Expression } from './expression';
import { Instruccion } from './instruccion';
export class Print implements Instruccion {
  public content: Expression | null = null;
  private line: number;
  private column: number;

  constructor(content: Expression, line: number, column: number) {
    this.content = content;
    this.line = line;
    this.column = column;
  }

  execute(env: Enviroment): any {
    if (this.content != null) {
      this.content.paramsResult = this.executeParams(this.content, env);
      let print: string = JSON.stringify(this.content.execute(env).value);
      env.getGlobal()?.printList.push(print + '\n');
    }
    return null;
  }

  executeParams(expression: Expression, env: Enviroment): Sym[] | null {
    let paramsResult: Sym[] | null = null;
    if (
      expression != null &&
      expression != undefined &&
      expression.parameters != null &&
      expression.parameters != undefined
    ) {
      paramsResult = [];
      for (let i = 0; i < expression.parameters.length; i++) {
        let exp: Expression = expression.parameters[i];
        exp.paramsResult = this.executeParams(expression, env);
        let result: any = expression.execute(env);
        if (result instanceof Sym) {
          const s: Sym = result;
          if (paramsResult.length < expression.parameters.length)
            paramsResult.splice(i, 0, s);
          else paramsResult[i] = s;
        }
      }
    }
    return paramsResult;
  }
  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }

  //tengo que cambiar este y quitarle el any
}
