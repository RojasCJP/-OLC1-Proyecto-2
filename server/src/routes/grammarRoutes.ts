import { Router } from 'express';
import { grammarController } from '../controllers/grammarController';

class GrammarRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    //url PORT/grammar/

    this.router.get('/', grammarController.levantado);

    //todo aqui tengo que mandar de req el codigo y de res tengo que mandar lo de consola
    this.router.post('/analizar', grammarController.lector);
  }
}

const grammarRoutes = new GrammarRoutes();
export default grammarRoutes.router;
