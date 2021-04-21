import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import indexRoutes from './routes/indexRoutes';
import grammarRoutes from './routes/grammarRoutes';

class Server {
  public app: Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes(): void {
    this.app.use('/', indexRoutes);
    this.app.use('/grammar', grammarRoutes);
  }

  start(): void {
    const puerto: number = this.app.get('port');
    this.app.listen(puerto, () => {
      console.log('server on port ' + puerto);
    });
  }
}

const server = new Server();
server.start();
