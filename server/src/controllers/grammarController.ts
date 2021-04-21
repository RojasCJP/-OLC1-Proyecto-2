import { Response, Request } from 'express';
class GrammarController {
  static consola: string = '';

  constructor() {}

  public levantado(req: Request, res: Response): void {
    res.json({ response: 'grammar levantado correctamente' });
  }

  public lector(req: Request, res: Response): void {
    var parser = require('./grammar');
    parser.parse(req.body.codigo);
    console.log(GrammarController.consola);
    // todo aqui tengo que cambiar codigo por consola en el json
    res.json({ codigo: GrammarController.consola });
    GrammarController.consola = '';
  }
}

export const grammarController = new GrammarController();
export { GrammarController };
