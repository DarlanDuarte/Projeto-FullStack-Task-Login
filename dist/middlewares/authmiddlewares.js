"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _database = require('../database/database'); var _database2 = _interopRequireDefault(_database);

 const authmiddlewares = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) return res.status(400).json(`Não Autorizado`);

    const token = authorization.split(' ')[1];

    const { userId } = _jsonwebtoken2.default.verify(token, _nullishCoalesce(process.env.JWT_SECRET, () => ( ''))) ;

    if (!userId) return res.status(400).json(`Não Autorizado`);

    const user = await _database2.default.table('users').select('id', 'nome', 'email').where({ id: userId });

    req.userAuth = user[0];

    next();
  } catch (e) {
    return res.status(500).json(`Error interno do servidor!`);
  }
}; exports.authmiddlewares = authmiddlewares;
