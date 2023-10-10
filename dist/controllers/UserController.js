"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }
var _UserModels = require('../models/UserModels'); var _UserModels2 = _interopRequireDefault(_UserModels);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);



class UserController {
   async getUsers(req, res) {
    try {
      const response = await _UserModels2.default.getUsers();

      if (_optionalChain([response, 'optionalAccess', _ => _.message])) {
        return res.status(400).json(response.message);
      }

      return res.status(200).json(_optionalChain([response, 'optionalAccess', _2 => _2.user]));
    } catch (e) {
      console.log(`Error Interno: ${e.message}`);
      return res.status(500).json({ msg: `Error no servidor!` });
    }
  }

   async createUser(req, res) {
    try {
      const { nome, email, password } = req.body;

      if (!email || !nome || !password) {
        return res.status(400).json('Todos os campos são obrigatórios');
      }

      const hashPassword = await _bcrypt2.default.hash(password, 10);

      const result = await _UserModels2.default.createUser({ nome, email, hashPassword });

      if (_optionalChain([result, 'optionalAccess', _3 => _3.exist])) return res.status(400).json(result.exist);

      return res.status(201).json({ message: `Usuário criado com sucesso!` });
    } catch (e) {
      console.log(`Error ${e.message}`);
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

   async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: `Usuário não foi passado` });

      const result = await _UserModels2.default.deleteUser({ id });

      if (_optionalChain([result, 'optionalAccess', _4 => _4.invalid])) return res.status(400).json(result.invalid);

      return res.status(200).json({ message: `Usuário deletado com sucesso! ` });
    } catch (e) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

   async updateUser(req, res) {
    try {
      const { nome, password } = req.body;
      const { email } = req.params;

      if (!email) return res.status(400).json(`Email do usuário não foi passado`);
      if (!password) return res.status(400).json(`Senha não foi passada`);

      const hashPassword = await _bcrypt2.default.hash(password, 10);

      const result = await _UserModels2.default.updateUser({ nome, email, hashPassword });

      if (_optionalChain([result, 'optionalAccess', _5 => _5.invalid])) return res.status(400).json(result.invalid);

      return res.status(200).json({ message: `Usuário atualizado com sucesso!`, user: _optionalChain([result, 'optionalAccess', _6 => _6.user]) });
    } catch (e) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

   async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json(`Email ou Senha não foram passados`);

      const result = await _UserModels2.default.login({ email, password });

      if (_optionalChain([result, 'optionalAccess', _7 => _7.InvalidEmail])) return res.status(400).json(result.InvalidEmail);
      if (_optionalChain([result, 'optionalAccess', _8 => _8.invalidPassword])) return res.status(400).json(result.invalidPassword);

      const { ...usuario } = _optionalChain([result, 'optionalAccess', _9 => _9.user]);

      return res.status(200).json({ message: _optionalChain([result, 'optionalAccess', _10 => _10.sucess]), user: usuario.email, token: _optionalChain([result, 'optionalAccess', _11 => _11.token]) });
    } catch (e) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

   async getProfile(req, res) {
    try {
      return res.status(200).json({ message: `Rota Autorizada com sucesso!`, user: req.userAuth });
    } catch (e) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }
}

exports. default = new UserController();
