import { Response, Request } from 'express';
import { Enviroment } from '../enviroment/enviroment';
import { Instruccion } from '../tree/instruccion';
import { Declaration } from '../tree/declaracion';
import { EnumType } from '../enviroment/sym';
class GrammarController {
  static consola: string = '';
  static errores: Error[];
  static instructionList: Instruccion[] = [];

  constructor() {}

  public levantado(req: Request, res: Response): void {
    res.json({ response: 'grammar levantado correctamente' });
  }

  public lector(req: Request, res: Response): void {
    var parser = require('./grammar');
    parser.parse(req.body.codigo);
    let root: Instruccion[] = GrammarController.instructionList;
    // todo aqui tengo que hacer que recupere la lista de instrucciones AST
    let global: Enviroment = new Enviroment(null);
    console.log(GrammarController.instructionList);
    GrammarController.executeAST(root, global);
    console.log(global);
    console.log(GrammarController.consola);
    // todo aqui tengo que cambiar codigo por consola en el json
    res.json({ codigo: GrammarController.consola });
    GrammarController.consola = '';
  }

  static executeAST(root: Instruccion[], global: Enviroment): void {
    if (root != null && root != undefined) {
      root.forEach((ins) => {
        ins.execute(global);
      });
      for (let i = 0; i < global.printList.length; i++) {
        GrammarController.consola += global.printList[i];
      }
    }
  }
}

export const grammarController = new GrammarController();
export { GrammarController };
