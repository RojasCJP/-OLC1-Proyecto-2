import { Expression } from './expression';
import { EnumType, Sym } from '../enviroment/sym';
import { Instruccion } from './instruccion';
import { Enviroment } from '../enviroment/enviroment';

export class DeclaracionParams implements Instruccion {
  public id: string;
  private value: Expression;
  private symResult: Sym[] = [];
  private type: EnumType;
  private line: number;
  private column: number;

  constructor(
    id: string,
    type: EnumType,
    value: Expression,
    line: number,
    column: number
  ) {
    this.id = id;
    this.value = value;
    this.type = type;
    this.line = line;
    this.column = column;
  }

  public execute(env: Enviroment): void {
    if (this.value != null || this.value != undefined) {
      this.value.paramsResult = this.executeParams(this.value, env);
      let valueResult: Sym = this.value.execute(env) as Sym;
      if (valueResult.type == this.type) {
        let sym: Sym = new Sym(valueResult.type, valueResult.value);
        let insert: boolean = env.insert(this.id, sym, this.line, this.column);
        if (insert) console.log('se agrego de manera correcta');
      }
    } else {
      let sym: Sym;
      switch (this.type) {
        case EnumType.int:
          let int: number = 0;
          sym = new Sym(this.type, int);
          break;
        case EnumType.boolean:
          let bool: boolean = false;
          sym = new Sym(this.type, bool);
          break;
        case EnumType.char:
          let char: string = '';
          sym = new Sym(this.type, char);
          break;
        case EnumType.double:
          let double: number = 0;
          sym = new Sym(this.type, double);
          break;
        case EnumType.string:
          let str: string = '';
          sym = new Sym(this.type, str);
          break;
        default:
          sym = new Sym(this.type, null);
          break;
      }
      let insert: boolean = env.insert(this.id, sym, this.line, this.column);
      if (insert) console.log('se agrego de manera correcta');
    }
  }

  public executeParams(expression: Expression, env: Enviroment): Sym[] {
    let paramsResult: Sym[] = [];
    if (
      expression != null &&
      expression != undefined &&
      expression.parameters != null &&
      expression.parameters != undefined
    ) {
      for (let i = 0; i < expression.parameters.length; i++) {
        let exp: Expression = expression.parameters[i];
        exp.paramsResult = this.executeParams(exp, env);
        let r: any = exp.execute(env);
        if (r instanceof Sym) {
          const s: Sym = r;
          if (paramsResult.length < expression.parameters.length)
            paramsResult.splice(i, 0, s);
          else paramsResult[i] = s;
        }
      }
    }
    return paramsResult;
  }

  public getLine(): number {
    return this.line;
  }
  public getColumn(): number {
    return this.column;
  }
  public setExpression(e: Expression) {
    this.value = e;
  }
}
