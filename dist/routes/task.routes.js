"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _TasksController = require('../controllers/TasksController'); var _TasksController2 = _interopRequireDefault(_TasksController);
var _authmiddlewares = require('../middlewares/authmiddlewares');


const taskRouter = _express.Router.call(void 0, );

taskRouter.post('/tasks', _authmiddlewares.authmiddlewares, _TasksController2.default.createTask);
taskRouter.get('/tasks', _authmiddlewares.authmiddlewares, _TasksController2.default.getUserTask);
taskRouter.put('/tasks/:id', _authmiddlewares.authmiddlewares, _TasksController2.default.updateTask);
taskRouter.delete('/tasks/:id', _authmiddlewares.authmiddlewares, _TasksController2.default.deleteTask);

exports. default = taskRouter;
