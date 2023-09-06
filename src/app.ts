import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import taskRouter from './routes/task.routes';

class App {
  app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(userRouter);
    this.app.use(taskRouter);
  }
}

export default new App().app;
