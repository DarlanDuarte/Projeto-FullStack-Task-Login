import database from '../database/database';
import { IUser, ICreateUser } from '../interfaces/interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserModels {
  public async getUsers() {
    try {
      const user = await database.select(['id', 'nome', 'email', 'password']).table('users');

      if (user.length === 0) {
        return { message: `Nenhum Usuário Encontrado!` };
      }

      return { user };
    } catch (e) {
      console.log(`Error ao pegar usuário no banco de dados!`);
    }
  }

  public async createUser({ nome, email, hashPassword }: ICreateUser) {
    try {
      const existUser = await database.select('*').table('users').where({ email });

      if (existUser.length > 0) return { exist: `Usuário já existe!` };

      const create = await database.table('users').insert({ nome, email, password: hashPassword });

      const user = await database.table('users').select('*').where({ email });

      return {
        user,
      };
    } catch (e: any) {
      console.log(`Não foi possivel completar a requisiçao no banco de dados!`, e.message);
    }
  }

  public async deleteUser({ id }: { id: string }) {
    try {
      const deleteUser = await database.table('users').where({ id }).del();

      if (deleteUser !== 1) return { invalid: `Usuário não existe!` };

      return {
        deleteUser,
      };
    } catch (e: any) {
      console.log(`Error ao tentar deletar usuário!`, e.message);
    }
  }

  public async updateUser({ nome, email, hashPassword }: { nome: string; email: string; hashPassword: string }) {
    try {
      const updateUser = await database.table('users').where({ email }).update({ nome, password: hashPassword });

      if (updateUser === 0) return { invalid: `Usuário não existe!` };

      const user: IUser[] = await database.table('users').select('id', 'nome', 'email', 'password').where({ email });

      return {
        user,
      };
    } catch (e: any) {
      console.log(`Error ao tentar atualizar Usuário!`, e.message);
    }
  }

  public async login({ email, password }: { email: string; password: string }) {
    try {
      const user: IUser[] = await database('users').select('*').where({ email });

      if (user.length === 0) return { InvalidEmail: `Usuário não existe` };

      const pass = user[0].password;

      const verifyPass = await bcrypt.compare(password, pass);

      if (!verifyPass) return { invalidPassword: `Senha Incorreta!` };

      const id = user[0].id;

      const token = jwt.sign({ userId: id }, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });

      return {
        sucess: `Login realizado com sucesso!`,
        user: user[0],
        token: token,
      };
    } catch (e: any) {
      console.log(`Error ao tentar realizar o Login`, e.message);
    }
  }

  public async getProfile({ id }: { id: number }) {
    const user: IUser[] = await database.select('*').table('users').where({ id });

    return {
      user: user[0],
    };
  }
}

export default new UserModels();
