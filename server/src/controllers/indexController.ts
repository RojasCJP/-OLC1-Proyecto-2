import { Request, Response } from 'express';
class IndexController {
  public index(req: Request, res: Response): void {
    res.json({ response: 'server levantado' });
  }
}

export const indexController = new IndexController();
