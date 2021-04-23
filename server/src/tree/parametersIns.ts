import { Declaration } from './declaracion';
import { Instruccion } from './instruccion';

export class ParametersIns {
  public instructions: Instruccion[];
  public parameters: Declaration[] | null;
  constructor(instructions: Instruccion[], parameters: Declaration[] | null) {
    this.instructions = instructions;
    this.parameters = parameters;
  }
}
