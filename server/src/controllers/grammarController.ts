import { Response, Request, response } from 'express';
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
  static graph: string = '';
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

  public graphviz(req: Request, res: Response) {
    let graph: string;
    let root: Instruccion[] = GrammarController.instructionList;
    GrammarController.makeGraph(root, 0);
    graph = 'digraph G {';
    graph += GrammarController.graph;
    graph += '}';
    const fs = require('fs');
    fs.writeFile('../client/src/assets/arbol.dot', graph, () => {});

    const { exec } = require('child_process');

    exec(
      'dot.exe -Tpng ../client/src/assets/arbol.dot -o ../client/src/assets/arbol12.png',
      (error: { message: any }, stdout: any, stderr: any) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );

    res.json({ mensaje: graph });
  }

  static makeGraph(instructions: Instruccion[], padre: number) {
    instructions.forEach((instruction) => {
      let valorNodo: number = GrammarController.contador + 1;
      if (instruction instanceof Declaration) {
        let declaration: Declaration = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="declaracion"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="' + declaration.id + '"];';
        if (declaration.value?.val.value != undefined) {
          GrammarController.contador++;
          GrammarController.graph +=
            valorNodo + '->' + GrammarController.contador + ';';
          GrammarController.graph +=
            GrammarController.contador +
            '[label="' +
            declaration.value?.val.value +
            '"];';
        }
      }
      if (instruction instanceof Asignation) {
        let asignation: Asignation = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="asignacion"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="' + asignation.id + '"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador +
          '[label="' +
          asignation.value?.val.value +
          '"];';
      }
      if (instruction instanceof DoWhile) {
        let doWhile: DoWhile = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="do while"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador +
          '[label="' +
          doWhile.condition.val.value +
          '"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="instrucciones"]';

        GrammarController.makeGraph(
          doWhile.instructionList,
          GrammarController.contador
        );
      }
      if (instruction instanceof Else) {
        let else_: Else = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="else"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="instrucciones"];';
        GrammarController.makeGraph(
          else_.instructionList,
          GrammarController.contador
        );
      }
      if (instruction instanceof Expression) {
        let expression: Expression = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="expresion"];';
        if (expression.val.value == undefined) {
          let contenido: Expression[] = [];
          if (expression.leftExp != null) contenido.push(expression.leftExp);
          if (expression.rightExp != null) contenido.push(expression.rightExp);
          GrammarController.makeGraph(contenido, GrammarController.contador);
        } else {
          GrammarController.contador++;
          GrammarController.graph +=
            valorNodo + '->' + GrammarController.contador + ';';
          GrammarController.graph +=
            GrammarController.contador +
            '[label="' +
            expression.val.value +
            '"];';
        }
      }
      if (instruction instanceof FunctionCall) {
        let functionCall: FunctionCall = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="' + functionCall.id + '"];';
        if (functionCall.parametersExpressions != null) {
          GrammarController.contador++;
          GrammarController.graph +=
            valorNodo + '->' + GrammarController.contador + ';';
          GrammarController.graph +=
            GrammarController.contador + '[label="parametros"];';
          GrammarController.makeGraph(
            functionCall.parametersExpressions,
            GrammarController.contador
          );
        }
      }
      if (instruction instanceof Function) {
        let function_: Function = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="' + function_.id + '"];';
        if (function_.parameters != null) {
          GrammarController.contador++;
          GrammarController.graph +=
            valorNodo + '->' + GrammarController.contador + ';';
          GrammarController.graph +=
            GrammarController.contador + '[label="parametros"];';
          GrammarController.makeGraph(
            function_.parameters,
            GrammarController.contador
          );
        }
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="instrucciones"];';
        GrammarController.makeGraph(
          function_.instructions,
          GrammarController.contador
        );
      }
      if (instruction instanceof If) {
        let if_: If = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph += GrammarController.contador + '[label="if"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador +
          '[label="' +
          if_.condition.val.value +
          '"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="instrucciones"]';

        GrammarController.makeGraph(
          if_.instructionList,
          GrammarController.contador
        );
      }
      if (instruction instanceof ListIf) {
        let listIf: ListIf = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="lista de if"]';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="instrucciones"]';
        GrammarController.makeGraph(listIf.listIf, GrammarController.contador);
      }
      if (instruction instanceof Print) {
        let print_: Print = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="print"];';
        if (print_ != null && print_.content != null) {
          if (print_.content.value != undefined) {
            let contenidoValor: string;
            if (print_.content.value[0] == '"') {
              contenidoValor = print_.content.value.substring(
                1,
                print_.content.value.length - 1
              );
            } else {
              contenidoValor = print_.content.value;
            }

            GrammarController.contador++;
            GrammarController.graph +=
              valorNodo + '->' + GrammarController.contador + ';';
            GrammarController.graph +=
              GrammarController.contador + '[label="' + contenidoValor + '"];';
          } else {
            let contenido: Expression[] = [print_.content];
            GrammarController.makeGraph(contenido, GrammarController.contador);
          }
        }
      }
      if (instruction instanceof Return) {
        let retorno: Return = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="return"];';
        if (retorno.expression.val.value != null) {
          let contenidoValor: string;
          if (retorno.expression.val.value[0] == '"') {
            contenidoValor = retorno.expression.val.value.substring(
              1,
              retorno.expression.val.value.length - 1
            );
          } else {
            contenidoValor = retorno.expression.val.value;
          }
          GrammarController.contador++;
          GrammarController.graph +=
            valorNodo + '->' + GrammarController.contador + ';';
          GrammarController.graph +=
            GrammarController.contador + '[label="' + contenidoValor + '"];';
        } else {
          let contenido: Expression[] = [retorno.expression];
          GrammarController.makeGraph(contenido, valorNodo);
        }
      }
      if (instruction instanceof While) {
        let while_: While = instruction;
        GrammarController.contador++;
        GrammarController.graph +=
          padre + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="while"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador +
          '[label="' +
          while_.condition.val.value +
          '"];';
        GrammarController.contador++;
        GrammarController.graph +=
          valorNodo + '->' + GrammarController.contador + ';';
        GrammarController.graph +=
          GrammarController.contador + '[label="instrucciones"];';
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
