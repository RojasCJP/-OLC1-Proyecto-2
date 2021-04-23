import { Response, Request } from 'express';
import { Enviroment } from '../enviroment/enviroment';
import { Instruccion } from '../tree/instruccion';
class GrammarController {
  static consola: string = '';

  constructor() {}

  public levantado(req: Request, res: Response): void {
    res.json({ response: 'grammar levantado correctamente' });
  }

  public lector(req: Request, res: Response): void {
    var parser = require('./grammar');
    parser.parse(req.body.codigo);
    let root: Instruccion[] = [];
    // todo aqui tengo que hacer que recupere la lista de instrucciones AST
    let global: Enviroment = new Enviroment(null);
    this.executeAST(root, global);

    console.log(GrammarController.consola);
    // todo aqui tengo que cambiar codigo por consola en el json
    res.json({ codigo: GrammarController.consola });
    GrammarController.consola = '';
  }

  executeAST(root: Instruccion[], global: Enviroment): void {
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
