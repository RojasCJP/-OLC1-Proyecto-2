import { Enviroment } from '../enviroment/enviroment';
import { EnumType } from '../enviroment/sym';
import { Declaration } from './declaracion';
import { Instruccion } from './instruccion';
import { ParametersIns } from './parametersIns';
import { Sym } from '../enviroment/sym';

export class Function implements Instruccion {
  public line: number;
  public column: number;
  public id: string;
  public type: EnumType;
  public instructions: Instruccion[];
  public parameters: Declaration[] | null;

  constructor(
    id: string,
    type: EnumType,
    instructions: Instruccion[],
    parameters: Declaration[] | null,
    line: number,
    column: number
  ) {
    this.id = id;
    this.type = type;
    this.instructions = instructions;
    this.parameters = parameters;
    this.line = line;
    this.column = column;
  }

  public execute(env: Enviroment): void {
    let parametersIns: ParametersIns = new ParametersIns(
      this.instructions,
      this.parameters
    );
    let sym: Sym = new Sym(this.type, parametersIns);
    if (this.parameters == null) this.parameters = [];
    let insert: boolean = env.insert(
      this.id + '%%',
      sym,
      this.line,
      this.column
    );
    if (insert) {
      console.log('se inserto correctamente');
    }
  }

  public getLine(): number {
    return this.line;
  }

  public getColumn(): number {
    return this.column;
  }
}
