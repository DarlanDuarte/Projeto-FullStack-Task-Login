"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database/database'); var _database2 = _interopRequireDefault(_database);


class TasksModels {
   async createTask({ task, id }) {
    try {
      const created = await _database2.default.table('tasks').insert({ tasks: task, task_id: id });

      if (created.length === 0) return { msgError: `Error ao criar uma tarefa!` };

      const tarefa = await _database2.default.table('tasks').select('*').where({ task_id: id });

      return {
        tarefa: tarefa[0],
      };
    } catch (e) {
      console.log(`Error ao inserir uma tarefa no banco de dados`, e.message);
    }
  }

   async getUserTask({ id }) {
    const getTaskUser = await _database2.default.select(['*']).table('tasks').where({ task_id: id });

    return {
      getTaskUser,
    };
  }

   async updateTask({ id, tasks, taskId }) {
    try {
      const updateTask = await _database2.default.table('tasks').where({ id: taskId, task_id: id }).update({ tasks: tasks });

      console.log(updateTask);

      if (updateTask === 0) return { messageError: `Não foi possivel atualizar a tarefa!` };

      const getTask = await _database2.default.table('tasks').where({ task_id: id }).select('*');
      console.log(getTask);

      return { getTask };
    } catch (e) {
      console.log(`Error ao tentar atualizar as Tasks!`);
    }
  }

   async deleteTask({ taskId, id }) {
    try {
      const deleteTasks = await _database2.default.table('tasks').where({ id: taskId, task_id: id }).del();

      if (deleteTasks === 0) return { messageError: `Não foi possivel Deletar Tarefa!` };

      return {
        deleteTasks,
      };
    } catch (e) {
      console.log(`Ocorreu Um Error ao tentar deletar uma taferefa`, e.message);
    }
  }
}

exports. default = new TasksModels();
