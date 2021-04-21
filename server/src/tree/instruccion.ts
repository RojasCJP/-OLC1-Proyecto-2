import { Enviroment } from '../enviroment/enviroment';
export interface Instruccion {
  getLine(): number;
  getColumn(): number;
  execute(env: Enviroment): any;
}
