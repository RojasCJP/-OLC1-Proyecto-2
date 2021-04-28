import { Enviroment } from '../enviroment/enviroment';
import { Instruccion } from './instruccion';
import { EnumType, Sym } from '../enviroment/sym';
import { FunctionCall } from './function_call';
import { json } from 'express';

export class Expression implements Instruccion {
  public parameters: Expression[] = [];
  public arraySizes: Expression[] = [];
  public paramsResult: Sym[] | null = null;
  public symResult: Sym[] = [];
  public type: Expression_type = Expression_type.NULO;
  public leftExp: Expression | null = null;
  public rightExp: Expression | null = null;
  public value: any;
  public val: Sym = new Sym();
  public line: number = 0;
  public column: number = 0;

  constructor(
    type: Expression_type,
    line: number,
    column: number,
    leftExpression: Expression | null,
    rightExpression: Expression | null,
    value?: number | string,
    parameters?: Expression[]
  ) {
    this.type = type;
    this.line = line;
    this.column = column;
    if (leftExpression != null && rightExpression != null) {
      this.leftExp = leftExpression;
      this.rightExp = rightExpression;
    }
    if (value) {
      this.value = value;
      switch (this.type) {
        case Expression_type.ENTERO:
          this.val = new Sym(EnumType.int, value);
          break;
        case Expression_type.DECIMAL:
          this.val = new Sym(EnumType.double, value);
          break;
        case Expression_type.BOOLEAN:
          this.val = new Sym(EnumType.boolean, value);
          break;
        case Expression_type.CHAR:
          this.val = new Sym(EnumType.char, value);
          break;
        case Expression_type.CADENA:
          this.val = new Sym(EnumType.string, value);
          break;
        case Expression_type.IDENTIFICADOR:
          this.val = new Sym(EnumType.void, value);
      }
    } else {
      this.val = new Sym();
    }
    if (parameters) {
      this.parameters = parameters;
    }
  }

  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
  execute(env: Enviroment): any {
    let leftResult: Sym = new Sym(EnumType.void, 'null');
    let rightResult: Sym = new Sym(EnumType.void, 'null');
    if (this.leftExp != null) {
      this.leftExp.paramsResult = this.executeParams(this.leftExp, env);
      leftResult = this.leftExp.execute(env);
    }
    if (this.rightExp != null) {
      this.rightExp.paramsResult = this.executeParams(this.rightExp, env);
      rightResult = this.rightExp.execute(env);
    }
    if (this.type == Expression_type.NULO) return null;
    else
      switch (this.type) {
        case Expression_type.SUMA:
          return this.Suma(env, leftResult, rightResult);
        case Expression_type.RESTA:
          return this.Resta(env, leftResult, rightResult);
        case Expression_type.MULTIPLICACION:
          return this.Multiplicacion(env, leftResult, rightResult);
        case Expression_type.DIVISION:
          return this.Division(env, leftResult, rightResult);
        case Expression_type.POTENCIA:
          return this.Potencia(env, leftResult, rightResult);
        case Expression_type.MODULO:
          return this.Modulo(env, leftResult, rightResult);
        case Expression_type.MAYOR:
          return this.Mayor(env, leftResult, rightResult);
        case Expression_type.MENOR:
          return this.Menor(env, leftResult, rightResult);
        case Expression_type.MAYORIGUAL:
          return this.MayorIgual(env, leftResult, rightResult);
        case Expression_type.MENORIGUAL:
          return this.MenorIgual(env, leftResult, rightResult);
        case Expression_type.IGUALIGUAL:
          return this.IgualIgual(env, leftResult, rightResult);
        case Expression_type.DIFERENTE:
          return this.Diferente(env, leftResult, rightResult);
        case Expression_type.NOT:
          return this.Not(env, leftResult, rightResult);
        case Expression_type.OR:
          return this.Or(env, leftResult, rightResult);
        case Expression_type.AND:
          return this.And(env, leftResult, rightResult);
        case Expression_type.ENTERO:
          if (!(this.val.value instanceof Number)) {
            this.val.value = Number(this.val.value);
          }
          return this.val;
        case Expression_type.DECIMAL:
          if (!(this.val.value instanceof Number)) {
            this.val.value = Number(this.val.value);
          }
          return this.val;
        case Expression_type.CADENA:
          this.val.value = this.val.value.substring(
            1,
            this.val.value.length - 1
          );
          return this.val;
        case Expression_type.CHAR:
          this.val.value = this.val.value.substring(
            1,
            this.val.value.length - 1
          );
          return this.val;
        case Expression_type.BOOLEAN:
          if (!(this.val.value instanceof Boolean)) {
            this.val.value = JSON.parse(this.val.value);
          }
          return this.val;
        case Expression_type.IDENTIFICADOR:
          return this.Identificador(env);
        case Expression_type.FUNCION:
          return this.functionVoidCall(env);
        default:
          return null;
      }
  }

