"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _database = require('../database/database'); var _database2 = _interopRequireDefault(_database);

var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

class UserModels {
   async getUsers() {
    try {
      const user = await _database2.default.select(['id', 'nome', 'email', 'password']).table('users');

      if (user.length === 0) {
        return { message: `Nenhum Usuário Encontrado!` };
      }

      return { user };
    } catch (e) {
      console.log(`Error ao pegar usuário no banco de dados!`);
    }
  }

   async createUser({ nome, email, hashPassword }) {
    try {
      const existUser = await _database2.default.select('*').table('users').where({ email });

      if (existUser.length > 0) return { exist: `Usuário já existe!` };

      const create = await _database2.default.table('users').insert({ nome, email, password: hashPassword });

      const user = await _database2.default.table('users').select('*').where({ email });

      return {
        user,
      };
    } catch (e) {
      console.log(`Não foi possivel completar a requisiçao no banco de dados!`, e.message);
    }
  }

   async deleteUser({ id }) {
    try {
      const deleteUser = await _database2.default.table('users').where({ id }).del();

      if (deleteUser !== 1) return { invalid: `Usuário não existe!` };

      return {
        deleteUser,
      };
    } catch (e) {
      console.log(`Error ao tentar deletar usuário!`, e.message);
    }
  }

   async updateUser({ nome, email, hashPassword }) {
    try {
      const updateUser = await _database2.default.table('users').where({ email }).update({ nome, password: hashPassword });

      if (updateUser === 0) return { invalid: `Usuário não existe!` };

      const user = await _database2.default.table('users').select('id', 'nome', 'email', 'password').where({ email });

      return {
        user,
      };
    } catch (e) {
      console.log(`Error ao tentar atualizar Usuário!`, e.message);
    }
  }

   async login({ email, password }) {
    try {
      const user = await _database2.default.call(void 0, 'users').select('*').where({ email });

      if (user.length === 0) return { InvalidEmail: `Usuário não existe` };

      const pass = user[0].password;

      const verifyPass = await _bcrypt2.default.compare(password, pass);

      if (!verifyPass) return { invalidPassword: `Senha Incorreta!` };

      const id = user[0].id;

      const token = _jsonwebtoken2.default.sign({ userId: id }, _nullishCoalesce(process.env.JWT_SECRET, () => ( '')), { expiresIn: '1d' });

      return {
        sucess: `Login realizado com sucesso!`,
        user: user[0],
        token: token,
      };
    } catch (e) {
      console.log(`Error ao tentar realizar o Login`, e.message);
    }
  }

   async getProfile({ id }) {
    const user = await _database2.default.select('*').table('users').where({ id });

    return {
      user: user[0],
    };
  }
}

exports. default = new UserModels();
