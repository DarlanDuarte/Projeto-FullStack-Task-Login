import database from '../database/database';
import { ITarefas } from '../interfaces/interfaces';

class TasksModels {
  public async createTask({ task, id }: { task: string; id: number }) {
    try {
      const created = await database.table('tasks').insert({ tasks: task, task_id: id });

      if (created.length === 0) return { msgError: `Error ao criar uma tarefa!` };

      const tarefa: ITarefas[] = await database.table('tasks').select('*').where({ task_id: id });

      return {
        tarefa: tarefa[0],
      };
    } catch (e: any) {
      console.log(`Error ao inserir uma tarefa no banco de dados`, e.message);
    }
  }

  public async getUserTask({ id }: { id: number }) {
    const getTaskUser = await database.select(['*']).table('tasks').where({ task_id: id });

    return {
      getTaskUser,
    };
  }

  public async updateTask({ id, tasks, taskId }: { id: number; tasks: string; taskId: number }) {
    try {
      const updateTask = await database.table('tasks').where({ id: taskId, task_id: id }).update({ tasks: tasks });

      console.log(updateTask);

      if (updateTask === 0) return { messageError: `Não foi possivel atualizar a tarefa!` };

      const getTask = await database.table('tasks').where({ task_id: id }).select('*');
      console.log(getTask);

      return { getTask };
    } catch (e: any) {
      console.log(`Error ao tentar atualizar as Tasks!`);
    }
  }

  public async deleteTask({ taskId, id }: { taskId: number; id: number }) {
    try {
      const deleteTasks = await database.table('tasks').where({ id: taskId, task_id: id }).del();

      if (deleteTasks === 0) return { messageError: `Não foi possivel Deletar Tarefa!` };

      return {
        deleteTasks,
      };
    } catch (e: any) {
      console.log(`Ocorreu Um Error ao tentar deletar uma taferefa`, e.message);
    }
  }
}

export default new TasksModels();
