import { Router } from 'express';
import { indexController } from '../controllers/indexController';

class IndexRoutes {
  public router: Router = Router();

  constructor() {
    this.config();
  }

  config(): void {
    //url PORT/
    this.router.get('/', (req, res) => {
      indexController.index(req, res);
    });
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
