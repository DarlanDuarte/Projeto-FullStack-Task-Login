"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _TasksModels = require('../models/TasksModels'); var _TasksModels2 = _interopRequireDefault(_TasksModels);


class TasksController {
   async createTask(req, res) {
    try {
      const { task } = req.body;
      const { id } = req.userAuth;

      console.log(task, id);

      if (!task) return res.status(400).json(`Tarefa não foi passada!`);

      if (!id) return res.status(400).json(`Usuário da tarefa não existe!`);

      const result = await _TasksModels2.default.createTask({ task, id });

      const { id: idTask, tasks, task_id } = _optionalChain([result, 'optionalAccess', _ => _.tarefa]) ;

      return res.status(201).json({ message: `Tarefa Criada com sucesso!`, id: idTask, tasks: tasks, task_id });
    } catch (e) {
      return res.status(500).json(`Error interno do Servidor`);
    }
  }

   async getUserTask(req, res) {
    try {
      const { id } = req.userAuth;

      if (!id) return res.status(400).json(`Usuário da tarefa não existe!`);

      const userTask = await _TasksModels2.default.getUserTask({ id });

      const tasks = userTask.getTaskUser.map((value, index) => {
        return { id: value.id, tasks: value.tasks };
      });

      console.log(tasks);

      res.status(200).json(tasks);
    } catch (e) {
      return res.status(500).json(`Error interno do Servidor`);
    }
  }

   async updateTask(req, res) {
    try {
      const taskId = +req.params.id;
      const { id } = req.userAuth;
      const { tasks } = req.body;

      if (!taskId || !id || !tasks) return res.status(400).json(`Credenciais passadas invalida!`);

      const result = await _TasksModels2.default.updateTask({ id, tasks, taskId });

      if (_optionalChain([result, 'optionalAccess', _2 => _2.messageError])) return res.status(400).json(result.messageError);

      const task = _optionalChain([result, 'optionalAccess', _3 => _3.getTask, 'optionalAccess', _4 => _4.map, 'call', _5 => _5((value, index) => value.tasks)]);

      return res.status(200).json({ msg: `Tarefa atualizada com sucesso!`, task: task });
    } catch (e) {
      return res.status(500).json(`Error interno do Servidor`);
    }
  }

   async deleteTask(req, res) {
    try {
      const taskId = +req.params.id;
      const { id } = req.userAuth;

      console.log(taskId, id);

      if (!taskId) return res.status(400).json(`Id de tarefas não foi passado!`);

      if (!id) return res.status(400).json('Não Autenticado!');

      const result = await _TasksModels2.default.deleteTask({ taskId, id });

      if (_optionalChain([result, 'optionalAccess', _6 => _6.messageError])) return res.status(400).json(result.messageError);

      return res.status(200).json(`Tarefa Deletada com Sucesso!`);
    } catch (e) {
      return res.status(500).json(`Error interno no Servidor!`);
    }
  }
}

exports. default = new TasksController();
