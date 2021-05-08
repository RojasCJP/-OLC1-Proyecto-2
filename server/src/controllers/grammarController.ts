import { Response, Request } from 'express';
import { Enviroment } from '../enviroment/enviroment';
import { Sym } from '../enviroment/sym';
import { Asignation } from '../tree/asignacion';
import { Declaration } from '../tree/declaracion';
import { DoWhile } from '../tree/do_while';
import { Else } from '../tree/else';
import { Expression } from '../tree/expression';
import { Function } from '../tree/function';
import { FunctionCall } from '../tree/function_call';
import { If } from '../tree/if';
import { Instruccion } from '../tree/instruccion';
import { ListIf } from '../tree/list_if';
import { ParametersIns } from '../tree/parametersIns';
import { Print } from '../tree/print';
import { Return } from '../tree/return';
import { While } from '../tree/while';
class GrammarController {
  static consola: string = '';
  static errores: Errores[] = [];
  static symbolos: Symbolos[] = [];
  static contador: number = 0;
  static instructionList: Instruccion[] = [];

  constructor() {}

  public levantado(req: Request, res: Response): void {
    res.json({ response: 'grammar levantado correctamente' });
  }

  public lector(req: Request, res: Response): void {
    var parser = require('./grammar');
    parser.parse(req.body.codigo);
    let root: Instruccion[] = GrammarController.instructionList;
    let global: Enviroment = new Enviroment(null);
    GrammarController.executeAST(root, global);
    // console.log(GrammarController.instructionList);
    // todo con esta linea tengo que hacer el reporte ast eso se hace con root
    for (let i = 0; i < GrammarController.errores.length; i++) {
      GrammarController.consola +=
        GrammarController.errores[i].mensaje +
        ' se encuentra en la linea ' +
        GrammarController.errores[i].linea +
        ' y en la columna ' +
        GrammarController.errores[i].columna +
        '\n';
    }
    res.json({ codigo: GrammarController.consola });
    GrammarController.consola = '';
  }

  public errores(req: Request, res: Response) {
    res.json(GrammarController.errores);
  }

  public symbolos(req: Request, res: Response) {
    res.json(GrammarController.symbolos);
  }

  public instructions(req: Request, res: Response) {
    let root: Instruccion[] = GrammarController.instructionList;
    GrammarController.makeGraph(root, 0);
    res.json(GrammarController.instructionList);
  }

  static makeGraph(instructions: Instruccion[], padre: number) {
    instructions.forEach((instruction) => {
      let valorNodo: number = GrammarController.contador + 1;
      if (instruction instanceof Declaration) {
        let declaration: Declaration = instruction;
        GrammarController.contador++;
        console.log(padre + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="declaracion"];');
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(
          GrammarController.contador + '[label="' + declaration.id + '"];'
        );
        if (declaration.value?.val.value != undefined) {
          GrammarController.contador++;
          console.log(valorNodo + '->' + GrammarController.contador + ';');
          console.log(
            GrammarController.contador +
              '[label="' +
              declaration.value?.val.value +
              '"];'
          );
        }
      }
      if (instruction instanceof Asignation) {
        let asignation: Asignation = instruction;
        GrammarController.contador++;
        console.log(padre + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="asignacion"];');
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(
          GrammarController.contador + '[label="' + asignation.id + '"];'
        );
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(
          GrammarController.contador +
            '[label="' +
            asignation.value?.val.value +
            '"];'
        );
      }
      if (instruction instanceof DoWhile) {
        let doWhile: DoWhile = instruction;
        GrammarController.contador++;
        console.log(padre + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="do while"];');
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(
          GrammarController.contador +
            '[label="' +
            doWhile.condition.val.value +
            '"];'
        );
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="instrucciones"]');

        GrammarController.makeGraph(
          doWhile.instructionList,
          GrammarController.contador
        );
      }
      if (instruction instanceof Else) {
        let else_: Else = instruction;
        GrammarController.contador++;
        console.log(padre + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="else"];');
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="instrucciones"]');
        GrammarController.makeGraph(
          else_.instructionList,
          GrammarController.contador
        );
      }
      if (instruction instanceof Expression) {
        console.log('-----------------------expression-----------------------');
        let expression: Expression = instruction;
        if (expression.val.value == undefined) {
          let contenido: Expression[] = [];
          if (expression.leftExp != null) contenido.push(expression.leftExp);
          if (expression.rightExp != null) contenido.push(expression.rightExp);
          GrammarController.makeGraph(contenido, valorNodo);
        } else {
          console.log(expression.val.value);
        }
      }
      if (instruction instanceof FunctionCall) {
        console.log(
          '-----------------------functionCall-----------------------'
        );
        let functionCall: FunctionCall = instruction;
        if (functionCall.parametersExpressions != null) {
          GrammarController.makeGraph(
            functionCall.parametersExpressions,
            valorNodo
          );
        }
      }
      if (instruction instanceof Function) {
        console.log('-----------------------function-----------------------');
        let function_: Function = instruction;
        console.log(function_.id);
        if (function_.parameters != null) {
          GrammarController.makeGraph(function_.parameters, valorNodo);
        }
        GrammarController.makeGraph(function_.instructions, valorNodo);
      }
      if (instruction instanceof If) {
        let if_: If = instruction;
        GrammarController.contador++;
        console.log(padre + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="if"];');
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(
          GrammarController.contador +
            '[label="' +
            if_.condition.val.value +
            '"];'
        );
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="instrucciones"]');

        GrammarController.makeGraph(
          if_.instructionList,
          GrammarController.contador
        );
      }
      if (instruction instanceof ListIf) {
        let listIf: ListIf = instruction;
        GrammarController.contador++;
        console.log(padre + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="lista de if"]');
        GrammarController.contador++;
        console.log(valorNodo + '->' + GrammarController.contador + ';');
        console.log(GrammarController.contador + '[label="instrucciones"]');
        GrammarController.makeGraph(listIf.listIf, GrammarController.contador);
      }
      if (instruction instanceof Print) {
        console.log('-----------------------print-----------------------');
        let print_: Print = instruction;
        if (print_ != null && print_.content != null) {
          if (print_.content.value != undefined) {
            console.log(print_.content.value);
          } else {
            let contenido: Expression[] = [print_.content];
            GrammarController.makeGraph(contenido, valorNodo);
          }
        }
      }
      if (instruction instanceof Return) {
        console.log('-----------------------return-----------------------');
        let retorno: Return = instruction;
        if (retorno.expression.val.value != null) {
          console.log(retorno.expression.val.value);
        } else {
          let contenido: Expression[] = [retorno.expression];
          GrammarController.makeGraph(contenido, valorNodo);
        }
      }
      if (instruction instanceof While) {
        console.log('-----------------------while-----------------------');
        let while_: While = instruction;
        console.log(while_.condition.val.value);
        console.log(while_.condition.val.name);
        GrammarController.makeGraph(while_.instructionList, valorNodo);
      }
    });
  }

  static executeAST(root: any[], global: Enviroment): void {
    if (root != null && root != undefined) {
      root.forEach((ins) => {
        if (ins != ';' && ins != '}') {
          ins.execute(global);
        }
      });
      for (let i = 0; i < global.printList.length; i++) {
        GrammarController.consola += global.printList[i];
      }
    }
  }
}

interface Errores {
  tipo: string;
  mensaje: string;
  linea: number;
  columna: number;
}

interface Symbolos {
  name: string;
  sym: Sym;
}

export const grammarController = new GrammarController();
export { GrammarController };
