import { Request, Response } from 'express';
import TasksModels from '../models/TasksModels';
import { ITarefas } from '../interfaces/interfaces';

class TasksController {
  public async createTask(req: Request, res: Response) {
    try {
      const { task } = req.body;
      const { id } = req.userAuth;

      console.log(task, id);

      if (!task) return res.status(400).json(`Tarefa não foi passada!`);

      if (!id) return res.status(400).json(`Usuário da tarefa não existe!`);

      const result = await TasksModels.createTask({ task, id });

      const { id: idTask, tasks, task_id } = result?.tarefa as ITarefas;

      return res.status(201).json({ message: `Tarefa Criada com sucesso!`, id: idTask, tasks: tasks, task_id });
    } catch (e: any) {
      return res.status(500).json(`Error interno do Servidor`);
    }
  }

  public async getUserTask(req: Request, res: Response) {
    try {
      const { id } = req.userAuth;

      if (!id) return res.status(400).json(`Usuário da tarefa não existe!`);

      const userTask = await TasksModels.getUserTask({ id });

      const tasks = userTask.getTaskUser.map((value, index) => {
        return { id: value.id, tasks: value.tasks };
      });

      console.log(tasks);

      res.status(200).json(tasks);
    } catch (e: any) {
      return res.status(500).json(`Error interno do Servidor`);
    }
  }

  public async updateTask(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;
      const { id } = req.userAuth;
      const { tasks } = req.body;

      if (!taskId || !id || !tasks) return res.status(400).json(`Credenciais passadas invalida!`);

      const result = await TasksModels.updateTask({ id, tasks, taskId });

      if (result?.messageError) return res.status(400).json(result.messageError);


      return res.status(200).json(`Tarefa atualizada com sucesso!`);



    } catch (e: any) {
      return res.status(500).json(`Error interno do Servidor`);
    }
  }

  public async deleteTask(req: Request, res: Response) {
    try {
      const taskId = +req.params.id;
      const { id } = req.userAuth;

      console.log(taskId, id);

      if (!taskId) return res.status(400).json(`Id de tarefas não foi passado!`);

      if (!id) return res.status(400).json('Não Autenticado!');

      const result = await TasksModels.deleteTask({ taskId, id });

      if (result?.messageError) return res.status(400).json(result.messageError);

      return res.status(200).json(`Tarefa Deletada com Sucesso!`);
    } catch (e: any) {
      return res.status(500).json(`Error interno no Servidor!`);
    }
  }
}

export default new TasksController();