  public executeParams(expression: Expression, env: Enviroment): Sym[] | null {
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

  public functionVoidCall(env: Enviroment): any {
    let call: FunctionCall = new FunctionCall(
      this.value,
      this.parameters,
      this.line,
      this.column
    );
    call.paramsResult = this.paramsResult;
    return call.execute(env);
  }
  public Identificador(env: Enviroment): any {
    let sym: Sym | undefined;
    if (this.type == Expression_type.IDENTIFICADOR) {
      sym = env.search(this.value, 0, 0);
    } else {
      sym = env.search(this.val.value, 0, 0);
    }
    if (sym != undefined && sym != null) {
      this.val = new Sym(sym.type, sym.value);
      return new Sym(sym.type, sym.value);
    }
    return new Sym(EnumType.error, '@error');
  }
  public Suma(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: any = leftResult.value + rightResult.value;
    this.val = new Sym(leftResult.type, result);
    return new Sym(leftResult.type, result);
  }
  public Resta(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: number = leftResult.value - rightResult.value;
    this.val = new Sym(leftResult.type, result);
    return new Sym(leftResult.type, result);
  }
  public Multiplicacion(
    env: Enviroment,
    leftResult: Sym,
    rightResult: Sym
  ): any {
    let result: number = leftResult.value * rightResult.value;
    this.val = new Sym(leftResult.type, result);
    return new Sym(leftResult.type, result);
  }
  public Division(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: number = leftResult.value / rightResult.value;
    this.val = new Sym(EnumType.double, result);
    return new Sym(EnumType.double, result);
  }
  public Potencia(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: number = Math.pow(leftResult.value, rightResult.value);
    this.val = new Sym(leftResult.type, result);
    return new Sym(leftResult.type, result);
  }
  public Modulo(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: number = leftResult.value % rightResult.value;
    this.val = new Sym(EnumType.int, result);
    return new Sym(EnumType.int, result);
  }
  public Mayor(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean = leftResult.value > rightResult.value;
    this.val = new Sym(EnumType.boolean, result);
    return new Sym(EnumType.boolean, result);
  }
  public Menor(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean = leftResult.value < rightResult.value;
    this.val = new Sym(EnumType.boolean, result);
    return new Sym(EnumType.boolean, result);
  }
  public MayorIgual(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean = leftResult.value >= rightResult.value;
    this.val = new Sym(EnumType.boolean, result);
    return new Sym(EnumType.boolean, result);
  }
  public MenorIgual(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean = leftResult.value <= rightResult.value;
    this.val = new Sym(EnumType.boolean, result);
    return new Sym(EnumType.boolean, result);
  }
  public IgualIgual(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean = leftResult.value == rightResult.value;
    this.val = new Sym(EnumType.boolean, result);
    return new Sym(EnumType.boolean, result);
  }
  public Diferente(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean = leftResult.value != rightResult.value;
    this.val = new Sym(EnumType.boolean, result);
    return new Sym(EnumType.boolean, result);
  }
  public And(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean;
    if (
      leftResult.type == EnumType.boolean &&
      rightResult.type == EnumType.boolean
    ) {
      result = leftResult.value && rightResult.value;
      this.val = new Sym(EnumType.boolean, result);
      return new Sym(EnumType.boolean, result);
    }
    return new Sym(EnumType.error, 'error');
  }
  public Or(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean;
    if (
      leftResult.type == EnumType.boolean &&
      rightResult.type == EnumType.boolean
    ) {
      result = leftResult.value || rightResult.value;
      this.val = new Sym(EnumType.boolean, result);
      return new Sym(EnumType.boolean, result);
    }
    return new Sym(EnumType.error, 'error');
  }
  public Not(env: Enviroment, leftResult: Sym, rightResult: Sym): any {
    let result: boolean;
    if (leftResult.type == rightResult.type) {
      if (leftResult.type == EnumType.boolean) {
        result = !leftResult.value;
        this.val = new Sym(EnumType.boolean, result);
        return new Sym(EnumType.boolean, result);
      }
    }
    return new Sym(EnumType.boolean, 'error');
  }
}

export enum Expression_type {
  SUMA,
  RESTA,
  MULTIPLICACION,
  DIVISION,
  POTENCIA,
  MODULO,
  MAYOR,
  MENOR,
  MAYORIGUAL,
  MENORIGUAL,
  IGUALIGUAL,
  DIFERENTE,
  NOT,
  OR,
  AND,
  ENTERO,
  DECIMAL,
  CADENA,
  CHAR,
  BOOLEAN,
  IDENTIFICADOR,
  FUNCION,
  NULO,
}
