import { Enviroment } from '../enviroment/enviroment';
import { EnumType, Sym } from '../enviroment/sym';
import indexRoutes from '../routes/indexRoutes';
import { Declaration } from './declaracion';
import { Expression } from './expression';
import { Instruccion } from './instruccion';
import { ParametersIns } from './parametersIns';

export class FunctionCall implements Instruccion {
  public parametersExpressions: Expression[] | null;
  public paramsResult: Sym[] | null = [];
  public line: number;
  public column: number;
  public id: string;

  constructor(
    id: string,
    parametersExpression: Expression[] | null,
    line: number,
    column: number
  ) {
    this.id = id;
    this.parametersExpressions = parametersExpression;
    this.line = line;
    this.column = column;
    // trae una lista de expressiones y guarda en el val lo que metimos
  }

  execute(env: Enviroment): Sym | null {
    let local: Enviroment = new Enviroment(env);
    let fun: Sym | undefined = local.search(
      this.id + '%%',
      this.line,
      this.column
    );
    if (fun != undefined && fun != null) {
      let parameterIns: ParametersIns = fun.value;
      if (parameterIns.parameters != null) {
        for (let i = 0; i < parameterIns.parameters.length; i++) {
          if (this.parametersExpressions != null) {
            parameterIns.parameters[i].value = this.parametersExpressions[i];
          }
        }
      }
      let parameters: Declaration[] | null = parameterIns.parameters;
      let instructions: Instruccion[] = parameterIns.instructions;
      if (parameters != null && parameters != undefined) {
        let index: number = 0;
        parameters.forEach((declaration) => {
          let sym: Sym | null = null;
          if (this.paramsResult != null) sym = this.paramsResult[index++];
          declaration.execute(local);
          local.updateValue(declaration.id, sym, this.line, this.column);
        });
      }
      if (instructions != null && instructions != undefined) {
        for (let j = 0; j < instructions.length; j++) {
          let instruction: Instruccion = instructions[j];
          if (instruction instanceof FunctionCall) {
            let call: FunctionCall = instruction;
            if (call.paramsResult != null) {
              call.paramsResult = this.executeParamsParams(
                call.parametersExpressions,
                local
              );
            }
            instruction = call;
          } else if (instruction instanceof Expression) {
            let expression: Expression = instruction;
            expression.paramsResult = this.executeParamsExpression(
              expression,
              local
            );
            instruction = expression;
          }
          let result: any = instruction.execute(local);
          if (result != null && result != undefined) {
            if (result instanceof Sym && !(instruction instanceof Expression)) {
              let sym: Sym = result;
              if (sym.breturn) return sym;
            }
          } // agregar validaciones, ahorita es solo de funciones, falta para metodos
        }
        return new Sym(EnumType.error, '@Error');
      }
    }
    return null;
  }

  public executeParamsParams(
    parameters: Expression[] | null,
    env: Enviroment
  ): Sym[] | null {
    let params: Sym[] = [];
    if (parameters != null && parameters != undefined) {
      for (let i = 0; i < parameters.length; i++) {
        let exp: Expression = parameters[i];
        exp.paramsResult = this.executeParamsExpression(exp, env);
        let r: any = exp.execute(env);
        if (r instanceof Sym) {
          let s: Sym = r;
          if (params.length < parameters.length) params.splice(i, 0, s);
          else params[i] = s;
        }
      }
    } else return null;
    return params;
  }

  public executeParamsExpression(
    expression: Expression,
    env: Enviroment
  ): Sym[] | null {
    let paramsResultt: Sym[] | null = null;
    if (
      expression != null &&
      expression.parameters != null &&
      expression != undefined &&
      expression.parameters != undefined
    ) {
      paramsResultt = [];
      for (let i = 0; i < expression.parameters.length; i++) {
        let exp: Expression = expression.parameters[i];
        exp.paramsResult = this.executeParamsExpression(exp, env);
        let r: any = exp.execute(env);
        if (r instanceof Sym) {
          const s: Sym = r;
          if (paramsResultt.length < expression.parameters.length)
            paramsResultt.splice(i, 0, s);
          else paramsResultt[i] = s;
        }
      }
    }
    return paramsResultt;
  }

  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
}
