import { Enviroment } from '../enviroment/enviroment';
import { EnumType, Sym } from '../enviroment/sym';
import { Expression, Expression_type } from './expression';
import { Instruccion } from './instruccion';

export class Asignation implements Instruccion {
  public id: string;
  public value: Expression;
  public type: EnumType;
  private line: number;
  private column: number;

  constructor(id: string, value: Expression, line: number, column: number) {
    this.id = id;
    this.value = value;
    switch (value.type) {
      case Expression_type.ENTERO:
        this.type = EnumType.int;
        break;
      case Expression_type.DECIMAL:
        this.type = EnumType.double;
        break;
      case Expression_type.CADENA:
        this.type = EnumType.string;
        break;
      case Expression_type.CHAR:
        this.type = EnumType.char;
        break;
      case Expression_type.BOOLEAN:
        this.type = EnumType.boolean;
        break;
      default:
        this.type = EnumType.void;
        break;
    }
    this.line = line;
    this.column = column;
  }

  execute(env: Enviroment) {
    if (this.value != null || this.value != undefined) {
      this.value.paramsResult = this.executeParams(this.value, env);
      let valueResult: Sym = this.value.execute(env);
      if (valueResult.type == this.type) {
        let sym: Sym = new Sym(valueResult.type, valueResult.value);
        let variable: Sym | undefined = env.search(this.id, 0, 0);
        if (variable?.type == this.type) {
          let insert: boolean = env.updateValue(
            this.id,
            sym,
            this.line,
            this.column
          );
          if (insert) console.log('se actualizo la variable adecuadamente');
        } else {
          console.log('ocurrio un error al actualizar la variable');
        }
      }
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
  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
}
