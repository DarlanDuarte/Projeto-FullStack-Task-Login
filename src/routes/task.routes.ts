import { Router } from 'express';
import TasksController from '../controllers/TasksController';
import { authmiddlewares } from '../middlewares/authmiddlewares';
import TasksModels from '../models/TasksModels';

const taskRouter = Router();

taskRouter.post('/tasks', authmiddlewares, TasksController.createTask);
taskRouter.get('/tasks', authmiddlewares, TasksController.getUserTask);
taskRouter.put('/tasks/:id', authmiddlewares, TasksController.updateTask);
taskRouter.delete('/tasks/:id', authmiddlewares, TasksController.deleteTask);

export default taskRouter;
