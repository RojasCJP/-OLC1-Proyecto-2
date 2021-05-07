import { Response, Request } from 'express';
import { Enviroment } from '../enviroment/enviroment';
import { Sym } from '../enviroment/sym';
import { Asignation } from '../tree/asignacion';
import { Declaration } from '../tree/declaracion';
import { Instruccion } from '../tree/instruccion';
class GrammarController {
  static consola: string = '';
  static errores: Errores[] = [];
  static symbolos: Symbolos[] = [];
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
    root.forEach((instruccion) => {
      if (instruccion instanceof Declaration) {
        let declaration: Declaration = instruccion;
        console.log(declaration.id);
        console.log(declaration.value?.val.value);
      }
      if (instruccion instanceof Asignation) {
        let asignation: Asignation = instruccion;
        console.log(asignation.id);
        console.log(asignation.value.val.value);
      }
    });
    res.json(GrammarController.instructionList);
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
