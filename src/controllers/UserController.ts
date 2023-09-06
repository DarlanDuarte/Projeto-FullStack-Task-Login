import { Request, Response } from 'express';
import UserModels from '../models/UserModels';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IJwtPayload } from '../interfaces/interfaces';

class UserController {
  public async getUsers(req: Request, res: Response) {
    try {
      const response = await UserModels.getUsers();

      if (response?.message) {
        return res.status(400).json(response.message);
      }

      return res.status(200).json(response?.user);
    } catch (e: any) {
      console.log(`Error Interno: ${e.message}`);
      return res.status(500).json({ msg: `Error no servidor!` });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { nome, email, password } = req.body;

      if (!email || !nome || !password) {
        return res.status(400).json('Todos os campos são obrigatórios');
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const result = await UserModels.createUser({ nome, email, hashPassword });

      if (result?.exist) return res.status(400).json(result.exist);

      return res.status(201).json({ message: `Usuário criado com sucesso!` });
    } catch (e: any) {
      console.log(`Error ${e.message}`);
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: `Usuário não foi passado` });

      const result = await UserModels.deleteUser({ id });

      if (result?.invalid) return res.status(400).json(result.invalid);

      return res.status(200).json({ message: `Usuário deletado com sucesso! ` });
    } catch (e: any) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const { nome, password } = req.body;
      const { email } = req.params;

      if (!email) return res.status(400).json(`Email do usuário não foi passado`);
      if (!password) return res.status(400).json(`Senha não foi passada`);

      const hashPassword = await bcrypt.hash(password, 10);

      const result = await UserModels.updateUser({ nome, email, hashPassword });

      if (result?.invalid) return res.status(400).json(result.invalid);

      return res.status(200).json({ message: `Usuário atualizado com sucesso!`, user: result?.user });
    } catch (e: any) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) return res.status(400).json(`Email ou Senha não foram passados`);

      const result = await UserModels.login({ email, password });

      if (result?.InvalidEmail) return res.status(400).json(result.InvalidEmail);
      if (result?.invalidPassword) return res.status(400).json(result.invalidPassword);

      const { ...usuario } = result?.user;

      return res.status(200).json({ message: result?.sucess, user: usuario.email, token: result?.token });
    } catch (e: any) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }

  public async getProfile(req: Request, res: Response) {
    try {
      return res.status(200).json({ message: `Rota Autorizada com sucesso!`, user: req.userAuth });
    } catch (e: any) {
      return res.status(500).json(`Error interno do servidor!`);
    }
  }
}

export default new UserController();
