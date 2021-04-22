import { Enviroment } from '../enviroment/enviroment';
import { Instruccion } from './instruccion';
import { EnumType, Sym } from '../enviroment/sym';

export class Expression implements Instruccion {
  public parameters: Expression[] = [];
  public arraySizes: Expression[] = [];
  public paramsResult: Sym[] = [];
  public symResult: Sym[] = [];
  public type: Expression_type = Expression_type.NULO;
  public leftExp: Expression = new Expression();
  public rightExp: Expression = new Expression();
  public value: any;
  public val: Sym = new Sym();
  public line: number = 0;
  public column: number = 0;

  constructor() {}

  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
  execute(env: Enviroment): any {
    throw new Error('Method not implemented.');
  }
}

export enum Expression_type {
  SUMA,
  RESTA,
  MULTIPLICACION,
  DIVISION,
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
