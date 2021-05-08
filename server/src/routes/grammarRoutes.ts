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

    this.router.post('/analizar', grammarController.lector);

    this.router.get('/errores', grammarController.errores);

    this.router.get('/sym', grammarController.symbolos);

    this.router.get('/instructions', grammarController.instructions);

    this.router.get('/graph', grammarController.graphviz);
  }
}

const grammarRoutes = new GrammarRoutes();
export default grammarRoutes.router;
