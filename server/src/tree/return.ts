import { Enviroment } from '../enviroment/enviroment';
import { Expression } from './expression';
import { Instruccion } from './instruccion';
import { Sym } from '../enviroment/sym';

export class Return implements Instruccion {
  private line: number;
  private column: number;
  public expression: Expression;

  constructor(expression: Expression, line: number, column: number) {
    this.expression = expression;
    this.line = line;
    this.column = column;
  }

  execute(env: Enviroment): any {
    if (this.expression != null && this.expression != undefined) {
      this.expression.paramsResult = this.executeParams(this.expression, env);
      let result: any = this.expression.execute(env);
      if (result instanceof Sym) {
        let sym: Sym = result;
        sym.breturn = true;
        return sym;
      }
      return result;
    }
    return 'return';
  }

  public executeParams(expression: Expression, env: Enviroment): Sym[] | null {
    let paramsResult: Sym[] | null = null;
    if (
      expression != null &&
      expression.parameters != null &&
      expression != undefined &&
      expression.parameters != undefined
    ) {
      paramsResult = [];
      for (let i = 0; i < expression.parameters.length; i++) {
        let exp: Expression = expression.parameters[i];
        exp.paramsResult = this.executeParams(exp, env);
        let result: any = exp.execute(env);
        if (result instanceof Sym) {
          const sym: Sym = result;
          if (paramsResult.length < expression.parameters.length)
            paramsResult.splice(i, 0, sym);
          else paramsResult[i] = sym;
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
}
