import { Enviroment } from '../enviroment/enviroment';
import { EnumType, Sym } from '../enviroment/sym';
import { Declaration } from './declaracion';
import { Expression } from './expression';
import { FunctionCall } from './function_call';
import { Instruccion } from './instruccion';

export class If implements Instruccion {
  public condition: Expression;
  public instructionList: Instruccion[];
  public line: number;
  public column: number;

  constructor(
    condition: Expression,
    instructionList: Instruccion[],
    line: number,
    column: number
  ) {
    this.condition = condition;
    this.instructionList = instructionList;
    this.line = line;
    this.column = column;
  }

  execute(env: Enviroment): any {
    this.condition.paramsResult = this.executeParamsExpression(
      this.condition,
      env
    );
    let conditionValue: Sym = this.condition.execute(env);
    if (conditionValue.type == EnumType.boolean && conditionValue.value) {
      let localEnviroment: Enviroment = new Enviroment(env);
      if (this.instructionList != null && this.instructionList != undefined) {
        this.instructionList.forEach((instruction) => {
          if (instruction instanceof FunctionCall) {
            let call: FunctionCall = instruction;
            call.paramsResult = this.executeParamsParams(
              call.parametersExpressions,
              localEnviroment
            );
            instruction = call;
          } else if (instruction instanceof Expression) {
            let expression: Expression = instruction;
            expression.paramsResult = this.executeParamsExpression(
              expression,
              localEnviroment
            );
            instruction = expression;
          }
          let instruccion: any = instruction.execute(localEnviroment);
          if (
            instruccion != null &&
            instruccion != undefined &&
            instruction instanceof Sym
          ) {
            let sym: Sym = instruccion;
            if (sym.breturn) return instruccion;
          }
        });
      }
    }
    return null;
  }

  public executeParamsParams(
    parameters: Expression[] | null,
    env: Enviroment
  ): Sym[] {
    let params: Sym[] = [];
    if (parameters != null && parameters != undefined) {
      for (let i = 0; i < parameters.length; i++) {
        let exp: Expression = parameters[i];
        exp.paramsResult = this.executeParamsExpression(exp, env);
        let result: any = exp.execute(env);
        if (result instanceof Sym) {
          let sym: Sym = result;
          if (params.length < parameters.length) params.splice(i, 0, sym);
          else params[i] = sym;
        }
      }
    }
    return params;
  }
  public executeParamsExpression(
    exp: Expression,
    env: Enviroment
  ): Sym[] | null {
    let paramsResutl: Sym[] | null = null;
    if (
      exp != null &&
      exp != undefined &&
      exp.parameters != null &&
      exp.parameters != undefined
    ) {
      paramsResutl = [];
      for (let i = 0; i < exp.parameters.length; i++) {
        let expression: Expression = exp.parameters[i];
        expression.paramsResult = this.executeParamsExpression(expression, env);
        let result: any = exp.execute(env);
        if (result instanceof Sym) {
          const sym: Sym = result;
          if (paramsResutl.length < exp.parameters.length)
            paramsResutl.splice(i, 0, sym);
          else paramsResutl[i] = sym;
        }
      }
    }
    return paramsResutl;
  }

  getLine(): number {
    return this.line;
  }
  getColumn(): number {
    return this.column;
  }
}
