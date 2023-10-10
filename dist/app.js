"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _userroutes = require('./routes/user.routes'); var _userroutes2 = _interopRequireDefault(_userroutes);
var _taskroutes = require('./routes/task.routes'); var _taskroutes2 = _interopRequireDefault(_taskroutes);

class App {
  

  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(_express2.default.json());
    this.app.use(_cors2.default.call(void 0, ));
  }

  routes() {
    this.app.use(_userroutes2.default);
    this.app.use(_taskroutes2.default);
  }
}

exports. default = new App().app;
